'use strict';
import { serverController } from '../../../../utils/controller/serverController.js';
import { commonRequest } from '../../../../utils/controller/commonRequest.js';
import { device_NameToType } from '../../../../utils/controller/deviceNameController.js';

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
