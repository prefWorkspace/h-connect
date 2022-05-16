'use strict';

const { selectMyScheduleList } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/mySchedule/actions/myCalendarAPI.js'
    )
);

const { selectMycalendar } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/mok.js')
);

const { dateScheduleRender } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/index/renders/dateScheduleRenders.js'
    )
);

async function calendarHandle() {
    const date = $(this).data('date') || new Date();
    const startDatetime = moment(date).format('YYYY-MM-DD 00:00:00');
    const endDatetime = moment(date).format('YYYY-MM-DD 23:59:59');
    const { result, list } = await selectMyScheduleList(
        startDatetime,
        endDatetime
    );
    $('#d_day_count').text(list.length);
    $('#d_day').text(
        `${moment(date).format('MM')}월 ${moment(date).format('DD')}일`
    );

    // if (result) {
    //     await dateScheduleRender(list);
    // } else {
    // await dateScheduleRender([]);
    await dateScheduleRender(selectMycalendar);
    await init();
    // }
}

function myCalendarClickHandler() {
    const consultChannel = $(this).data('consultchannle');
    const isentState = +$(this).data('isentstate');

    $('.all_plan .cal_list .schedule_list .row').removeClass('on');
    $(this).addClass('on');
    $('.section.right').hide();
    if (isentState === 1) {
        $(`#consultChannel0`).show();
    } else {
        $(`#consultChannel${consultChannel}`).show();
    }
}

async function init() {
    $('.all_plan .cal_list .schedule_list .row').each((index, value) => {
        if (index === 0) {
            $(value).addClass('on');
            $('.section.right').hide();
            const consultChannel = $(value).data('consultchannle');
            const isentState = +$(value).data('isentstate');
            if (isentState === 1) {
                $(`#consultChannel0`).show();
            } else {
                $(`#consultChannel${consultChannel}`).show();
            }
        }
    });

    $('.all_plan .cal_list .schedule_list .row').on(
        'click',
        myCalendarClickHandler
    );
}

await calendarHandle();
$('.fc-daygrid-day').on('click', calendarHandle);
