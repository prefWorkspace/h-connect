'use strict';

const { insertRoomList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/ward/renders/insertRoomList.js'
    )
);

const { updateSickRoom } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/ward/actions/updateSickRoom.js'
    )
);
const { deleteSickRoom } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/ward/actions/deleteSickRoom.js'
    )
);
const { selectSickRoomList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

//병실 조회
export async function selectSickRoom(_wardCode) {
    const { sickRoomList } = await selectSickRoomList(_wardCode);
    $('div').remove(
        '.section.right.hospital_room .container .cont .container .ward_list'
    );

    await insertRoomList(sickRoomList);
    await deleteSickRoom(_wardCode);
    await updateSickRoom(_wardCode);
}
