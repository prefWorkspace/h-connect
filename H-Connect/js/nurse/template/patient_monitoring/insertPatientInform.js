function _patient_inform_insert(){
    /* 환자 측정 상세정보 왼쪽 환자 정보 세팅 */
    
    /* 환자 정보 jquery dom 선언 */
    const { name, birthday, gender, patientCode, ward, sickRoom, sickBed } = PATIENT.inform || {};
    const _$p_informEl = $('.monitoring_patient .management.patient .title');
    
    const _$p_inform_name = $('.monitoring_patient .management.patient .title .name');
    const _$p_inform_age = $('.monitoring_patient .management.patient .title .age');
    const _$p_inform_gender = $('.monitoring_patient .management.patient .title .gender');
    
    const _$p_inform_id = $('.monitoring_patient .management.patient .title .p_id');
    const _$p_inform_type = $('.monitoring_patient .management.patient .title .p_type');
    
    const _$p_inform_ward = $('.monitoring_patient .management.patient .title .ward');
    const _$p_inform_room = $('.monitoring_patient .management.patient .title .sickRoom');
    const _$p_inform_bed = $('.monitoring_patient .management.patient .title .sickBed');

    // 환자 정보 뷰 세팅
    _$p_inform_name.text(name);
    _$p_inform_age.text(AGE_CALC(birthday));
    _$p_inform_gender.text(gender === 1 ? "남" : "여");

    _$p_inform_id.text(patientCode);
    _$p_inform_type.text(name);

    _$p_inform_ward.text(ward);
    _$p_inform_room.text(sickRoom);
    _$p_inform_bed.text(sickBed);

    //다 붙였으면 영역 보이기
    _$p_informEl.animate({opacity:'1'},60);

    // 환자 정보 바인딩 후 탭 네비게이션 기능 활성화
    _patient_nav_handle();
}

function _patient_nav_handle(){
    // jquery dom
    const _$link_patient_el = $('.monitoring_patient .management.patient .management_list .link_to_patient');
    const _$link_arteriotony_el = $('.monitoring_patient .management.patient .management_list .link_to_arteriotony');

    // url 파라미터에 있는 측정 코드 가져오기
    const _measurementCode = `measurement_code=${history.getParams("measurement_code")}`;

    _$link_patient_el.off().on("click", function(){
        if(!$(this).hasClass("on")){
            history.push(`/nurse/patient.html?${_measurementCode}`);
        }
    })
    _$link_arteriotony_el.off().on("click", function(){
        if(!$(this).hasClass("on")){
            history.push(`/nurse/arteriotony.html?${_measurementCode}`);
        }
    })
}