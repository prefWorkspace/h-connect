'use strict';

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const { selectGlobalSetting, updateGlobalSetting, insertBioSignalEvent, selectBioSignalsTrendDataPage, selectBioSignalsGraphicalTrendDataList, selectBioSignalEventSimplePage } = await import(
    importVersion(
        '/H-Connect/js/doctor/patient/actions/patientAPI.js'
    )
);

const { patientTab1Render, patientTab2Render, patientTab3Render, patientTab4Render, 
    patientGlobalPopupLoadRender, patientAfterClickRecordingBtnRender } = await import(
    importVersion(
        '/H-Connect/js/doctor/patient/renders/patientRender.js'
    )
);

let pageNumber = 1;
let pageSize = 10;

async function loadTab1(){
    const today = moment(new Date()).format('YYYY-MM-DD 23:59:59');

    const data = {
        measurementCode: null,
        startDateTime: '2021-11-16 00:00:00',
        endDateTime: today,
        pageNumber: pageNumber,
        count: pageSize,
    };

    const { result: bioResult, bioSignalsTrendDataList: list } = await selectBioSignalsTrendDataPage(data);
    if (!bioResult) {
        return;
    }
    patientTab1Render(list);
}

async function loadTab2(){
    const today = moment(new Date()).format('YYYY-MM-DD 23:59:59');

    const data = {
        measurementCode: null,
        startDateTime: '2021-11-16 00:00:00',
        endDateTime: today,
        pageNumber: pageNumber,
        count: pageSize,
    };

    const bioResult = await selectBioSignalsTrendDataPage(data);
    if (!bioResult) {
        return;
    }
    pageNumber = 1;

    patientTab2Render({
        bioSignalsTrendDataList: bioResult.bioSignalsTrendDataList,
        pageNumber: pageNumber,
        pageSize: pageSize,
        totalCount: bioResult.totalCount,
    });
}

async function loadTab3(){
    const today = moment(new Date()).format('YYYY-MM-DD 23:59:59');

    const data = {
        measurementCode: null,
        startDateTime: '2021-11-16 00:00:00',
        endDateTime: today,
        pageNumber: pageNumber,
        count: pageSize,
    };

    const bioResult = await selectBioSignalsGraphicalTrendDataList(data);
    if (!bioResult) {
        return;
    }
    pageNumber = 1;
    
    patientTab3Render({
        list: bioResult.bioSignalsGraphicalTrendDataList,
        pageNumber: pageNumber,
        pageSize: pageSize,
        totalCount: bioResult.totalCount,
    });
}

async function loadTab4(){
    const today = moment(new Date()).format('YYYY-MM-DD 23:59:59');

    const data = {
        measurementCode: null,
        startDateTime: '2021-11-16 00:00:00',
        endDateTime: today,
        pageNumber: pageNumber,
        count: pageSize,
    };

    const bioResult = await selectBioSignalEventSimplePage(data);
    if (!bioResult) {
        return;
    }
    pageNumber = 1;
    
    patientTab4Render({
        list: bioResult.bioSignalEventSimpleList,
        pageNumber: pageNumber,
        pageSize: pageSize,
        totalCount: bioResult.totalCount,
    });
}

// patient 페이지 init 함수
async function init() {
    // 글로벌 세팅값 조회
    const { result: globalResult, globalVariableSetting: setting } = await selectGlobalSetting();

    if (!globalResult) {
        // 
    }
    // 글로벌 세팅값 렌더링
    patientGlobalPopupLoadRender(setting?.bioSignalsTrendSecond);

    // 탭 1에 대한 로딩
    loadTab1();

    // 탭별 액션 추가
    $('.tabs > .tab-link[data-tab="tab-1"]').on('click', loadTab1);
    $('.tabs > .tab-link[data-tab="tab-2"]').on('click', loadTab2);
    $('.tabs > .tab-link[data-tab="tab-3"]').on('click', loadTab3);
    $('.tabs > .tab-link[data-tab="tab-4"]').on('click', loadTab4);

    // 글로벌 세팅값 변경시 액션 추가
    $('.pop_cont > .btn_list > .btn_check').on('click', async function () {
        var intervalTag = $('input[name=interval]:checked').attr('id');
        var interval = 15;
        switch(intervalTag) {
            case 'interval_time_01': interval = 15; break;
            case 'interval_time_02': interval = 60; break;
            case 'interval_time_03': interval = 180; break;
            case 'interval_time_04': interval = 600; break;
            case 'interval_time_05': interval = 900; break;
            case 'interval_time_06': interval = 1800; break;
            case 'interval_time_07': interval = 3600; break;
            case 'interval_time_08': interval = 5400; break;
            case 'interval_time_09': interval = 7200; break;
            default: interval = 15; break;
        }
        await updateGlobalSetting(interval);
        $('.pop .overlay').fadeOut();
    });

    // 레코딩 버튼 선택시 액션 추가
    $('.container > .btn_group > .btn_list > .btn_re').on('click', async function () {
        const eventData = {
            measurementCode: null,
            eventType: 10,
            eventDateTime: null,
            ecgJsonInclude: 0,
            ecgJson: null,
        };
        await insertBioSignalEvent(eventData);
    });
}

await init();
