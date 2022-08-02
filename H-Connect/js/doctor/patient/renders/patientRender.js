'use strict';

const { updateGlobalSetting } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/patient/actions/patientAPI.js'
        )
        );

const {
    currentVitalContentTemplates,
    tabularTableTemplates,
    selectBioSignalsGraphicalTrendDataListTemplates,
    selectBioSignalEventSimpleTemplates
} =
    await import(
        importVersion(
            '/H-Connect/js/doctor/patient/templates/patientTemplates.js'
        )
        );

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
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


// 탭 1 렌더
export function patientTab1Render(list) {
    let html = '';

    if (!list || list.length === 0) {
        html = errorText();
        $('#tab-1 > .graph').html(html);
        return;
    }

    let data = { type: 'ecg', value: list[0].hr };
    html += currentVitalContentTemplates(data);
    data = { type: 'sp', value: list[0].spo2 };
    html += currentVitalContentTemplates(data);
    data = { type: 'resp', value: list[0].resp };
    html += currentVitalContentTemplates(data);

    $('#tab-1 > .graph').html(html);
}

// 탭 2 렌더
export function patientTab2Render(result) {
    const {
        bioSignalsTrendDataList: list,
        pageNumber,
        pageSize,
        totalCount
    } = result;

    let html = '';

    if (!list || list.length === 0) {
        html = errorText();
        $('#tab-2').html(html);
        return;
    }

    let data = { type: 'ecg', value: list[0].hr };
    html += currentVitalContentTemplates(data);
    html += tabularTableTemplates(result);

    $('#tab-2').html(html);
}

// 탭 3 렌더
export function patientTab3Render(result) {
    const {
        list,
        pageNumber,
        pageSize,
        totalCount
    } = result;

    let html = '';

    if (!list || list.length === 0) {
        html = errorText();
        $('#tab-3').html(html);
        return;
    }

    let data = { type: 'ecg', value: list[0].hr };
    html += currentVitalContentTemplates(data);
    html += selectBioSignalsGraphicalTrendDataListTemplates(result);

    $('#tab-3').html(html);
}

// 탭 4 렌더
export function patientTab4Render(result) {
    const {
        list,
        pageNumber,
        pageSize,
        totalCount
    } = result;

    let html = '';

    if (!list || list.length === 0) {
        html = errorText();
        $('#tab-4').html(html);
        return;
    }

    let data = { type: 'ecg', value: list[0].hr };
    html += currentVitalContentTemplates(data);
    html += selectBioSignalEventSimpleTemplates(result);

    $('#tab-4').html(html);
}

// 글로벌 로딩
export function patientGlobalPopupLoadRender(intervalTime) {
    var targetIntervalTag = '01';
    switch (intervalTime) {
        case 15:
            targetIntervalTag = '01';
            break;
        case 60:
            targetIntervalTag = '02';
            break;
        case 180:
            targetIntervalTag = '03';
            break;
        case 600:
            targetIntervalTag = '04';
            break;
        case 900:
            targetIntervalTag = '05';
            break;
        case 1800:
            targetIntervalTag = '06';
            break;
        case 3600:
            targetIntervalTag = '07';
            break;
        case 5400:
            targetIntervalTag = '08';
            break;
        case 7200:
            targetIntervalTag = '09';
            break;
        default:
            targetIntervalTag = '01';
            break;
    }
    $('#interval_time_' + targetIntervalTag).prop('checked', true);
}

// 레코딩 버튼 호출 후
export function patientAfterClickRecordingBtnRender(eventDateTime) {
    $('.pop > .pop_cont > .color').text(eventDateTime);
}
