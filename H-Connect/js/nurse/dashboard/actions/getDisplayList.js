import { serverController } from '../../../utils/controller/serverController.js';
import { commonRequest } from '../../../utils/controller/commonRequest.js';

export async function getDisplayList(page, count) {
    let result = {};
    await serverController.ajaxAwaitController(
        'API/Manager/SelectDisplay',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            pageNumber: page,
            count: count,
        }),
        (res) => {
            if (res.result) {
                result = res.displayInfoList;
            }
        }
    );
    return result;
}
