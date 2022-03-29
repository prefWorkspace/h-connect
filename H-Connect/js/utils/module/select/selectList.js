'use strict';

const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

const { CONSTANT_MEASURE } = await import(
    importVersion('/H-Connect/js/nurse/management/measure/renders/constant.js')
);

const { session_renew } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

//병동 병실 병상 조회하는 함수
const { userCode: requester, organization } = CONSTANT_MEASURE.userData;
export async function selectWardList(
    includeSickBed = true,
    includeSickRoom = true
) {
    const req = JSON.stringify({
        includeSickBed,
        includeSickRoom,
        ...commonRequest(),
    });

    return await serverController.ajaxAwaitController(
        'API/Manager/SelectWard',
        'POST',
        req,
        (res) => {
            if (res.result) {
            } else {
                session_renew(res);
            }
        }
    );
}

//_get 특정 병도을 검색하고 싶으면 wardCode 넣기
export async function selectSickRoomList(
    wardCode = null,
    includeSickBed = true
) {
    const req = JSON.stringify({
        requester,
        organization,
        wardCode,
        includeSickBed,
        ...commonRequest(),
    });

    return await serverController.ajaxAwaitController(
        'API/Manager/SelectSickRoom',
        'POST',
        req,
        (res) => {
            if (res.result) {
            } else {
                session_renew(res);
            }
        }
    );
}

//_get 특정 병동, 병실을 검색하고 싶으면 wardCode, sickRoomCode 넣기
export async function selectSickBedList(wardCode = null, sickRoomCode = null) {
    const req = JSON.stringify({
        requester,
        organization,
        wardCode,
        sickRoomCode,
        ...commonRequest(),
    });

    return await serverController.ajaxAwaitController(
        'API/Manager/SelectSickRoom',
        'POST',
        req,
        (res) => {
            if (res.result) {
            } else {
                session_renew(res);
            }
        }
    );
}
