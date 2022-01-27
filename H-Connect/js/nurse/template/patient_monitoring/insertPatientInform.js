function _insertPatientInform(){
    /* 환자 측정 상세정보 왼쪽 환자 정보 세팅 */

    /* 환자 정보 jquery dom 선언 */
    const _$p_informEl = $('.monitoring_patient .management.patient .title');

    const _$p_inform_name = $('.monitoring_patient .management.patient .title .name');
    const _$p_inform_age = $('.monitoring_patient .management.patient .title .age');
    const _$p_inform_gender = $('.monitoring_patient .management.patient .title .gender');

    const _$p_inform_id = $('.monitoring_patient .management.patient .title .p_id');
    const _$p_inform_type = $('.monitoring_patient .management.patient .title .p_type');

    const _$p_inform_ward = $('.monitoring_patient .management.patient .title .ward');
    const _$p_inform_room = $('.monitoring_patient .management.patient .title .sickRoom');
    const _$p_inform_bed = $('.monitoring_patient .management.patient .title .sickBed');

    return new Promise((resolve, reject)=>{
        const { name, birthday, gender, patientCode, ward, sickRoom, sickBed } = PATIENT.inform || {};
        function setting(){
            // 환자 정보 뷰 세팅
            _$p_inform_name.text(name);
            _$p_inform_age.text(ageCalc(birthday));
            _$p_inform_gender.text(gender === 1 ? "남" : "여");

            _$p_inform_id.text(patientCode);
            _$p_inform_type.text(name);

            _$p_inform_ward.text(ward);
            _$p_inform_room.text(sickRoom);
            _$p_inform_bed.text(sickBed);

            //다 붙였으면 영역 보이기
            _$p_informEl.animate({opacity:'1'},60);
        }
        resolve(setting);
    }).then((res)=>{
        res();
    })
}