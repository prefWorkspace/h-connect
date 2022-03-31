import { serverController } from '../../../utils/controller/serverController.js';

import { commonRequest } from '../../../utils/controller/commonRequest.js';

export async function getSickbedList() {
    let result = {};
    await serverController.ajaxAwaitController(
        'API/Manager/SelectSickBed',
        'POST',
        JSON.stringify({
            ...commonRequest(),
        }),
        (res) => {
            result = res.sickBedList;
        }
    );
    return result;
}
