const { SelectMeasurementInfoDetail } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/common/actions/patientMonitoringAPI.js'
    )
);
const { parsePatientInfo } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/common/templates/pateintInfoTmpl.js'
    )
);

export const renderPatientInfo = async () => {
    const _patientInfo = await SelectMeasurementInfoDetail();
    const _el = parsePatientInfo(_patientInfo);
    $('section.management.patient').html(_el);
};
renderPatientInfo();
