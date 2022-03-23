import {
    monitorBlock_have,
    monitorBlock_none,
} from '../templates/monitoringPatientTemplate.js';
import {
    getMonitoringSickBed,
    getPatientMeasurementInfoList,
} from '../actions/getMonitoringAll.js';
// 모니터링 > 전체환자 보기 작업
async function monitoring_patientList_insert() {
    const { sickBedList } = await getMonitoringSickBed(); // 병상 리스트
    const { measurementInfoSimpleList: patientList } =
        await getPatientMeasurementInfoList(); // 환자 측정 리스트

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
monitoring_patientList_insert();
