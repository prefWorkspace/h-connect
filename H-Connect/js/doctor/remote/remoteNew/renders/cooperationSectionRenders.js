const { validateCoopAll } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/dataActions.js'
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
let firstRender = true;
export function renderCooperationSection(_sectionType) {
    // 협진 종류 선택 select box 렌더러
    // cooperationSectionActions에서 렌더시켜줍니다.

    let _sectionTmpl = '';
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
    if (firstRender) {
        firstRender = false;
        $('#cooperation-section #content-wrap').html(coopContentSectionTmpl());
    }
    $('#cooperation-section #surgery-wrap').html(_sectionTmpl);
    validateCoopAll();
}
renderCooperationSection('실시간원격협진'); // test : 추후 삭제
