'use strict';

const { selectMyScheduleList } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/mySchedule/actions/myCalendarAPI.js'
    )
);

const { selectMycalendar } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/mok.js')
);

const { dateScheduleRender, dateScheduleDetailRender } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/index/renders/dateScheduleRenders.js'
    )
);

const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);

const { getParams } = history;

async function calendarHandle() {
    const queryendDatetime = getParams('endDatetime');
    const date = queryendDatetime || $(this).data('date') || new Date();
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

    if (result) {
        $('.section.right').hide();
        await dateScheduleRender(list);
    }
    //  else {
    //     // await dateScheduleRender([]);
    //     await dateScheduleRender(selectMycalendar);
    // }
    await init();
}

function myCalendarClickHandler() {
    const consultChannel = $(this).data('consultchannle');
    const isentState = +$(this).data('isentstate');
    const consultId = $(this).data('consultid');
    const confirmState = $(this).data('confirmstate');
    const remote_member = $(this).find('.remote_member').text();

    $('.all_plan .cal_list .schedule_list .row').removeClass('on');
    $(this).addClass('on');
    $('.section.right').hide();
    if (isentState === 1 && consultChannel === 1) {
        $(`#consultChannel0`).show();
        $(`#consultChannel0 .remote_member`).text(remote_member);
    } else {
        $(`#consultChannel${consultChannel}`).show();
        $(`#consultChannel${consultChannel} .remote_member`).text(
            remote_member
        );
    }

    dateScheduleDetailRender(consultChannel, isentState, consultId);
}

async function init() {
    const queryConsultId = getParams('consultId');

    $('.all_plan .cal_list .schedule_list .row').on(
        'click',
        myCalendarClickHandler
    );

    if (queryConsultId !== '') {
        $('.all_plan .cal_list .schedule_list .row').each((index, value) => {
            const consultId = $(value).data('consultid');
            const confirmState = $(value).data('confirmstate');
            if (queryConsultId === consultId) {
                $(value).addClass('on');

                const isentState = +$(value).data('isentstate');
                const consultId = $(value).data('consultid');
                const consultChannel = $(value).data('consultchannle');
                const remote_member = $(value).find('.remote_member').text();
                if (isentState === 1 && consultChannel === 1) {
                    $(`#consultChannel0`).show();
                    $(`#consultChannel0 .remote_member`).text(remote_member);
                } else {
                    $(`#consultChannel${consultChannel}`).show();
                    $(`#consultChannel${consultChannel} .remote_member`).text(
                        remote_member
                    );
                    const buttonTitle =
                        confirmState === 'Y' ? '회신완료' : '회신하기';
                    $(`#consultChannel${consultChannel} .btn_reply`).text(
                        buttonTitle
                    );
                }
                dateScheduleDetailRender(consultChannel, isentState, consultId);
            }
        });

        return;
    }

    $('.all_plan .cal_list .schedule_list .row').each((index, value) => {
        if (index === 0) {
            $(value).addClass('on');

            const isentState = +$(value).data('isentstate');
            const consultId = $(value).data('consultid');
            const consultChannel = $(value).data('consultchannle');
            const confirmState = $(value).data('confirmstate');
            const remote_member = $(value).find('.remote_member').text();
            if (isentState === 1) {
                $(`#consultChannel0`).show();
                $(`#consultChannel0 .remote_member`).text(remote_member);
            } else {
                $(`#consultChannel${consultChannel}`).show();
                $(`#consultChannel${consultChannel} .remote_member`).text(
                    remote_member
                );
                const buttonTitle =
                    confirmState === 'Y' ? '회신완료' : '회신하기';
                $(`#consultChannel${consultChannel} .btn_reply`).text(
                    buttonTitle
                );
            }
            dateScheduleDetailRender(consultChannel, isentState, consultId);
        }
    });
}

await calendarHandle();
$('.fc-daygrid-day').on('click', calendarHandle);
