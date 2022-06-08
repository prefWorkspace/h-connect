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
    }
    async renderInit() {
        const _getBookmarkTabList = await this.API.selectBookMarkList();
        console.log('_getBookmarkTabList: ', _getBookmarkTabList);
        this.renderBookmarkTabList(_getBookmarkTabList);
    }
    renderBookmarkTabList(_bookmarkTabList) {
        console.log('_bookmarkTabList: ', _bookmarkTabList);
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
