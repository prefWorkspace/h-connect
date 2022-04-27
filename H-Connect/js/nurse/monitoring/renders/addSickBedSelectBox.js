'use strict';

const { selectWardList, selectSickRoomList, selectSickBedList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

const { wardListItem, sickRoomListItem, sickBedListItem } = await import(
    importVersion(
        '/H-Connect/js/nurse/monitoring/templates/selectBoxTemplate.js'
    )
);

// const { wardSelectBoxHandle, sickRoomSelectBoxHandle } = await import(
//     importVersion('/H-Connect/js/nurse/monitoring/actions/monitoringHandle.js')
// );

export async function selectBoxSickBed(wardCode, sickRoomCode) {
    let html = '';

    const { sickBedList } = await selectSickBedList(wardCode, sickRoomCode);
    if (!sickBedList) {
        return;
    }
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
    let spareBed = 0;
    const path = window.location.pathname;
    const { wardList } = await selectWardList();
    for (let i = 0; i < wardList.length; i++) {
        html += wardListItem(wardList[i]);
        spareBed += wardList[i].wardSpareBedCount;
    }

    $('.pop.new_room_pop .new_room .selectBox2 .ward_option2').html(html);
    if (path.indexOf('monitoring_room') === -1) {
        $('.pop.new_room_pop .new_room #spare_Bed').text(spareBed);
    }
}
