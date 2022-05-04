'use strict';

const { noCheckConsultTemplates, errorText } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/remoteHworks/templates/noCheckConsultTemplates.js'
    )
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
