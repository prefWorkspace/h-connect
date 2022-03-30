'use strict';

const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { select_device } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/device/actions/select_device.js'
    )
);

function delete_devive() {
    const serialNumber = $(this).data('serialnumber');

    const req = JSON.stringify({
        ...commonRequest(),
        serialNumber,
    });

    serverController.ajaxAwaitController(
        'API/Device/DeleteDeviceRegister',
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

$('.pop.delete_regi .overlay .btn_list .btn_cut').on('click', delete_devive);
