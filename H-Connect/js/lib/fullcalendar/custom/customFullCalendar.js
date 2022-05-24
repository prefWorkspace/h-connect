'use strict';

class CalendarSelectBox {
    constructor(_init) {
        this.info = _init ?? {};
        this.addEventSelectBox();
    }
    selectBox = {
        yearBox: () => {
            return `
            <button class="label year_label">2021 년<span></span></button>
            <div>
                <ul class="optionList year_list" style="width:94px !important;">
                    <li class="optionItem year_option" data-value="2020">2020 년</li>
                    <li class="optionItem year_option" data-value="2021">2021 년</li>
                    <li class="optionItem year_option" data-value="2022">2022 년</li>
                </ul>
            </div>
            `;
        },
        yearOptions: () => {
            return `
            <li class="optionItem year_option" data-value="2020">2020 년</li>
            `;
        },
        monthBox: () => {
            return `
            <button class="label month_label">9 월<span></span></button>
            <ul class="optionList month_list" style="width:96px !important;">
                ${Array(12)
                    .fill('month')
                    .htmlFor((_item, _index) =>
                        this.selectBox.monthOptions(_index)
                    )}
            </ul>
            `;
        },
        monthOptions: (_value) => {
            return `
            <li class="optionItem month_option" data-value="${_value
                .toString()
                .padStart(2, '0')}">${_value} 월</li>
            `;
        },
    };

    handleSelectBoxOption(_item, _boxStr, _labelStr) {
        $(_item).closest(_boxStr).removeClass('active');
        $(_item).closest(_boxStr).find(_labelStr).html(_item.textContent);
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

                    const _sbYear = $(this).data('value');
                    const _sbMonth = $(
                        `${_monthBoxStr} ${_monthOptionStr}`
                    ).data('value');

                    _module.goToDate(_module.info.module);
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
