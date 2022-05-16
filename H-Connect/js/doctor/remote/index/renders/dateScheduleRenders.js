'use strict';

const { dataScheduleTemplates } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/index/templates/dateScheduleTemplates.js'
    )
);

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

export async function dateScheduleRender(_list) {
    if (_list.length === 0) {
        html = errorText();
        $('.all_plan .cal_list .schedule_list').html(html);
        return;
    }
    let html = '';

    for (let i = 0; i < _list.length; i++) {
        const { consultChannel } = _list[i];
        if (
            consultChannel === 1 ||
            consultChannel === 2 ||
            consultChannel === 3
        ) {
            html += dataScheduleTemplates(_list[i]);
        }
    }

    if (html === '') {
        html = errorText();
    }
    $('.all_plan .cal_list .schedule_list').html(html);
}
