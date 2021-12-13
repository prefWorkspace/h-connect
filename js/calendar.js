$(document).ready(function(){
        //   weekly 캘린더
        var Calendar = tui.Calendar;
        var calendar = new Calendar('#week_calendar', {
        defaultView: 'week',
        // taskView: true,
        template: {
            monthGridHeader: function(model) {
            var date = new Date(model.date);
            var template = '<span class="tui-full-calendar-weekday-grid-date">' + date.getDate() + '</span>';
            return template;
            },
        },
        week: {
                daynames: ['일', '월', '화', '수', '목', '금', '토'],
                startDayOfWeek: 0,
                narrowWeekend: true,
                hourStart: 9,
                hourEnd : 18,
                workweek: true // 스케줄에 주말 뺴기
            },
        });

        calendar.createSchedules([
            {
                id: '1', //일정 ID
                calendarId: 'ambulatory care', //캘린더 ID
                title: '외래진료',  //일정제목
                category: 'time',   //일정 종류
                dueDateCalss: '',
                start: '2021-12-13T10:30:00+00:00', //일정시작
                end: '2021-12-13T12:000:00+00:00'   //일정끝
            },
            {
                id: '2',
                calendarId: 'multi start',
                title: '협진시작',
                category: 'time',
                dueDateCalss: '',
                start: '2021-12-14T10:30:00+00:00',
                end: '2021-12-14T12:000:00+00:00'
            },
            {
                id: '3',
                calendarId: 'multi start',
                title: '협진시작',
                category: 'time',
                dueDateCalss: '',
                start: '2021-12-14T10:30:00+00:00',
                end: '2021-12-14T12:000:00+00:00'
            },
            {
                id: '4',
                calendarId: 'ambulatory care',
                title: '외래진료',
                category: 'time',
                dueDateCalss: '',
                start: '2021-12-15T10:30:00+00:00',
                end: '2021-12-15T12:000:00+00:00'
            },
            {
                id: '5',
                calendarId: 'multi start',
                title: '협진시작',
                category: 'time',
                dueDateCalss: '',
                start: '2021-12-15T13:00:00+00:00',
                end: '2021-12-15T16:000:00+00:00'
            },
            
        ]);

        calendar.setCalendars([
            {
                id: 'ambulatory care',
                name: '외래진료',
                color: '#fff',
                bgColor: '#350039',
                dragBgColor: '#ff5583',
                borderColor: '#ff5583'
            },
            {
                id: 'multi start',
                name: '협진시작',
                color: '#007A94',
                bgColor: '#fff',
                dragBgColor: '#fff',
                borderColor: '#007A94'
            },
            {
                id: 'opinion',
                name: '소견요청',
                color: '#fff',
                bgColor: '#FF8000',
                dragBgColor: '#fff',
                borderColor: '#FF8000'
            },
            {
                id: 'request',
                name: '협진 일정 요청',
                color: '#fff',
                bgColor: '#E22A74',
                dragBgColor: '#fff',
                borderColor: '#E22A74'
            },

            ]);


        calendar.on({
            'clickSchedule': function(e) {
                console.log('clickSchedule', e);
            },
            'beforeCreateSchedule': function(e) {
                console.log('beforeCreateSchedule', e);
                // open a creation popup
            },
            'beforeUpdateSchedule': function(e) {
                console.log('beforeUpdateSchedule', e);
                e.schedule.start = e.start;
                e.schedule.end = e.end;
                cal.updateSchedule(e.schedule.id, e.schedule.calendarId, e.schedule);
            },
            'beforeDeleteSchedule': function(e) {
                console.log('beforeDeleteSchedule', e);
                cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
            }
        });

})