const { CustomFullcalendar } = await import(
    importVersion('/H-Connect/js/lib/fullcalendar/custom/customFullCalendar.js')
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
    firstClickUnSelectToday: true,
    unselectAuto: false,
    dateClick: function (selectData, _item) {
        const { dayEl, date, dateStr } = selectData;
        const { module } = _item;
        const { element } = _item.init.target;

        function getTimeFunc(_value) {
            return new Date(_value).getTime();
        }
        let _getSavedDate = $(element).data('start-end-date') ?? [];
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

        $(element).data('start-end-date', _calcedDateArr);

        const [startDate, endDate] = _calcedDateArr;

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
        module.unselect();
        if (startDate?.dateStr && endDate?.dateStr) {
            const _minusOneDayEndDate = moment(endDate.dateStr, 'YYYY-MM-DD')
                .add(1, 'days')
                .format('YYYY-MM-DD');
            console.log('_minusOneDayEndDate: ', _minusOneDayEndDate);
            module.select(startDate.dateStr, _minusOneDayEndDate);
        }
    },

    // events: [
    //     {
    //         title: '원격협진',
    //         start: '2022-05-24',
    //         constraint: 'businessHours',
    //     },
    // ],
});
