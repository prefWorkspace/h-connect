const { selectMeasurementInfoDetail } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/common/actions/vitalInformAPI.js'
    )
);
const { vitalHeaderRender } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/common/renders/vitalHeaderRender.js'
    )
);
const { currentVitalInitData } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/renders/renderCurrentVital.js'
    )
);

async function vitalRenderInit() {
    const _measurementInfo = await selectMeasurementInfoDetail();
    vitalHeaderRender(_measurementInfo);
    currentVitalInitData(_measurementInfo);
}

vitalRenderInit();
