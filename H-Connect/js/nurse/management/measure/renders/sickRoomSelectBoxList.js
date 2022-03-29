'use strict';
import { CONSTANT_MEASURE } from './constant.js?v=2022.03.25.12.01';
import { sickRoomSelectBox } from '../templates/sickRoomSelectBox.js';
import { selectMeasurementInfoList } from '../actions/selectMeasurementInfoList.js';

async function sickRoomOptionHandle(_target) {
    const wardCode = _target.data('wardcode');
    const sickRoomCode = _target.data('sickroomcode');
    const title = _target.text();
    $('.measure_status .selectBox2 .room_label').text(title);
    _target.parent().parent().toggleClass('active');
    selectMeasurementInfoList(wardCode, sickRoomCode);
}

export function sickRoomSelectBoxList() {
    const sickRoomList = CONSTANT_MEASURE.sickRoomList
        ? [...CONSTANT_MEASURE.sickRoomList]
        : [];

    let htmlData = '<li class="optionItem room_list">병실전체</li>';
    for (let i = 0; i < sickRoomList.length; i++) {
        htmlData += sickRoomSelectBox(sickRoomList[i]);
    }
    //병실 셀렉트박스  병동에 맞는 새로운 리스트 정렬
    $('.measure_status .selectBox2 .room_option').html(htmlData);

    //병실 셀렉트 박스 이벤트
    $('.section.measure_status .search_select .selectBox2.s_select .room_label')
        .off()
        .on('click', function () {
            $(this).parent().toggleClass('active');
        });

    //병실 셀렉트 박스 옵션 선택 이벤트
    $(
        '.section.measure_status .search_select .selectBox2.s_select .optionList.room_option .room_list'
    ).on('click', function () {
        const _target = $(this);
        sickRoomOptionHandle(_target);
    });
}
