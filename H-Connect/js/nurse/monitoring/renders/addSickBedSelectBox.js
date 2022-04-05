'use strict';

const { selectWardList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

const { selectSickRoomList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

const { selectSickBedList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

const { wardListItem, sickRoomListItem, sickBedListItem } = await import(
    importVersion(
        '/H-Connect/js/nurse/monitoring/templates/selectBoxTemplate.js'
    )
);

export async function selectBoxSickBed(wardCode, sickRoomCode) {
    let html = '';
    const { sickBedList } = await selectSickBedList(wardCode, sickRoomCode);
    for (let i = 0; i < sickBedList.length; i++) {
        html += sickBedListItem(sickBedList[i]);
    }

    $('.pop.new_room_pop .new_room .selectBox2 .bed_option').html(html);
}

export async function selectBoxSickRoom(wardCode) {
    let html = '';
    const { sickRoomList } = await selectSickRoomList(wardCode);
    for (let i = 0; i < sickRoomList.length; i++) {
        html += sickRoomListItem(sickRoomList[i]);
    }

    $('.pop.new_room_pop .new_room .selectBox2 .room_option2').html(html);
}

export async function selectBoxWard() {
    let html = '';
    const { wardList } = await selectWardList();
    for (let i = 0; i < wardList.length; i++) {
        html += wardListItem(wardList[i]);
    }

    $('.pop.new_room_pop .new_room .selectBox2 .ward_option2').html(html);
}
