'use strict';
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { device_NameToType } = await import(
    importVersion('/H-Connect/js/utils/controller/deviceNameController.js')
);

export function createDevice() {
    const device_name = $('#device_name').text();
    const serialNumber = $('#device_serial').val();

    const req = JSON.stringify({
        ...commonRequest(),
        serialNumber,
        deviceType: device_NameToType(device_name),
    });

    serverController.ajaxAwaitController(
        'API/Device/InsertDeviceRegister',
        'POST',
        req,
        (res) => {
            console.log(res);
            if (res.result) {
                select_device(0, null);
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

//아직 작업전
// $('.pop.regi_device .overlay .btn_list .btn_check').on('click', insert_device);
