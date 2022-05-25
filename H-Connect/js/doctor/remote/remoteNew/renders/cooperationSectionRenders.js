const { validateCoopAll } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/dataActions.js'
    )
);
<<<<<<< HEAD
const { scheduleCanBlockInputAction, scheduleCanBlockDeleteBtnCheck } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/remote/remoteNew/actions/eachCooperationActions/requestScheduleActions.js'
        )
    );
=======
const { scheduleCanBlockInputAction } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/eachCooperationActions/requestScheduleActions.js'
    )
);
>>>>>>> 736ed0f (fix : 신규 협진 생성 > 실시간 원격 협진 , 소견 요청 협진 ,협진 일정요청 작업 / 날짜 수정중)
const { renderCreateCooperationText } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/commonRenders.js'
    )
);
const {
    coopRealTimeRemoteSectionTmpl, // 실시간 원격 협진 템플릿
    coopOpinionSectionTmpl, // 소견 요청 협진 템플릿
    coopRequestScheduleSectionTmpl, // 협진 일정 요청 템플릿
    coopContentSectionTmpl, // 협진 내용 템플릿
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/templates/cooperationSectionTmpl.js'
    )
);
export function renderCooperationSection(_sectionType) {
    // 협진 종류 선택 select box 렌더러
    // cooperationSectionActions에서 렌더시켜줍니다.
    settingBoxData(_sectionType);
    let _sectionTmpl = '';
    renderCreateCooperationText(_sectionType);
    switch (_sectionType) {
        case '실시간원격협진':
            _sectionTmpl = coopRealTimeRemoteSectionTmpl();
            break;
        case '소견요청협진':
            _sectionTmpl = coopOpinionSectionTmpl();
            break;
        case '협진일정요청':
            _sectionTmpl = coopRequestScheduleSectionTmpl();
            break;
    }
    $('#cooperation-section #content-wrap').html(coopContentSectionTmpl());
    $('#cooperation-section #surgery-wrap').html(_sectionTmpl);
    afterRenderCooperationSection();
}

function afterRenderCooperationSection() {
    validateCoopAll();
    scheduleCanBlockInputAction();
<<<<<<< HEAD
    scheduleCanBlockDeleteBtnCheck();
=======
>>>>>>> 736ed0f (fix : 신규 협진 생성 > 실시간 원격 협진 , 소견 요청 협진 ,협진 일정요청 작업 / 날짜 수정중)
}

function settingBoxData(_sectionType) {
    const _$surgeryBox = $('.surgery_box');
    _$surgeryBox.attr('data-option-role', _sectionType);
}

// renderCooperationSection('협진일정요청'); // test : 추후 삭제
