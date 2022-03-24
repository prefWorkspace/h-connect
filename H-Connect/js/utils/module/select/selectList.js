'use strict';
import { commonRequest } from '../../controller/commonRequest.js';
import { serverController } from '../../controller/serverController.js';
import { localStorageController } from '../../controller/localStorageController.js';
import { CONSTANT_MEASURE } from '../../../nurse/management/measure/renders/constant.js';

//병동 병실 병상 조회하는 함수
const { userCode: requester, organization } = CONSTANT_MEASURE.userData;
export async function selectWardList(
    includeSickBed = true,
    includeSickRoom = true
) {
    const req = JSON.stringify({
        includeSickBed,
        includeSickBed,
        ...commonRequest(),
    });

    return await serverController.ajaxAwaitController(
        'API/Manager/SelectWard',
        'POST',
        req
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
        req
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
        req
    );
}
