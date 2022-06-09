'use strict';

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

const { remoteAlarmTemplates } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteAlarm/templates/remoteAlarmTemplates.js'
    )
);

const {
    selectConsultView,
    updateStatusDeleteConsult,
    selectConsultConfirmView,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteAlarm/actions/remoteAlarmAPI.js'
    )
);

const {
    remoteAlarmCaseInfoTemplate,
    remoteAlarmTimeTemplate,
    remoteAlarmDoctorTemplate,
    remoteAlarmTimeTemplateIsent,
    remoteAlarmTimeTemplateIsentmetab2,
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

const { PopupController } = await import(
    importVersion(
        '/H-Connect/js/utils/module/popupController/popupController.js'
    )
);
const { confirmTwoPopupTmpl } = await import(
    importVersion('/H-Connect/js/common/popup/templates/commonPopupTmpl.js')
);

const _deleteSchedulePopup = new PopupController({
    /* 협진 삭제 팝업 생성 */
    target: {
        openButton: '.me_request .btn_delete',
        appendWrap: '#delete_schedule_popupwrap',
    },
    templates: {
        popup: () => {
            return confirmTwoPopupTmpl({
                type: 'delete',
                title: '요청한 일정 및 작성한 협진내용이 모두 삭제됩니다.',
                message: '삭제 하시겠습니까?',
            });
        },
    },
    popupBtn: {
        cancleBtn: {
            target: '.btn.gr',
            close: true,
        },
        submitBtn: {
            target: '.btn.blf',
            close: true,
            action: async (_info) => {
                const _getConsultId = _info.getData('consultId');
                const _resDeleteConsult = await updateStatusDeleteConsult(
                    _getConsultId
                );
                if (_resDeleteConsult?.result === true) {
                    window.location.reload();
                } else {
                    alert('협진 일정 요청 삭제를 실패했습니다.');
                }
            },
        },
    },
});

function saveDeleteBtnConsulIdToPopup(_consultId) {
    // 삭제 버튼 이벤트 추가
    if (_consultId) {
        _deleteSchedulePopup.saveData('consultId', _consultId);
    } else {
        _deleteSchedulePopup.removeData('consultId');
    }
}

async function remoteAlarmClick(value, _isentState) {
    let caseInfoHTML = '';
    let scheduleInfoHTML = '';
    let metabscheduleInfoHTML = '';
    let replyDoctorHTML = '';
    let noReplyDoctorHTML = '';
    let canWithTime = '';
    let reply_count = 0;
    let noreply_count = 0;
    let list = [];
    const consultId = $(this).data('consultid') || $(value).data('consultid');
    const confirmState =
        $(this).data('confirmstate') || $(value).data('confirmstate');
    const consultConfirm =
        $(this).data('consultconfirm') || $(value).data('consultconfirm');

    const isentState =
        $(this).data('isentstate') !== undefined
            ? $(this).data('isentstate')
            : _isentState;
    const { result: isentNotResult, list: isentNotConsultList } =
        await selectConsultView(consultId);
    const { result: isentResult, list: isentConsultList } =
        await selectConsultConfirmView(consultId);

    list = isentState === 0 ? [...isentNotConsultList] : [...isentConsultList];
    if (isentNotResult || isentResult) {
        const {
            caseInfoList,
            memberInfoList,
            scheduleInfoList,
            deadlineDatetime,
        } = list[0];

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
            const buttonTitle = confirmState === 'Y' ? '회신완료' : '회신하기';
            $(`#isentstate${isentState} #tab-1`).html(scheduleInfoHTML);
            $(`#isentstate${isentState} .btn_reply`).text(buttonTitle);
        }

        if (isentState === 1) {
            // 협진 가능 시간 선택 탬플릿

            for (let i = 0; i < scheduleInfoList.length; i++) {
                scheduleInfoHTML += remoteAlarmTimeTemplateIsent(
                    scheduleInfoList[i],
                    memberInfoList
                );
                metabscheduleInfoHTML += remoteAlarmTimeTemplateIsentmetab2(
                    scheduleInfoList[i],
                    memberInfoList
                );
                canWithTime += canDateWithScheduleTemplates(
                    scheduleInfoList[i]
                );
            }

            $('#metab-2 .inner').html(canWithTime);

            $(`#isentstate${isentState} #metab-1`).html(scheduleInfoHTML);
            $(`#isentstate${isentState} #metab-2 .select_week`).html(
                metabscheduleInfoHTML
            );

            const buttonTitle =
                consultConfirm === 'Y' ? '일정확정' : '확정완료';
            $(`#isentstate${isentState} .btn_decide`).text(buttonTitle);
            $('#total_memebr_count').text(memberInfoList.length - 1);

            /* Ji : 수정 버튼 이벤트 부여 ( 내가 보냈을 때 ) */
            scheduleModifyBtnEventControll(consultId);
            saveDeleteBtnConsulIdToPopup(consultId);
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
            noreply_count - 1
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
                await remoteAlarmClick(value, isentState);
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
            await remoteAlarmClick(value, isentState);
            return;
        }
        ``;
    });
}

function scheduleModifyBtnEventControll(_consultId) {
    const _baseLink = '/doctor/remote_new.html';
    const _fromLink = window.location.pathname;
    const _calcFromLink = _fromLink.split('/doctor/')[1].split('.html')[0];
    /* Ji : 협진 일정 요청 수정 버튼 이벤트 부여*/
    $('.me_request .container .btn_modify')
        .off()
        .on('click', function () {
            window.location.href = `${_baseLink}?modify=${_consultId}&from=${_calcFromLink}`;
        });
}
