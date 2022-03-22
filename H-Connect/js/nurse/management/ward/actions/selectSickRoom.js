'use strict';
import { serverController } from '../../../../utils/controller/serverController.js';
import { commonRequest } from '../../../../utils/controller/commonRequest.js';
import { insertRoomList } from '../renders/insertRoomList.js';

//병실 조회
export function selectSickRoom(_wardCode) {
    const req = JSON.stringify({
        wardCode: _wardCode,
        includeSickBed: true,
        ...commonRequest(),
    });

    serverController.ajaxAwaitController(
        'API/Manager/SelectSickRoom',
        'POST',
        req,
        (res) => {
            if (res.result) {
                const sickRoomList = res.sickRoomList;
                $('div').remove(
                    '.section.right.hospital_room .container .cont .container .ward_list'
                );

                insertRoomList(sickRoomList);
                // deleteSickRoom(_wardCode);
                // updateSickRoom(_wardCode);
            }
        },
        (err) => {
            console.log(err);
        }
    );
}
