import { serverController } from "../../../utils/controller/serverController.js";
import { commonRequest } from "../../../utils/controller/commonRequest.js";
import { history } from "../../../utils/controller/historyController.js";
export async function _getPatientInform(){
    let _patient = '';
    /* s: 환자 측정 상세 정보 */
    await serverController.ajaxAwaitController(
        "API/Measurement/SelectMeasurementInfoDetail", "POST",
        JSON.stringify({
            ...commonRequest(),
            measurementCode : history.getParams("measurement_code")
        }),
        (res) => {
        if(res.result){
            _patient = res.measurementInfo;
        }else{
            
        }
    }, (err) => console.log(err));
    return _patient;
    /* e: 환자 측정 상세 정보 */
}
