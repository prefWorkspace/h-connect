async function patient_inform_api(){
    const measurementCode = history.getParams("measurement_code");
    
    await serverController.ajaxAwaitController(
        "API/Measurement/SelectMeasurementInfoDetail", "POST",
        JSON.stringify({
            ...commonRequest(),
            measurementCode:measurementCode
        }),
        (res) => {
        console.log("ddd:",res);
        if(res.result){
            
            const bedList = res.sickBedList;
            sickBedLen = bedList ? bedList.length : 50;

        }else{
            
        }
    }, (err) => console.log(err));
    /* e: 환자 병상 갯수 확인 */
}
patient_inform_api();