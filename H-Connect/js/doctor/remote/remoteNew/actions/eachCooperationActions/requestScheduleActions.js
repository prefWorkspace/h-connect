const { selectScheduleCheck } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/remoteNewAPI.js'
    )
);
const { getDataWithTarget, validateCoopAll, validateDate, serviceData } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/remote/remoteNew/actions/dataActions.js'
        )
    );
const { coopSurgerySelector } = await import(
    importVersion('/H-Connect/js/doctor/remote/remoteNew/actions/selector.js')
);

const { coopRequestScheduleBlockTmpl } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/templates/cooperationSectionTmpl.js'
    )
);

export function scheduleCanBlockInputAction() {
    // 외래진료 일정 중복 체크
    coopSurgerySelector.requestSchedule.scheduleCan
        .itemEls()
        .off()
        .on('keyup', async function () {
            const _getId = $(this).find('.date_time').data('id');
            // 종료시간 설정
            const _startHours = $(this)
                .find(`input[data-key="rqc_start_hours_${_getId}"]`)
                .val();

            const _startMinutes = $(this)
                .find(`input[data-key="rqc_start_minutes_${_getId}"]`)
                .val();

            const _calcEndHours =
                _startHours !== ''
                    ? (parseInt(_startHours, 10) + 1)
                          .toString()
                          .padStart(2, '0')
                    : '';
            $(this)
                .find(`input[data-key="rqc_end_hours_${_getId}"]`)
                .val(_calcEndHours);
            $(this)
                .find(`input[data-key="rqc_end_minutes_${_getId}"]`)
                .val(_startMinutes);

            const _getItem = getDataWithTarget(this);

            if (!_getItem.pass) return;

            /* 중복 체크 */
            const { endDatetime } =
                serviceData.requestSchedule.scheduleCanDateItem(_getItem.info);
            const { checkDateTime } = await selectScheduleCheck({
                checkDatetime: endDatetime,
            });
            // Y : 중복 , N : 중복아님
            const _checkDate = checkDateTime.check;
            const _$duplScheduleMessageEl = $(this).find('.repeat');
            if (_checkDate === 'Y') {
                _$duplScheduleMessageEl.addClass('active');
            } else if (_checkDate === 'N') {
                _$duplScheduleMessageEl.removeClass('active');
            }

            const _checkValidateAll = validateCoopAll();
        });
}

export function scheduleCanBlockDeleteBtnCheck() {
    const _$scheduleItemEls =
        coopSurgerySelector.requestSchedule.scheduleCan.itemEls();
    if (_$scheduleItemEls.length <= 1) {
        coopSurgerySelector.requestSchedule.scheduleCan
            .delBtnEl()
            .eq(0)
            .attr('disabled', true);
    } else {
        coopSurgerySelector.requestSchedule.scheduleCan
            .delBtnEl()
            .eq(0)
            .attr('disabled', false);
    }
}

function addCoopRequestScheduleAction() {
    // 협진 일정 요청 액션

    (function addScheduleCanAction() {
        // 협진 가능시간 선택 시간 추가
        let coopRequestScheduleId = 1;
        coopSurgerySelector.wrapEl().on('click', '.btn_tadd', function () {
            coopSurgerySelector.requestSchedule.scheduleCan
                .wrapEl()
                .append(() =>
                    coopRequestScheduleBlockTmpl(null, coopRequestScheduleId)
                );

            scheduleCanBlockDeleteBtnCheck();
            scheduleCanBlockInputAction();
            const _checkValidateAll = validateCoopAll();
            ++coopRequestScheduleId;
        });
    })();
    (function removeScheduleCanAction() {
        // 협진 가능시간 선택 시간 삭제
        coopSurgerySelector
            .wrapEl()
            .on('click', '.btn_delete_time', function () {
                const _btnIndex =
                    coopSurgerySelector.requestSchedule.scheduleCan
                        .delBtnEl()
                        .index(this);
                coopSurgerySelector.requestSchedule.scheduleCan
                    .itemEls()
                    .eq(_btnIndex)
                    .remove();

                scheduleCanBlockDeleteBtnCheck();
                const _checkValidateAll = validateCoopAll();
            });
    })();

    coopSurgerySelector
        .wrapEl()
        .on('.ut_wrap .ut_container input', async function () {
            const _$inputEls = $(this).find('input[data-validate]');
            _$inputEls.each(function () {
                // date유효성 걸기
                validateDate($(this));
            });
        });
    coopSurgerySelector
        .wrapEl()
        .on('.t_view .deadline_wrap input', function () {
            // 유효성 걸기
            const _$inputEls = $(this).find(
                '.t_view .deadline_wrap input[data-validate]'
            );
            _$inputEls.each(function () {
                // date유효성 걸기
                validateDate($(this));
            });
            const _checkValidateAll = validateCoopAll();
        });
}

function initAction() {
    addCoopRequestScheduleAction();
}
initAction();
