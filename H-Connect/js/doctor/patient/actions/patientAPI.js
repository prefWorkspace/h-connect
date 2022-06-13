'use strict';

const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const userData = localStorageController.getLocalS('userData');
const {
    userCode: requester,
    organizationCode,
    id: userId,
} = JSON.parse(userData);

// 프로젝트 전역 변수 값 조회
export async function selectGlobalSetting() {
    
    const obj = {
        requester,
        organizationCode,
    };

    return serverController.ajaxAwaitController(
        'API/Global/SelectGlobalSetting',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}

// 프로젝트 전역 변수 값 수정
export async function updateGlobalSetting(bioSignalsTrendSecond) {
    
    const obj = {
        requester,
        organizationCode,
        bioSignalsTrendSecond,
    };

    return serverController.ajaxAwaitController(
        'API/Global/UpdateGlobalSetting',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}

// 생체신호 알림 수동 입력
export async function insertBioSignalEvent(_data) {
    
    const obj = {
        requester,
        userId,
        organizationCode,
        measurementCode: _data.measurementCode,
        eventType: _data.eventType,
        value: _data.value,
        priority: _data.priority,
        eventDateTime: _data.eventDateTime,
        ecgJsonInclude: _data.ecgJsonInclude,
        ecgJson: _data.ecgJson,
    };

    return serverController.ajaxAwaitController(
        'API/BioSignal/InsertBioSignalEvent',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}

// 모니터링
// 생체신호 트렌드 데이터 조회
export async function selectBioSignalsTrendDataPage(_data) {
    
    const obj = {
        requester,
        userId,
        organizationCode,
        measurementCode: _data.measurementCode,
        startDateTime: _data.startDateTime,
        endDateTime: _data.endDateTime,
        pageNumber: _data.pageNumber,
        count: _data.count,
    };

    return serverController.ajaxAwaitController(
        'API/BioSignal/SelectBioSignalsTrendDataPage',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}

// 생체신호 트렌드 데이터와 생체 신호 알림 데이터 조회
export async function selectBioSignalsGraphicalTrendDataList(_data) {
    
    const obj = {
        requester,
        userId,
        organizationCode,
        measurementCode: _data.measurementCode,
        startDateTime: _data.startDateTime,
        endDateTime: _data.endDateTime,
    };

    return serverController.ajaxAwaitController(
        'API/BioSignal/SelectBioSignalsGraphicalTrendDataList',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}

// 생체 신호 알림 페이지 조회
export async function selectBioSignalEventSimplePage(_data) {
    
    const obj = {
        requester,
        userId,
        organizationCode,
        measurementCode: _data.measurementCode,
        pageNumber: _data.pageNumber,
        count: _data.count,
    };

    return serverController.ajaxAwaitController(
        'API/BioSignal/SelectBioSignalEventSimplePage',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}