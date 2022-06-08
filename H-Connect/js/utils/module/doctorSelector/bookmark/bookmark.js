const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const { errorText, loadingText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

const { confirmTwoPopupTmpl, confirmOnePopupTmpl } = await import(
    importVersion('/H-Connect/js/common/popup/templates/commonPopupTmpl.js')
);

const { PopupController } = await import(
    importVersion(
        '/H-Connect/js/utils/module/popupController/popupController.js'
    )
);

const { departmentDoctorListToBasicList } = await import(
    importVersion('/H-Connect/js/utils/module/doctorSelector/utils.js')
);

function getUserInfo() {
    return JSON.parse(localStorageController.getLocalS('userData'));
}

export class BookmarkModule {
    constructor(_initOptions) {
        this.options = _initOptions;
        this.renderInit();
        this.actionInit();
    }
    async renderInit() {
        const _getBookmarkTabList = await this.API.selectBookMarkList();
        this.renderBookmarkTabList(_getBookmarkTabList);

        /* 초기 렌더시 첫번째 탭 리스트 노출 */
        const _firstBookmarkId = _getBookmarkTabList[0]?.bookmarkId;
        this.fetchBookmarkDoctorAndRender(_firstBookmarkId);
    }
    renderBookmarkTabList(_bookmarkTabList) {
        const { tab } = this.options ?? {};
        $(tab.target.container).html(loadingText());
        if (_bookmarkTabList && _bookmarkTabList.length > 0) {
            let _html = _bookmarkTabList.htmlFor((_data, _index) =>
                this.templates.bookmarkTabListItemTmpl(_data, _index)
            );
            $(tab.target.container).html(_html);
        } else {
            $(tab.target.container).html(
                errorText({ msg: '탭을 추가해주세요' })
            );
        }
    }
    async fetchBookmarkDoctorAndRender(_bookMarkId) {
        const _getBookmarkDoctorList = await this.API.selectBookMarkUserList({
            bookmarkId: _bookMarkId,
        });
        this.renderBookmarkDoctorList(_getBookmarkDoctorList);
    }
    renderBookmarkDoctorList(_bookmarkDoctorList) {
        const { list } = this.options ?? {};

        $(list.target.container).html(loadingText());
        /* "북마크 리스트" 렌더 함수 */
        let _html = errorText();
        if (_bookmarkDoctorList && _bookmarkDoctorList.length > 0) {
            _html = _bookmarkDoctorList.htmlFor((_data) =>
                this.templates.bookmarkDoctorListItemTmpl(_data)
            );
        }
        $(list.target.container).html(_html);

        /* check 된 의사 체크 활성화 */
        // let _choiceDoctorList = [];
        // $('.choice_staff .choice_member')
        //     .children('.mem')
        //     .each(function (_el) {
        //         _choiceDoctorList.push($(this).data('user-id'));
        //     });
        // for (let i = 0, len = _choiceDoctorList.length; i < len; i++) {
        //     const _targetClass = _choiceDoctorList[i];
        //     renderActivateCheckBox(_targetClass, true);
        // }
        // 만약 체크된 즐겨찾기 리스트를 찾을 수 없다면 의료진 목록 체크여부 전부 해제
        // resetBookmarkChecked();
        /* 기존 의사 체크박스 컨트롤 */
        // bookmarkListSelector.itemEls().each(function () {
        //     const _isChecked = $(this)
        //         .find('.favorite_container input')
        //         .is(':checked');
        //     const { userId } = $(this).data();
        //     renderActivateBookmark(userId, _isChecked);
        // });
    }
    actionInit() {
        this.actionTabSwipe();
        this.actionAddBookmarkTabPopup();
        this.actionDeleteBookmarkTabPopup();
    }
    // sync
    actionTabSwipe() {
        const { tab, list } = this.options ?? {};
        // 탭 클릭 시 탭 리스트 렌더 기능
        $(document).on(
            'click',
            `${tab.target.container} .group_list`,
            async (e) => {
                if (e.target.computedRole === 'img') return;
                if ($(e.target).hasClass('on')) return;
                const { bookmarkId } = $(e.currentTarget).data();
                await this.fetchBookmarkDoctorAndRender(bookmarkId);
                this.UTILS.resetTabClass();
                $(e.currentTarget).addClass('on');
            }
        );
        $(document).on('click', tab.target.nextBtn, async () => {
            const _$tabEls = $(`${tab.target.container} .group_list`);
            const _$tabOnEl = $(`${tab.target.container} .group_list.on`);
            const _tabTargetIndex = _$tabEls.index(_$tabOnEl);
            this.UTILS.resetTabClass();

            let _toIndex = 0;
            if (_$tabEls.length - 1 > _tabTargetIndex) {
                _toIndex = _tabTargetIndex + 1;
            }
            _$tabEls.eq(_toIndex).addClass('on');

            const { bookmarkId } = _$tabEls.eq(_toIndex).data();

            await this.fetchBookmarkDoctorAndRender(bookmarkId);
        });
    }
    actionAddBookmarkTabPopup() {
        const { tab, list, popup } = this.options ?? {};
        this.addBookmarkTabPopup = new PopupController({
            /* 북마크 추가 팝업 생성 */
            target: {
                openButton: tab.target.addBtn,
                appendWrap: popup.target.container,
            },
            templates: {
                popup: this.templates.addBookmarkTabPopupTmpl,
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
                        const _bookmarkNameVal = $(
                            _info.initData.target.appendWrap
                        )
                            .find('#bookmark_name')
                            .val();
                        if (_bookmarkNameVal.length > 0) {
                            await this.API.insertBookMark({
                                bookmarkName: _bookmarkNameVal,
                            });

                            _info.closePopup();

                            const _getBookmarkInfoList =
                                await this.API.selectBookMarkList();
                            this.renderBookmarkTabList(_getBookmarkInfoList);
                        } else {
                        }
                    },
                },
            },
        });
    }
    actionDeleteBookmarkTabPopup() {
        const { tab, list, popup } = this.options ?? {};
        this.deleteBookmarkTabPopup = new PopupController({
            /* 북마크 탭 제거 팝업 생성 */
            target: {
                openButton: tab.target.deleteBtn,
                appendWrap: popup.target.container,
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
                        const _$tabTargetEl =
                            _$deleteBtnEl.closest('.group_list');
                        const _tabTargetId = _$tabTargetEl.data('bookmark-id');
                        const _isDeleted = await this.API.deleteBookMark({
                            bookmarkId: _tabTargetId,
                        });

                        _info.closePopup();

                        if (_isDeleted) {
                            const _$bookmarkListWrapEl = $(
                                list.target.container
                            );

                            if (_$tabTargetEl.hasClass('on')) {
                                // 활성화 되어있는 탭을 지울 시 1번째 탭 활성화 기능
                                const _$tabFirstEl = _$bookmarkListWrapEl
                                    .find('.group_list')
                                    .eq(0);
                                _$tabFirstEl.addClass('on');
                                const { bookmarkId } = _$tabFirstEl.data();
                                this.fetchBookmarkDoctorAndRender(bookmarkId);
                            }
                            _$tabTargetEl.remove();

                            const _$bookmarkListTabEls =
                                _$bookmarkListWrapEl.children('.group_list');
                            if (_$bookmarkListTabEls.length <= 0) {
                                _$bookmarkListWrapEl.html(
                                    errorText({ msg: '탭을 추가해주세요' })
                                );
                            }
                        } else {
                            alert('탭을 제거하는데 실패하셨습니다');
                        }
                    },
                },
            },
        });
    }
    UTILS = {
        resetBookmarkChecked: () => {
            const { list } = this.options ?? {};
            $(`${list.target.container} .favorite_container input`).each(
                function () {
                    $(this).prop('checked', false);
                }
            );
        },
        resetTabClass: () => {
            const { tab } = this.options ?? {};
            $(`${tab.target.container} .group_list`).each(function () {
                if ($(this).hasClass('on')) $(this).removeClass('on');
            });
        },
    };
    API = {
        selectBookMarkList: async () => {
            /* 북마크 탭 리스트 조회 API */
            const { id } = getUserInfo();
            if (!id) return;
            const res = await serverController.ajaxAwaitController(
                'API/Doctor/SelectBookMarkList',
                'POST',
                JSON.stringify({
                    ...commonRequest(),
                    bookmarkChannel: 1,
                    userId: id,
                }),
                (res) => {},
                (err) => console.error(err)
            );
            if (res.result) {
                return res.bookmarkInfoList;
            }
        },
        selectBookMarkUserList: async ({ bookmarkId }) => {
            /* 북마크 유저 리스트 조회 API */
            const { id } = getUserInfo();
            if (!id) return;
            const res = await serverController.ajaxAwaitController(
                'API/Doctor/SelectBookMarkUserList',
                'POST',
                JSON.stringify({
                    ...commonRequest(),
                    userId: id,
                    bookmarkId: bookmarkId ?? '',
                }),
                (res) => {},
                (err) => console.error(err)
            );
            if (res.result) {
                return res.bookmarkInfoList;
            }
        },
        insertBookMark: async ({ bookmarkName }) => {
            /* 의료진 즐겨찾기 "탭" 추가 API */
            const { id } = getUserInfo();
            if (!id) return;
            const res = await serverController.ajaxAwaitController(
                'API/Doctor/InsertBookMark',
                'POST',
                JSON.stringify({
                    ...commonRequest(),
                    bookmarkChannel: 1,
                    bookmarkName: bookmarkName,
                    userId: id,
                }),
                (res) => {},
                (err) => console.error(err)
            );
            return res;
        },
        deleteBookMark: async ({ bookmarkId }) => {
            /* 의료진 즐겨찾기 "탭" 삭제 API */
            const { id } = getUserInfo();
            if (!id) return;
            const res = await serverController.ajaxAwaitController(
                'API/Doctor/DeleteBookMark',
                'POST',
                JSON.stringify({
                    ...commonRequest(),
                    bookmarkId: bookmarkId,
                    userId: id,
                }),
                (res) => {},
                (err) => console.error(err)
            );
            if (res.result) {
                return true;
            } else {
                return false;
            }
        },
    };
    templates = {
        bookmarkTabListItemTmpl: (_data, _index) => {
            const { bookmarkId, bookmarkName } = _data ?? {};
            // 북마크 탭 템플릿
            // on 추가시 활성화
            return `
            <div class="group_list ${
                _index === 0 ? 'on' : ''
            }" data-bookmark-id='${bookmarkId}' data-bookmark-name='${bookmarkName}'>
                <p>${bookmarkName}</p>
                <button type="button" class="btn_del">
                    <img src="/H-Connect/img/icon/delete.svg"
                        alt="의료진삭제버튼아이콘" />
                </button>
            </div>
            `;
        },
        bookmarkDoctorListItemTmpl: (_data) => {
            // 선택 될 의사 리스트 아이템
            const {
                userId,
                userName,
                userDepartmentCode,
                userDepartmentName,
                bookmarkState,
                bookmarkId,
            } = _data ?? {};
            return `
            <div class='doctor-list-item' data-user-id='${userId}' data-user-name='${userName}' data-department-code='${userDepartmentCode}' data-department-name='${userDepartmentName}' data-bookmark-id='${bookmarkId}'>
                <div class="input_wrap">
                    <input type="checkbox" name="doctor" id="${
                        'check-bookmark' + userId
                    }"
                        class="check-${userId} green_custom">
                    <label for="${'check-bookmark' + userId}"></label>
                    <label for="${'check-bookmark' + userId}">
                        <span>${userName}</span>
                        <span>${userDepartmentName}</span>
                    </label>
                </div>
        
                <div class="favorite_container">
                    <input class='favorite-${userId}' type="checkbox" id="${
                'favorite-bookmark-' + userId
            }" ${bookmarkState === 1 ? 'checked' : ''}>
                    <label for="${'favorite-bookmark-' + userId}"></label>
                </div>
            </div>
          `;
        },
        addBookmarkTabPopupTmpl: () => {
            // 즐겨찾기 탭 추가 팝업
            return `
            <div class="pop new_bookmark_tab">
                <div class="overlay">
                    <div class="pop_cont">
                        <div class="title">
                            <h2>즐겨찾기 탭</h2>
                        </div>
        
                        <div class="content">
                            <p>탭 이름</p>
        
                            <input id="bookmark_name" type="text" />
                        </div>
        
                        <div class="btn_list">
                            <button type="button" class="btn rd btn_cancel">
                                취소
                            </button>
                            <button
                                id="ward_Button"
                                type="button"
                                class="btn blf btn_check"
                            >
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          `;
        },
    };
}
