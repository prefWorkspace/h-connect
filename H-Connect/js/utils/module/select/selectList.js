'use strict';
import { commonRequest } from '../../controller/commonRequest.js';
import { serverController } from '../../controller/serverController.js';
import { localStorageController } from '../../controller/localStorageController.js';
import { CONSTANT_MEASURE } from '../../../nurse/management/measure/renders/constant.js';

//병동 병실 병상 조회하는 함수
const { userCode: requester, organization } = CONSTANT_MEASURE.userData;
export async function selectWardList(_get) {
    const params = _get || {};
    console.log(_get);
    const req = JSON.stringify({
        ...params,
        ...commonRequest(),
    });

    return await serverController.ajaxAwaitController(
        'API/Manager/SelectWard',
        'POST',
        req
    );
}
