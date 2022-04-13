const { SelectBioSignalEvent } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/common/actions/patientMonitoringAPI.js'
    )
);
const { eventSimpleDataDetailTmpl } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/event/templates/eventSimpleTmpl.js'
    )
);
const addEventClickTableListToRenderDetail = () => {
    /* 리스트 아이템 클릭시 상세 렌더 액션 */
    $('body').on(
        'click',
        '#event_table_wrap .table_body .table_list_wrap .table_wrap',
        async (e) => {
            const _$tableItemEl = $(e.currentTarget);
            const _getEventId = _$tableItemEl.data('eventid');

            if (!_$tableItemEl.hasClass('on')) {
                const { bioSignalEvent } =
                    (await SelectBioSignalEvent(_getEventId)) || {};
                _$tableItemEl
                    .next('.table_content')
                    .html(eventSimpleDataDetailTmpl(bioSignalEvent));
            }

            _$tableItemEl.next('.table_content').stop().slideToggle(300);
            _$tableItemEl.toggleClass('on').siblings().removeClass('on');
            _$tableItemEl
                .next('.table_content')
                .siblings('.table_content')
                .slideUp(300); // 1개씩 펼치기
        }
    );
};
const addEventClickBtnConfirm = () => {
    $('body').on(
        'click',
        '#event_table_wrap .table_body .table_list_wrap .table_content .btn_confirm',
        async (e) => {
            console.log(e);
        }
    );
};

const eventInit = () => {
    addEventClickTableListToRenderDetail();
    addEventClickBtnConfirm();
};
// eventInit();
