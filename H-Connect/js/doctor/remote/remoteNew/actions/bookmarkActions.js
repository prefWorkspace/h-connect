const {
    selectBookMarkList,
    insertBookMark,
    deleteBookMark,
    selectBookMarkUserList,
    insertBookMarkDetail,
    deleteBookMarkDetail,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/remoteNewAPI.js'
    )
);

const { doctorListSelector, bookmarkTabSelector } = await import(
    importVersion('/H-Connect/js/doctor/remote/remoteNew/actions/selector.js')
);

const { renderActivateCheckBox, renderActivateBookmark } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/commonRenders.js'
    )
);

const { renderBookmarkTabList, renderBookmarkDoctorList } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/bookmarkRenders.js'
    )
);
const { addBookmarkTabPopupTmpl } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/templates/bookmarkSectionTmpl.js'
    )
);
const { confirmTwoPopupTmpl, confirmOnePopupTmpl } = await import(
    importVersion('/H-Connect/js/common/popup/templates/commonPopupTmpl.js')
);

const { PopupController } = await import(
    importVersion(
        '/H-Connect/js/utils/module/popupController/popupController.js'
    )
);

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

async function controllViewChecked(_bookmarkId) {
    // 성공시 북마크 다시 리패치
    const _getBookmarkDoctorList = await selectBookMarkUserList({
        bookmarkId: _bookmarkId,
    });
    renderBookmarkDoctorList(_getBookmarkDoctorList);
}

const addBookmarkTabPopup = new PopupController({
    /* 북마크 추가 팝업 생성 */
    target: {
        openButton: '.favorite_list .btn_add',
        appendWrap: '.bookmark_popup_wrap',
    },
    templates: {
        popup: addBookmarkTabPopupTmpl,
    },
    popupBtn: {
        cancelBtn: {
            target: '.btn_cancel',
            close: true,
        },
        submitBtn: {
            target: '.btn_check',
            close: false,
            action: async (_info) => {
                const _bookmarkNameVal = $(_info.initData.target.appendWrap)
                    .find('#bookmark_name')
                    .val();
                if (_bookmarkNameVal.length > 0) {
                    await insertBookMark({ bookmarkName: _bookmarkNameVal });
                    addBookmarkTabPopup.closePopup();

                    const _getBookmarkInfoList = await selectBookMarkList();
                    renderBookmarkTabList(_getBookmarkInfoList);
                } else {
                }
            },
        },
    },
});

const removeBookmarkTabPopup = new PopupController({
    /* 북마크 탭 제거 팝업 생성 */
    target: {
        openButton: '.favorite_list_wrap .btn_del',
        appendWrap: '.bookmark_popup_wrap',
    },
    templates: {
        popup: () => confirmTwoPopupTmpl({ type: 'delete' }),
    },
    popupBtn: {
        cancelBtn: {
            target: '.btn.gr',
            close: true,
        },
        submitBtn: {
            target: '.btn.blf',
            close: false,
            action: async (_info) => {
                const _$deleteBtnEl = $(_info.eventTarget);
                const _$tabTargetEl = _$deleteBtnEl.closest('.group_list');
                const _tabTargetId = _$tabTargetEl.data('bookmark-id');
                const _isDeleted = await deleteBookMark({
                    bookmarkId: _tabTargetId,
                });
                removeBookmarkTabPopup.closePopup();
                if (_isDeleted) {
                    const _$bookmarkListWrapEl = $(
                        '.favorite_list .favorite_list_wrap'
                    );

                    if (_$tabTargetEl.hasClass('on')) {
                        // 활성화 되어있는 탭을 지울 시 1번째 탭 활성화 기능
                        const _$tabFirstEl = _$bookmarkListWrapEl
                            .find('.group_list')
                            .eq(0);
                        _$tabFirstEl.addClass('on');
                        const { bookmarkId } = _$tabFirstEl.data();
                        controllViewChecked(bookmarkId);
                    }
                    _$tabTargetEl.remove();

                    const _$bookmarkListTabEls =
                        _$bookmarkListWrapEl.children('.group_list');
                    if (_$bookmarkListTabEls.length <= 0) {
                        _$bookmarkListWrapEl.html(
                            errorText({ msg: '탭을 추가해주세요' })
                        );
                    }
                }
            },
        },
    },
});

function tabSwipeActions() {
    // 탭 클릭 시 탭 리스트 렌더 기능
    bookmarkTabSelector.wrapEl().on('click', '.group_list', async function (e) {
        if (e.target.computedRole === 'img') return;
        if ($(this).hasClass('on')) return;
        const { bookmarkId } = $(this).data();
        const _getBookmarkDoctorList = await selectBookMarkUserList({
            bookmarkId: bookmarkId,
        });
        renderBookmarkDoctorList(_getBookmarkDoctorList);
        resetTabClass();
        $(this).addClass('on');
    });
    $('.favorite_list .btn_next').on('click', function () {
        const _$tabEls = bookmarkTabSelector.itemEls();
        const _$tabOnEl = bookmarkTabSelector.itemEls({ hasClass: 'on' });
        const _tabTargetIndex = _$tabEls.index(_$tabOnEl);
        resetTabClass();
        let _toIndex = 0;
        if (_$tabEls.length - 1 > _tabTargetIndex) {
            _toIndex = _tabTargetIndex + 1;
        }
        _$tabEls.eq(_toIndex).addClass('on');

        const { bookmarkId } = _$tabEls.eq(_toIndex).data();
        controllViewChecked(bookmarkId);
    });
    function resetTabClass() {
        $('.favorite_list .favorite_list_wrap .group_list').each(function () {
            if ($(this).hasClass('on')) $(this).removeClass('on');
        });
    }
}

function activatebookmarkActions() {
    // 즐겨찾기 해제 및 활성화 기능
    doctorListSelector
        .wrapEl()
        .on(
            'change',
            '.doctor-list-item .favorite_container input',
            async function () {
                const _isChecked = $(this).is(':checked');
                const { userId, userName, departmentName, departmentCode } = $(
                    this
                )
                    .closest('.doctor-list-item')
                    .data();
                const { bookmarkId } = $(
                    '.favorite_list_wrap .group_list.on'
                ).data();
                renderActivateBookmark(userId, _isChecked);

                if (_isChecked) {
                    // 즐겨찾기 유저 추가
                    const { result } = await insertBookMarkDetail({
                        bookmarkId: bookmarkId,
                        addUserId: userId,
                        addUserName: userName,
                        addUserDepartmentName: departmentName,
                        addUserDepartmentCode: departmentCode,
                    });
                    /* 즐겨찾기 유저 추가 시 리패치 */
                    result && (await controllViewChecked(bookmarkId));
                    /* 의료진 체크여부 확인 후 즐겨찾기 체크에 표시 */
                    const _isTargetChecked = $(this)
                        .closest('.doctor-list-item')
                        .find('.input_wrap input[type="checkbox"]')
                        .is(':checked');
                    renderActivateCheckBox(userId, _isTargetChecked);
                } else {
                    // 즐겨찾기 유저 제거
                    const { result } = await deleteBookMarkDetail({
                        bookmarkId: bookmarkId,
                        delUserId: userId,
                    });
                    /* 즐겨찾기 유저 추가 시 리패치 */
                    result && (await controllViewChecked(bookmarkId));
                }
            }
        );
}

function initActions() {
    tabSwipeActions();
    activatebookmarkActions();
}

initActions();
