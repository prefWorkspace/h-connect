export const confirmTwoPopupTmpl = ({
    type,
    title,
    message,
    cancelText,
    submitText,
}) => {
    /* type은 confirm 과 delete */
    return `
    <div class="pop check_bl ${type === 'delete' ? 'rd' : ''}">
        <div class="overlay" style="display: block;">
            <div class="pop_cont">
                <div class="img">
                    <img src="/H-Connect/img/logo.png" alt="로고" />
                </div>
                <h3>${title || '안내 메세지'}</h3>
                <h2>${message || '확인 메세지'}</h2>
                <div class="btn_list">
                    <button type="button" class="btn gr">
                        ${cancelText || '아니요'}
                    </button>
                    <button type="button" class="btn blf">
                        ${
                            submitText || type === 'delete'
                                ? '네, 삭제합니다'
                                : '네, 확인합니다.'
                        }
                    </button>
                </div>
            </div>
        </div>
    </div>
  `;
};

export const confirmOnePopupTmpl = ({ type, title, message, submitText }) => {
    return `
  <div class="pop lg_btn ${type === 'delete' ? 'rd' : ''}">
      <div class="overlay" style="display: block;">
          <div class="pop_cont">
              <div class="img">
                  <img src="/H-Connect/img/logo.png" alt="로고" />
              </div>
              <h3>${title || '안내 메세지'}</h3>
              <h2>${message || '확인 메세지'}</h2>
              <button type="button" class="btn">
                  ${
                      submitText || type === 'delete'
                          ? '네, 삭제합니다'
                          : '네, 확인합니다.'
                  }
              </button>
          </div>
      </div>
  </div>
  `;
};
