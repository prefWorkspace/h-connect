'use strict';
const { Create_newWard } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/ward/renders/insertWardList.js'
    )
);
console.log('Create_newWard===');
console.log(Create_newWard);
const { updateWard } = await import(
    importVersion('/H-Connect/js/nurse/management/ward/actions/updateWard.js')
);
const { CONSTANT } = await import(
    importVersion('/H-Connect/js/nurse/management/ward/renders/constant.js')
);
const { deleteWard } = await import(
    importVersion('/H-Connect/js/nurse/management/ward/actions/deleteWard.js')
);
const { selectWardList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

//병동 조회
export async function selectWard() {
    const { wardList } = await selectWardList();
    console.log('wardList===');
    console.log(wardList);
    CONSTANT.wardList = wardList;
    Create_newWard(wardList);
    updateWard(); //병동 수정 이벤트
    deleteWard(); //병동 삭제 이벤트
}

selectWard();
