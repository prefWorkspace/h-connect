const { selectHisDoctorList } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/remoteNewAPI.js'
    )
);
const { choiceDoctorSelector, coopParticipantInformSelector } = await import(
    importVersion('/H-Connect/js/doctor/remote/remoteNew/actions/selector.js')
);
const { departmentDoctorListToBasicList, validateCoopAll } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/dataActions.js'
    )
);
const {
    renderChoiceDoctorEmptyControll,
    renderActivateChoiceDoctorLength,
    renderChoiceDoctorValidation,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/commonRenders.js'
    )
);
const { renderInitBookmark } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/bookmarkRenders.js'
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

/* s : choice 의료진 선택에 관련된 함수 */
function findChoiceDoctorUserIdIndex(_userId) {
    // user id 기준 choice doctor 에서 index 찾기 함수
    return $(
        `.choice_staff .choice .choice_member .mem[data-user-id='${_userId}']`
    ).index();
}

/*  ---------------------------------------------
                    렌더링 함수
------------------------------------------------*/

export function renderChoiceDoctorList(_docData) {
    /* "선택 된 의료진" 리스트 렌더 함수 */
    renderChoiceDoctorEmptyControll(false);
    const { userId } = _docData ?? {};
    if (findChoiceDoctorUserIdIndex(userId) === -1) {
        // 중복 되는 id 가 없다면 append 해주기
        choiceDoctorSelector.wrapEl().append(choiceDoctorItemTmpl(_docData));
        coopParticipantInformSelector
            .wrapEl()
            .append(choiceDoctorItemTmpl(_docData));
    }
    renderActivateChoiceDoctorLength();
    renderChoiceDoctorValidation();

    const _checkValidateAll = validateCoopAll();
}

export function removeChoiceDoctorList(_docData) {
    /* 선택된 의사 에서 체크 해제된 의사 지워주기 */
    const { userId } = _docData ?? {};
    const _choiceDocDuplIndex = findChoiceDoctorUserIdIndex(userId);
    if (_choiceDocDuplIndex !== -1) {
        // index 찾으면 지워주기
        choiceDoctorSelector.itemEls().eq(_choiceDocDuplIndex).remove();
        coopParticipantInformSelector
            .itemEls()
            .eq(_choiceDocDuplIndex)
            .remove();
    }
    renderActivateChoiceDoctorLength();
    renderChoiceDoctorValidation();

    const _checkValidateAll = validateCoopAll();
}
/* e : choice 의료진 선택에 관련된 함수 */

export function renderSelectDoctorList(_doctorList) {
    /* "의료진 리스트" 렌더 함수 */
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
    const _getDepartmentDoctorList = await selectHisDoctorList();
    const _getDoctorList = departmentDoctorListToBasicList(
        _getDepartmentDoctorList
    );

    /* 의사 리스트 데이터 렌더 */
    renderSelectDoctorList(_getDoctorList);
    /* 의사 리스트가 렌더링이 된 후 즐겨찾기 렌더링*/
    renderInitBookmark();
}

renderInit();
