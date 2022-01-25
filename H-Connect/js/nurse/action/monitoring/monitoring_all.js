/**
 * 해당 파일은 /nurse/monitoring.html 에서 환자 실시간 모니터링을 하는 페이지에 관련된 화면입니다.
 */
async function first_monitoring_all_api(){
    const userData = JSON.parse(localStorageController.getLocalS("userData"));
    console.log('userData', userData);
    const req = JSON.stringify({
    requester : userData.userCode, // 요청자 user code
    organizationCode : userData.organizationCode, // 기관 고유 코드
    measurementType : 'BM', // ET : 긴급이송 / BM : 병상모니터링
    startDateTime : null,
    endDateTime : null,
    pageNumber : 1,
    count : 50,
    ...commonRequest()
    });
    await serverController.ajaxAwaitController("API/Measurement/SelectMeasurementInfoBioDataPage", "POST", req, (res) => {
        if(res.result){
        const patient_list = res.measurementInfoSimpleBioDataList;
        first_insert_monitoring(patient_list);
        }else{
            
        }
    }, (err) => console.log(err));
}
first_monitoring_all_api();

async function all_sickRoom_lookUp(){
    /*
    환자 병상 갯수 확인
    */
    const userData = JSON.parse(localStorageController.getLocalS("userData"));
    const req = JSON.stringify({
    organizationCode : userData.organizationCode, // 기관 고유 코드
    includeSickRoom : true,
    includeSickBed : true,
    ...commonRequest()
    });
    await serverController.ajaxAwaitController("API/Manager/SelectSickBed", "POST", req, (res) => {
        console.log("ddd:",res);
        if(res.result){
        const patient_list = res.measurementInfoSimpleBioDataList;
        }else{
            
        }
    }, (err) => console.log(err));
}
all_sickRoom_lookUp();