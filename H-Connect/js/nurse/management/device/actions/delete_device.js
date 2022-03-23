'use strict';
import { serverController } from '../../../../utils/controller/serverController.js';
import { commonRequest } from '../../../../utils/controller/commonRequest.js';
import { select_device } from './select_device.js';

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
