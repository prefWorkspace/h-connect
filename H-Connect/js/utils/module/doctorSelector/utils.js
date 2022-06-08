export function departmentDoctorListToBasicList(_departmentDoctorList) {
    /* 각 과별 의사 목록 하나로 합치는 리스트 함수 */
    let resultList = [];
    if (!_departmentDoctorList) return [];
    for (let i = 0, len = _departmentDoctorList.length; i < len; i++) {
        const { doctorInfo } = _departmentDoctorList[i] ?? {};
        resultList = resultList.concat(doctorInfo);
    }
    return resultList;
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
