const { selectBookMarkList, insertBookMark, deleteBookMark } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/remoteNewAPI.js'
    )
);

const { renderBookmarkTabList } = await import(
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
                const _$tabTargetEl = $(_info.eventTarget).closest(
                    '.group_list'
                );
                const _tabTargetId = _$tabTargetEl.data('bookmark-id');
                const isDeleted = await deleteBookMark({
                    bookmarkId: _tabTargetId,
                });
                removeBookmarkTabPopup.closePopup();
                if (isDeleted) {
                    _$tabTargetEl.remove();

                    const _$bookmarkListWrapEl = $(
                        '.favorite_list .favorite_list_wrap'
                    );
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
