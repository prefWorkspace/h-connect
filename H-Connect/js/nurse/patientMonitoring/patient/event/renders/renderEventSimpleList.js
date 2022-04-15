const {
    SelectBioSignalEventSimplePage,
    SelectBioSignalEvent,
    UpdateBioSignalEvent,
    DeleteBioSignalEvent,
} = await import(
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
const { confirmTwoPopupTmpl } = await import(
    importVersion('/H-Connect/js/common/popup/templates/commonPopupTmpl.js')
);
// 페이지네이션 처리와 팝업처리, 등등 한번에 처리하면 용이한 부분이 많아 액션함수도 한 파일에서 처리.

const createEventSimpleTabController = () => {
    // 이벤트 탭 리스트 페이지네이션 생성
    const eventListPagination = new CreatePagination({
        API: SelectBioSignalEventSimplePage,
        target: {
            listWrap: '#event_table_wrap .table_body .table_list_wrap',
            pagination: '#event_table_wrap .table_page',
        },
        templates: {
            loading: true,
            error: true,
            listItem: eventSimpleDataListTmpl,
        },
        afterRender: (_this) => {
            addEventClickTableListToRenderDetail(_this);
        },
        link: {
            keepParams: ['measurement_code', 'tab'],
        },
    });
    const confirmEventPopup = new PopupController({
        target: {
            openButton: '#event_table_wrap .btn_confirm',
            appendWrap: '.event_delete_popup_wrap',
        },
        templates: {
            popup: () => {
                return confirmTwoPopupTmpl({ type: 'confirm' });
            },
        },
        popupBtn: {
            cancelBtn: {
                target: '.btn.gr',
                close: true,
                action: (_this) => {
                    // 클릭한 객체의 id 를 팝업에 임시 전달
                    _this.saveData('eventId', null);
                },
            },
            submitBtn: {
                target: '.btn.blf',
                close: true,
                action: async (_this) => {
                    const { eventId } = _this.getData();
                    const updateSuccess = await UpdateBioSignalEvent(
                        eventId,
                        1
                    );
                    if (updateSuccess) {
                        eventListPagination.renderMain();
                    } else {
                        alert('선택한 이벤트 저장에 실패했습니다.');
                    }
                },
            },
        },
    });

    const deleteEventPopup = new PopupController({
        target: {
            openButton: '#event_table_wrap .btn_delete',
            appendWrap: '.event_delete_popup_wrap',
        },
        templates: {
            popup: () => {
                return confirmTwoPopupTmpl({
                    type: 'delete',
                    title: '선택한 이벤트를 삭제합니다.',
                    message: '삭제 하시겠습니까?',
                });
            },
        },
        popupBtn: {
            cancelBtn: {
                target: '.btn.gr',
                close: true,
                action: (_this) => {
                    // 클릭한 객체의 id 를 팝업에 임시 전달
                    _this.saveData('eventId', null);
                },
            },
            deleteBtn: {
                target: '.btn.blf',
                close: true,
                action: async (_this) => {
                    const { eventId } = _this.getData();
                    const deleteSuccess = await DeleteBioSignalEvent(eventId);
                    if (deleteSuccess) {
                        eventListPagination.renderMain();
                    } else {
                        alert('선택한 이벤트 삭제에 실패했습니다.');
                    }
                },
            },
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
            .on('click', async (e) => {
                const _getEventId = getEventId(_$tableItemEl);
                confirmEventPopup.saveData('eventId', _getEventId);
            });
    };

    const getEventId = (_targetEl) => {
        // event id를 가져옵니다.
        return _targetEl.data('eventid') || null;
    };
};
createEventSimpleTabController();
