'use strict';

const { numToDay } = await import(
    importVersion('/H-Connect/js/utils/common/utils.js')
);

const { calendarDateTemplate, myCalendarTemplate } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/mySchedule/templates/myCalendarTemplate.js'
    )
);

const { selectMyScheduleList } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/mySchedule/actions/myCalendarAPI.js'
    )
);

async function dateInit() {
    const today = new Date();
    let date = moment(today).format('DD');
    let innerTwohtml = '';
    let innerFourhtml = '';
    let isWeekend = false;
    let isToday = true;
    let dayNum = moment(today).day();
    let id = moment(today).format('YYYYMMDD');

    for (let i = 0; i < 28; i++) {
        if (dayNum === 0 || dayNum === 6) {
            isWeekend = true;
        }
        let day = numToDay(dayNum);
        const dayDate = {
            date,
            day,
            isWeekend,
            isToday,
            id,
        };
        if (i >= 14) {
            innerFourhtml += calendarDateTemplate(dayDate);
        } else {
            innerTwohtml += calendarDateTemplate(dayDate);
        }

        // 데이터 초기화
        isToday = false;
        isWeekend = false;
        date = moment(today)
            .add(i + 1, 'd')
            .format('DD');
        dayNum = moment(today)
            .add(i + 1, 'd')
            .day();
        id = moment(today)
            .add(i + 1, 'd')
            .format('YYYYMMDD');
    }

    const divEl = `
        <div class="four">
            ${innerFourhtml}
        </div>
    `;
    $('.all_plan .weekly .inner.two').html(innerTwohtml + divEl);
    await myScheduleInit();
}

async function positionHandle() {
    const titleParent = $('.all_plan .weekly .day');

    titleParent.each((_, value) => {
        const child = $(value).find('.plan');
        const childArr = [...child];
        if (childArr.length > 1) {
            const position = [];
            for (let i = 0; i < childArr.length; i++) {
                const top = $(childArr[i]).position().top;
                const height = $(childArr[i]).height();
                const obj = { top, height };
                position.push(obj);
            }
            position.sort((a, b) => a.top - b.top);
        }
    });
}

async function myScheduleInit() {
    const { result, list } = await selectMyScheduleList();

    let html = '';
    if (result) {
        for (let i = 0; i < list.length; i++) {
            const { startDatetime } = list[i];
            const id = moment(startDatetime).format('YYYYMMDD');
            html = myCalendarTemplate(list[i]);
            $(`#${id} .title`).after(html);
        }
    }
    // else {
    //     for (let i = 0; i < selectMycalendar.length; i++) {
    //         const { startDatetime } = selectMycalendar[i];
    //         const id = moment(startDatetime).format('YYYYMMDD');
    //         html = myCalendarTemplate(selectMycalendar[i]);
    //         $(`#${id} .title`).after(html);
    //     }
    // }

    await positionHandle();
}

await dateInit();
