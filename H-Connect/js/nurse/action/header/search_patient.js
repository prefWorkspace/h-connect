/* 
간호사 header에 환자 검색에 해당하는 액션 입니다.
해당 파일을 사용하는 화면은

< 모니터링 : monitoring >
/nurse/monitoring.html
/nurse/patient.html
/nurse/arteriotony.html
/nurse/patient_warning.html

< 관리 : index >
/nurse/index.html
/nurse/device_management.html
/nurse/measure.html
*/
async function search_patient_api(){
    await serverController.ajaxAwaitController("API/Measurement/SelectMeasurementInfoList", "POST",
    JSON.stringify({
        ...commonRequest(),
        measurementType : 'BM' // ET : 긴급이송 / BM : 병상모니터링
    }),
    (res) => {
        if(res.result){
            const patient_list = res.measurementInfoSimpleList; // 환자 정보
            insert_search_patient_list(patient_list); // 리스트 템플릿 렌더
        }else{
            
        }
    }, (err) => console.log(err));
}
search_patient_api();