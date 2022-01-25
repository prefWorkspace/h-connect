const $search_inputEl = $('.search_container input');
const $search_buttonEl = $('.search_container button.btn_search');

async function search_patient_api(){
    const userData = JSON.parse(localStorageController.getLocalS("userData"));
    const req = JSON.stringify({
    requester : userData.userCode, // 요청자 user code
    organizationCode : userData.organizationCode, // 기관 고유 코드
    measurementType : 'BM', // ET : 긴급이송 / BM : 병상모니터링
    ...commonRequest()
    });
    await serverController.ajaxAwaitController("API/Measurement/SelectMeasurementInfoList", "POST", req, (res) => {
        if(res.result){
        const patient_list = res.measurementInfoSimpleList;
        insert_search_patient_list(patient_list);
        }else{
            
        }
    }, (err) => console.log(err));
}
search_patient_api();