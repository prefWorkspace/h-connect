import { serverController } from '../../../utils/controller/serverController.js';
import { commonRequest } from '../../../utils/controller/commonRequest.js';

/* s: 환자 병상 갯수 확인 */
export async function getMonitoringSickBed() {
    //   let _sickBedLen = 50; // 병상의 총 갯수
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
                // 병상의 갯수(비어있든 안비어있든) 를 _sickBedLen에 넣어줍니다.
                // const _bedList = res.sickBedList;
                // _sickBedLen = _bedList ? _bedList.length : 50;
            } else {
            }
        },
        (err) => console.log(err)
    );
}
/* e: 환자 병상 갯수 확인 */

/* s: 환자 측정 리스트 가져오기 */
export async function getPatientMeasurementInfoList() {
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
export async function getMonitoringSickRoom() {
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
