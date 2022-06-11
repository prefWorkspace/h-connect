'use strict';

function convertCurrentVitalContentMap(_data){
    switch(_data.type){
        case 'sp': 
            return { 
                class: 'sp',
                title: 'SpO2',
                graphImg: '/H-Connect/img/graph/SpO2.png',
                bellName: 'SpO2. %',
                max: 100,
                min: 90,
                value: _data.value,
            };
        case 'ecg':
            return { 
                class: 'ecg',
                title: 'ECG',
                graphImg: '/H-Connect/img/graph/ECG.png',
                bellName: 'HR. bpm',
                max: 120,
                min: 50,
                value: _data.value,
            };
        case 'resp':
            return { 
                class: 'resp',
                title: 'RESP',
                graphImg: '/H-Connect/img/graph/RESP.png',
                bellName: 'RESP',
                max: 30,
                min: 8,
                value: _data.value,
            };
        default:
            return { 
                class: '',
                title: '',
                graphImg: '',
                bellName: '',
                max: 100,
                min: 90,
                value: _data.value,
            };
    }
}

// current vital > ECG
export function currentVitalContentTemplates(_data) {
    const vitalContentTagData = convertCurrentVitalContentMap(_data);

    return `
        <div class="${vitalContentTagData.class}">
            <div class="g_type sp_graph">
                <p>${vitalContentTagData.title}</p>
                <div>
                    <img src="${vitalContentTagData.graphImg}" alt="${vitalContentTagData.title}그래프">
                </div>
            </div>
            <div class="bell">
                <div class="bell_name">
                    <p>${vitalContentTagData.bellName}</p>
                    <input type="checkbox" id="${type}_mute">
                    <label for="${type}_mute">
                        <span></span>
                    </label>
                </div>
                <div class="bell_num">
                    <div>
                        <p>${vitalContentTagData.max}</p>
                        <p>${vitalContentTagData.min}</p>
                    </div>
                    <p>${vitalContentTagData.value}</p>
                </div>
            </div>
        </div>
    `;
}
// render -> 

// render -> $('#tab-2') ecg1 + tabular_table

export function tabularTableTemplates(_data) {
    const {
        list,
        pageNumber,
        pageSize,
        totalCount,
    } = _data;

    let html = '';

    if (!list || list.length === 0) {
        html = errorText();
        return html;
    }
    for (let inx = 0; inx < list.length; inx++) {
        console.log('list[inx]===');
        console.log(list[inx]);

        html += tabularTableContentTemplates(list[inx]);
    }

    return `
        <div class="tabular_table">
            <div class="table_title">
                <p class="date_time">
                    date/time
                </p>
                <p class="hr">HR (bpm)</p>
                <p class="temp">Temp (°C)</p>
                <p class="resp">RESP</p>
                <p class="spo">SpO2 (%)</p>
                <p class="error">Error</p>
            </div>

            <div class="table_body">
                ${html}
            </div>
            <div class="table_page">
                ${tabularTablePagenationTemplates(pageNumber, pageSize, totalCount)}
            </div>
        </div>
    `;
}

export function tabularTableContentTemplates(_data) {
    const { measurementCode, hr, temp, resp, spo2, error, dateTime } = _data;

    return `
        <div class="table_content">
            <div class="date_time">
                <p>${moment(dateTime).format('YY.MM.DD hh:mm:ss')}</p>
            </div>
            <div class="hr">
                <p>${hr}</p>
            </div>
            <div class="temp">
                <p>${temp}</p>
            </div>
            <div class="resp">
                <p>${resp}</p>
            </div>
            <div class="spo">
                <p>${spo2}</p>
            </div>
            <div class="error">
                <p>${error && error != '' ? error : '-'}</p>
            </div>
        </div>
    `;
}

export function tabularTablePagenationTemplates(pageNumber, pageSize, totalCount) {

    return `
        <ul>
            <li><a href="" onclick="${selectBioSignalsTrendDataPage}">&lt;&lt;</a></li>
            <li><a href="">&lt;</a></li>
            <li class="active">
                <a href="">1.</a>
            </li>
            <li><a href="">2.</a></li>
            <li><a href="">3.</a></li>
            <li><a href="">4.</a></li>
            <li><a href="">5.</a></li>
            <li><a href="">6.</a></li>
            <li><a href="">7.</a></li>
            <li><a href="">8.</a></li>
            <li><a href="">9.</a></li>
            <li><a href="">10.</a></li>
            <li><a href="">...</a></li>
            <li><a href="">52.</a></li>

            <li><a href="">&gt;</a></li>
            <li><a href="">&gt;&gt;</a></li>
        </ul>
    `;
}

export function selectBioSignalsGraphicalTrendDataListTemplates(_data) {
    const {
        list,
        pageNumber,
        pageSize,
        totalCount,
    } = _data;

    return `
        <div class="tabular_table graphical">
            <div class="table_title">
                <p class="date_time">
                    date/time
                </p>
                <p class="hr">HR (bpm)</p>
                <p class="temp">Temp (°C)</p>
                <p class="ews">EWS</p>
                <p class="spo">SpO2 (%)</p>
                <p class="error">Error</p>
            </div>

            <div class="table_body">
                ${tabularTableContentTemplates(list[0])}
            </div>

            <!-- graph_wrap -->
            <div class="graph_wrap">
                <!-- hr_chart -->
                <div class="chart hr_chart">
                    <!-- left -->
                    <div class="left">
                        <div class="index">
                            <p>HR<br>(bpm)</p>
                        </div>

                        <p class="bpm">
                            240<br>
                            200<br>
                            160<br>
                            120<br>
                            80<br>
                            40<br>
                            0
                        </p>
                    </div>

                    <div class="right">
                        <div class="bg_graph">
                            <img src="/H-Connect/img/graph/background.png" alt="그래프 백그라운드 이미지">
                        </div>

                        <div class="row_time">
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

                        <div class="time_line">
                            <p class="time">
                                <span>00</span>:
                                <span>02</span>:
                                <span>00</span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- sp_chart -->
                <div class="chart sp_chart">
                    <!-- left -->
                    <div class="left">
                        <div class="index">
                            <p>SPO2<br>(%)</p>
                        </div>

                        <p class="bpm">
                            240<br>
                            200<br>
                            160<br>
                            120<br>
                            80<br>
                            40<br>
                            0
                        </p>
                    </div>

                    <div class="right">
                        <div class="bg_graph">
                            <img src="/H-Connect/img/graph/background.png" alt="그래프 백그라운드 이미지">
                        </div>

                        <div class="row_time">
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

                        <div class="time_line">
                            <p class="time">
                                <span>00</span>:
                                <span>02</span>:
                                <span>00</span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- resp_chart -->
                <div class="chart resp_chart">
                    <!-- left -->
                    <div class="left">
                        <div class="index">
                            <p>RESP</p>
                        </div>

                        <p class="bpm">
                            240<br>
                            200<br>
                            160<br>
                            120<br>
                            80<br>
                            40<br>
                            0
                        </p>
                    </div>

                    <div class="right">
                        <div class="bg_graph">
                            <img src="/H-Connect/img/graph/background.png" alt="그래프 백그라운드 이미지">
                        </div>

                        <div class="row_time">
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

                        <div class="time_line">
                            <p class="time">
                                <span>00</span>:
                                <span>02</span>:
                                <span>00</span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- temp_chart -->
                <div class="chart temp_chart">
                    <!-- left -->
                    <div class="left">
                        <div class="index">
                            <p>
                                TEMP<br>(°C)
                            </p>
                        </div>

                        <p class="bpm">
                            240<br>
                            200<br>
                            160<br>
                            120<br>
                            80<br>
                            40<br>
                            0
                        </p>
                    </div>

                    <div class="right">
                        <div class="bg_graph">
                            <img src="/H-Connect/img/graph/background.png" alt="그래프 백그라운드 이미지">
                        </div>

                        <div class="row_time">
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

                        <div class="time_line">
                            <p class="time">
                                <span>00</span>:
                                <span>02</span>:
                                <span>00</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function selectBioSignalEventSimpleTemplates(_data) {
    const {
        list,
        pageNumber,
        pageSize,
        totalCount,
    } = _data;

    let html = '';

    if (!list || list.length === 0) {
        html = errorText();
        return html;
    }
    for (let inx = 0; inx < list.length; inx++) {
        console.log('list[inx]===');
        console.log(list[inx]);

        html += selectBioSignalEventSimpleContentTemplates(list[inx]);
    }

    return `
        <div class="tabular_table graphical event">
            <div class="table_title">
                <p class="date_time">
                    date/time
                </p>
                <p class="alarm_des">
                    Alarm Description
                </p>
                <p class="prior">Priority</p>
            </div>
            <div class="table_body">
                ${html}
            </div>
            <div class="table_page">
                ${tabularTablePagenationTemplates(pageNumber, pageSize, totalCount)}
            </div>
        </div>
    `;
}

export function selectBioSignalEventSimpleContentTemplates(_data) {
    const { bioSignalEventId, measurementCode, eventDateTime, priority, eventType, eventDetail, name, patientCode, arrhythmiaType, arrhythmiaDescription } = _data;

    return `
        <div class="table_wrap">
            <div>
                <div class="date_time">
                    <p>
                        ${moment(eventDateTime).format('YY.MM.DD hh:mm:ss')}
                    </p>
                </div>

                <div class="alarm_des">
                    <p>${arrhythmiaDescription}</p>
                </div>

                <div class="prior">
                    <p>${priority}</p>
                </div>
            </div>

            <!-- 해당 데이터 안내려옴 -->
            <!--
            <div>
                <p class="more">
                    자세히
                </p>
                <p class="close">
                    닫기
                </p>
                <span></span>
            </div> -->
        </div>
        <div class="table_content">
            <div class="cont_inner">
                <div class="ecg">
                    <div class="ecg_graph">
                        <p>ECG</p>
                        <div>
                            <div class="img_container">
                                <img src="/H-Connect/img/graph/ECG.png" alt="ecg그래프">
                            </div>
                        </div>
                    </div>
                    <div class="bell">
                        <div class="bell_name">
                            <p>
                                HR. bpm
                            </p>
                        </div>

                        <div class="bell_num">
                            <div>
                                <p>
                                    120
                                </p>
                                <p>
                                    50
                                </p>
                            </div>
                            <p>216</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
