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

const { session_renew } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

//병동 병실 병상 조회하는 함수
const { userCode: requester, organizationCode: organization } = JSON.parse(
    localStorageController.getLocalS('userData')
);

export const updateSickBed = async (_sickBed) => {
    const {
        wardCode,
        sickRoomCode,
        sickBedCode,
        sickRoom,
        sickBed,
        nickname,
        orderNumber,
        deactivate,
        displayCode,
        monitoringDeactivate,
    } = _sickBed;

    const req = JSON.stringify({
        requester,
        organization,
        wardCode,
        sickRoomCode,
        sickBedCode,
        sickBed,
        sickRoom,
        nickname,
        orderNumber,
        deactivate,
        displayCode,
        monitoringDeactivate,
        ...commonRequest(),
    });

    return await serverController.ajaxAwaitController(
        'API/Manager/UpdateSickBed',
        'POST',
        req,
        (res) => {
            if (res.result) {
            } else {
                session_renew(res);
            }
        }
    );
};

export const updateSickBedDisplayCode = async (sickBedDisplayCodeList) => {
    const req = JSON.stringify({
        requester,
        organization,
        sickBedDisplayCodeList,
    });
    return await serverController.ajaxAwaitController(
        'API/Manager/UpdateSickBedDisplayCode',
        'POST',
        req,
        (res) => {
            if (res.result) {
            } else {
                session_renew(res);
            }
        }
    );
};
