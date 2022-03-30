import { serverController } from '../../../utils/controller/serverController.js?v=2022.01.17.11.33';
import { commonRequest } from '../../../utils/controller/commonRequest.js?v=2022.01.17.11.33';

/* s : 모니터링 대상 데이터 가져오기 */
export async function getWardList() {
    //병동, 병실, 병상 가져오기
    let result = {};
    await serverController.ajaxAwaitController(
        'API/Manager/SelectWard',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            includeSickRoom: true,
        }),
        (res) => {
            if (res.result) {
                result = res.wardList;
            }
        }
    );
    return result;
}
