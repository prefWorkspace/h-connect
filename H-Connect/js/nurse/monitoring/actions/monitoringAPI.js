import { serverController } from '../../../utils/controller/serverController.js?v=2022.01.17.11.33';
import { commonRequest } from '../../../utils/controller/commonRequest.js?v=2022.01.17.11.33';

/* s: 환자 병상 갯수 확인 */
export async function selectSickBed() {
    return await serverController.ajaxAwaitController(
        'API/Manager/SelectSickBed',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            includeSickRoom: true,
            includeSickBed: true,
        }),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}
/* e: 환자 병상 갯수 확인 */

/* s: 환자 측정 리스트 가져오기 */
export async function selectMeasurementInfoList() {
    return await serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoList',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementType: 'BM', // ET : 긴급이송 / BM : 병상모니터링
            startDateTime: null,
            endDateTime: null,
            pageNumber: 1,
            count: 1000,
        }),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
    /* e: 환자 측정 리스트 가져오기 */
}

/* s : 환자 병실 리스트 */
export async function selectSickRoom() {
    return await serverController.ajaxAwaitController(
        'API/Manager/SelectSickRoom',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            includeSickBed: true, // 병실의 병상 포함
        }),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}
/* e : 환자 병실 리스트 */
