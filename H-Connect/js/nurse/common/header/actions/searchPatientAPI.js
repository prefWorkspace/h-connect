const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
export async function selectMeasurementInfoList(_searchVal) {
    /* 환자 검색 정보 리스트 불러오기 API */
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
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoList',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementType: 'BM', // ET : 긴급이송 / BM : 병상모니터링
            search: _searchVal,
        }),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
    if (res.result) {
        return res.measurementInfoSimpleList;
    }
}
