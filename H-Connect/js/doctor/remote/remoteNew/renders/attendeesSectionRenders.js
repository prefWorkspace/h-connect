const { selectHisDoctorList } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/remoteNewAPI.js'
    )
);
const { choiceDoctorItemTmpl, doctorListItemTmpl } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/templates/attendeesSectionTmpl.js'
    )
);
const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

function departmentDoctorListToBasicList(_departmentDoctorList) {
    /* 각 과별 의사 목록 하나로 합치는 리스트 함수 */
    let resultList = [];
    if (!_departmentDoctorList) return [];
    for (let i = 0, len = _departmentDoctorList.length; i < len; i++) {
        const { doctorInfo } = _departmentDoctorList[i] ?? {};
        resultList = resultList.concat(doctorInfo);
    }
    return resultList;
}

export function renderChoiceDoctorList(_doctorList) {
    /* "선택 된 의료진" 리스트 렌더 함수 */
    let _html = errorText({ msg: '선택된 의료진이 없습니다' });
    if (_doctorList && _doctorList.length > 0) {
        _html = _doctorList.htmlFor((_data) => choiceDoctorItemTmpl(_data));
    }
    $('.choice_staff .choice .choice_member').html(_html);
}
export function renderSelectDoctorList(_doctorList) {
    /* "의료진 선택 리스트" 렌더 함수 */
    let _html = errorText();
    if (_doctorList && _doctorList.length > 0) {
        _html = _doctorList.htmlFor((_data) => doctorListItemTmpl(_data));
    }
    $('.select_doctor .doctor_list .list_inner').html(_html);
}

async function renderInit() {
    const _getDepartmentDoctorList = await selectHisDoctorList();
    const _getDoctorList = departmentDoctorListToBasicList(
        _getDepartmentDoctorList
    );
    renderChoiceDoctorList();
    renderSelectDoctorList(_getDoctorList);
}

renderInit();
