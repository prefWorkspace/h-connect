const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);

/*
class 생성문

new CreatePagination({
    API: SelectBioSignalsTrendDataPage, // api 및 데이터 불러오기
    target: {
        listWrap: '#tabular_table_wrap .table_body', // 리스트 타겟
        pagination: '#tabular_table_wrap .table_page', // 페이지네이션 타겟
    },
    templates: {
        listItem: tabularTrendListTmpl, // 리스트 아이템 템플릿
        error:true,
        loading:true,
    },
    afterRender: (target)=>{
        // 렌더링이 끝난 직후 함수를 정의해 줄 수 있습니다.
        // 1번째 인자값으로 class pagination을 반환합니다.
    }
    link: {
        keepParams: ['measurement_code'], // 유지되어야 할 url 파라미터
    },
});

// error 과 loading은 boolean값, string dom 값, { meassage : 'text' } 값을 받습니다.

*/

/*
api 함수는 다음과 같이 선언합니다.

예시 )

export const SelectBioSignalsTrendDataPage = async (_page) => {

    // _page 파라미터를 통해 페이지 정보를 받아옵니다.

    const res = await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBioSignalsTrendDataPage',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMeasurementCode,
            pageNumber: _page,
            count: 10,
        })
    );

    // 받아온 res 데이터를 키값 page, totalCount, records 으로 파싱해 리턴해줍니다.

    return {
        page: _page,
        totalCount: res.totalCount,
        records: 리스트값
    };
};

*/

export class CreatePagination {
    // 페이지 네이션 모듈
    constructor(_initData) {
        this.initData = _initData;
        // this.actionInit();
        this.renderMain();
        this.addEventPageController();
    }

    async renderMain() {
        const { API, target, templates, afterRender } = this.initData || {};
        if (templates?.loading) {
            // 로딩 처리
            $(`${target?.listWrap}`).html(this.calcLoading(templates?.loading));
        }
        const historyPage = history.getParams('page');
        const resPage = parseInt(historyPage, 10) || 1;

        const { page, records, totalCount } = await API(resPage);
        this.renderPagination({
            page,
            list: records,
            totalCount,
            target,
        });
        let _html = this.calcError(templates?.error);
        if (totalCount && records) {
            _html = '';
            for await (const _item of records) {
                _html += await templates?.listItem(_item);
            }
        }
        $(`${target?.listWrap}`).html(_html);
        this.wrapElement = $(`${target?.listWrap}`);
        if (afterRender) {
            // 렌더링이 끝난 직후 실행 함수
            afterRender(this);
            return this;
        }
    }

    calcLoading(_getLoading) {
        const inintialLoading =
            '<p class="loading_text">데이타를 불러오는 중입니다.</p>';
        if (_getLoading) {
            if (typeof _getLoading === 'boolean') {
                return inintialLoading;
            } else if (_getLoading) {
                if (typeof _getLoading === 'string') {
                    return _getLoading;
                } else if (typeof _getLoading === 'function') {
                    return _getLoading();
                } else if (typeof _getLoading === 'object') {
                    if (_getLoading?.message) {
                        return `<p class="loading_text">${_getLoading?.message}</p>`;
                    }
                } else {
                    return inintialLoading;
                }
            }
        } else {
            return '';
        }
    }

    calcError(_getError) {
        const initialError =
            '<p class="error_text">조회된 데이타가 없습니다</p>';
        if (_getError) {
            if (typeof _getError === 'boolean') {
                return initialError;
            } else if (_getError) {
                if (typeof _getError === 'string') {
                    return _getError;
                } else if (typeof _getError === 'function') {
                    return _getError();
                } else if (typeof _getError === 'object') {
                    if (_getError?.message) {
                        return `<p class="error_text">${_getError?.message}</p>`;
                    }
                } else {
                    return initialError;
                }
            }
        } else {
            return '';
        }
    }

    renderPagination(_listData) {
        const { page, list, target } = _listData || {};
        $(`${target.pagination}`).html(this.paginationBlock(_listData));

        if (page > 1 && !list) {
            // 만약 해당 페이지에 리스트 데이터가 없다면 페이지 -1 뒤로 보내기
            const _origin = window.location.origin;
            const _pathname = window.location.pathname;
            window.history.replaceState(
                '',
                '',
                `${_origin + _pathname}?${this.paramFindToKeepParam()}&page=${
                    page - 1
                }`
            );
            this.renderMain();
        }
    }
    paginationBlock({ page, list, totalCount }) {
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
        this.pageInform = {
            page: page,
            totalCount: totalCount,
            totalPageCount: totalPageCount,
        };
        return `
        ${
            totalCount > 0
                ? `
              <ul>
                  <li><a href="#" class="page-controll" data-pagecont="first" onclick='event.preventDefault();'>&lt;&lt;</a></li>
                  <li><a href="#" class="page-controll" data-pagecont="prev" onclick='event.preventDefault();'>&lt;</a></li>
                  ${returnPageList().htmlFor((item, index) => {
                      return this.parsePageNumber({
                          number: item,
                          isActive: item === page,
                      });
                  })}
                  ${
                      totalPageCount > 10 && page !== totalPageCount
                          ? `<li> ... <a href="#" class="page-controll" data-pagecont="end" onclick='event.preventDefault();'>${totalPageCount}</a></li>`
                          : ''
                  }
                  

                  <li><a href="#" class="page-controll" data-pagecont="next" onclick='event.preventDefault();'>&gt;</a></li>
                  <li><a href="#" class="page-controll" data-pagecont="end" onclick='event.preventDefault();'>&gt;&gt;</a></li>
              </ul>
              `
                : ''
        }
    `;
    }

    parsePageNumber({ number, isActive }) {
        return `
          <li class="${isActive ? 'active' : ''}">
              <a class="page-number" href="#" data-pagenum='${number}' onclick='event.preventDefault();'>${number}</a>
          </li>
        `;
    }
    addEventPageController() {
        let _this = this;
        const { target } = this.initData || {};
        $('body').on(
            'click',
            `${target.pagination} .page-number`,
            function (e) {
                const pageNumData = e.currentTarget.dataset.pagenum;
                _this.onClickPaginationNumBtn(pageNumData);
            }
        );
        $('body').on(
            'click',
            `${target.pagination} .page-controll`,
            function (e) {
                const pageControllData = e.currentTarget.dataset.pagecont;
                _this.onClickPageControllBtn(pageControllData);
            }
        );
    }
    pagePushState(_page) {
        const _origin = window.location.origin;
        const _pathname = window.location.pathname;

        window.history.pushState(
            '',
            '',
            `${
                _origin + _pathname
            }?${this.paramFindToKeepParam()}&page=${_page}`
        );
    }
    onClickPaginationNumBtn(_number) {
        this.pagePushState(_number);
        this.renderMain();
    }

    onClickPageControllBtn(_type) {
        const { page, totalCount, totalPageCount } = this.pageInform || {};
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

        this.pagePushState(_page);
        this.renderMain();
    }

    paramFindToKeepParam() {
        // 유지되어야할 parameter을 찾아줍니다.
        const { keepParams } = this.initData?.link || {};
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
    // 일시 사용 중단
    // oncheckHistoryPage() {
    //     // 윈도우 history 변경시 페이지 새로 불러오기
    //     // this.renderMain();
    // }

    // actionInit() {
    //     history.onPopState(this.oncheckHistoryPage);
    // }
}
