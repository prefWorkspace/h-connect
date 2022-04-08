const { SelectMeasurementInfoDetail, SelectAlarmSettingMeasurement } =
    await import(
        importVersion(
            '/H-Connect/js/nurse/patientMonitoring/common/actions/patientMonitoringAPI.js'
        )
    );
const { vitalHeaderTmpl } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/common/templates/vitalHeaderTmpl.js'
    )
);
const { vitalSimpleDataInit } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/common/renders/renderSimpleData.js'
    )
);

async function vitalRenderInit() {
    // 환자 상세정보 페이지 초기 렌더링
    const _measurementInfo = await SelectMeasurementInfoDetail();
    const _alarmSettingInfo = await SelectAlarmSettingMeasurement();
    vitalHeaderTmpl(_measurementInfo);
    vitalSimpleDataInit(_alarmSettingInfo);
}

vitalRenderInit();
