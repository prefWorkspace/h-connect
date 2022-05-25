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

export async function selectMyScheduleList(
    startDatetime = null,
    endDatetime = null
) {
    const today = new Date();

    const obj = {
        requester,
        userId,
        organizationCode,
        startDatetime: startDatetime
            ? startDatetime
            : moment(today).format('YYYY-MM-DD 00:00:00'),
        endDatetime: endDatetime
            ? endDatetime
            : moment(today).add('27', 'd').format('YYYY-MM-DD 23:59:59'),
        ...commonRequest(),
    };

    return serverController.ajaxAwaitController(
        'API/Doctor/SelectMyScheduleList',
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
