const PATIENT = {
    inform : ""
}
async function getPatientInformApi(){
    const measurementCode = history.getParams("measurement_code");
    /* s: 환자 측정 상세 정보 */
    await serverController.ajaxAwaitController(
        "API/Measurement/SelectMeasurementInfoDetail", "POST",
        JSON.stringify({
            ...commonRequest(),
            measurementCode:measurementCode
        }),
        (res) => {
            console.log("res:",res);
        if(res.result){
            PATIENT.inform = res.measurementInfo;
        }else{
            
        }
    }, (err) => console.log(err));
    /* e: 환자 측정 상세 정보 */
}
async function patient_init(){
    await getPatientInformApi();
    await _insertPatientInform();
    // await _insertPatientVital();
}
patient_init();