/**
 * 해당 파일은 /nurse/monitoring.html 에서 환자 실시간 모니터링을 하는 페이지에 관련된 화면입니다.
 */
const $all_patientEl = $('.nurse.patient_vital .wrap_inner .all_patient');

async function res_monitoring(){
    const userData = JSON.parse(localStorageController.getLocalS("userData"));
    const req = JSON.stringify({
    requester : userData.userCode, // 요청자 user code
    organizationCode : userData.organizationCode, // 기관 고유 코드
    measurementType : 'BM', // ET : 긴급이송 / BM : 병상모니터링
    startDateTime : "2022-01-20 14:04:24",
    endDateTime : "2022-01-21 14:04:24",
    pageNumber : 1,
    count : 50,
    ...commonRequest()
    });
    await serverController.ajaxAwaitController("API/Measurement/SelectMeasurementInfoPage", "POST", req, (res) => {
        console.log(res);
        if(res.result){
        const patient_list = res.measurementInfoSimpleList;
        first_insert_monitoring(patient_list);
        }else{

        }
    }, (err) => console.log(err));
}
res_monitoring();
