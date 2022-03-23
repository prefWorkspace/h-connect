import {
  monitorBlock_have,
  monitorBlock_none,
} from '../templates/monitoringPatientTemplate.js';
import {
  getMonitoringSickBed,
  getPatientMeasurementInfoList,
} from '../actions/getMonitoringAll.js';

async function monitoring_patientList_insert() {
  const { sickBedList } = await getMonitoringSickBed(); // 병상 리스트
  const { measurementInfoSimpleList } = await getPatientMeasurementInfoList(); // 환자 측정 리스트
  let _html = '';
  const _patientLen = measurementInfoSimpleList?.length || 0;
  for (let i = 0, _sickBedLen = sickBedList?.length; i < _sickBedLen; i++) {
    if (i < _patientLen) {
      // 환자 수를 판단합니다.
      _html += monitorBlock_have(measurementInfoSimpleList[i]);
    } else {
      _html += monitorBlock_none();
    }
  }

  $('.nurse.patient_vital .wrap_inner .all_patient').html(_html);
}
monitoring_patientList_insert();
