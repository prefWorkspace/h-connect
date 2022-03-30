const { request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

export const parseRecord = (_data) => {
    const { recordDateTime, systolic, diastolic, pulse, indexId } = _data || {};
    return `
    <div class="bloodPressure_item" data-indexId=${indexId} data-recordDateTime='${request_Date_Data(
        recordDateTime
    )}'>
      <div class="text_box">
          <p>
              <span>${recordDateTime.getFullYear()}</span>.
              <span>${(recordDateTime.getMonth() + 1)
                  .toString()
                  .padStart(2, '0')}</span>.
              <span>${recordDateTime
                  .getDate()
                  .toString()
                  .padStart(2, '0')}</span>
          </p>
          <p>
              <span>${recordDateTime
                  .getHours()
                  .toString()
                  .padStart(2, '0')}</span>:
              <span>${recordDateTime
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')}</span>:
              <span>${recordDateTime
                  .getSeconds()
                  .toString()
                  .padStart(2, '0')}</span>
          </p>
    
          <p>
              SYS : 
              <span class="SYS-item">${systolic}</span>
          </p>
    
          <p>
              DIA : 
              <span class="DIA-item">${diastolic}</span>
          </p>
    
          <p>
              Pulse : 
              <span class="Pulse-item">${pulse}</span>
          </p>
      </div>
    
      <div class="btn_list">
          <button data-indexId=${indexId} type="button" class="btn bl btn_modify"
          onclick=window.onClickUpdateBloodPressureBtn(this)>수정</button>
          <button data-indexId=${indexId} type="button" class="btn rd btn_delete" onclick=window.onClickDeleteBloodPressureBtn(this)>삭제</button>
      </div>
    </div>
    `;
};

export const parsePaginationBlock = ({ page, list, totalCount }) => {
    const totalPageCount = Math.ceil(totalCount / 10);
    const returnMin = () => {
        if (totalPageCount <= 10) {
            // 전체 페이지 10 이하
            return 1;
        } else {
            // 전체 페이지 10 초과
            if (page < 6) {
                return 1;
            } else if (page > 6 && page > totalPageCount - 4) {
                return totalPageCount - 9;
            } else {
                return page - 5;
            }
        }
    };
    const returnMax = () => {
        if (totalPageCount <= 10) {
            // 전체 페이지 10 이하
            return totalPageCount;
        } else {
            // 전체 페이지 10 초과
            if (page < 6) {
                return 10;
            } else if (page >= 6 && page > totalPageCount - 4) {
                return totalPageCount;
            } else {
                return page + 4;
            }
        }
    };
    console.log(returnMin(), returnMax());

    const returnPageList = () => {
        let pageArr = [];
        for (let i = returnMin(); i <= returnMax(); i++) {
            pageArr.push(i);
        }
        return pageArr;
    };
    const sendPageControllerInform = JSON.stringify({
        page: page,
        totalCount: totalCount,
        totalPageCount: totalPageCount,
    });
    return `
    ${
        totalCount > 0
            ? `
        <ul>
            <li><a href="#" onclick='event.preventDefault(); window.onClickPageControllBtn("first",${sendPageControllerInform})'>&lt;&lt;</a></li>
            <li><a href="#" onclick='event.preventDefault(); window.onClickPageControllBtn("prev",${sendPageControllerInform})'>&lt;</a></li>

            ${returnPageList().htmlFor((item, index) => {
                return parsePageNumber({
                    number: item,
                    isActive: item === page,
                });
            })}
            ${
                totalPageCount > 10 && page !== totalPageCount
                    ? `<li> ... <a href="#" onclick='event.preventDefault(); window.onClickPageControllBtn("end",${sendPageControllerInform})'>${totalPageCount}</a></li>`
                    : ''
            }
            

            <li><a href="#" onclick='event.preventDefault(); window.onClickPageControllBtn("next",${sendPageControllerInform})'>&gt;</a></li>
            <li><a href="#" onclick='event.preventDefault(); window.onClickPageControllBtn("end",${sendPageControllerInform})'>&gt;&gt;</a></li>
        </ul>
        `
            : ''
    }
    `;
};
const parsePageNumber = ({ number, isActive }) => {
    return `
    <li class="${isActive ? 'active' : ''}">
        <a href="#" onclick='event.preventDefault(); window.onClickPaginationNumBtn(${number});'>${number}</a>
    </li>
    `;
};
