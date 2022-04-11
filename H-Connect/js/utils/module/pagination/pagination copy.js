const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);

const historyMeasurementCode = history.getParams('measurement_code');
let instanceOfConstructor = {};
export const createPagination = async (_data = instanceOfConstructor) => {
    instanceOfConstructor = _data;
    const { API, target, templates } = _data || {};
    const historyPage = history.getParams('page');
    const resPage = parseInt(historyPage, 10) || 1;
    const { page, records, totalCount } = await API(resPage);
    renderPagination({ page, list: records, totalCount, target });
    let _html = '';
    if (totalCount && records) {
        _html = records?.htmlFor((_item) => {
            return templates?.listItem(_item);
        });
    }
    $(`${target?.listWrap}`).html(_html);
};

const renderPagination = async (_listData) => {
    const { page, list, target } = _listData || {};
    $(`${target.pagination}`).html(paginationBlock(_listData));
    if (page > 1 && !list) {
        // 만약 해당 페이지에 리스트 데이터가 없다면 페이지 -1 뒤로 보내기
        const _origin = window.location.origin;
        const _pathname = window.location.pathname;
        window.history.pushState(
            '',
            '',
            `${_origin + _pathname}?${paramFindToKeepParam()}&page=${page - 1}`
        );
        await createPagination();
    }
};

export const paginationBlock = ({ page, list, totalCount }) => {
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

function paramFindToKeepParam() {
    // 유지되어야할 parameter을 찾아줍니다.
    const { keepParams } = instanceOfConstructor?.link || {};
    if (keepParams && keepParams?.length > 0) {
        return keepParams
            ?.map((_key) => {
                if (history.getParams(_key)) {
                    return `${_key}=${history.getParams(_key)}`;
                } else {
                    return '';
                }
            })
            .join('&');
    }
}

async function onClickPaginationNumBtn(_number) {
    const _origin = window.location.origin;
    const _pathname = window.location.pathname;

    window.history.pushState(
        '',
        '',
        `${_origin + _pathname}?${paramFindToKeepParam()}&page=${_number}`
    );
    await createPagination();
}

async function onClickPageControllBtn(_type, _pageInform) {
    const { page, totalCount, totalPageCount } = _pageInform || {};
    let _page = page;
    if (_type === 'first') {
        // << 클릭시
        if (_page === 1) return;
        _page = 1;
    } else if (_type === 'prev') {
        // < 클릭시
        if (_page - 1 <= 0) return;
        _page -= 1;
    } else if (_type === 'next') {
        // > 클릭시
        if (_page >= totalPageCount) return;
        _page += 1;
    } else if (_type === 'end') {
        // >> 클릭시
        if (_page === totalPageCount) return;
        _page = totalPageCount;
    }
    window.history.pushState(
        '',
        '',
        `patient.html?measurement_code=${historyMeasurementCode}&page=${_page}`
    );
    await createPagination();
}

async function oncheckHistoryPage() {
    // 윈도우 history 변경시 페이지 새로 불러오기
    await createPagination();
}

function actionInit() {
    window.onClickPaginationNumBtn = onClickPaginationNumBtn;
    window.onClickPageControllBtn = onClickPageControllBtn;
    history.onPopState(oncheckHistoryPage);
}
actionInit();
