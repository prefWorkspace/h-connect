'use strict';
import { deviceList } from '../templates/deviceList.js';

export function select_device_list(deviceRegisterList) {
    let devicehtml = '';

    //리스트 지우기
    $('div').remove('.section.new_device .device_list .device_item .item_row');

    if (!deviceRegisterList) return;

    for (let i = 0; i < deviceRegisterList.length; i++) {
        devicehtml += deviceList(deviceRegisterList[i]);
    }

    $('.section.new_device .device_list .device_item').html(devicehtml);
    $('.section.new_device .device_list .device_item .item_row .btn_delete').on(
        'click',
        delete_device_modal_action
    );
}

function delete_device_modal_action() {
    $('.pop.delete_regi .overlay').fadeIn();
    $('.pop.delete_regi .overlay .btn_list .btn_cut').attr(
        'data-serialNumber',
        $(this).data('serialnumber')
    );
}
