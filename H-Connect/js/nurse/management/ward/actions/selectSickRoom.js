'use strict';
import { insertRoomList } from '../renders/insertRoomList.js?v=2022.03.25.12.01';
import { deleteSickRoom } from './deleteSickRoom.js?v=2022.03.25.12.01';
import { updateSickRoom } from './updateSickRoom.js?v=2022.03.25.12.01';
import { selectSickRoomList } from '../../../../utils/module/select/selectList.js?v=2022.03.25.12.37';

//병실 조회
export async function selectSickRoom(_wardCode) {
    const { sickRoomList } = await selectSickRoomList(_wardCode);
    $('div').remove(
        '.section.right.hospital_room .container .cont .container .ward_list'
    );

    insertRoomList(sickRoomList);
    deleteSickRoom(_wardCode);
    updateSickRoom(_wardCode);
}
