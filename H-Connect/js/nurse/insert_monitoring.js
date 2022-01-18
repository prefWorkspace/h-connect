/**
 * 해당 파일은 /nurse/monitoring.html 에서 환자 실시간 모니터링을 하는 페이지에 관련된 화면입니다.
 */
const $all_patientEl = $('.nurse.patient_vital .wrap_inner .all_patient');

function insert_monitoring(){
    let html = '';
    for(let i = 0; i < 50; i++){
        html+=MonitorBlock_Have();
    }
    $all_patientEl.html(html);
}

async function res_monitoring(){
    const userData = JSON.parse(localStorageController.getLocalS("userData"));
    const req = JSON.stringify({
        requester : userData.userCode, // 요청자 user code
        organizationCode : userData.organizationCode, // 기관 고유 코드
        measurementType : 'BM', // ET : 긴급이송 / BM : 병상모니터링
        ...commonRequest()
    });
    console.log(req);
    await serverController.ajaxAwaitController("API/Measurement/SelectMeasurementInfoList", "POST", req, (res) => {
        console.log(res);
        if(res.result){
            insert_monitoring();
        }else{

        }
    }, (err) => console.log(err));
}
res_monitoring();