import {_patient_inform_insert} from '../../../template/patient_monitoring/insertPatientInform.js';
async function arteriotony_init(){
    // 환자 정보를 불러오고 환자정보 세팅
    const _patient = await _getPatientInform();
    _patient_inform_insert(_patient);
}
arteriotony_init();