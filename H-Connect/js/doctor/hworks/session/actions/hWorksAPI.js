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

// 스케쥴 카운트 API
export async function selectScheduleCount() {
    const today = new Date();
    const obj = {
        ...commonRequest(),
        userId,
        endDatetime: moment(today).format('YYYY-MM-DD 23:59:59'),
        startDatetime: moment(today).format('YYYY-MM-DD 00:00:00'),
    };

    return serverController.ajaxAwaitController(
        'API/Doctor/SelectScheduleCount',
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

// 세션 리스트 목록 조회 API
export async function selectRemoteSessionList(counsultChannel = null) {
    const obj = {
        ...commonRequest(),
        userId,
        endDatetime: request_Date_Data(),
        startDatetime: '2022-01-01 00:00:00',
        counsultChannel,
    };

    return serverController.ajaxAwaitController(
        'API/Doctor/SelectRemoteSessionList',
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

//달력 스케쥴 API
export async function selectMyScheduleList(afterWeek = 2) {
    const day = new Date();
    const endDatetime = moment(day.getTime())
        .add(`${afterWeek === 2 ? '14' : '28'}`, 'd')
        .format('YYYY-MM-DD 23:59:59');

    const obj = {
        ...commonRequest(),
        userId,
        endDatetime,
        startDatetime: request_Date_Data(),
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
        (err) => {
            console.log(err);
        }
    );
}

// 선별진료
export async function selectScreeniungClinicView(reservationCode, patientCode) {
    const obj = {
        requester,
        userId,
        organizationCode,
        reservationCode,
        patientCode,
        ...commonRequest(),
    };

    return serverController.ajaxAwaitController(
        'API/Doctor/SelectScreeningClinicView',
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
