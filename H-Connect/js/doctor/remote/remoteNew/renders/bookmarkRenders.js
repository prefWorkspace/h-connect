const { selectBookMarkList, selectBookMarkUserList } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/remoteNewAPI.js'
    )
);

const { bookmarkTabListItemTmpl, bookmarkDoctorListItemTmpl } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/templates/bookmarkSectionTmpl.js'
    )
);

const { bookmarkListSelector } = await import(
    importVersion('/H-Connect/js/doctor/remote/remoteNew/actions/selector.js')
);

const { renderActivateCheckBox, renderActivateBookmark } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/commonRenders.js'
    )
);

const { errorText, loadingText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

export function renderBookmarkTabList(_bookmarkInfoList) {
    const _$bookmarkListWrapEl = $('.favorite_list .favorite_list_wrap');
    _$bookmarkListWrapEl.html(loadingText());
    if (_bookmarkInfoList && _bookmarkInfoList.length > 0) {
        let _html = _bookmarkInfoList.htmlFor((_data, index) => {
            return bookmarkTabListItemTmpl(_data, index);
        });
        _$bookmarkListWrapEl.html(_html);
    } else {
        _$bookmarkListWrapEl.html(errorText({ msg: '탭을 추가해주세요' }));
    }
}
export function renderBookmarkDoctorList(_doctorList) {
    function resetBookmarkChecked() {
        $(
            '.select_doctor .doctor_list .doctor-list-item .favorite_container input'
        ).each(function () {
            $(this).prop('checked', false);
        });
    }
    $('.favorite_list .list_inner').html(loadingText());
    /* "북마크 리스트" 렌더 함수 */
    let _html = errorText();
    if (_doctorList && _doctorList.length > 0) {
        _html = _doctorList.htmlFor((_data) => {
            /* 북마크 html 생성 */
            return bookmarkDoctorListItemTmpl(_data);
        });
    }
    $('.favorite_list .list_inner').html(_html);

    /* check 된 의사 체크 활성화 */
    let _choiceDoctorList = [];
    $('.choice_staff .choice_member')
        .children('.mem')
        .each(function (_el) {
            _choiceDoctorList.push($(this).data('user-id'));
        });
    for (let i = 0, len = _choiceDoctorList.length; i < len; i++) {
        const _targetClass = _choiceDoctorList[i];
        renderActivateCheckBox(_targetClass, true);
    }
    // 만약 체크된 즐겨찾기 리스트를 찾을 수 없다면 의료진 목록 체크여부 전부 해제
    resetBookmarkChecked();
    /* 기존 의사 체크박스 컨트롤 */
    bookmarkListSelector.itemEls().each(function () {
        const _isChecked = $(this)
            .find('.favorite_container input')
            .is(':checked');
        const { userId } = $(this).data();
        renderActivateBookmark(userId, _isChecked);
    });
}

export async function renderInitBookmark() {
    /* 의사 리스트가 렌더링이 된 후 북마크 정보를 렌더링 시켜줍니다. */
    const _getBookmarkInfoList = await selectBookMarkList();
    renderBookmarkTabList(_getBookmarkInfoList);

    /* 초기 렌더시 첫번째 탭 리스트 노출 */
    const _firstBookmarkId = _getBookmarkInfoList[0]?.bookmarkId;
    const _getBookmarkDoctorList = await selectBookMarkUserList({
        bookmarkId: _firstBookmarkId,
    });
    renderBookmarkDoctorList(_getBookmarkDoctorList);
}
