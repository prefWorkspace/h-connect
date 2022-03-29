'use strict';
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

export function cancel_device_unused() {
    const serialNumber = $(this).data('serialnumber');
    const deviceType = $(this).data('type');

    const req = JSON.stringify({
        ...commonRequest(),
        serialNumber,
        deviceType,
    });

    serverController.ajaxAwaitController(
        'API/Device/InsertDeviceRegister',
        'POST',
        req,
        (res) => {
            if (res.result) {
                select_device(0, null);
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

$('.pop.delete_return .overlay .btn_list .btn_cut').on(
    'click',
    cancel_device_unused
);
