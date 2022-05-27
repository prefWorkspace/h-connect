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
    dateClick: function (selectData, _item) {},

    // events: [
    //     {
    //         title: '원격협진',
    //         start: '2022-05-24',
    //         constraint: 'businessHours',
    //     },
    // ],
});
