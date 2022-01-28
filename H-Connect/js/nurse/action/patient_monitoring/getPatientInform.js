const PATIENT = {
    inform : ""
}
async function _getPatientInform(){
    /* s: 환자 측정 상세 정보 */
    await serverController.ajaxAwaitController(
        "API/Measurement/SelectMeasurementInfoDetail", "POST",
        JSON.stringify({
            ...commonRequest(),
            measurementCode : history.getParams("measurement_code")
        }),
        (res) => {
        if(res.result){
            PATIENT.inform = res.measurementInfo;
        }else{
            
        }
    }, (err) => console.log(err));
    /* e: 환자 측정 상세 정보 */
}
