const { validateCoopAll, validateDate } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/dataActions.js'
    )
);
const { coopSurgerySelector, coopContentSelector } = await import(
    importVersion('/H-Connect/js/doctor/remote/remoteNew/actions/selector.js')
);

function addCoopOpinionAction() {
    // 소견 요청 협진 액션
    coopSurgerySelector.wrapEl().on('.ro_view input', function () {
        // 유효성 걸기
        const _checkValidateAll = validateCoopAll();
        const _$inputEls = $(this).find('.ro_view input[data-validate]');
        _$inputEls.each(function () {
            // date유효성 걸기
            validateDate($(this));
        });
    });
}

function initAction() {
    addCoopOpinionAction();
}

addCoopOpinionAction();
