'use strict';
const { sickRoomList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/ward/templates/sickRoomList.js'
    )
);

export function insertRoomList(_sickRoomList) {
    let data = '';
    if (!_sickRoomList) {
        data += `<p style="text-align: center; color: #aaa">조회된 데이터가 없습니다.</p>`;
    } else {
        for (let i = 0; i < _sickRoomList.length; i++) {
            data += sickRoomList(_sickRoomList[i]);
        }
    }
    console.log('data====');
    console.log(data);

    $('.section.right.hospital_room .container .cont .container').html(data);
    console.log('parent');
    console.log($('.hospital_room .container .cont .container'));
    $(
        '.section.right.hospital_room .container .cont .container .ward_list'
    ).fadeIn();
}
