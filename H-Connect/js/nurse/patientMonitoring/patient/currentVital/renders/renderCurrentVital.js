const { socketGetPatientData } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/fakeSocket.js'
    )
);
const { CreateVitalLineD3 } = await import(
    importVersion('/H-Connect/js/utils/module/d3js/d3Module.js')
);

/* s : ecg vital test */
/* 예상 바이탈 사인 데이터 소켓 렌더링 -> 임시 주석처리 오류가 있어 추후 작업예정
let vitalSignalLine = null;
const ecgPatientdata = new socketGetPatientData();
ecgPatientdata.update((_data) => {
    const { measurementCode, bioSignalData } = _data || {};
    const { ecgDataList } = bioSignalData;
    if (!vitalSignalLine) {
        vitalSignalLine = new CreateVitalLineD3({
            target: 'vital-ecg-graph',
            data: ecgDataList,
            measurementCode: measurementCode,
            setting: {
                strokeColor: '#00FF19',
                strokeWidth: 1,
                duration: 3000,
            },
        });
    } else {
        vitalSignalLine.chartUpdate(ecgDataList);
    }
});
*/
/* e : ecg vital test */
