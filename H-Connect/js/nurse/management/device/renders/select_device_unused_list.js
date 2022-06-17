'use strict';
const { unusedDeviceList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/device/templates/unusedDeviceList.js'
    )
);

export function select_device_unused_list(deviceRegisterList) {
    let deviceList = '';

    //리스트 지우기
    $('div').remove(
        '.section.return_device .device_list .device_item .item_row'
    );

    if (!deviceRegisterList) {
        deviceList += `<p style="text-align: center; color: #aaa">조회된 데이터가 없습니다.</p>`;
    } else {
        for (let i = 0; i < deviceRegisterList.length; i++) {
            deviceList += unusedDeviceList(deviceRegisterList[i]);
        }
    }

    $('.section.return_device .device_list .device_item').html(deviceList);
    $(
        '.section.return_device .device_list .device_item .item_row .btn_cancel'
    ).on('click', cancel_device_modal_action);
}

function cancel_device_modal_action() {
    $('.pop.delete_return .overlay').fadeIn();

    const serialNumber = $(this).data('serialnumber');

    const deviceType = $(this).data('type');

    const macAddress = $(this).data('macaddress');
    $('.pop.delete_return .overlay .btn_list .btn_cut').attr(
        'data-type',
        deviceType
    );
    $('.pop.delete_return .overlay .btn_list .btn_cut').attr(
        'data-serialNumber',
        serialNumber
    );
    $('.pop.delete_return .overlay .btn_list .btn_cut').attr(
        'data-macaddress',
        macAddress
    );
}
