async function arteriotony_init(){
    // 환자 정보를 불러오고 환자정보 세팅
    await _getPatientInform();
    _patient_inform_insert();
}
arteriotony_init();