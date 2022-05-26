'use strict';

const { isentRemoteAlarmTemplates, isentNotRemoteAlarmTemplates } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/hworks/remoteHworks/templates/myRemoteTemplates.js'
        )
    );

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

export function remoteAlarmRender(list) {
    let html = '';

    if (!list || list.length === 0) {
        html = errorText();
        $('.remote_alarm .left .list').html(html);
        return;
    }

    for (let i = 0; i < list.length; i++) {
        const { isentState } = list[i];
        console.log('list[i]===');
        console.log(isentState);

        if (isentState === 0) {
            html += isentNotRemoteAlarmTemplates(list[i]);
        }

        if (isentState === 1) {
            html += isentRemoteAlarmTemplates(list[i]);
        }
    }

    $('.remote_alarm .left .list').html(html);
}