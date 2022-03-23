import {
  monitorBlock_have,
  monitorBlock_none,
  monitorRoomBlock,
} from '../templates/monitoringPatientTemplate.js';
import {
  getMonitoringSickBed,
  getPatientMeasurementInfoList,
  getMonitoringSickRoom,
} from '../actions/getMonitoringAll.js';

async function monitoring_sickRoomList_insert() {
  // sickRoomCode
  // wardCode
  const { sickRoomList } = await getMonitoringSickRoom(); // 병실 리스트
  const { sickBedList } = await getMonitoringSickBed(); // 병상 리스트
  const { measurementInfoSimpleList: patientList } =
    await getPatientMeasurementInfoList(); // 환자 측정 리스트
  // console.log(sickRoomList);
  // console.log(sickBedList);
  // console.log(patientList);

  let _html = '';
  for (let i = 0, _sickRoomLen = sickRoomList?.length; i < _sickRoomLen; i++) {
    const sickRoomItem = sickRoomList[i];
    _html += monitorRoomBlock({ sickRoomItem, patientList });
  }

  $('.nurse.patient_vital .wrap_inner .patient_room_wrap').html(_html);
}
monitoring_sickRoomList_insert();
