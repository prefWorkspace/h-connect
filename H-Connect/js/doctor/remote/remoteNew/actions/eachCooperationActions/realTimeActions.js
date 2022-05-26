const { validateCoopAll, validateDate } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/dataActions.js'
    )
);
const { coopSurgerySelector, coopContentSelector } = await import(
    importVersion('/H-Connect/js/doctor/remote/remoteNew/actions/selector.js')
);
function addCoopRealTimeRemoteAction() {
    // 실시간 원격 협진 액션
    coopSurgerySelector.wrapEl().on('.rt_view input', function () {
        // 유효성 걸기
        const _checkValidateAll = validateCoopAll();
        const _$inputEls = $(this).find('.rt_view input[data-validate]');
        _$inputEls.each(function () {
            // date유효성 걸기
            validateDate($(this));
        });

        // 종료시간 설정
        const _startHours = $(this)
            .find('.rt_view input[data-key="rt_start_hours"]')
            .val();

        const _startMinutes = $(this)
            .find('.rt_view input[data-key="rt_start_minutes"]')
            .val();

        const _calcEndHours =
            _startHours !== ''
                ? (parseInt(_startHours, 10) + 1).toString().padStart(2, '0')
                : '';
        $(this)
            .find('.rt_view input[data-key="rt_end_hours"]')
            .val(_calcEndHours);
        $(this)
            .find('.rt_view input[data-key="rt_end_minutes"]')
            .val(_startMinutes);
    });
}

function initAction() {
    addCoopRealTimeRemoteAction();
}
initAction();
