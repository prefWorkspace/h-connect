import { serverController } from '../../../utils/controller/serverController.js?v=2022.01.17.11.33';
import { commonRequest } from '../../../utils/controller/commonRequest.js?v=2022.01.17.11.33';

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
