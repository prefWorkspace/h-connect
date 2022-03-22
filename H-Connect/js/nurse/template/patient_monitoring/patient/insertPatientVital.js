export function _patient_patientVital_insert(_patient){
    /* 환자 측정 상세정보 vital 화면 정보 세팅 */

    _vitalHeaderInform(_patient);
}

export function _vitalHeaderInform(_patient){
    const { name, birthday, gender, patientCode } = _patient || {};

    /* 환자 정보 jquery dom 선언 */
    const _$h_p_informEl = $('.monitoring_patient .vital_chart .title .pati_info');

    const _$h_p_name = $('.monitoring_patient .vital_chart .title .pati_info .name');
    const _$h_p_age = $('.monitoring_patient .vital_chart .title .pati_info .age');
    const _$h_p_gender = $('.monitoring_patient .vital_chart .title .pati_info .gender');
    const _$h_p_id = $('.monitoring_patient .vital_chart .title .pati_info .p_id');
    const _$h_p_type = $('.monitoring_patient .vital_chart .title .pati_info .p_type');

    _$h_p_name.text(name);
    _$h_p_age.text(AGE_CALC(birthday));
    _$h_p_gender.text(gender === 1 ? "남" : "여");
    _$h_p_id.text(patientCode);
    _$h_p_type.text(name);

    _$h_p_informEl.animate({opacity:'1'},60);
}