'use strict';

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

const { remoteAlarmTemplates } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteAlarm/templates/remoteAlarmTemplates.js'
    )
);

const { selectConsultView } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteAlarm/actions/remoteAlarmAPI.js'
    )
);

const {
    remoteAlarmCaseInfoTemplate,
    remoteAlarmTimeTemplate,
    remoteAlarmDoctorTemplate,
    remoteAlarmTimeTemplateIsent,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteAlarm/templates/remoteAlarmDetailTemplate.js'
    )
);

// 내가 보낸 협진 가능시간 시간표로 보기 탬플릿
const { canDateWithScheduleTemplates } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/index/templates/dateScheduleDetailTemplates.js'
    )
);

const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);

async function remoteAlarmClick(_consultid, _isentState) {
    let caseInfoHTML = '';
    let scheduleInfoHTML = '';
    let replyDoctorHTML = '';
    let noReplyDoctorHTML = '';
    let reply_count = 0;
    let noreply_count = 0;
    const consultId = $(this).data('consultid') || _consultid;
    const confirmState = $(this).data('confirmstate');
    const buttonTitle = confirmState === 'Y' ? '회신완료' : '회신하기';

    const isentState =
        $(this).data('isentstate') !== undefined
            ? $(this).data('isentstate')
            : _isentState;

    const { result, list } = await selectConsultView(consultId);

    if (result) {
        const {
            caseInfoList,
            memberInfoList,
            scheduleInfoList,
            deadlineDatetime,
        } = list[0];
        // fakeSelectConsultView[0];

        // 협진내용 탬플릿
        for (let i = 0; i < caseInfoList.length; i++) {
            caseInfoHTML += remoteAlarmCaseInfoTemplate(caseInfoList[i]);
        }

        // 협진 참여자 탬플릿
        for (let i = 0; i < memberInfoList.length; i++) {
            const { replyState } = memberInfoList[i];
            if (replyState === 'Y') {
                replyDoctorHTML += remoteAlarmDoctorTemplate(memberInfoList[i]);
                reply_count++;
            } else {
                noReplyDoctorHTML += remoteAlarmDoctorTemplate(
                    memberInfoList[i]
                );
                noreply_count++;
            }
        }

        // 협진교수 제목 렌더링
        if (isentState === 0) {
            const { doctorLevelName, doctorName } = memberInfoList.find(
                (doctor) => doctor.host === 'Y'
            );
            const length = memberInfoList.length;
            const text = `${doctorName} ${doctorLevelName} ${
                length > 1 ? `외 ${length - 1}명` : ''
            }`;
            $(`#isentstate${isentState} .member_count`).text(text);

            // 협진 가능 시간 선택 탬플릿
            for (let i = 0; i < scheduleInfoList.length; i++) {
                scheduleInfoHTML += remoteAlarmTimeTemplate(
                    scheduleInfoList[i]
                );
            }

            // 협진 가능 시간 선택 렌더링
            $(`#isentstate${isentState} #tab-1`).html(scheduleInfoHTML);
        }

        if (isentState === 1) {
            // 협진 가능 시간 선택 탬플릿
            for (let i = 0; i < scheduleInfoList.length; i++) {
                scheduleInfoHTML += remoteAlarmTimeTemplateIsent(
                    scheduleInfoList[i]
                );
            }
            $(`#isentstate${isentState} #metab-1`).html(scheduleInfoHTML);
            $(`isentstate${isentState} .btn_reply`).text(buttonTitle);
        }

        // 데드라인 렌더링
        const time = moment(deadlineDatetime).format('YY.MM.DD  HH:mm');
        $(`#isentstate${isentState} .deadlineTime`).text(time);

        // 협진 내용 렌더링
        $(`#isentstate${isentState} .collabor_wrap .cont .cont_list`).html(
            caseInfoHTML
        );

        // 의사 리스트 렌더링
        $(`#isentstate${isentState} .member .replydoctor div`).html(
            replyDoctorHTML
        );

        // 미참여 의사 리스트 렌더링
        $(`#isentstate${isentState} .member .noreplydoctor div`).html(
            noReplyDoctorHTML
        );

        // 참여자 카운트 렌더링
        $(`#isentstate${isentState} .member .reply_count`).text(reply_count);

        // 미참여자 카운트 렌더링
        $(`#isentstate${isentState} .member .noreply_count`).text(
            noreply_count
        );
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
