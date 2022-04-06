const { selectMeasurementInfoDetail, SelectAlarmSettingMeasurement } =
    await import(
        importVersion(
            '/H-Connect/js/nurse/patientMonitoring/patient/common/actions/vitalInformAPI.js'
        )
    );
const { vitalHeaderTmpl } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/common/templates/vitalHeaderTmpl.js'
    )
);
const { currentVitalInitData } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/renders/renderCurrentVital.js'
    )
);

async function vitalRenderInit() {
    const _measurementInfo = await selectMeasurementInfoDetail();
    const _alarmSettingInfo = await SelectAlarmSettingMeasurement();
    vitalHeaderTmpl(_measurementInfo);
    currentVitalInitData(_alarmSettingInfo);
}

vitalRenderInit();
