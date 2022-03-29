'use strict';
import { serverController } from '../../../../utils/controller/serverController.js?v=2022.01.17.11.33';
import { commonRequest } from '../../../../utils/controller/commonRequest.js?v=2022.01.17.11.33';
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
