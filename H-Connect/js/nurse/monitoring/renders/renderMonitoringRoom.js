const { monitorBlock_have, monitorBlock_none, monitorRoomBlock } = await import(
    importVersion(
        '/H-Connect/js/nurse/monitoring/templates/monitoringPatientTml.js'
    )
);
const { selectSickBed, selectMeasurementInfoList, selectSickRoom } =
    await import(
        importVersion('/H-Connect/js/nurse/monitoring/actions/monitoringAPI.js')
    );
const { updateMonitoringPatientItem } = await import(
    importVersion(
        '/H-Connect/js/nurse/monitoring/renders/updateMonitoringPatient.js'
    )
);
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
