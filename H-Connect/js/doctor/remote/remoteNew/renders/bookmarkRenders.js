const { selectBookMarkList } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/remoteNewAPI.js'
    )
);

const { bookmarkTabListItemTmpl } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/templates/bookmarkSectionTmpl.js'
    )
);

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

export function renderBookmarkTabList(_bookmarkInfoList) {
    console.log('_bookmarkInfoList: ', _bookmarkInfoList);
    const _$bookmarkListWrapEl = $('.favorite_list .favorite_list_wrap');
    if (_bookmarkInfoList && _bookmarkInfoList.length > 0) {
        let _html = _bookmarkInfoList.htmlFor((_data) => {
            return bookmarkTabListItemTmpl(_data);
        });
        _$bookmarkListWrapEl.html(_html);
    } else {
        _$bookmarkListWrapEl.html(errorText({ msg: '탭을 추가해주세요' }));
    }
}
export function renderBookmarkDoctorList(_doctorList) {
    /* "북마크 리스트" 렌더 함수 */
    let _html = errorText();
    if (_doctorList && _doctorList.length > 0) {
        _html = _doctorList.htmlFor((_data) => doctorListItemTmpl(_data));
    }
    $('.favorite_list .list_inner').html(_html);
}

async function renderInit() {
    const _getBookmarkInfoList = await selectBookMarkList();
    renderBookmarkTabList(_getBookmarkInfoList);
}

renderInit();
