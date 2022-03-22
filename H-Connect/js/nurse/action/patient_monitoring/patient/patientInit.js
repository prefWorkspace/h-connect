import {_getPatientInform} from '../../patient_monitoring/getPatientInform.js';
import {_patient_inform_insert} from '../../../template/patient_monitoring/insertPatientInform.js';
import {_patient_patientVital_insert} from '../../../template/patient_monitoring/patient/insertPatientVital.js';
async function patient_init(){
    // 환자 정보를 불러오고 환자정보 세팅
    const _patient = await _getPatientInform();
    _patient_inform_insert(_patient);
    _patient_patientVital_insert(_patient);
}
patient_init();