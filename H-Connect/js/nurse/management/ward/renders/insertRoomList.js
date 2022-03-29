'use strict';
import { sickRoomList } from '../templates/sickRoomList.js?v=2022.03.25.12.01';

export function insertRoomList(_sickRoomList) {
    let data = '';
    if (!_sickRoomList) {
        return;
    }
    for (let i = 0; i < _sickRoomList.length; i++) {
        data += sickRoomList(_sickRoomList[i]);
    }

    $('.section.right.hospital_room .container .cont .container').html(data);
    $(
        '.section.right.hospital_room .container .cont .container .ward_list'
    ).fadeIn();
}
