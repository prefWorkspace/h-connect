'use strict';

/*
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

*/

export class CustomFullcalendar {
    constructor(_targetStr, _options) {
        this.calendarState = {};
        this.init = {
            target: {
                str: _targetStr ?? null,
                element: null,
            },
            options: _options ?? {},
        };
        this.moduleSetting();
        this.calendarSelectBox = new CalendarSelectBox(this);
        this.render();
    }

    defaultOptions = {
        titleFormat: function (date) {
            return date.date.year + '년' + ' ' + (date.date.month + 1) + '월';
        },
    };

    getCalendarState(key) {
        if (key) {
            return this.calendarState[key];
        } else {
            return this.calendarState[key];
        }
    }

    setCalendarState(key, value) {
        this.calendarState[key] = value;
    }

    moduleSetting() {
        const { target, options } = this.init ?? {};

        const _moduleEl = document.querySelector(target.str);

        this.init.target.element = _moduleEl;

        const _this = this;
        this.module = new FullCalendar.Calendar(_moduleEl, {
            editable: true,
            initialView: 'dayGridMonth',
            timeZone: 'local',
            selectable: options.selectable ?? false, //선택 할 수 있음
            customButtons: {
                prev: {
                    click: (evt) => {
                        this.module.prev();
                    },
                },
                next: {
                    click: () => {
                        this.module.next();
                    },
                },
            },
            titleFormat: (date) =>
                typeof options.titleFormat === 'function'
                    ? options.titleFormat(date)
                    : this.defaultOptions.titleFormat(date),
            events: options?.events ?? [],
            unselectAuto: options.unselectAuto ?? true,
            select: (selectData) => {
                _this.selectData = selectData;
                options.selectable &&
                    $('.fc .fc-daygrid-day.fc-day-today').css(
                        'background-color',
                        'transparent'
                    );
                typeof options.select === 'function'
                    ? options?.select(selectData)
                    : null;
            },
            dateClick: (dateClickData) => {
                this.module.unselect();
                typeof options.dateClick === 'function' &&
                    options?.dateClick(dateClickData, this);

                options.sectionSelectAble === true &&
                    this.sectionSelector(dateClickData);

                options.dateClickActiveAble === true &&
                    this.dateClickActiver(dateClickData, this);
            },
        });
        $(this.init.target.element).data('calendar-module', this);
    }
    resetEventOptions() {
        this.init.options.dateClickActiveAble = null;
        this.init.options.dateClickActive = null;
        this.init.options.sectionSelectAble = null;
        this.init.options.sectionSelect = null;
    }
    resetSelectors() {
        this.module.unselect();
        this.resetActiveSelector();
    }
    resetActiveSelector() {
        const dayGridStr = 'fc-daygrid-day';
        const getDayGrid = $(`.${dayGridStr}`);
        getDayGrid.each(function () {
            if ($(this).hasClass('-active')) {
                $(this).removeClass('-active');
            }
        });
    }
    dateClickActiver(selectData, _item) {
        const { options } = _item.init ?? {};
        const { dayEl, date, dateStr } = selectData;
        this.selectDateCalendar({
            dateStr: dateStr,
        });
        typeof options.dateClickActive === 'function' &&
            options.dateClickActive(
                {
                    dateStr: dateStr,
                },
                this
            );
    }
    pointSectionSelector(selectDate, pointIndex) {
        const { dateStr } = selectDate;
        const { options } = this.init ?? {};
        const { element } = this.init.target;
        let _getSavedDate =
            $(element).data('calendar-module-section-date') ?? [];

        function getTimeFunc(_value) {
            return new Date(_value).getTime();
        }

        let _tempDateArr = [..._getSavedDate];
        _tempDateArr[pointIndex] = {
            time: getTimeFunc(dateStr),
            dateStr: dateStr,
        };

        const _calcedDateArr = _tempDateArr;
        $(element).data('calendar-module-section-date', _calcedDateArr);
        const [startDate, endDate] = _calcedDateArr;
        this.selectDateCalendar(startDate, endDate);
        if (startDate?.dateStr && endDate?.dateStr) {
            const _minusOneDayEndDate = moment(endDate.dateStr, 'YYYY-MM-DD')
                .add(1, 'days')
                .format('YYYY-MM-DD');
            this.module.select(startDate.dateStr, _minusOneDayEndDate);
            typeof options.sectionSelect === 'function' &&
                options.sectionSelect(
                    {
                        startDate: {
                            dateStr: startDate.dateStr,
                        },
                        endDate: {
                            dateStr: endDate.dateStr,
                        },
                    },
                    this
                );
        }
    }
    sectionSelector(selectDate) {
        const { dateStr } = selectDate;
        const { options } = this.init ?? {};
        const { element } = this.init.target;
        function getTimeFunc(_value) {
            return new Date(_value).getTime();
        }
        let _getSavedDate =
            $(element).data('calendar-module-section-date') ?? [];
        let _getClickDate = {
            time: getTimeFunc(dateStr),
            dateStr: dateStr,
        };
        let _tempDateArr = [_getClickDate];
        if (_getSavedDate) {
            _getSavedDate.forEach((_item) => {
                _tempDateArr.push(_item);
            });
        }
        _tempDateArr.sort((a, b) => {
            return a['time'] - b['time'];
        });
        if (_tempDateArr.length > 2) {
            _tempDateArr = [_getClickDate];
        }
        const _calcedDateArr = _tempDateArr;
        $(element).data('calendar-module-section-date', _calcedDateArr);
        const [startDate, endDate] = _calcedDateArr;
        this.selectDateCalendar(startDate, endDate);
        if (startDate?.dateStr && endDate?.dateStr) {
            const _minusOneDayEndDate = moment(endDate.dateStr, 'YYYY-MM-DD')
                .add(1, 'days')
                .format('YYYY-MM-DD');
            this.module.select(startDate.dateStr, _minusOneDayEndDate);
            typeof options.sectionSelect === 'function' &&
                options.sectionSelect(
                    {
                        startDate: {
                            dateStr: startDate.dateStr,
                        },
                        endDate: {
                            dateStr: endDate.dateStr,
                        },
                    },
                    this
                );
        }
    }
    selectDateCalendar(startDate, endDate) {
        const dayGridStr = 'fc-daygrid-day';
        const getDayGrid = $(`.${dayGridStr}`);
        getDayGrid.each(function () {
            if ($(this).hasClass('-active')) {
                $(this).removeClass('-active');
            }
        });
        startDate?.dateStr &&
            $(`.${dayGridStr}[data-date="${startDate.dateStr}"]`).addClass(
                '-active'
            );
        endDate?.dateStr &&
            $(`.${dayGridStr}[data-date="${endDate.dateStr}"]`).addClass(
                '-active'
            );
    }
    resetTodaySelect() {
        $('.fc .fc-daygrid-day.fc-day-today').removeClass('fc-day-today');
    }
    afterRender() {
        const { target, options } = this.init ?? {};
        const _this = this;
        $(target.element).removeClass('_before_render');
        $(target.element)
            .off()
            .on('pointerdown', 'tbody', function () {
                if (options.firstClickUnSelectToday === true) {
                    _this.resetTodaySelect();
                }
            });
    }
    afterClendarRender() {
        if (typeof this.init.options.afterClendarRender === 'function') {
            this.init.options.afterClendarRender();
        }
    }
    render() {
        this.module.render();
        if (this.module.isRendered === true) {
            this.afterRender();
            this.afterClendarRender();
        }
    }
}

class CalendarSelectBox {
    constructor(_init) {
        this.info = _init ?? {};
        this.renderSelectBox();
        this.addEventSelectBox();
    }
    selectBox = {
        yearBox: () => {
            const { year } = this.info.init.options.selectBox ?? {};
            const _nowYear = new Date().getFullYear();
            return `
            <button class="label year_label" data-value="${_nowYear}">${_nowYear} 년<span></span></button>
            <div>
                <ul class="optionList year_list" style="width:94px !important;">
                    ${
                        year.prev
                            ? Array(year.prev)
                                  .fill('year')
                                  .htmlFor((_item, _index) =>
                                      this.selectBox.yearOptions(
                                          _nowYear - (_index + 1)
                                      )
                                  )
                            : ''
                    }
                    ${this.selectBox.yearOptions(_nowYear)}
                    ${
                        year.next
                            ? Array(year.next)
                                  .fill('year')
                                  .htmlFor((_item, _index) =>
                                      this.selectBox.yearOptions(
                                          _nowYear + (_index + 1)
                                      )
                                  )
                            : ''
                    }
                </ul>
            </div>
            `;
        },
        yearOptions: (_value) => {
            return `
            <li class="optionItem year_option" data-date-value="${_value}">${_value} 년</li>
            `;
        },
        monthBox: () => {
            const _nowMonth = new Date().getMonth() + 1;
            return `
            <button class="label month_label" data-date-value="${_nowMonth}">${_nowMonth} 월<span></span></button>
            <ul class="optionList month_list" style="width:96px !important;">
                ${Array(12)
                    .fill('month')
                    .htmlFor((_item, _index) =>
                        this.selectBox.monthOptions(_index + 1)
                    )}
            </ul>
            `;
        },
        monthOptions: (_value) => {
            return `
            <li class="optionItem month_option" data-date-value="${_value
                .toString()
                .padStart(2, '0')}">${_value} 월</li>
            `;
        },
    };

    renderSelectBox() {
        const { year, month } = this.info.init.options.selectBox ?? {};
        const _selectBox = this.selectBox;
        if (year.use) {
            $(year.target).html(_selectBox.yearBox());
        }

        if (month.use) {
            $(month.target).html(_selectBox.monthBox());
        }
    }

    handleSelectBoxOption(_item, _boxStr, _labelStr) {
        $(_item).closest(_boxStr).removeClass('active');
        const _$findLabelEl = $(_item).closest(_boxStr).find(_labelStr);
        _$findLabelEl.data($(_item).data('value'));
        _$findLabelEl.html($(_item).text());
    }
    handleSelectBoxLabel(_item, _boxStr) {
        if ($(_item).closest(_boxStr).hasClass('active')) {
            $(_item).closest(_boxStr).removeClass('active');
        } else {
            $(_item).closest(_boxStr).addClass('active');
        }
    }
    goToDate(_calendarModule, _year, _month) {
        const _thisDate = new Date(`${_year}-${_month}-01`);
        _calendarModule?.gotoDate(_thisDate);
    }
    addEventSelectBox() {
        const { year, month } = this.info.init.options.selectBox ?? {};

        const _module = this;

        const _yearBoxStr = year.target ?? '.year_box';
        const _yearLabelStr = year.label ?? '.year_label';
        const _yearOptionStr = year.options ?? '.year_option';

        const _monthBoxStr = month.target ?? '.month_box';
        const _monthLabelStr = month.label ?? '.month_label';
        const _monthOptionStr = month.options ?? '.month_option';

        if (year.use) {
            $(document).on(
                'click',
                `${_yearBoxStr} ${_yearLabelStr}`,
                function () {
                    _module.handleSelectBoxLabel(this, _yearBoxStr);
                }
            );
            $(document).on(
                'click',
                `${_yearBoxStr} ${_yearOptionStr}`,
                function () {
                    _module.handleSelectBoxOption(
                        this,
                        _yearBoxStr,
                        _yearLabelStr
                    );

                    const _sbYear = $(this).data('date-value');
                    const _sbMonth = $(
                        `${_monthBoxStr} ${_monthLabelStr}`
                    ).data('date-value');

                    console.log('_sbMonth: ', _sbMonth);
                    _module.goToDate(_module.info.module, _sbYear, _sbMonth);
                }
            );
        }

        if (month.use) {
            $(document).on(
                'click',
                `${_monthBoxStr} ${_monthLabelStr}`,
                function () {
                    _module.handleSelectBoxLabel(this, _monthBoxStr);
                }
            );
            $(document).on(
                'click',
                `${_monthBoxStr} ${_monthOptionStr}`,
                function () {
                    _module.handleSelectBoxOption(
                        this,
                        _monthBoxStr,
                        _monthLabelStr
                    );

                    const _sbYear = $(`${_yearBoxStr} ${_yearOptionStr}`).data(
                        'date-value'
                    );
                    const _sbMonth = $(this).data('date-value');

                    _module.goToDate(_module.info.module, _sbYear, _sbMonth);
                }
            );
        }
    }
}
