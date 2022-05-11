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

/*  ---------------------------------------------
                유틸 함수
 ------------------------------------------------*/

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

/* s : choice 의료진 선택에 관련된 함수 */
function findChoiceDoctorUserIdIndex(_userId) {
    // user id 기준 choice doctor 에서 index 찾기 함수
    return $(
        `.choice_staff .choice .choice_member .mem[data-user-id='${_userId}']`
    ).index();
}

function checkSelectDoctorLength() {
    // 선택된 의사 길이 구하기
    return $('.choice_staff .choice .choice_member .mem').length;
}
function renderChoiceDoctorEmptyControll(isEmpty) {
    // 선택된 의사 없을때 메세지 표시 여부 렌더 함수
    if (isEmpty) {
        $('.choice_staff .choice .choice_member').html(
            errorText({ msg: '선택된 의사가 없습니다' })
        );
    } else {
        $('.choice_staff .choice .choice_member')
            .children('.error_text')
            .remove();
    }
}

/*  ---------------------------------------------
                렌더링 함수
 ------------------------------------------------*/

export function renderChoiceDoctorList(_docData) {
    /* "선택 된 의료진" 리스트 렌더 함수 */
    renderChoiceDoctorEmptyControll(false);
    const { userId } = _docData ?? {};
    const _$choiceDoctorListWrapEl = $('.choice_staff .choice .choice_member');
    if (findChoiceDoctorUserIdIndex(userId) === -1) {
        // 중복 되는 id 가 없다면 append 해주기
        _$choiceDoctorListWrapEl.append(choiceDoctorItemTmpl(_docData));
    }
}

export function removeChoiceDoctorList(_docData) {
    /* 선택된 의사 에서 체크 해제된 의사 지워주기 */
    const { userId } = _docData ?? {};
    let _$choiceDoctorListItemEls = $(
        '.choice_staff .choice .choice_member .mem'
    );
    const _choiceDocDuplIndex = findChoiceDoctorUserIdIndex(userId);
    if (_choiceDocDuplIndex !== -1) {
        // index 찾으면 지워주기
        _$choiceDoctorListItemEls.eq(_choiceDocDuplIndex).remove();
    }

    // 만약 제거 했을 때 선택 된 의사 없으면 validation msg 넣기
    if (checkSelectDoctorLength() <= 0) {
        renderChoiceDoctorEmptyControll(true);
    }
}
/* e : choice 의료진 선택에 관련된 함수 */

export function unCheckedSelectDoctorList(_userId) {
    /* user id 에 해당하는 doctor 체크 여부 해제 */
    $(
        `.select_doctor .doctor_list .list_inner .doctor-list-item[data-user-id='${_userId}'] .input_wrap input`
    ).prop('checked', false);

    // 만약 제거 했을 때 선택 된 의사 없으면 validation msg 넣기
    if (checkSelectDoctorLength() <= 0) {
        renderChoiceDoctorEmptyControll(true);
    }
}

export function renderSelectDoctorList(_doctorList) {
    /* "의료진 선택 리스트" 렌더 함수 */
    let _html = errorText();
    if (_doctorList && _doctorList.length > 0) {
        _html = _doctorList.htmlFor((_data) => doctorListItemTmpl(_data));
    }
    $('.select_doctor .doctor_list .list_inner').html(_html);
}

/*  ---------------------------------------------
                init 함수
 ------------------------------------------------*/

async function renderInit() {
    // 초기 선택된 의사 없음 메세지 렌더
    renderChoiceDoctorEmptyControll(true);

    const _getDepartmentDoctorList = await selectHisDoctorList();
    const _getDoctorList = departmentDoctorListToBasicList(
        _getDepartmentDoctorList
    );

    // 의사 리스트 데이터 렌더
    renderSelectDoctorList(_getDoctorList);
}

renderInit();
