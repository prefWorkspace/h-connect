import { SelectMeasurementInfoDetail } from '../actions/patientMonitoringAPI.js';
import { parsePatientInfo } from '../templates/pateintInfoTmpl.js';

export const renderPatientInfo = async () => {
    const _patientInfo = await SelectMeasurementInfoDetail();
    const _el = parsePatientInfo(_patientInfo);
    $('section.management.patient').html(_el);
};
renderPatientInfo();
