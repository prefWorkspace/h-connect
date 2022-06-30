let ecgLine = null;
let spO2Line = null;
let respLine = null;

let ecgLineTabular = null;
let ecgLineGraphic = null;
let ecgLineEvent = null;

const MonitoringLayer = () => {

    const data = ReactRedux.useSelector(state => state);
    const dispatch = ReactRedux.useDispatch();
    const nodeRef = React.useRef(null);

    // Tabular
    // SelectBioSignalsTrendDataPage

    // Graphic
    // SelectBioSignalsGraphicalTrendDataList

    // SelectBioSignalEvent

    // Event
    // - 72. SelectBioSignalEventSimplePage
    // - 73. SelectBioSignalEvent
    // - 74. UpdateBioSignalEvent
    // - 75. DeleteBioSignalEvent

    React.useEffect(() => {
        $(function() {
            $('.tabs').on('click', '.tab-link', function(event) {
                event.preventDefault();
                const tab = $(this).data('tab');
                $('.tab-content').removeClass('current');
                $(`#${tab}`).addClass('current');
                $(this).parent().find('.tab-link').removeClass('current');
                $(this).addClass('current');

            });
        });
    }, []);

    React.useEffect(() => {
        if (data.viewType !== 'default') {
            if (data.transforms.monitoring === 'translate(0px, 0px)') {
                dispatch({
                    type: 'setMonitoringTransform',
                    data: nodeRef.current.style.transform
                });
            }
            nodeRef.current.style.transform = 'translate(0px, 0px)';
        } else {
            nodeRef.current.style.transform = data.transforms.monitoring;
        }

    }, [data.viewType]);

    return (
        <ReactDraggable nodeRef={nodeRef} handle='.title' disabled={data.viewType !== 'default'}>
            <div ref={nodeRef} className='vital'>
                {/* 타이틀 */}
                <div className='title'>
                    <p>
                        환자 모니터링. {data.patient.name} (63. 남). Patient
                        ID - Patient type
                    </p>

                    <div className='btn_list'>
                        <button type='button' className='btn_fold'>
                            <div>
                                <img
                                    src='/H-Connect/img/icon/nurse/fold.svg'
                                    alt='접는 아이콘'
                                />
                            </div>
                        </button>

                        <button type='button' className='btn_full'>
                            <div>
                                <img
                                    src='/H-Connect/img/icon/nurse/full.svg'
                                    alt='네모 아이콘'
                                />
                            </div>
                        </button>

                        <button type='button' className='btn_close'>
                            <div>
                                <img
                                    src='/H-Connect/img/icon/nurse/close.svg'
                                    alt='엑스 아이콘'
                                />
                            </div>
                        </button>
                    </div>
                </div>

                {/* 내용 */}
                <div className='cont'>
                    <div className='container'>
                        {/* 탭메뉴 */}
                        <ul className='tabs'>
                            <li
                                className='tab-link current'
                                data-tab='tab-1'
                            >
                                Current Vital
                            </li>
                            <li
                                className='tab-link'
                                data-tab='tab-2'
                            >
                                Tabular Trend
                            </li>
                            <li
                                className='tab-link'
                                data-tab='tab-3'
                            >
                                Graphical Trend
                            </li>
                            <li
                                className='tab-link'
                                data-tab='tab-4'
                            >
                                Event
                            </li>
                        </ul>

                        {/* current vital */}
                        <Vital />

                        {/* Tabular Trend */}
                        <TabularTrend />

                        {/* Graphical Trend */}
                        <GraphicTrend />

                        {/* Event */}
                        <Event />

                    </div>
                </div>
            </div>
        </ReactDraggable>
    );
};

const Vital = () => {
    const api = new ApiDelegate();
    const data = ReactRedux.useSelector(state => state);

    React.useEffect(() => {
        if (data.patient.measurementCode) {
            data.socket.addSubscribe(
                'bioSignalData',
                `/topic/public/bioSignalData/${data.patient.measurementCode}`,
                function(res) {
                    if (res) {
                        const bio = JSON.parse(res.body);
                        const { measurementCode, bioSignalData } = bio || {};
                        const { ecgDataList, spO2DataList, respDataList } =
                        bioSignalData || {
                            ecgDataList: null,
                            spO2DataList: null,
                            respDataList: null
                        };

                        setUpdateTime(bio.dateTime);
                        ecgLine = chartCreateOrUpdate(
                            ecgLine,
                            'vital-ecg-graph',
                            ecgDataList,
                            measurementCode,
                            '#00FF19'
                        );
                        spO2Line = chartCreateOrUpdate(
                            spO2Line,
                            'vital-spO2-graph',
                            spO2DataList,
                            measurementCode,
                            '#00FFFF'
                        );
                        respLine = chartCreateOrUpdate(
                            respLine,
                            'vital-resp-graph',
                            respDataList,
                            measurementCode,
                            '#EEFF00'
                        );

                        setVitalData('.ecg > .bell', bioSignalData?.heartRateDataList);
                        setVitalData('.sp > .bell', bioSignalData?.spO2DataList);
                        setVitalData('.resp > .bell', bioSignalData?.respDataList);
                        setVitalData('.control > .temp', bioSignalData?.tempDataList);
                        setVitalData('.control > .ews', bioSignalData?.ewsDataList);
                    }
                }
            );
        }
    }, [data.patient.measurementCode]);

    return (
        <div id='tab-1' className='tab-content current'>
            <div className='graph'>
                <div className='ecg'>
                    <div className='ecg_graph'>
                        <p>ECG</p>


                        <div id='vital-ecg-graph'>
                            {/*<img src='/H-Connect/img/graph/ECG.png' alt='ecg그래프' />*/}
                        </div>
                    </div>

                    <div className='bell'>
                        <div className='bell_name'>
                            <p>HR. bpm</p>

                            <input
                                type='checkbox'
                                id='ecg_mute'
                            />
                            <label
                                htmlFor='ecg_mute'
                            >
                                <span></span>
                            </label>
                        </div>

                        <div className='bell_num'>
                            <div className='minMax'>
                                <p>120</p>
                                <p>50</p>
                            </div>

                            <p>108</p>
                        </div>
                    </div>
                </div>

                <div className='sp'>
                    <div className='sp_graph'>
                        <p>SpO2</p>

                        <div id='vital-spO2-graph'>
                            {/*<img src='/H-Connect/img/graph/SpO2.png' alt='ecg그래프' />*/}
                        </div>
                    </div>

                    <div className='bell'>
                        <div className='bell_name'>
                            <p>SpO2. %</p>

                            <input
                                type='checkbox'
                                id='sp_mute'
                            />
                            <label
                                htmlFor='sp_mute'
                            >
                                <span></span>
                            </label>
                        </div>

                        <div className='bell_num'>
                            <div className='minMax'>
                                <p>100</p>
                                <p>90</p>
                            </div>

                            <p>98</p>
                        </div>
                    </div>
                </div>

                <div className='resp'>
                    <div className='resp_graph'>
                        <p>RESP</p>

                        <div id='vital-resp-graph'>
                            {/*<img src='/H-Connect/img/graph/RESP.png' alt='ecg그래프' />*/}
                        </div>
                    </div>

                    <div className='bell'>
                        <div className='bell_name'>
                            <p>RESP</p>

                            <input
                                type='checkbox'
                                id='resp_mute'
                            />
                            <label
                                htmlFor='resp_mute'
                            >
                                <span></span>
                            </label>
                        </div>

                        <div className='bell_num'>
                            <div className='minMax'>
                                <p>30</p>
                                <p>8</p>
                            </div>

                            <p>15</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='control'>
                <div className='ews'>
                    <div className='bell_name'>
                        <p>EWS</p>

                        <input
                            type='checkbox'
                            id='ews_mute'
                        />
                        <label htmlFor='ews_mute'>
                            <span></span>
                        </label>
                    </div>

                    <div className='bell_num'>
                        <p>3</p>

                        <div>
                            <button
                                type='button'
                            >
                                <img
                                    src='/H-Connect/img/icon/up_white.svg'
                                    alt='위를 향하는 화살표'
                                />
                            </button>

                            <button
                                type='button'
                            >
                                <img
                                    src='/H-Connect/img/icon/down_white.svg'
                                    alt='아래를 향하는 화살표'
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='mmhg'>
                    <div className='bell_name'>
                        <p>NBP.mmHg</p>
                    </div>

                    <div className='bell_num'>
                        <div>
                            <p>160</p>
                            <p>90</p>
                        </div>

                        <p>128/77 (94)</p>
                    </div>

                    <div className='time'>
                        <div>
                            <img
                                src='/H-Connect/img/icon/clock.svg'
                                alt='시계 아이콘'
                            />
                        </div>

                        <p>
                            <span>21</span>.
                            <span>09</span>.
                            <span>15</span>
                        </p>
                        &nbsp;

                        <p>
                            <span>21</span>:
                            <span>10</span>:
                            <span>25</span>
                        </p>
                    </div>
                </div>

                <div className='pulse'>
                    <div className='bell_name'>
                        <p>Pulse.bpm</p>
                    </div>

                    <div className='bell_num'>
                        <div>
                            <p>120</p>
                            <p>50</p>
                        </div>

                        <p>184</p>
                    </div>

                    <div className='time'>
                        <div>
                            <img
                                src='/H-Connect/img/icon/clock.svg'
                                alt='시계 아이콘'
                            />
                        </div>

                        <p>
                            <span>21</span>.
                            <span>09</span>.
                            <span>15</span>
                        </p>
                        &nbsp;

                        <p>
                            <span>21</span>:
                            <span>10</span>:
                            <span>25</span>
                        </p>
                    </div>
                </div>

                <div className='temp'>
                    <div className='bell_name'>
                        <p>Temp.°C</p>

                        <input
                            type='checkbox'
                            id='temp_mute'
                        />
                        <label htmlFor='temp_mute'>
                            <span></span>
                        </label>
                    </div>

                    <div className='bell_num'>
                        <div>
                            <p>39.0</p>
                            <p>36.0</p>
                        </div>

                        <p>36.5</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TabularTrend = () => {
    const api = new ApiDelegate();
    const data = ReactRedux.useSelector(state => state);
    const [tabular, setTabular] = React.useState([]);

    const itemsPerPage = 10;
    const [itemLength, setItemLength] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(0);

    React.useEffect(() => {
        if (data.patient.measurementCode) {
            data.socket.addSubscribe(
                'bioSignalDataTabular',
                `/topic/public/bioSignalData/${data.patient.measurementCode}`,
                function(res) {
                    if (res) {
                        const bio = JSON.parse(res.body);
                        const { measurementCode, bioSignalData } = bio || {};
                        const { ecgDataList, spO2DataList, respDataList } =
                        bioSignalData || {
                            ecgDataList: null,
                            spO2DataList: null,
                            respDataList: null
                        };

                        setUpdateTime(bio.dateTime);
                        ecgLineTabular = chartCreateOrUpdate(
                            ecgLineTabular,
                            'tabular-ecg-graph',
                            ecgDataList,
                            measurementCode,
                            '#00FF19'
                        );

                        setVitalData('.ecg > .bell', bioSignalData?.heartRateDataList);
                    }
                }
            );
        }
    }, [data.patient.measurementCode]);

    React.useEffect(() => {
        setPageCount(Math.ceil(itemLength / itemsPerPage));
    }, [itemsPerPage, itemLength]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected * 1 + 1);
    };

    React.useEffect(async () => {
        const params = {
            ...commonRequest(),
            measurementCode: data.patient.measurementCode,
            startDateTime: '2021-11-16 00:00:00',
            endDateTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            pageNumber: currentPage,
            count: itemsPerPage,
            order: 'DESC'
        };

        if (data.patient.measurementCode) {
            const trends = await api.post('/API/BioSignal/SelectBioSignalsTrendDataPage', params);
            setTabular(prev => trends.bioSignalsTrendDataList);
            setItemLength(prev => trends.totalCount);
        }
    }, [data.patient.measurementCode, currentPage, pageCount]);

    return (
        <div id='tab-2' className='tab-content'>
            <div className='ecg'>
                <div className='ecg_graph'>
                    <p style={{ marginBottom: 0 }}>ECG</p>

                    <div id='tabular-ecg-graph' style={{ height: 64, width: 500 }}>
                        {/*<img src='/H-Connect/img/graph/ECG.png' alt='ecg그래프' />*/}
                    </div>
                </div>

                <div className='bell'>
                    <div className='bell_name'>
                        <p>HR. bpm</p>
                    </div>

                    <div className='bell_num'>
                        <div>
                            <p>120</p>
                            <p>50</p>
                        </div>

                        <p>108</p>
                    </div>
                </div>
            </div>

            <div className='tabular_table'>
                <div className='table_title'>
                    <p className='date_time'>
                        date/time
                    </p>
                    <p className='hr'>HR (bpm)</p>
                    <p className='temp'>
                        Temp (°C)
                    </p>
                    <p className='ews'>EWS</p>
                    <p className='spo'>SpO2 (%)</p>
                    <p className='error'>Error</p>
                </div>

                <div className='table_body'>
                    {tabular.map(item => <TabularItem tabular={item} />)}
                </div>

                {/* pagination */}
                <div className='table_page'>
                    <ReactPaginate.default
                        activeClassName='active'
                        breakLabel='...'
                        nextLabel='>'
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={10}
                        pageCount={pageCount}
                        previousLabel='<'
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </div>
    );
};

const TabularItem = ({ tabular }) => {
    const date = moment(new Date(tabular.dateTime));

    return (
        <div className='table_content'>
            <div className='date_time'>
                <p>
                    <span>{date.format('yy')}</span>.
                    <span>{date.format('MM')}</span>.
                    <span>{date.format('DD')}</span>
                </p>
                &nbsp;

                <p>
                    <span>{date.format('HH')}</span>:
                    <span>{date.format('mm')}</span>:
                    <span>{date.format('ss')}</span>
                </p>
            </div>

            <div className='hr'>
                <p>{tabular.hr}</p>
            </div>

            <div className='temp'>
                <p>
                    {tabular.temp}
                </p>
            </div>

            <div className='ews'>
                <p>4</p>
            </div>
            <div className='spo'>
                <p>98</p>
            </div>
            <div className='error'>
                <p>-</p>
            </div>
        </div>
    );
};

const GraphicTrend = () => {
    const api = new ApiDelegate();
    const data = ReactRedux.useSelector(state => state);

    React.useEffect(async () => {
        if (data.patient.measurementCode) {
            const params = {
                ...commonRequest(),
                measurementCode: data.patient.measurementCode,
                startDateTime: '2021-11-16 00:00:00',
                endDateTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                order: 'DESC'
            };

            const trends = await api.post('/API/BioSignal/SelectBioSignalsGraphicalTrendDataList', params);

            data.socket.addSubscribe(
                'bioSignalDataGraphic',
                `/topic/public/bioSignalData/${data.patient.measurementCode}`,
                function(res) {
                    if (res) {
                        const bio = JSON.parse(res.body);
                        const { measurementCode, bioSignalData } = bio || {};
                        const { ecgDataList, spO2DataList, respDataList } =
                        bioSignalData || {
                            ecgDataList: null,
                            spO2DataList: null,
                            respDataList: null
                        };

                        setUpdateTime(bio.dateTime);
                        ecgLineGraphic = chartCreateOrUpdate(
                            ecgLineGraphic,
                            'graphic-ecg-graph',
                            ecgDataList,
                            measurementCode,
                            '#00FF19'
                        );

                        setVitalData('.ecg > .bell', bioSignalData?.heartRateDataList);
                    }
                }
            );
        }
    }, [data.patient.measurementCode]);

    return (
        <div id='tab-3' className='tab-content'>
            <div className='ecg'>
                <div className='ecg_graph'>
                    <p style={{ marginBottom: 0 }}>ECG</p>

                    <div id='graphic-ecg-graph' style={{ height: 64, width: 500 }}>
                        {/*<img src='/H-Connect/img/graph/ECG.png' alt='ecg그래프' />*/}
                    </div>
                </div>

                <div className='bell'>
                    <div className='bell_name'>
                        <p>HR. bpm</p>
                    </div>

                    <div className='bell_num'>
                        <div>
                            <p>120</p>
                            <p>50</p>
                        </div>

                        <p>108</p>
                    </div>
                </div>
            </div>

            <div
                className='tabular_table graphical'
            >
                <div className='table_title'>
                    <p className='date_time'>
                        date/time
                    </p>
                    <p className='hr'>HR (bpm)</p>
                    <p className='temp'>
                        Temp (°C)
                    </p>
                    <p className='ews'>EWS</p>
                    <p className='spo'>SpO2 (%)</p>
                    <p className='error'>Error</p>
                </div>

                <div className='table_body'>
                    <div className='table_content'>
                        <div className='date_time'>
                            <p>
                                <span>21</span>.
                                <span>09</span>.
                                <span>15</span>
                            </p>
                            &nbsp;

                            <p>
                                <span>01</span>:
                                <span>44</span>:
                                <span>37</span>
                            </p>
                        </div>

                        <div className='hr'>
                            <p>108</p>
                        </div>

                        <div className='temp'>
                            <p>
                                <span>36</span>.
                                <span>5</span>
                            </p>
                        </div>

                        <div className='ews'>
                            <p>4</p>
                        </div>
                        <div className='spo'>
                            <p>98</p>
                        </div>
                        <div className='error'>
                            <p>-</p>
                        </div>
                    </div>
                </div>

                {/* graph_wrap */}
                <div className='graph_wrap'>
                    {/* hr_chart */}
                    <div className='chart hr_chart'>
                        {/* left */}
                        <div className='left'>
                            <div className='index'>
                                <p>
                                    HR<br />(bpm)
                                </p>
                            </div>

                            <p className='bpm'>
                                240<br />
                                200<br />
                                160<br />
                                120<br />
                                80<br />
                                40<br />
                                0
                            </p>
                        </div>

                        <div className='right'>
                            <div
                                className='bg_graph'
                            >
                                <img
                                    src='/H-Connect/img/graph/background.png'
                                    alt='그래프 백그라운드 이미지'
                                />
                            </div>

                            <div
                                className='row_time'
                            >
                                <p>00:00:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:02:00</p>
                                <p>00:00:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:02:00</p>
                            </div>

                            <div className='time_line'><p className='time'><span>00</span>:
                                <span>02</span>: <span>00</span></p></div>
                        </div>
                    </div>

                    {/* sp_chart */}
                    <div className='chart sp_chart'>
                        {/* left */}
                        <div className='left'>
                            <div className='index'>
                                <p>
                                    SPO2<br />(%)
                                </p>
                            </div>

                            <p className='bpm'>
                                240<br />
                                200<br />
                                160<br />
                                120<br />
                                80<br />
                                40<br />
                                0
                            </p>
                        </div>

                        <div className='right'>
                            <div
                                className='bg_graph'
                            >
                                <img
                                    src='/H-Connect/img/graph/background.png'
                                    alt='그래프 백그라운드 이미지'
                                />
                            </div>

                            <div
                                className='row_time'
                            >
                                <p>00:00:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:02:00</p>
                                <p>00:00:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:02:00</p>
                            </div>

                            <div
                                className='time_line'
                            ><p className='time'>
                                <span>00</span>: <span>02</span>: <span>00</span>
                            </p>
                            </div>
                        </div>
                    </div>

                    {/* resp_chart */}
                    <div
                        className='chart resp_chart'
                    >
                        {/* left */}
                        <div className='left'>
                            <div className='index'>
                                <p>RESP</p>
                            </div>

                            <p className='bpm'>
                                240<br />
                                200<br />
                                160<br />
                                120<br />
                                80<br />
                                40<br />
                                0
                            </p>
                        </div>

                        <div className='right'>
                            <div
                                className='bg_graph'
                            >
                                <img
                                    src='/H-Connect/img/graph/background.png'
                                    alt='그래프 백그라운드 이미지'
                                />
                            </div>

                            <div
                                className='row_time'
                            >
                                <p>00:00:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:02:00</p>
                                <p>00:00:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:02:00</p>
                            </div>

                            <div
                                className='time_line'
                            >
                                <p className='time'><span>00</span>: <span>02</span>:
                                    <span>00</span></p>
                            </div>
                        </div>
                    </div>

                    {/* temp_chart */}
                    <div
                        className='chart temp_chart'
                    >
                        {/* left */}
                        <div className='left'>
                            <div className='index'>
                                <p>
                                    TEMP<br />(°C)
                                </p>
                            </div>

                            <p className='bpm'>
                                240<br />
                                200<br />
                                160<br />
                                120<br />
                                80<br />
                                40<br />
                                0
                            </p>
                        </div>

                        <div className='right'>
                            <div
                                className='bg_graph'
                            >
                                <img
                                    src='/H-Connect/img/graph/background.png'
                                    alt='그래프 백그라운드 이미지'
                                />
                            </div>

                            <div
                                className='row_time'
                            >
                                <p>00:00:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:02:00</p>
                                <p>00:00:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:01:00</p>
                                <p>00:02:00</p>
                            </div>

                            <div
                                className='time_line'
                            >
                                <p className='time'><span>00</span>: <span>02</span>:
                                    <span>00</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Event = () => {
    const api = new ApiDelegate();
    const data = ReactRedux.useSelector(state => state);
    const [events, setEvents] = React.useState([]);

    const itemsPerPage = 10;
    const [itemLength, setItemLength] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(0);

    React.useEffect(() => {
        $(function() {
            $('.table_body').on('click', '.table_wrap', async function(event) {
                const eventId = $(this).data('eventId');

                if (data.patient.measurementCode && eventId) {
                    const params = {
                        ...commonRequest(),
                        measurementCode: data.patient.measurementCode,
                        bioSignalEventId: eventId
                    };

                    if ($(this).hasClass('on')) {
                        $(this).toggleClass('on').next().slideUp();
                        $(this).find('.alarm_des').css({ overflow: 'hidden' });
                    } else {
                        const event = await api.post('/API/BioSignal/SelectBioSignalEvent', params);

                        chartCreateOrUpdate(
                            null,
                            `ecg-${eventId}`,
                            event.bioSignalEvent.ecgJson,
                            data.patient.measurementCode,
                            '#00FF19'
                        );

                        $(this).next().find('.bell_num > div > p:first-child').text(event.bioSignalEvent.minValue);
                        $(this).next().find('.bell_num > div > p:last-child').text(event.bioSignalEvent.maxValue);
                        $(this).next().find('.bell_num > p').text(event.bioSignalEvent.value);

                        $('.table_wrap').removeClass('on').next().slideUp();
                        $(this).toggleClass('on').next().slideToggle();
                        $(this).find('.alarm_des').css({ overflow: 'visible' });
                    }
                }
            });
        });
    }, [data.patient.measurementCode]);

    React.useEffect(() => {
        setPageCount(Math.ceil(itemLength / itemsPerPage));
    }, [itemsPerPage, itemLength]);

    React.useEffect(() => {
        if (data.patient.measurementCode) {
            data.socket.addSubscribe(
                'bioSignalDataEvent',
                `/topic/public/bioSignalData/${data.patient.measurementCode}`,
                function(res) {
                    if (res) {
                        const bio = JSON.parse(res.body);
                        const { measurementCode, bioSignalData } = bio || {};
                        const { ecgDataList, spO2DataList, respDataList } =
                        bioSignalData || {
                            ecgDataList: null,
                            spO2DataList: null,
                            respDataList: null
                        };

                        setUpdateTime(bio.dateTime);
                        ecgLineEvent = chartCreateOrUpdate(
                            ecgLineEvent,
                            'event-ecg-graph',
                            ecgDataList,
                            measurementCode,
                            '#00FF19'
                        );

                        setVitalData('.ecg > .bell', bioSignalData?.heartRateDataList);
                    }
                }
            );

        }
    }, [data.patient.measurementCode]);

    React.useEffect(async () => {
        const params = {
            ...commonRequest(),
            measurementCode: data.patient.measurementCode,
            startDateTime: '2021-11-16 00:00:00',
            endDateTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            pageNumber: currentPage,
            count: itemsPerPage,
            order: 'DESC'
        };

        if (data.patient.measurementCode) {
            const eventItems = await api.post('/API/BioSignal/SelectBioSignalEventSimplePage', params);
            setEvents(prev => eventItems.bioSignalEventSimpleList);
            setItemLength(prev => eventItems.totalCount);
        }
    }, [data.patient.measurementCode, currentPage, pageCount]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected * 1 + 1);
    };

    return (
        <div id='tab-4' className='tab-content'>
            <div className='ecg'>
                <div className='ecg_graph'>
                    <p style={{ marginBottom: 0 }}>ECG</p>

                    <div id='event-ecg-graph' style={{ height: 64, width: 500 }}>
                        {/*<img src='/H-Connect/img/graph/ECG.png' alt='ecg그래프' />*/}
                    </div>
                </div>

                <div className='bell'>
                    <div className='bell_name'>
                        <p>HR. bpm</p>
                    </div>

                    <div className='bell_num'>
                        <div>
                            <p>120</p>
                            <p>50</p>
                        </div>

                        <p>216</p>
                    </div>
                </div>
            </div>

            <div
                className='tabular_table graphical event'
            >
                <div className='table_title'>
                    <div className='left'>
                        <p className='date_time'>
                            date/time
                        </p>
                        <p className='alarm_des'>
                            Alarm Description
                        </p>
                    </div>

                    <p className='prior'>
                        Priority
                    </p>
                </div>

                <div className='table_body' style={{ height: 'auto' }}>
                    {events.map(item => <EventItem event={item} />)}
                </div>

                {/* pagination */}
                <div className='table_page'>
                    <ReactPaginate.default
                        activeClassName='active'
                        breakLabel='...'
                        nextLabel='>'
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={10}
                        pageCount={pageCount}
                        previousLabel='<'
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </div>
    );
};

const EventItem = ({ event }) => {
    const date = moment(new Date(event.eventDateTime));

    return (
        <>
            <div className='table_wrap' data-event-id={event.bioSignalEventId}>
                <div>
                    <div className='date_time'>
                        <p>
                            <span>{date.format('yy')}</span>.
                            <span>{date.format('MM')}</span>.
                            <span>{date.format('DD')}</span>
                        </p>
                        &nbsp;

                        <p>
                            <span>{date.format('HH')}</span>:
                            <span>{date.format('mm')}</span>:
                            <span>{date.format('ss')}</span>
                        </p>
                    </div>
                    <div className='alarm_des' style={{ margin: 0, width: 420, overflow: 'hidden' }}>
                        <p>{event.arrhythmiaDescription}</p>
                    </div>
                </div>
                <div>
                    <p className='more'> 자세히 </p>
                    <p className='close'> 닫기 </p> <span></span>
                </div>
            </div>
            <div className='table_content'>
                <div className='cont_inner'>
                    <div className='ecg'>
                        <div className='ecg_graph'><p style={{ marginBottom: 0 }}>ECG</p>
                            <div style={{ height: 64 }}>
                                <div id={`ecg-${event.bioSignalEventId}`}
                                     style={{ width: 1210, height: 60 }}>
                                </div>
                            </div>
                        </div>
                        <div className='bell'>
                            <div className='bell_name'><p> HR. bpm </p></div>
                            <div className='bell_num'>
                                <div><p> 120 </p>
                                    <p> 50 </p></div>
                                <p> 216 </p></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const chartCreateOrUpdate = (chart, target, data, measurementCode, color) => {
    if (data) {
        if (chart) {
            chart.chartUpdate(data);
        } else {
            chart = new CreateVitalLineD3({
                target,
                data,
                measurementCode: measurementCode,
                setting: {
                    strokeColor: color,
                    strokeWidth: 1,
                    duration: 3000
                }
            });
        }
    }

    return chart;
};

const setUpdateTime = (dateString) => {
    try {
        const date = new Date(dateString);
        const $chartTime = $('.time');
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
