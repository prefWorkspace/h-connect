const { CustomFullcalendar } = await import(
    importVersion('/H-Connect/js/lib/fullcalendar/custom/customFullCalendar.js')
);

const calendar = new CustomFullcalendar('#calendar', {
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
        // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
        // var title = prompt('Event Title:');
        // if (title) {
        //     calendar.addEvent({
        //         title: title,
        //         start: arg.start,
        //         end: arg.end,
        //         allDay: arg.allDay,
        //     });
        // }
        // calendar.unselect();
    },
    // events: [
    //     {
    //         title: '원격협진',
    //         start: '2022-05-24',
    //         constraint: 'businessHours',
    //     },
    // ],
});
