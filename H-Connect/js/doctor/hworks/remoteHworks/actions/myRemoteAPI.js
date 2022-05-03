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
const {
    userCode: requester,
    organizationCode,
    id: userId,
} = JSON.parse(userData);

// 협진 일정 요청 알림 목록 LIst
export async function selectConsultAlarmsList() {
    const today = new Date();
    const endDatetime = moment(today.getTime())
        .add('7', 'd')
        .format('YYYY-MM-DD 23:59:59');
    const obj = {
        requester,
        userId,
        organizationCode,
        startDatetime: moment(today).format('YYYY-MM-DD 00:00:00'),
        endDatetime,
    };

    return serverController.ajaxAwaitController(
        'API/Doctor/SelectConsultAlarmList',
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
