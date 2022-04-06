'use strict';

const { selectWardList, selectSickRoomList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

const { wardItem, sicRoomItem } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/templates/selectBoxItem.js'
    )
);

const { selecBoxWard } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureHandle.js'
    )
);

const { wardList } = await selectWardList();

async function sickRoomListSelectHandle() {
    let html = '';

    for (let i = 0; i < wardList.length; i++) {
        html += sicRoomItem(wardList[i]);
    }

    $('.section .selectBox2 .room_option .room_list').after(html);
    $('.section .selectBox2 .mroom_option').html(html);
}

function wardListSelectHandle() {
    let html = '';

    for (let i = 0; i < wardList.length; i++) {
        html += wardItem(wardList[i]);
    }

    $('.section .selectBox2 .ward_option .ward_list').after(html);
    $('.section .selectBox2 .mward_option').html(html);
}

wardListSelectHandle();
