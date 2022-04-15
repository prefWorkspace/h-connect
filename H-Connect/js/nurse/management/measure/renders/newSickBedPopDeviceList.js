'use strict';

const { newSickBed_device } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/templates/deviceList.js'
    )
);

export async function newSickBedPopDeviceList(arr) {
    let html = '';

    for (let i = 0; i < arr.length; i++) {
        html += newSickBed_device(arr[i]);
    }

    $('div').remove('.pop.new_room_pop .new_room .device_room .add_device');
    $('.pop.new_room_pop .new_room .device_room .btn_add').before(html);
}
