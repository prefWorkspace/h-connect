'use strict';
import { measureList } from '../templates/measurList.js';

//측정 관리 => 측정 현황 셀렉트 박스
function Create_ward_list_measure(wardList) {
    let ward_list_html = ``;
    let sickRoom_list_html = ``;

    for (let i = 0; i < wardList.length; i++) {
        ward_list_html += `
            <li class="optionItem ward_list" data-index="${i}" data-wardcode="${wardList[i].wardCode}">${wardList[i].ward}</li>
        `;
    }

    //측정 현황 병동 선택 셀렉 박스 대입
    $(
        '.section.measure_status .search_select .selectBox2.s_select .optionList.ward_option'
    ).html(ward_list_html);

    //측정 현황 병실 선택 셀렉 박스 대입
    $(
        '.section.measure_status .search_select .selectBox2.s_select .optionList.room_option .optionItem.room_list'
    ).after(sickRoom_list_html);
}

export function createMeasureList(data_List) {
    if (typeof data_List !== 'object' || !data_List) return;

    let data = '';
    for (let i = 0; i < data_List.length; i++) {
        data += measureList(data_List[i]);
    }

    $(
        '.nurse.nurse_measure .wrap_inner .section.measure_status .container .container'
    ).append(data);
    $(
        '.nurse.nurse_measure .wrap_inner .section.measure_status .container .status_list'
    ).fadeIn();
}
