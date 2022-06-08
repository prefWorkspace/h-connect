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

export async function insertConsultReply(consultId, scheduleInfo) {
    const obj = {
        ...commonRequest(),
        requester,
        userId,
        consultId,
        organizationCode,
        scheduleInfo,
    };

    return serverController.ajaxAwaitController(
        'API/Doctor/InsertConsultReply',
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

export async function updateConsultConfirm(consultId, orderNo) {
    const obj = {
        ...commonRequest(),
        requester,
        userId,
        consultId,
        organizationCode,
        orderNo,
    };

    return serverController.ajaxAwaitController(
        'API/Doctor/UpdateConsultConfirm',
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
