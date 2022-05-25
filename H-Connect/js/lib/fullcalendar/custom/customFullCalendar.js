'use strict';

/*

{
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
    selectable: true,
    select: function (arg) {
        console.log('arg: ', arg);
    캘린더에서 드래그로 이벤트를 생성할 수 있다.
    var title = prompt('Event Title:');
    if (title) {
        calendar.addEvent({
            title: title,
            start: arg.start,
            end: arg.end,
            allDay: arg.allDay,
        });
    }
    calendar.unselect();
    },
    events: [
        {
            title: '원격협진',
            start: '2022-05-24',
            constraint: 'businessHours',
        },
    ],
}

*/

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
export class CustomFullcalendar {
    constructor(_targetStr, _options) {
        this.init = {
            target: {
                str: _targetStr ?? null,
                element: null,
            },
            options: _options ?? {},
        };
        this.moduleSetting();
        this.render();
        this.calendarSelectBox = new CalendarSelectBox(this);
    }

    defaultOptions = {
        titleFormat: function (date) {
            return date.date.year + '년' + ' ' + (date.date.month + 1) + '월';
        },
    };

    moduleSetting() {
        const { target, options } = this.init ?? {};

        const _moduleEl = document.querySelector(target.str);

        this.init.target.element = _moduleEl;

        this.module = new FullCalendar.Calendar(_moduleEl, {
            // nowIndicator: false,
            editable: true,
            initialView: 'dayGridMonth',
            timeZone: 'local',
            selectable: options.selectable ?? false, //선택 할 수 있음

            header: {
                center: 'title',
                left: 'prev',
                right: 'next today',
            },
            eventAfterAllRender: (e) => {
                console.log(e);
            },
            titleFormat: (date) =>
                typeof options.titleFormat === 'function'
                    ? options.titleFormat(date)
                    : this.defaultOptions.titleFormat(date),
            events: options?.events ?? [],
            select: (arg) =>
                typeof options.select === 'function'
                    ? options?.select(arg)
                    : null,
        });
    }
    render() {
        this.module.render();
    }
}
