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
<<<<<<< HEAD
            // 종료시간 설정
            const _startHours = $(this)
                .find('input[data-key="rqc_start_hours"]')
                .val();

            const _startMinutes = $(this)
                .find('input[data-key="rqc_start_minutes"]')
                .val();

            const _calcEndHours =
                _startHours !== ''
                    ? (parseInt(_startHours, 10) + 1)
                          .toString()
                          .padStart(2, '0')
                    : '';
            $(this).find('input[data-key="rqc_end_hours"]').val(_calcEndHours);
            $(this)
                .find('input[data-key="rqc_end_minutes"]')
                .val(_startMinutes);

            const _getItem = getDataWithTarget(this);

            if (!_getItem.pass) return;

            /* 중복 체크 */
            const { endDatetime } =
=======
            const _getItem = getDataWithTarget(this);

            if (!_getItem.pass) return;
            const { startDatetime, endDatetime } =
>>>>>>> 736ed0f (fix : 신규 협진 생성 > 실시간 원격 협진 , 소견 요청 협진 ,협진 일정요청 작업 / 날짜 수정중)
                serviceData.requestSchedule.scheduleCanDateItem(_getItem.info);
            const { checkDateTime } = await selectScheduleCheck({
                checkDatetime: endDatetime,
            });
            // Y : 중복 , N : 중복아님
            const _checkDate = checkDateTime.check;
<<<<<<< HEAD
=======
            // const _checkDate = 'Y';
>>>>>>> 736ed0f (fix : 신규 협진 생성 > 실시간 원격 협진 , 소견 요청 협진 ,협진 일정요청 작업 / 날짜 수정중)
            const _$duplScheduleMessageEl = $(this).find('.repeat');
            if (_checkDate === 'Y') {
                _$duplScheduleMessageEl.addClass('active');
            } else if (_checkDate === 'N') {
                _$duplScheduleMessageEl.removeClass('active');
            }

            const _checkValidateAll = validateCoopAll();
        });
}

<<<<<<< HEAD
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

=======
>>>>>>> 736ed0f (fix : 신규 협진 생성 > 실시간 원격 협진 , 소견 요청 협진 ,협진 일정요청 작업 / 날짜 수정중)
function addCoopRequestScheduleAction() {
    // 협진 일정 요청 액션

    (function addScheduleCanAction() {
        // 협진 가능시간 선택 시간 추가
        coopSurgerySelector.wrapEl().on('click', '.btn_tadd', function () {
            coopSurgerySelector.requestSchedule.scheduleCan
                .wrapEl()
                .append(coopRequestScheduleBlockTmpl);

<<<<<<< HEAD
            scheduleCanBlockDeleteBtnCheck();
=======
            const _$scheduleItemElsAfter =
                coopSurgerySelector.requestSchedule.scheduleCan.itemEls();
            if (_$scheduleItemElsAfter.length >= 1) {
                coopSurgerySelector.requestSchedule.scheduleCan
                    .delBtnEl()
                    .eq(0)
                    .attr('disabled', false);
            } else {
                coopSurgerySelector.requestSchedule.scheduleCan
                    .delBtnEl()
                    .eq(0)
                    .attr('disabled', true);
            }
>>>>>>> 736ed0f (fix : 신규 협진 생성 > 실시간 원격 협진 , 소견 요청 협진 ,협진 일정요청 작업 / 날짜 수정중)
            scheduleCanBlockInputAction();
            const _checkValidateAll = validateCoopAll();
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
<<<<<<< HEAD
=======
                const _$scheduleItemElsBefore =
                    coopSurgerySelector.requestSchedule.scheduleCan.itemEls();
                if (_$scheduleItemElsBefore.length <= 1) return;
>>>>>>> 736ed0f (fix : 신규 협진 생성 > 실시간 원격 협진 , 소견 요청 협진 ,협진 일정요청 작업 / 날짜 수정중)
                coopSurgerySelector.requestSchedule.scheduleCan
                    .itemEls()
                    .eq(_btnIndex)
                    .remove();

<<<<<<< HEAD
                scheduleCanBlockDeleteBtnCheck();
=======
                const _$scheduleItemElsAfter =
                    coopSurgerySelector.requestSchedule.scheduleCan.itemEls();
                if (_$scheduleItemElsAfter.length <= 1) {
                    coopSurgerySelector.requestSchedule.scheduleCan
                        .delBtnEl()
                        .eq(0)
                        .attr('disabled', true);
                }
>>>>>>> 736ed0f (fix : 신규 협진 생성 > 실시간 원격 협진 , 소견 요청 협진 ,협진 일정요청 작업 / 날짜 수정중)
                const _checkValidateAll = validateCoopAll();
            });
    })();

    coopSurgerySelector
        .wrapEl()
        .on('.ut_wrap .ut_container input', async function () {
<<<<<<< HEAD
=======
            // 종료시간 설정
            const _startHours = $(this)
                .find('input[data-key="rqc_start_hours"]')
                .val();

            const _startMinutes = $(this)
                .find('input[data-key="rqc_start_minutes"]')
                .val();

            const _calcEndHours = (parseInt(_startHours, 10) + 1)
                .toString()
                .padStart(2, '0');
            $(this).find('input[data-key="rqc_end_hours"]').val(_calcEndHours);
            $(this)
                .find('input[data-key="rqc_end_minutes"]')
                .val(_startMinutes);

>>>>>>> 736ed0f (fix : 신규 협진 생성 > 실시간 원격 협진 , 소견 요청 협진 ,협진 일정요청 작업 / 날짜 수정중)
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
