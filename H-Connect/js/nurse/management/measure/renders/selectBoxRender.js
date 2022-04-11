'use strict';

const { selectWardList, selectSickRoomList, selectSickBedList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

const { wardItem, sicRoomItem, nWardItem, nSicRoomItem, nSickBedItem } =
    await import(
        importVersion(
            '/H-Connect/js/nurse/management/measure/templates/selectBoxItem.js'
        )
    );

const { wardList } = await selectWardList();

//측정현황 ========================

//병실 셀렉트 박스
export async function sickRoomListSelectHandle(wardCode) {
    let html = '';
    if (!wardCode) {
        html = `<div></div>`;
    } else {
        const { sickRoomList } = await selectSickRoomList(wardCode);
        for (let i = 0; i < sickRoomList.length; i++) {
            html += sicRoomItem(sickRoomList[i]);
        }
    }

    $('li').remove('.section .selectBox2 .room_option .room_list.option');
    $('.measure_status .selectBox2 .room_option .room_list').after(html);
    $('.measure_status .selectBox2 .mroom_option').html(html);
}

//병동 셀렉트 박스
export async function wardListSelectHandle() {
    let html = '';

    for (let i = 0; i < wardList.length; i++) {
        html += wardItem(wardList[i]);
    }

    $('.section .selectBox2 .ward_option .ward_list').after(html);
    $('.section .selectBox2 .mward_option').html(html);
}

// 신규병상등록 팝업 ==============================

export async function newSickBedPop_wardListSelectHandle() {
    let html = '';
    let sparedCount = 0;

    for (let i = 0; i < wardList.length; i++) {
        html += nWardItem(wardList[i]);
        sparedCount += wardList[i].wardSpareBedCount;
    }

    $('.pop.new_room_pop .new_room .selectBox2 .ward_option2').html(html);
    $('.pop.new_room_pop .new_room .cont p span').text(sparedCount);
}

export async function newSickBedPop_sickroomListSelectHandle(wardCode) {
    let html = '';
    const { sickRoomList } = await selectSickRoomList(wardCode);
    for (let i = 0; i < sickRoomList.length; i++) {
        html += nSicRoomItem(sickRoomList[i]);
    }

    $('.pop.new_room_pop .new_room .selectBox2 .room_option2').html(html);
}

export async function newSickBedPop_sickBedListSelectHandle(
    wardCode,
    sickRoomCode
) {
    let html = '';
    const { sickBedList } = await selectSickBedList(wardCode, sickRoomCode);
    for (let i = 0; i < sickBedList.length; i++) {
        html += nSickBedItem(sickBedList[i]);
    }

    $('.pop.new_room_pop .new_room .selectBox2 .bed_option').html(html);
}

//병상정보 수정 셀렉트 박스 ===================

//병실 셀렉트 박스
export async function updateWard_sickroomListSelectHandle(wardCode) {
    let html = '';
    const { sickRoomList } = await selectSickRoomList(wardCode);
    for (let i = 0; i < sickRoomList.length; i++) {
        html += nSicRoomItem(sickRoomList[i]);
    }

    $('.section.modifi_hospital .selectBox2 .mroom_option').html(html);
}

//병상 셀렉트 박스
export async function updateWard_sickBedListSelectHandle(
    wardCode,
    sickRoomCode
) {
    let html = '';
    const { sickBedList } = await selectSickBedList(wardCode, sickRoomCode);
    for (let i = 0; i < sickBedList.length; i++) {
        html += nSickBedItem(sickBedList[i]);
    }

    $('.section.modifi_hospital .selectBox2 .mbed_option').html(html);
}
