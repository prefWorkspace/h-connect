'use strict';
import { wardSelectBox } from '../templates/wardSelectBox.js';
// import { selectRoomList } from '../actions/selectMeasurementInfoList.js';
import { CONSTANT_MEASURE } from './constant.js?v=2022.03.25.12.01';
import { selectWardList } from '../../../../utils/module/select/selectList.js?v=2022.03.25.12.37';
import { selectSickRoomList } from '../../../../utils/module/select/selectList.js?v=2022.03.25.12.37';
import { sickRoomSelectBoxList } from './sickRoomSelectBoxList.js';
import { selectMeasurementInfoList } from '../actions/selectMeasurementInfoList.js';

const { wardList } = (await selectWardList()) || [];

async function wardOptionHandle(_target) {
    const wardCode = _target.data('wardcode');
    const title = _target.text();

    _target.parent().parent().toggleClass('active');
    $('.measure_status .selectBox2 .ward_label').text(title);

    //병실 다시 셋팅
    $(
        '.section.measure_status .search_select .selectBox2.s_select .room_label'
    ).text('병실선택');
    const { sickRoomList } = await selectSickRoomList(wardCode);
    CONSTANT_MEASURE.sickRoomList = sickRoomList;
    sickRoomSelectBoxList();
    selectMeasurementInfoList(wardCode);
}

export function wardSelectBoxList(wardList) {
    let htmlData = '<li class="optionItem ward_list">병동전체</li>';
    for (let i = 0; i < wardList.length; i++) {
        htmlData += wardSelectBox(wardList[i]);
    }
    $('.measure_status .selectBox2 .ward_option').html(htmlData);

    //병동 셀렉트 박스 활성화
    $('.section.measure_status .search_select .selectBox2.s_select .ward_label')
        .off()
        .on('click', function () {
            $(this).parent().toggleClass('active');
        });

    //병동 셀렉트 박스 옵션 선택 이벤트
    $(
        '.section.measure_status .search_select .selectBox2.s_select .optionList.ward_option .ward_list'
    ).on('click', function () {
        const _target = $(this);
        wardOptionHandle(_target);
    });
}

wardSelectBoxList(wardList);
