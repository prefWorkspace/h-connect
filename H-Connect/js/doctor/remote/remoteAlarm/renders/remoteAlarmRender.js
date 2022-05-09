'use strict';

const { errorText } = await import(
    importVersion('/H-Connect/js/common/errorText/errorText.js')
);

const { remoteAlarmTemplates } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteAlarm/templates/remoteAlarmTemplates.js'
    )
);

const { fakeSelectConsultView } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/mok.js')
);

const { selectConsultView } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteAlarm/actions/remoteAlarmAPI.js'
    )
);

const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);

async function remoteAlarmClick() {
    const consultId = $(this).data('consultid');
    const isentState = $(this).data('isentstate');
    const { result, list } = await selectConsultView(consultId);

    if (result && list.length > 0) {
    } else {
        const {
            caseInfoList,
            memberInfoList,
            scheduleInfoList,
            deadlineDatetime,
        } = fakeSelectConsultView;
    }
}

export function remoteAlarmRender(_list) {
    let html = '';
    const { getParams } = history;
    const query = getParams('consultId');

    if (!_list || _list.length === 0) {
        html = errorText();
        $('.remote_request .list .wr').html(html);
        return;
    }

    for (let i = 0; i < _list.length; i++) {
        html += remoteAlarmTemplates(_list[i]);
    }

    $('.remote_request .list .wr').html(html);
    $('.remote_request .list .wr .row').on('click', remoteAlarmClick);

    if (query !== '') {
        $('.remote_request .list .wr .row').each((index, value) => {
            const consultId = $(value).data('consultid');
            if (consultId === query) {
                $(value).addClass('on');
                const isentState = $(value).data('isentstate');
                $(`#isentstate${isentState}`).show();
            }
        });
        return;
    }

    $('.remote_request .list .wr .row').each((index, value) => {
        if (index === 0) {
            $(value).addClass('on');
            const isentState = $(value).data('isentstate');
            $(`#isentstate${isentState}`).show();
            return;
        }
    });
}
