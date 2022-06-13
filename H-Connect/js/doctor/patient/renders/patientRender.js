'use strict';

const { updateGlobalSetting } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/patient/actions/patientAPI.js'
        )
    );

const { currentVitalContentTemplates, tabularTableTemplates, selectBioSignalsGraphicalTrendDataListTemplates, selectBioSignalEventSimpleTemplates } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/patient/templates/patientTemplates.js'
        )
    );

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

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
        totalCount,
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
        totalCount,
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
        totalCount,
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
    switch(intervalTime) {
        case 15: targetIntervalTag = '01'; break;
        case 60: targetIntervalTag = '02'; break;
        case 180: targetIntervalTag = '03'; break;
        case 600: targetIntervalTag = '04'; break;
        case 900: targetIntervalTag = '05'; break;
        case 1800: targetIntervalTag = '06'; break;
        case 3600: targetIntervalTag = '07'; break;
        case 5400: targetIntervalTag = '08'; break;
        case 7200: targetIntervalTag = '09'; break;
        default: targetIntervalTag = '01'; break;
    }
    $('#interval_time_' + targetIntervalTag).prop('checked', true);
}

// 레코딩 버튼 호출 후
export function patientAfterClickRecordingBtnRender(eventDateTime) {
    $('.pop > .pop_cont > .color').text(eventDateTime);
}