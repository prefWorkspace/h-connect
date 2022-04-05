const { deviceTemplate } = await import(
    importVersion('/H-Connect/js/nurse/monitoring/templates/deviceTemplate.js')
);

export function addDeviceList(list) {
    let html = '';
    for (let i = 0; i < list.length; i++) {
        html += deviceTemplate(list[i]);
    }

    $('div').remove('.pop.new_room_pop .new_room .device_room .device_item');
    $('.pop.new_room_pop .new_room .device_room .btn_add').before(html);
}
