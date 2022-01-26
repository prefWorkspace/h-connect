/**
 * 해당 파일은 /nurse/monitoring.html 에서 환자 실시간 모니터링을 하는 페이지에 관련된 화면입니다.
 */

async function all_monitoring_api(){

    let sickBedLen = 50; // 병상의 총 갯수
    /* s: 환자 병상 갯수 확인 */
    await serverController.ajaxAwaitController(
        "API/Manager/SelectSickBed", "POST",
        JSON.stringify({
            ...commonRequest(),
            includeSickRoom : true,
            includeSickBed : true
        }),
        (res) => {
        console.log("ddd:",res);
        if(res.result){
            // 병상의 갯수(비어있든 안비어있든) 를 sickBedLen에 넣어줍니다.
            const bedList = res.sickBedList;
            sickBedLen = bedList ? bedList.length : 50;
        }else{
            
        }
    }, (err) => console.log(err));
    /* e: 환자 병상 갯수 확인 */

    /* s: 환자 측정 리스트 가져오기 */
    // SelectMeasurementInfoPage
    await serverController.ajaxAwaitController(
        "API/Measurement/SelectMeasurementInfoBioDataPage", "POST",
        JSON.stringify({
            ...commonRequest(),
            measurementType : 'BM', // ET : 긴급이송 / BM : 병상모니터링
            startDateTime : null,
            endDateTime : null,
            pageNumber : 1,
            count : 1000
        }),
        (res) => {
        console.log(res);
        if(res.result){
        const patient_list = res.measurementInfoSimpleBioDataList;
        first_insert_monitoring(patient_list, sickBedLen);
        }else{
            
        }
    }, (err) => console.log(err));
    /* e: 환자 측정 리스트 가져오기 */
}
all_monitoring_api();