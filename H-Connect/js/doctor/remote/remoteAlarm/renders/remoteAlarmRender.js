'use strict';

const { errorText } = await import(
    importVersion('/H-Connect/js/common/errorText/errorText.js')
);

const { remoteAlarmTemplates } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteAlarm/templates/remoteAlarmTemplates.js'
    )
);

export function remoteAlarmRender(_list) {
    let html = '';

    if (!_list || _list.length === 0) {
        html = errorText();
        $('.remote_request .list .wr').html(html);
        return;
    }

    for (let i = 0; i < _list.length; i++) {
        html += remoteAlarmTemplates(_list[i]);
    }

    $('.remote_request .list .wr').html(html);

    $('.remote_request .list .wr .row').each((index, value) => {
        if (index === 0) {
            $(value).addClass('on');
            const isentState = $(value).data('isentstate');
            $(`#isentstate${isentState}`).show();
            return;
        }
    });
}
