const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);
export class TabController {
    constructor(_initData) {
        this.initData = _initData;
        this.initTabData();
        this.initTabView();
        this.addEventTabBtn();
        this.actionInit();
    }

    initTabData() {
        this.tabLinkClassKey = '.tab_wrap .tabs .tab-link';
        this.tabContentClassKey = '.tab-content';
    }
    initTabView() {
        const paramsTabUrl = history.getParams('tab');
        if (paramsTabUrl) {
            this.tabBtnControll(paramsTabUrl);
            this.tabContainerControll(paramsTabUrl);
        } else {
            $(this.tabLinkClassKey).eq(0).addClass('current');
            $(this.tabContentClassKey).eq(0).addClass('current');
        }
    }
    tabBtnControll(_tabData) {
        if ($(`${this.tabLinkClassKey}`).hasClass('current')) {
            $(`${this.tabLinkClassKey}`).removeClass('current');
        }
        $(`${this.tabLinkClassKey}[data-tab=${_tabData}]`).addClass('current');
    }
    tabContainerControll(_tabData) {
        if ($(`${this.tabContentClassKey}`).hasClass('current')) {
            $(`${this.tabContentClassKey}`).removeClass('current');
        }
        $(`#${_tabData}`).addClass('current');
    }
    addEventTabBtn() {
        let _this = this;
        $('body').on('click', `${this.tabLinkClassKey}`, (e) => {
            const _target = e.currentTarget;
            const _tabData = _target.dataset.tab;
            _this.tabBtnControll(_tabData);
            _this.tabContainerControll(_tabData);

            _this.pagePushState(_tabData);
        });
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

    pagePushState(_tab) {
        const _origin = window.location.origin;
        const _pathname = window.location.pathname;

        window.history.pushState(
            '',
            '',
            `${_origin + _pathname}?${this.paramFindToKeepParam()}&tab=${_tab}`
        );
    }

    oncheckHistoryPage() {
        // 윈도우 history 변경시 페이지 새로 불러오기
        console.log('11');
    }

    actionInit() {
        console.log('----');
        history.onPopState(this.oncheckHistoryPage);
    }
    onTab() {
        console.log('dd');
    }
}
