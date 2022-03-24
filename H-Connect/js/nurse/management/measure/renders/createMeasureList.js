'use strict';
import { measureList } from '../templates/measurList.js';

export function createMeasureList(data_List) {
    if (typeof data_List !== 'object' || !data_List) return;

    let data = '';
    for (let i = 0; i < data_List.length; i++) {
        data += measureList(data_List[i]);
    }

    $('.section.measure_status .container .container').html(data);
    $(
        '.nurse.nurse_measure .wrap_inner .section.measure_status .container .status_list'
    ).fadeIn();
}
