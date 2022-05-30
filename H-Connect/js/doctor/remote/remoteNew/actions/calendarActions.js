const { CustomFullcalendar } = await import(
    importVersion('/H-Connect/js/lib/fullcalendar/custom/customFullCalendar.js')
);

const { validateDate, calendarData } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/dataActions.js'
    )
);
const { coopSurgerySelector } = await import(
    importVersion('/H-Connect/js/doctor/remote/remoteNew/actions/selector.js')
);

const calendarModule = new CustomFullcalendar('#calendar', {
    selectBox: {
        year: {
            use: true,
            target: '.year_box',
            next: 2,
        },
        month: {
            use: true,
            target: '.month_box',
        },
    },
    // firstClickUnSelectToday: true,
    unselectAuto: false,
    // sectionSelectAble: true,
    // sectionSelect: (_date) => {
    //     // console.log(_date);
    // },
    // dateClickActiveAble: true,
    // dateClickActive: (_selectDate) => {
    //     console.log(_selectDate);
    // },
    // dateClick: function (selectData, _item) {},

    // events: [
    //     {
    //         title: '원격협진',
    //         start: '2022-05-24',
    //         constraint: 'businessHours',
    //     },
    // ],
});

export function calendarActionControll(_sectionType) {
    const _calendarModule = calendarData.module();
    const { options: _calendarOptions } = _calendarModule.init ?? {};
    _calendarModule.resetEventOptions();
    _calendarModule.resetSelectors();
    _calendarOptions.firstClickUnSelectToday = true;

    switch (_sectionType) {
        case '실시간원격협진':
            _calendarOptions.dateClickActiveAble = true;
            _calendarOptions.dateClickActive = (_selectDate) => {
                const _month = moment(_selectDate.dateStr).format('MM');
                const _day = moment(_selectDate.dateStr).format('DD');
                $(
                    '.rt_time .date .input_wrap input[data-key="rt_start_month"]'
                ).val(_month);
                $(
                    '.rt_time .date .input_wrap input[data-key="rt_start_date"]'
                ).val(_day);
            };
            break;
        case '소견요청협진':
            _calendarOptions.sectionSelectAble = true;
            _calendarOptions.sectionSelect = (_selectDate) => {
                const _startDate = {
                    month: moment(_selectDate.startDate.dateStr).format('MM'),
                    day: moment(_selectDate.startDate.dateStr).format('DD'),
                };
                const _endDate = {
                    month: moment(_selectDate.endDate.dateStr).format('MM'),
                    day: moment(_selectDate.endDate.dateStr).format('DD'),
                };
                $(
                    '.ro_view .date .input_wrap input[data-key="op_start_month"]'
                ).val(_startDate.month);
                $(
                    '.ro_view .date .input_wrap input[data-key="op_start_date"]'
                ).val(_startDate.day);
                $(
                    '.ro_view .date .input_wrap input[data-key="op_end_month"]'
                ).val(_endDate.month);
                $(
                    '.ro_view .date .input_wrap input[data-key="op_end_date"]'
                ).val(_endDate.day);
            };
            break;
        case '협진일정요청':
            _calendarOptions.dateClickActiveAble = true;
            _calendarOptions.dateClickActive = (_selectDate) => {
                const _month = moment(_selectDate.dateStr).format('MM');
                const _day = moment(_selectDate.dateStr).format('DD');
                $(
                    '.t_view .deadline_wrap .date input[data-key="rqd_end_month"]'
                ).val(_month);
                $(
                    '.t_view .deadline_wrap .date input[data-key="rqd_end_date"]'
                ).val(_day);
            };
            break;
    }
}

function realTimeCalendarActions() {
    coopSurgerySelector
        .wrapEl()
        .on('input', '.rt_view input[data-key="rt_start_month"]', function () {
            validateDate($(this));

            const _calendarModule = calendarData.module();
            const _year = calendarData.year();
            const _month = $(this).val();
            const _day = calendarData.day();
            if (!_year || !_month || !_day) return;

            const _dateStr = `${_year}-${_month}-${_day}`;
            _calendarModule.module.gotoDate(new Date(_dateStr));
            _calendarModule.selectDateCalendar({
                dateStr: _dateStr,
            });

            _calendarModule.resetTodaySelect();
        });
    coopSurgerySelector
        .wrapEl()
        .on('input', '.rt_view input[data-key="rt_start_date"]', function () {
            validateDate($(this));

            const _calendarModule = calendarData.module();
            const _year = calendarData.year();
            const _month = calendarData.month();
            const _day = $(this).val();
            if (!_year || !_month || !_day) return;

            const _dateStr = `${_year}-${_month}-${_day}`;
            _calendarModule.module.gotoDate(new Date(_dateStr));
            _calendarModule.selectDateCalendar({
                dateStr: _dateStr,
            });

            _calendarModule.resetTodaySelect();
        });
}

function opinionCalendarActions() {
    coopSurgerySelector
        .wrapEl()
        .on('input', '.ro_view input[data-key="op_start_month"]', function () {
            validateDate($(this));

            const _calendarModule = calendarData.module();
            const _year = calendarData.year();
            const _month = $(this).val();
            const _day = calendarData.day();
            if (!_year || !_month || !_day) return;

            const _dateStr = `${_year}-${_month}-${_day}`;
            _calendarModule.module.gotoDate(new Date(_dateStr));
            // selectDateCalendar({
            //     dateStr: _dateStr,
            // });

            _calendarModule.resetTodaySelect();
        });
    coopSurgerySelector
        .wrapEl()
        .on('input', '.ro_view input[data-key="op_start_date"]', function () {
            // validateDate($(this));
            // const _calendarModule = calendarData.module();
            // const _year = calendarData.year();
            // const _month = calendarData.month();
            // const _day = $(this).val();
            // if (!_year || !_month || !_day) return;
            // const _dateStr = `${_year}-${_month}-${_day}`;
            // _calendarModule.module.gotoDate(new Date(_dateStr));
            // _calendarModule.sectionSelector({
            //     dateStr: _dateStr,
            // });

            _calendarModule.resetTodaySelect();
        });
    coopSurgerySelector
        .wrapEl()
        .on('input', '.ro_view input[data-key="op_end_month"]', function () {
            validateDate($(this));

            const _calendarModule = calendarData.module();
            const _year = calendarData.year();
            const _month = $(this).val();
            const _day = calendarData.day();
            if (!_year || !_month || !_day) return;

            const _dateStr = `${_year}-${_month}-${_day}`;
            _calendarModule.module.gotoDate(new Date(_dateStr));
            // selectDateCalendar({
            //     dateStr: _dateStr,
            // });

            _calendarModule.resetTodaySelect();
        });

    coopSurgerySelector
        .wrapEl()
        .on('input', '.ro_view input[data-key="op_end_date"]', function () {
            // validateDate($(this));
            // const _calendarModule = calendarData.module();
            // const _year = calendarData.year();
            // const _month = calendarData.month();
            // const _day = $(this).val();
            // if (!_year || !_month || !_day) return;
            // const _dateStr = `${_year}-${_month}-${_day}`;
            // _calendarModule.module.gotoDate(new Date(_dateStr));
            // _calendarModule.sectionSelector({
            //     dateStr: _dateStr,
            // });

            _calendarModule.resetTodaySelect();
        });
}

function requestScheduleCalendarActions() {
    coopSurgerySelector
        .wrapEl()
        .on(
            'input',
            '.t_view .deadline_wrap .date input[data-key="rqd_end_month"]',
            function () {
                validateDate($(this));

                const _calendarModule = calendarData.module();
                const _year = calendarData.year();
                const _month = $(this).val();
                const _day = calendarData.day();
                if (!_year || !_month || !_day) return;

                const _dateStr = `${_year}-${_month}-${_day}`;
                _calendarModule.module.gotoDate(new Date(_dateStr));
                _calendarModule.selectDateCalendar({
                    dateStr: _dateStr,
                });

                _calendarModule.resetTodaySelect();
            }
        );
    coopSurgerySelector
        .wrapEl()
        .on(
            'input',
            '.t_view .deadline_wrap .date input[data-key="rqd_end_date"]',
            function () {
                validateDate($(this));

                const _calendarModule = calendarData.module();
                const _year = calendarData.year();
                const _month = calendarData.month();
                const _day = $(this).val();
                if (!_year || !_month || !_day) return;

                const _dateStr = `${_year}-${_month}-${_day}`;
                _calendarModule.module.gotoDate(new Date(_dateStr));
                _calendarModule.selectDateCalendar({
                    dateStr: _dateStr,
                });
            }
        );
}

function initActions() {
    realTimeCalendarActions();
    opinionCalendarActions();
    requestScheduleCalendarActions();
}

initActions();
