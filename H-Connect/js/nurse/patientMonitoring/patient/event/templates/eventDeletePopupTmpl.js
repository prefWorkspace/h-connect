export const eventDeletePopupTmpl = async () => {
    return `
    <div class="pop delete event">
      <div class="overlay">
          <div class="pop_cont">
              <div>
                  <img src="/H-Connect/img/logo.png" alt="로고" />
              </div>

              <h3>선택한 이벤트를 삭제합니다.</h3>
              <h1>삭제 하시겠습니까?</h1>

              <div class="btn_list">
                  <button type="button" class="btn gr btn_no">
                      아니요
                  </button>
                  <button type="button" class="btn rdf btn_delete">
                      네, 삭제합니다
                  </button>
              </div>
          </div>
      </div>
    </div>
  `;
};
