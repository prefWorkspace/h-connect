'use strict';
const { CustomFullcalendar } = await import(
    importVersion('/H-Connect/js/lib/fullcalendar/custom/customFullCalendar.js')
);

const { selectMyScheduleList } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/mySchedule/actions/myCalendarAPI.js'
    )
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

async function calendarHandle(_selectDate) {
    const queryendDatetime = getParams('endDatetime');
    let date = queryendDatetime || new Date();
    if (_selectDate) {
        date = new Date(_selectDate.dateStr);
    }
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

export function myCalendarClickHandler() {
    const consultChannel = $(this).data('consultchannle');
    const isentState = +$(this).data('isentstate');
    const consultId = $(this).data('consultid');
    const remote_member = $(this).find('.remote_member').text();
    const confirmState = $(this).data('confirmstate');
    const buttonTitle = confirmState === 'Y' ? '회신완료' : '회신하기';

    $(`#consultChannel${consultChannel} .btn_reply`).text(buttonTitle);

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
    const $consultList = $('.all_plan .cal_list .schedule_list .row');
    const consultList = [...$consultList];

    const hasConsultId = consultList.some(
        (item) => $(item).data('consultid') === queryConsultId
    );

    $('.all_plan .cal_list .schedule_list .row').on(
        'click',
        myCalendarClickHandler
    );

    if (hasConsultId) {
        // $('.all_plan .cal_list .schedule_list .row').each((index, value) => {
        const item = consultList.find(
            (item) => $(item).data('consultid') === queryConsultId
        );
        const consultId = $(item).data('consultid');
        const confirmState = $(item).data('confirmstate');
        if (queryConsultId === consultId) {
            $(item).addClass('on');

            const isentState = +$(item).data('isentstate');
            const consultId = $(item).data('consultid');
            const consultChannel = $(item).data('consultchannle');
            const remote_member = $(item).find('.remote_member').text();
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
        // });

        return;
    }

    // $('.all_plan .cal_list .schedule_list .row').each((index, value) => {
    // if (index === 0) {
    const item = consultList[0];
    $(item).addClass('on');
    const isentState = +$(item).data('isentstate');
    const consultId = $(item).data('consultid');
    const consultChannel = $(item).data('consultchannle');
    const confirmState = $(item).data('confirmstate');
    const remote_member = $(item).find('.remote_member').text();
    if (isentState === 1 && consultChannel === 1) {
        $(`#consultChannel0`).show();
        $(`#consultChannel0 .remote_member`).text(remote_member);

        /* Ji : 수정 버튼 이벤트 부여 ( 내가 보냈을 때 ) */
        scheduleModifyBtnEventControll(consultId);
    } else {
        $(`#consultChannel${consultChannel}`).show();
        $(`#consultChannel${consultChannel} .remote_member`).text(
            remote_member
        );
        const buttonTitle = confirmState === 'Y' ? '회신완료' : '회신하기';
        $(`#consultChannel${consultChannel} .btn_reply`).text(buttonTitle);
    }
    dateScheduleDetailRender(consultChannel, isentState, consultId);
    // }
    // });
}

await calendarHandle();

function scheduleModifyBtnEventControll(_consultId) {
    const _baseLink = '/doctor/remote_new.html';
    /* Ji : 협진 일정 요청 수정 버튼 이벤트 부여*/
    $('.me_request .container .btn_modify')
        .off()
        .on('click', function () {
            window.location.href = `${_baseLink}?modify=${_consultId}`;
        });
}
/* Ji : 달력 모듈 */
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
    dateClickActiveAble: true,
    dateClickActive: (_selectDate) => {
        calendarHandle(_selectDate);
    },
    unselectAuto: false,
});
