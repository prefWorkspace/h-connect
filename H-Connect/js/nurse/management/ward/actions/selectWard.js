'use strict';
import { Create_newWard } from '../renders/insertwardList.js?v=2022.03.25.12.01?v=2022.03.25.12.01';
import { updateWard } from './updateWard.js?v=2022.03.25.12.01';
import { CONSTANT } from '../renders/constant.js?v=2022.03.25.12.01';
import { deleteWard } from './deleteWard.js?v=2022.03.25.12.01';
import { selectWardList } from '../../../../utils/module/select/selectList.js?v=2022.03.25.12.37?v=2022.03.25.12.01';

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
