import { serverController } from '../../../utils/controller/serverController.js?v=2022.01.17.11.33';
import { commonRequest } from '../../../utils/controller/commonRequest.js?v=2022.01.17.11.33';
import { history } from '../../../utils/controller/historyController.js?v=2022.01.26.12.45';
export async function _getPatientInform() {
    let _patient = '';
    /* s: 환자 측정 상세 정보 */
    await serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoDetail',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: history.getParams('measurement_code'),
        }),
        (res) => {
            if (res.result) {
                _patient = res.measurementInfo;
            } else {
            }
        },
        (err) => console.log(err)
    );
    return _patient;
    /* e: 환자 측정 상세 정보 */
}
