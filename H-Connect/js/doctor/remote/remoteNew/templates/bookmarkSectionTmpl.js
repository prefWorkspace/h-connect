export const bookmarkTabListItemTmpl = (_data) => {
    const { bookmarkId, bookmarkName } = _data ?? {};
    // 북마크 탭 템플릿
    // on 추가시 활성화
    return `
  <div class="group_list" data-bookmark-id='${bookmarkId}' data-bookmark-name='${bookmarkName}'>
      <p>${bookmarkName}</p>
      <button type="button" class="btn_del">
          <img src="/H-Connect/img/icon/delete.svg"
              alt="의료진삭제버튼아이콘" />
      </button>
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
