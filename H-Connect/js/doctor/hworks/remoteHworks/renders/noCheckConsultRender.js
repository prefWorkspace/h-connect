'use strict';

const { noCheckConsultTemplates } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/remoteHworks/templates/noCheckConsultTemplates.js'
    )
);

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

export function noCheckConsultReder(list) {
    let html = '';

    if (!list || list.length === 0) {
        html = errorText();
        $('.remote_alarm .right .list').html(html);
        return;
    }

    for (let i = 0; i < list.length; i++) {
        html += noCheckConsultTemplates(list[i]);
    }

    $('.remote_alarm .right .list').html(html);
}
