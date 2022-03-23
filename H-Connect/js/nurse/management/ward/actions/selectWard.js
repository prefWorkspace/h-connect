'use strict';
import { localStorageController } from '../../../../utils/controller/localStorageController.js';
import { commonRequest } from '../../../../utils/controller/commonRequest.js';
import { serverController } from '../../../../utils/controller/serverController.js';
import { session_renew } from '../../../../utils/controller/serverController.js';
import { Create_newWard } from '../renders/insertWardList.js';
import { updateWard } from './updateWard.js';
import { CONSTANT } from '../renders/constant.js';
import { deleteWard } from './deleteWard.js';

//병동 조회
export function selectWard() {
    const _req = JSON.stringify({
        includeSickRoom: true,
        includeSickBed: true,
        ...commonRequest(),
    });

    serverController.ajaxAwaitController(
        'API/Manager/SelectWard',
        'POST',
        _req,
        (res) => {
            console.log(res);
            if (res.result) {
                const wardList = [...res.wardList];
                CONSTANT.wardList = wardList;
                Create_newWard(wardList);
                updateWard(); //병동 수정 이벤트
                deleteWard(); //병동 삭제 이벤트
                // _wardclickActive(); //병동 클릭시 css 이벤트
            } else {
                session_renew(res);
            }
        }
    );
}

selectWard();
