const { deviceTemplate } = await import(
    importVersion('/H-Connect/js/nurse/monitoring/templates/deviceTemplate.js')
);

export function addDeviceList(list) {
    let html = '';
    for (let i = 0; list.length; i++) {
        html += deviceTemplate(list[i]);
    }

    $('.pop.new_room_pop .device_room').html(html);
}
