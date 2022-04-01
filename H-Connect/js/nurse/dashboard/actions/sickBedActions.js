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

export const updateSickBed = async (sickBed) => {
    const {
        wardCode,
        sickRoomCode,
        sickBedCode,
        sickRoom,
        nickname,
        orderNumber,
        deactivate,
        displayCode,
    } = sickBed;
    const req = JSON.stringify({
        requester,
        organization,
        wardCode,
        sickRoomCode,
        sickBedCode,
        sickRoom,
        nickname,
        orderNumber,
        deactivate,
        displayCode,
        ...commonRequest(),
    });
    console.log(
        requester,
        organization,
        wardCode,
        sickRoomCode,
        sickBedCode,
        sickRoom,
        nickname,
        orderNumber,
        deactivate,
        displayCode
    );

    return await serverController.ajaxAwaitController(
        'API/Manager/UpdateSickBed',
        'POST',
        req,
        (res) => {
            if (res.result) {
                if (displayCode) console.log('수정 완료!');
                else console.log('삭제 요청');
            } else {
                session_renew(res);
            }
        }
    );
};
