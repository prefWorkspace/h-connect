export const bookmarkTabListItemTmpl = (_data, index) => {
    const { bookmarkId, bookmarkName } = _data ?? {};
    // 북마크 탭 템플릿
    // on 추가시 활성화
    return `
    <div class="group_list ${
        index === 0 ? 'on' : ''
    }" data-bookmark-id='${bookmarkId}' data-bookmark-name='${bookmarkName}'>
        <p>${bookmarkName}</p>
        <button type="button" class="btn_del">
            <img src="/H-Connect/img/icon/delete.svg"
                alt="의료진삭제버튼아이콘" />
        </button>
    </div>
    `;
};

export const bookmarkDoctorListItemTmpl = (_data) => {
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
};

export const addBookmarkTabPopupTmpl = () => {
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
};
