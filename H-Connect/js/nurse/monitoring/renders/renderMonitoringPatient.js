const { monitorBlock_have, monitorBlock_none } = await import(
    importVersion(
        '/H-Connect/js/nurse/monitoring/templates/monitoringPatientTml.js'
    )
);
const {
    selectSickBed,
    selectMeasurementInfoList,
    selectMeasurementInfoBioDataPage,
} = await import(
    importVersion('/H-Connect/js/nurse/monitoring/actions/monitoringAPI.js')
);
const { updateMonitoringPatientItem } = await import(
    importVersion(
        '/H-Connect/js/nurse/monitoring/renders/updateMonitoringPatient.js'
    )
);
const { addMonitoringEmptyBedClickEvent } = await import(
    importVersion(
        '/H-Connect/js/nurse/monitoring/renders/addMonitoringEmptyBed.js'
    )
);

// 모니터링 > 전체환자 보기 렌더
async function renderMonitoringPatientList() {
    const { sickBedList } = await selectSickBed(); // 병상 리스트
    // const { measurementInfoSimpleList: patientList } =
    //     await selectMeasurementInfoList(); // 환자 측정 리스트
    const { measurementInfoSimpleBioDataList: patientList } =
        await selectMeasurementInfoBioDataPage();
    let _html = '';
    let _temp_emptyBed = '';

    _html = sickBedList?.htmlFor((_sickBedItem, _index) => {
        const findPatient_in_sickBedList = patientList?.find((_patientItem) => {
            return _patientItem?.sickBedCode === _sickBedItem?.sickBedCode;
        });
        if (findPatient_in_sickBedList) {
            return monitorBlock_have(findPatient_in_sickBedList);
        } else {
            _temp_emptyBed += monitorBlock_none(_sickBedItem);
            return '';
        }
    });
    _html += _temp_emptyBed;
    $('.nurse.patient_vital .wrap_inner .all_patient').html(_html);
}
await renderMonitoringPatientList();
await updateMonitoringPatientItem();
