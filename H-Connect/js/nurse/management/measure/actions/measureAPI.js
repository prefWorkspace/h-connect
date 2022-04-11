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

const { request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const userData = localStorageController.getLocalS('userData');
const { userCode: requester, organizationCode } = JSON.parse(userData);

//모든 측정 정보가져오기
export async function selectMeasurementInfoList(
    wardCode = null,
    sickRoomCode = null,
    sickBedCode = null
) {
    const req = JSON.stringify({
        ...commonRequest(),
        wardCode,
        sickRoomCode,
        sickBedCode,
        measurementType: 'BM',
        measurementStatusList: null,
        search: null,
    });

    return serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoList',
        'POST',
        req,
        (res) => {
            if (res.result) {
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

//측정 추가
export async function insertMeasurementInfo(codeObj, patientData) {
    const obj = {
        ...commonRequest(),
        ...codeObj,
        ...patientData,
        requester,
        organizationCode,
        orderNumber: 1,
    };
    //birthday 값이 좀 상이함. 이거는 API 업데이트되는데로 수정

    return serverController.ajaxAwaitController(
        'API/Measurement/InsertMeasurementInfo',
        'POST',
        JSON.stringify(obj),
        (res) => {
            console.log(res);
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}

//측정 상태 종료
export async function recodingEndMeasurementInfo(measurementCode, route) {
    const obj = {
        ...commonRequest(),
        requester,
        measurementCode,
        measurementStatus: 3,
        dateTime: request_Date_Data(),
    };
    return serverController.ajaxMeasurementController(
        'API/Measurement/UpdateMeasurementInfoStatus',
        route,
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

// 측정 정보 수정
export async function updateMeasurementInfo(codeObj, patientData, route) {
    const obj = {
        ...commonRequest(),
        ...codeObj,
        ...patientData,
    };

    return serverController.ajaxMeasurementController(
        'API/Measurement/UpdateMeasurementInfo',
        route,
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

//측정 추가 및 수정 시, 장치 조회
export async function selectDeviceRegisterUnused(search) {
    const obj = {
        ...commonRequest(),
        requester,
        organizationCode,
        search,
        deviceType: 0,
        pageNumber: 1,
        count: 1000,
    };

    return serverController.ajaxAwaitController(
        'API/Device/SelectDeviceRegisterUnusedPage',
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

// 측정 코드 삭제
export async function deleteMeasurementInfo(measureMentCode, route) {
    const obj = {
        ...commonRequest(),
        requester,
        measureMentCode,
    };
    return serverController.ajaxMeasurementController(
        'API/Measurement/DeleteMeasurementInfo',
        route,
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
