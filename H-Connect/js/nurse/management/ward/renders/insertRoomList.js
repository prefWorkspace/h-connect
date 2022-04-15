'use strict';
const { sickRoomList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/ward/templates/sickRoomList.js'
    )
);

export function insertRoomList(_sickRoomList) {
    let data = '';
    if (!_sickRoomList) {
        data += `<p style="text-align: center; color: #444444">조회된 데이터가 없습니다.</p>`;
    } else {
        for (let i = 0; i < _sickRoomList.length; i++) {
            data += sickRoomList(_sickRoomList[i]);
        }
    }

    $('.section.right.hospital_room .container .cont .container').html(data);
    $(
        '.section.right.hospital_room .container .cont .container .ward_list'
    ).fadeIn();
}
