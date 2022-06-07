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

// 실시간협진,소견협진,응급협진 상세 API
export async function selectRealTimeAndOpinionAndEmergencyConsultView(
    _consultId
) {
    const obj = {
        ...commonRequest(),
        consultId: _consultId,
        userId,
        requester,
        organizationCode,
    };
    return serverController.ajaxAwaitController(
        'API/Doctor/SelectRealTimeAndOpinionAndEmergencyConsultView',
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

// 협진 일정 요청 상세 조회 API
export async function selectConsultView(_consultId) {
    const obj = {
        ...commonRequest(),
        consultId: _consultId,
        userId,
        requester,
        organizationCode,
    };
    return serverController.ajaxAwaitController(
        'API/Doctor/SelectConsultView',
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

// 협진 일정 요청 내가 보냄 상세조회 API
export async function selectConsultConfirmView(_consultId) {
    const obj = {
        ...commonRequest(),
        consultId: _consultId,
        userId,
        requester,
        organizationCode,
    };
    return serverController.ajaxAwaitController(
        'API/Doctor/SelectConsultConfirmView',
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

// 협진 요청 상태 삭제상태로 변경 API
export async function updateStatusDeleteConsult(_consultId) {
    const obj = {
        ...commonRequest(),
        consultId: _consultId,
        userId,
    };
    return serverController.ajaxAwaitController(
        'API/Doctor/UpdateStatusDeleteConsult',
        'POST',
        JSON.stringify(obj),
        (res) => {},
        (err) => console.log(err)
    );
}
