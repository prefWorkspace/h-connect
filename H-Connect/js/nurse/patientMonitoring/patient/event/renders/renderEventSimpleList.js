const { SelectBioSignalEventSimplePage, SelectBioSignalEvent } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/common/actions/patientMonitoringAPI.js'
    )
);
const { CreatePagination } = await import(
    importVersion('/H-Connect/js/utils/module/pagination/pagination.js')
);
const { PopupController } = await import(
    importVersion(
        '/H-Connect/js/utils/module/popupController/popupController.js'
    )
);

const { eventSimpleDataListTmpl, eventSimpleDataDetailTmpl } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/event/templates/eventSimpleTmpl.js'
    )
);
const { eventDeletePopupTmpl } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/event/templates/eventDeletePopupTmpl.js'
    )
);

const createEventSimpleTabController = () => {
    const deleteEventPopup = new PopupController({
        target: {
            openButton: '#event_table_wrap .btn_delete',
            appendWrap: '.event_delete_popup_wrap',
        },
        templates: {
            popup: eventDeletePopupTmpl,
        },
        popupBtn: {
            cancelBtn: {
                target: '.btn_no',
                close: true,
            },
            deleteBtn: {
                target: '.btn_delete',
                close: true,
                action: async (_this) => {
                    const { eventid } = _this.getData();
                    // 클릭시 실행될 함수 선언 함수가 다 실행이 된 후 팝업이 닫힙니다.
                },
            },
        },
    });
    // 이벤트 탭 리스트 페이지네이션 생성
    new CreatePagination({
        API: SelectBioSignalEventSimplePage,
        target: {
            listWrap: '#event_table_wrap .table_body .table_list_wrap',
            pagination: '#event_table_wrap .table_page',
        },
        templates: {
            listItem: eventSimpleDataListTmpl,
        },
        afterRender: (_this) => {
            addEventClickTableListToRenderDetail(_this);
        },
        link: {
            keepParams: ['measurement_code', 'tab'],
        },
    });

    const addEventClickTableListToRenderDetail = (_this) => {
        const { wrapElement } = _this || {};
        /* 리스트 아이템 클릭시 상세 렌더 액션 */
        wrapElement
            .find('.table_wrap')
            .off()
            .on('click', async (e) => {
                const _$tableItemEl = $(e.currentTarget);
                const _getEventId = getEventId(_$tableItemEl);

                if (!_$tableItemEl.hasClass('on')) {
                    // 테이블 아이템에 on클래스가 없다면
                    // 상세 데이터 요청후 렌더링 시킵니다.
                    const { bioSignalEvent } =
                        (await SelectBioSignalEvent(_getEventId)) || {};
                    _$tableItemEl
                        .next('.table_content')
                        .html(eventSimpleDataDetailTmpl(bioSignalEvent));
                    // confirm 버튼 클릭 이벤트 추가
                    addEventOnClickConfirm(_$tableItemEl, _this);
                    addEventOnClickDelete(_$tableItemEl, _this);
                }
                // 클릭한 객체의 id 를 팝업에 임시 전달
                deleteEventPopup.saveData('eventId', _getEventId);

                _$tableItemEl.next('.table_content').stop().slideToggle(300);
                _$tableItemEl.toggleClass('on').siblings().removeClass('on');
                _$tableItemEl
                    .next('.table_content')
                    .siblings('.table_content')
                    .slideUp(300); // 1개씩 펼치기
            });
    };

    const addEventOnClickConfirm = (_$tableItemEl, _this) => {
        // confirm 버튼 클릭 이벤트 추가
        const { wrapElement, renderMain } = _this || {};
        _$tableItemEl
            .next('.table_content')
            .find('.btn_confirm')
            .off()
            .on('click', (e) => {
                const _getEventId = getEventId(_$tableItemEl);
                console.log('_getEventId: ', _getEventId);
            });
    };

    // delete버튼 클릭 시

    const addEventOnClickDelete = (_$tableItemEl, _this) => {
        // delete 버튼 클릭 이벤트
        const { wrapElement, renderMain } = _this || {};
        // wrapElement.find('.table_content .btn_confirm').on('click', (e) => {
        //     const _getEventId = getEventId(_$tableItemEl);
        //     console.log('_getEventId: ', _getEventId);
        //     // deleteEventPopup.dataSave('eventId', _getEventId);
        // });
    };

    const getEventId = (_targetEl) => {
        // event id를 가져옵니다.
        return _targetEl.data('eventid') || null;
    };
};
createEventSimpleTabController();
