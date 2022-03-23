import { history } from '../../../../utils/controller/historyController.js';
import { getPatientInfo } from '../actions/getPatientInfo.js';
import { parsePatientInfo } from '../templates/pateintInfoTmpl.js';

const $PATIENT_INFO_CONTAINER = document.querySelector(
    'section.management.patient'
);

export const renderPatientInfo = async () => {
    try {
        const patientInfo = await getPatientInfo();
        const el = parsePatientInfo(patientInfo);
        $PATIENT_INFO_CONTAINER.innerHTML = el;
        attachLink(patientInfo.measurementCode);
    } catch (err) {
        console.log(err);
    }
};
const attachLink = (measurementCode) => {
    const $PATIENT_INFO_NAV_LINK = document.querySelector(
        '.management_list .link_to_patient'
    );
    $PATIENT_INFO_NAV_LINK.addEventListener('click', (e) => {
        console.log('click');
        history.linkTo(
            `/nurse/patient.html?measurement_code=${measurementCode}`
        );
    });
};
