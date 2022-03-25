import {
    monitorBlock_have,
    monitorBlock_none,
    monitorRoomBlock,
} from '../templates/monitoringPatientTml.js';
import {
    selectSickBed,
    selectMeasurementInfoList,
    selectSickRoom,
} from '../actions/monitoringAPI.js';
import { updateMonitoringPatientItem } from './updateMonitoringPatient.js';

async function renderMonitoringSickRoomList() {
    const { sickRoomList } = await selectSickRoom(); // 병실 리스트
    const { measurementInfoSimpleList: patientList } =
        await selectMeasurementInfoList(); // 환자 측정 리스트
    let _html = '';
    for (let i = 0, len = sickRoomList?.length; i < len; i++) {
        const sickRoomItem = sickRoomList[i];
        _html += monitorRoomBlock({ sickRoomItem, patientList });
    }

    $('.nurse.patient_vital .wrap_inner .patient_room_wrap').html(_html);
}
await renderMonitoringSickRoomList();
await updateMonitoringPatientItem();
