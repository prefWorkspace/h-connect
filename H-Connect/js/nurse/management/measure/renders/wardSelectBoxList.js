'use strict';
import { wardSelectBox } from '../templates/wardSelectBox.js';
import { selectRoomList } from '../actions/selectMeasurementInfoList.js';
import { CONSTANT_MEASURE } from './constant.js';
import { sickRoomSelectBoxList } from './sickRoomSelectBoxList.js';

function wardOptionHandle(_target) {
    const wardCode = _target.data('wardcode');
    const title = _target.text();
    $('.measure_status .selectBox2 .ward_label').text(title);
    _target.parent().parent().toggleClass('active');
    selectRoomList(wardCode);
}

export function wardSelectBoxList(wardList) {
    let htmlData = '';
    for (let i = 0; i < wardList.length; i++) {
        htmlData += wardSelectBox(wardList[i]);
    }
    $('.measure_status .selectBox2 .optionList').html(htmlData);

    //병동 셀렉트 박스 활성화
    $(
        '.section.measure_status .search_select .selectBox2.s_select .ward_label'
    ).on('click', function () {
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
