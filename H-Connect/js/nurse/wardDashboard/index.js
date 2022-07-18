const store = Redux.createStore(reducer);
const Provider = ReactRedux.Provider;
const HashRouter = ReactRouterDOM.HashRouter;
const Routes = ReactRouterDOM.Routes;
const Route = ReactRouterDOM.Route;

const ecgLines = [];
const lineProgress = [];

const App = () => {
    const api = new ApiDelegate();
    const wardCode = getQueryValue('wardCode');
    const displayCode = getQueryValue('displayCode');
    const loginToken = sessionStorage.getItem('accesToken');
    const user = JSON.parse(localStorage.getItem('userData'));
    const [beds, setBeds] = React.useState([]);
    const [measurements, setMeasurements] = React.useState([]);

    React.useEffect(async () => {
        const sickBed = await api.post('/API/Manager/SelectSickBed', {
            ...commonRequest(),
            wardCode,
            displayCode
        });

        const measurementInfo = await api.post('/API/Measurement/SelectMeasurementInfoList', {
            ...commonRequest(),
            wardCode,
            displayCode
        });
        setMeasurements(measurementInfo?.measurementInfoSimpleList);


    }, []);

    React.useEffect(() => {
        if (measurements.length > 0) {
            $(function() {
                // 소켓
                const headers = {
                    'SX-Auth-Token': loginToken,
                    deviceKind: 3,
                    apiRoute: 'GWS-1',
                    requester: user.userCode
                };
                const socket = new CustomSocket();
                socket.connect(headers, function() {
                    measurements.map(item => socket.addSubscribe(item.measurementCode, `/topic/public/bioSignalData/${item.measurementCode}`, function(res) {
                        if (res) {
                            const bio = JSON.parse(res.body);
                            const { measurementCode, bioSignalData } = bio || {};
                            const { ecgDataList, spO2DataList, respDataList } =
                            bioSignalData || {
                                ecgDataList: null,
                                spO2DataList: null,
                                respDataList: null
                            };

                            lineProgress[item.measurementCode] = ecgLines[item.measurementCode]?.inProgress;
                            if (!lineProgress[item.measurementCode]) {
                                ecgLines[item.measurementCode] = chartCreateOrUpdate(
                                    ecgLines[item.measurementCode],
                                    `${item.measurementCode}-vital-ecg-graph`,
                                    ecgDataList,
                                    measurementCode,
                                    '#00FF19'
                                );

                                setVitalData(`#${item.measurementCode} .ecg .bell`, bioSignalData?.heartRateDataList);
                                setVitalData(`#${item.measurementCode} .sp > .bell`, bioSignalData?.spO2DataList);
                                setVitalData(`#${item.measurementCode} .resp > .bell`, bioSignalData?.respDataList);
                                setVitalData(`#${item.measurementCode} .control > .temp`, bioSignalData?.tempDataList);
                                setVitalData(`#${item.measurementCode} .control > .ews`, bioSignalData?.ewsDataList);
                            }
                        }

                        return item;
                    }));
                });
            });
        }
    }, [measurements]);


    return (
        <div id='wrap_content' className='nurse dashboard ward_dashboard'>
            <div className='wrap_inner'>
                <div>

                    <Title />

                    {measurements.map(item => <Vital data={item} />)}

                </div>
            </div>
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('wrap')
);


const chartCreateOrUpdate = (chart, target, data, measurementCode, color) => {
    if (data) {
        if (chart) {
            chart.update(data);
        } else {
            chart = new D3VitalLine({
                target,
                data,
                measurementCode: measurementCode,
                setting: {
                    strokeColor: color,
                    strokeWidth: 1,
                    duration: 5000
                }
            });
        }
    }

    return chart;
};

const setVitalData = (target, data) => {
    if (!data) return false;

    const items = data.map((item) => item.value);
    const $target = $(`${target}`);
    const $min = $target.find('.minMax > p:first-child');
    const $max = $target.find('.minMax > p:last-child');
    const $last = $max.parent().next();

    let value = items[items.length - 1];
    if (target === '.control > .temp') {
        value = toFixedFloat(value, 1);
    }
    // INFO : min, max 가 의미하는게 받아온 데이터를 기반으로 min max 를 렌더하는것이 아닌듯합니다.
    // 팝업을 통해서 설정한 값으로 min max가 설정됩니다.
    // $min.text(Math.min(...items));
    // $max.text(Math.max(...items));
    $last.text(value);
};
