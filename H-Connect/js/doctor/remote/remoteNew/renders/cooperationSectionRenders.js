const { validateCoopAll } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/dataActions.js'
    )
);
const { scheduleCanBlockInputAction, scheduleCanBlockDeleteBtnCheck } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/remote/remoteNew/actions/eachCooperationActions/requestScheduleActions.js'
        )
    );
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

    const _calendarModule = $('#calendar').data('calendar-module');
    _calendarModule.resetEventOptions();
    _calendarModule.init.options.firstClickUnSelectToday = true;

    let _sectionTmpl = '';
    renderCreateCooperationText(_sectionType);

    switch (_sectionType) {
        case '실시간원격협진':
            console.log(_calendarModule);
            _calendarModule.init.options.dateClickActiveAble = true;
            _calendarModule.init.options.dateClickActive = (_selectDate) => {
                const _month = moment(_selectDate.dateStr).format('MM');
                const _day = moment(_selectDate.dateStr).format('DD');
                $(
                    '.rt_time .date .input_wrap input[data-key="rt_start_month"]'
                ).val(_month);
                $(
                    '.rt_time .date .input_wrap input[data-key="rt_start_date"]'
                ).val(_day);
            };
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
    scheduleCanBlockDeleteBtnCheck();
}

function settingBoxData(_sectionType) {
    const _$surgeryBox = $('.surgery_box');
    _$surgeryBox.attr('data-option-role', _sectionType);
}

// renderCooperationSection('협진일정요청'); // test : 추후 삭제
