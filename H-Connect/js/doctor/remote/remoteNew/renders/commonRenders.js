const { coopParticipantInformSelector, choiceDoctorSelector } = await import(
    importVersion('/H-Connect/js/doctor/remote/remoteNew/actions/selector.js')
);

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

const { validateCoopAll } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/dataActions.js'
    )
);

export function renderChoiceDoctorEmptyControll(_isEmpty) {
    // 선택된 의사 없을때 메세지 표시 여부 렌더 함수
    if (_isEmpty) {
        choiceDoctorSelector
            .wrapEl()
            .html(errorText({ msg: '선택된 의사가 없습니다' }));
        coopParticipantInformSelector
            .wrapEl()
            .html(errorText({ msg: '선택된 의사가 없습니다' }));
    } else {
        choiceDoctorSelector.wrapEl().children('.error_text').remove();
        coopParticipantInformSelector.wrapEl().children('.error_text').remove();
    }
}

export function renderResetCheckBox() {
    // 의료진 선택 checkbox 동기화
    /* 이름에 . 이 들어가서 vanilla js*/
    const _$checkItemEls = $('.doctor-list-item .input_wrap input');
    _$checkItemEls.each(function () {
        $(this).prop('checked', false);
    });
}
export function renderParticipantDoctorEmptyControll(_isEmpty) {
    // 콘텐츠 케이스 선택된 의사 없을때 메세지 표시 여부 렌더 함수
    if (_isEmpty) {
        coopParticipantInformSelector
            .wrapEl()
            .html(errorText({ msg: '선택된 의사가 없습니다' }));
    } else {
        coopParticipantInformSelector.wrapEl().children('.error_text').remove();
    }
}

export function renderChoiceDoctorValidation() {
    // 만약 제거 했을 때 선택 된 의사 없으면 validation msg 넣기
    if (choiceDoctorSelector.itemEls().length <= 0) {
        renderChoiceDoctorEmptyControll(true);
    }
    if (coopParticipantInformSelector.itemEls() <= 0) {
        renderParticipantDoctorEmptyControll(true);
    }
}

/* s : 동기화 함수 */

export function renderActivateChoiceDoctor(_targetData) {
    /* 선택된 의사 (의료진 선택 , 협진 참여자 정보) 정보 동기화 */
    if (_targetData) {
        const _$choiceItemEls = $(
            `.choice_member .mem[data-user-id='${_targetData}']`
        );
        _$choiceItemEls.each(function () {
            $(this).remove();
        });
    }

    renderChoiceDoctorValidation();
    renderActivateChoiceDoctorLength();
    const _checkValidateAll = validateCoopAll();

    return { pass: _checkValidateAll };
}

export function renderActivateChoiceDoctorLength() {
    /* 선택된 의사 (의료진 선택 , 협진 참여자 정보) "명수" 정보 동기화 */
    const _choiceDoctorLen = choiceDoctorSelector.itemEls().length;
    coopParticipantInformSelector.numberEl().text(_choiceDoctorLen ?? 0);
    choiceDoctorSelector.numberEl().text(_choiceDoctorLen ?? 0);
}

export function renderActivateCheckBox(_targetClass, _checkBool) {
    // 의료진 선택 checkbox 동기화
    /* 이름에 . 이 들어가서 vanilla js*/
    const _$checkItemEls = $(
        document.getElementsByClassName(`check-${_targetClass}`)
    );
    _$checkItemEls.each(function () {
        $(this).prop('checked', _checkBool);
    });
}

export function renderActivateBookmark(_targetClass, _checkBool) {
    // 즐겨찾기( bookmark ) 동기화
    /* 이름에 . 이 들어가서 vanilla js*/
    const _$checkItemEls = $(
        document.getElementsByClassName(`favorite-${_targetClass}`)
    );
    _$checkItemEls.each(function () {
        $(this).prop('checked', _checkBool);
    });
}

// 협진 생성 버튼
export function renderActivateCreateCoopBtn(_bool) {
    // 협진 생성 활성화 여부 컨트롤
    $('#create_cooperation_btn').attr('disabled', !_bool);
}

export function renderCreateCooperationText(_sectionType) {
    let _btnText = '';
    switch (_sectionType) {
        case '실시간원격협진':
            _btnText = '협진생성';
            break;
        case '소견요청협진':
            _btnText = '협진생성';
            break;
        case '협진일정요청':
            _btnText = '일정요청';
            break;
    }
    $('#create_cooperation_btn').text(_btnText);
}

/* e : 동기화 함수 */
