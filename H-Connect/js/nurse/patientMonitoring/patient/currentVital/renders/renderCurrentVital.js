const { CreateVitalLineD3 } = await import(
    importVersion('/H-Connect/js/utils/module/d3js/d3Module.js')
    );
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
    );
const { sessionController } = await import(
    importVersion('/H-Connect/js/utils/controller/sessionController.js')
    );
const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
    );
const { CustomSocket } = await import(
    importVersion('/H-Connect/js/lib/socket/custom/customSocket.js')
    );

const { toFixedFloat } = await import(
    importVersion('/H-Connect/js/utils/common/utils.js')
    );

const { D3VitalLine } = await import(
    importVersion('/H-Connect/js/utils/module/d3js/d3VitalLine.js')
    );

const LOGIN_TOKEN = sessionController.getSession('accesToken');
const USER_CODE = localStorageController.getLocalS('userCode');
const measurementCode = new URLSearchParams(location.search).get(
    'measurement_code'
);
const headers = {
    'SX-Auth-Token': LOGIN_TOKEN,
    deviceKind: 3,
    apiRoute: 'GWS-1',
    requester: USER_CODE
};

let ecgLine = null;
let spO2Line = null;
let respLine = null;
let lineProgress = {
    esg: false,
    spO2: false,
    resp: false
};
const client = new CustomSocket();
client.connect(headers, function() {
    client.addSubscribe(
        'bioSignalData',
        `/topic/public/bioSignalData/${measurementCode}`,
        function(res) {
            if (res) {
                const data = JSON.parse(res.body);
                const { measurementCode, bioSignalData } = data || {};
                // const { ecgDataList, spO2DataList, respDataList } =
                //     bioSignalData;
                const ecgDataList = bioSignalData?.ecgDataList;
                const spO2DataList = bioSignalData?.spO2DataList;
                const respDataList = bioSignalData?.respDataList;

                setUpdateTime(data.dateTime);

                lineProgress.esg = ecgLine?.inProgress;
                if (!lineProgress.esg) {
                    ecgLine = chartCreateOrUpdate(
                        ecgLine,
                        'vital-ecg-graph',
                        ecgDataList,
                        measurementCode,
                        '#00FF19'
                    );
                }
                lineProgress.spO2 = spO2Line?.inProgress;
                if (!lineProgress.spO2) {
                    spO2Line = chartCreateOrUpdate(
                        spO2Line,
                        'vital-spO2-graph',
                        spO2DataList,
                        measurementCode,
                        '#00FFFF'
                    );
                }
                lineProgress.resp = respLine?.inProgress;
                if (!lineProgress.resp) {
                    respLine = chartCreateOrUpdate(
                        respLine,
                        'vital-resp-graph',
                        respDataList,
                        measurementCode,
                        '#EEFF00'
                    );
                }

                setVitalData('.ecg > .bell', bioSignalData?.heartRateDataList);
                setVitalData('.sp > .bell', bioSignalData?.spO2DataList);
                setVitalData('.resp > .bell', bioSignalData?.respDataList);
                setVitalData('.control > .temp', bioSignalData?.tempDataList);
                setVitalData('.control > .ews', bioSignalData?.ewsDataList);
            }
        }
    );
});

const setUpdateTime = (dateString) => {
    try {
        const date = new Date(dateString);
        const $chartTime = $('.chart_time');
        const $year = $chartTime.find('p:first-child > span:first-child');
        const $month = $chartTime.find('p:first-child > span:nth-child(2)');
        const $day = $chartTime.find('p:first-child > span:last-child');
        const $hour = $chartTime.find('p:last-child > span:first-child');
        const $minute = $chartTime.find('p:last-child > span:nth-child(2)');
        const $second = $chartTime.find('p:last-child > span:last-child');

        $year.text(date.getFullYear().toString().substring(2, 4));
        $month.text((date.getMonth() + 1).toString().padStart(2, '0'));
        $day.text(date.getDate().toString().padStart(2, '0'));
        $hour.text(date.getHours().toString().padStart(2, '0'));
        $minute.text(date.getMinutes().toString().padStart(2, '0'));
        $second.text(date.getSeconds().toString().padStart(2, '0'));
    } catch (e) {
        console.log(e);
    }
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

const chartCreateOrUpdate = (chart, target, data, measurementCode, color) => {
    if (data) {
        if (chart) {
            chart.update(data);
        } else {
            chart = new D3VitalLine({
                target,
                data,
                measurementCode,
                setting: {
                    strokeColor: color,
                    strokeWidth: 1,
                    duration: 10000
                }
            });
        }
    }

    return chart;
};

