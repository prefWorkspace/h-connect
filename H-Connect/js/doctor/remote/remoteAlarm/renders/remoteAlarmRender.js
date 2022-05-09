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

const { remoteAlarmCaseInfoTemplate } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteAlarm/templates/remoteAlarmDetailTemplate.js'
    )
);

const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);

async function remoteAlarmClick(_consultid, _isentState) {
    let caseInfoHTML = '';
    let scheduleInfoHTML = '';
    const consultId = $(this).data('consultid') || _consultid;
    const isentState = $(this).data('isentstate') || _isentState;
    const { result, list } = await selectConsultView(consultId);

    if (result && list.length > 0) {
    } else {
        // console.log('fakeSelectConsultView===');
        // console.log(fakeSelectConsultView);

        const {
            caseInfoList,
            memberInfoList,
            scheduleInfoList,
            deadlineDatetime,
        } = fakeSelectConsultView[0];

        // 협진내용 탬플릿
        for (let i = 0; i < caseInfoList.length; i++) {
            caseInfoHTML += remoteAlarmCaseInfoTemplate(caseInfoList[i]);
        }

        // 협진 가능시간 탬플릿
        // for(let i = 0; i < memberInfoList)

        // 협진교수 제목 렌더링
        if (isentState === 0) {
            const { doctorLevelName, doctorName } = memberInfoList[0];
            const length = memberInfoList.length;
            const text = `${doctorName} ${doctorLevelName} ${
                length > 1 ? `외 ${length - 1}명` : ''
            }`;
            $(`#isentstate${isentState} .member_count`).text(text);
        }

        // 데드라인 렌더링
        const time = moment(deadlineDatetime).format('YY.MM.DD  HH:mm');
        $(`#isentstate${isentState} .deadlineTime`).text(time);

        // 협진 내용 렌더링
        $(`#isentstate${isentState} .collabor_wrap .cont .cont_list`).html(
            caseInfoHTML
        );

        // 의사 리스트 렌더링
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
        $('.remote_request .list .wr .row').each(async (_, value) => {
            const consultId = $(value).data('consultid');
            if (consultId === query) {
                $(value).addClass('on');
                const isentState = $(value).data('isentstate');
                $(`#isentstate${isentState}`).show();
                await remoteAlarmClick(consultId, isentState);
            }
        });
        return;
    }

    $('.remote_request .list .wr .row').each(async (index, value) => {
        if (index === 0) {
            $(value).addClass('on');
            const isentState = $(value).data('isentstate');
            const consultId = $(value).data('consultid');
            $(`#isentstate${isentState}`).show();
            await remoteAlarmClick(consultId, isentState);
            return;
        }
    });
}
