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

export async function selectConsultView(consultId) {
    const obj = {
        ...commonRequest(),
        requester,
        organizationCode,
        userId,
        consultId,
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
