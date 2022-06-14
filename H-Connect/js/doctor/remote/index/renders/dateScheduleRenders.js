'use strict';

const { dataScheduleTemplates } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/index/templates/dateScheduleTemplates.js'
    )
);

const {
    dateScheduleCaseDetailTemplates,
    doctorListTemplates,
    canDateWithTemplates,
    canDateWithTemplatesisentnot,
    canDateWithScheduleTemplates,
    canDateWithTemplatesMetab2,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/index/templates/dateScheduleDetailTemplates.js'
    )
);

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

const {
    selectRealTimeAndOpinionAndEmergencyConsultView,
    selectConsultView,
    selectConsultConfirmView,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/index/actions/dateScheduleAPI.js'
    )
);

function loopHtml(_list, type) {
    let html = '';
    if (!_list) {
        return `<></>`;
    }

    for (let i = 0; i < _list.length; i++) {
        if (type === 1) {
            html += doctorListTemplates(_list[i]);
        } else if (type === 2) {
            html += dateScheduleCaseDetailTemplates(_list[i]);
        } else if (type === 3) {
            html += canDateWithTemplates(_list[i]);
        } else if (type === 4) {
            html += canDateWithTemplatesisentnot(_list[i]);
        } else if (type === 5) {
            html += canDateWithScheduleTemplates(_list[i]);
        } else if (type === 6) {
            // const { memberInfoList, scheduleInfoList } = _list[i];
            html += canDateWithTemplatesMetab2(_list[i]);
        }
    }

    return html;
}

function startButtonHandle(_endDateTime, _unReplyCount) {
    const rightNow = new Date();
    const endDateTime = new Date(_endDateTime);

    if (rightNow.getTime() > endDateTime.getTime()) {
        $('.find_request .btn_colla').text('마감');
        $('.find_request .btn_colla').attr('disabled', true);
        return;
    }

    if (_unReplyCount === 0) {
        $('.find_request .btn_colla').text('시작하기');
        $('.find_request .btn_colla').attr('disabled', false);
        return;
    }

    if (_unReplyCount > 0) {
        $('.find_request .btn_colla').text('확인하기');
        $('.find_request .btn_colla').attr('disabled', false);
        return;
    }
}

export async function dateScheduleRender(_list) {
    let html = '';
    if (_list.length === 0) {
        html = errorText({ padding: '20px 0' });
        $('.all_plan .cal_list .schedule_list').html(html);
        return;
    }

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
        html = errorText({ padding: '20px 0' });
    }
    $('.all_plan .cal_list .schedule_list').html(html);
}

function dateSchduleDetailHandle(_scheduleData, isentState) {
    let html = '';
    let withMember = '';
    let witOutMember = '';
    let canWithTime = '';
    let canWithTimeSchedule = '';
    let canDateWithTemplatesMetab2 = '';

    if (_scheduleData.length === 0) {
        return;
    }

    const {
        memberInfoList,
        caseInfoList,
        deadlineDatetime,
        endDatetime,
        startDatetime,
        consultChannel,
        scheduleInfoList,
        createId,
    } = _scheduleData[0];

    const withMemberData = memberInfoList.filter((item) => {
        const { replyState, host, remoteState } = item;

        if (host === 'Y') return;

        if (consultChannel === 1 && replyState === 'Y') return item;

        if (consultChannel !== 1 && remoteState === 'Y') return item;
    });

    const withOutMemberData = memberInfoList.filter((item) => {
        const { replyState, host, remoteState } = item;

        if (host === 'Y') return;

        if (consultChannel === 1 && replyState === 'N') return item;

        if (consultChannel !== 1 && remoteState === 'N') return item;
    });

    withMember = loopHtml(withMemberData, 1);
    witOutMember = loopHtml(withOutMemberData, 1);
    html = loopHtml(caseInfoList, 2);
    canWithTime =
        isentState === 1
            ? loopHtml(scheduleInfoList, 3)
            : loopHtml(scheduleInfoList, 4);
    canWithTimeSchedule =
        isentState === 1 ? loopHtml(scheduleInfoList, 5) : null;

    // caseInfo 및 참여자 정보
    if (isentState === 1 && consultChannel === 1) {
        $(`#consultChannel0 .collabor_wrap .deadlineTime`).text(
            moment(deadlineDatetime).format('YY.MM.DD HH:mm')
        );
        $(`#consultChannel0 .collabor_wrap .cont .case_list`).html(html);
        $(`#consultChannel0 .collabor_wrap .member .withDoctor div`).html(
            withMember
        );

        $(`#consultChannel0 .collabor_wrap .member .withOutDoctor div`).html(
            witOutMember
        );

        // 리스트로 보기
        $('#metab-1').html(canWithTime);

        // 시간표로 보기
        canDateWithTemplatesMetab2 = loopHtml(scheduleInfoList, 6);
        $('#metab-2 .select_week').html(canDateWithTemplatesMetab2);

        if (canWithTimeSchedule !== null) {
            $('#metab-2 .inner').html(canWithTimeSchedule);
        }

        // 카운팅
        $(`#consultChannel0 .collabor_wrap .member .total_doctor_count`).text(
            withMemberData.length + withOutMemberData.length
        );
        $(`#consultChannel0 .collabor_wrap .member .no_doctor_count`).text(
            withOutMemberData.length
        );
        $(`#consultChannel0 .collabor_wrap .member .doctor_count`).text(
            withMemberData.length
        );
    } else {
        $(`#consultChannel${consultChannel} .collabor_wrap .case_list`).html(
            html
        );
        $(
            `#consultChannel${consultChannel} .collabor_wrap .member .withDoctor div`
        ).html(withMember);
        $(
            `#consultChannel${consultChannel} .collabor_wrap .member .withOutDoctor div`
        ).html(witOutMember);

        // 카운팅
        $(
            `#consultChannel${consultChannel} .collabor_wrap .member .total_doctor_count`
        ).text(withMemberData.length + withOutMemberData.length);

        $(
            `#consultChannel${consultChannel} .collabor_wrap .member .no_doctor_count`
        ).text(withOutMemberData.length);

        $(
            `#consultChannel${consultChannel} .collabor_wrap .member .doctor_count`
        ).text(withMemberData.length);

        $(`#consultChannel${consultChannel} .collabor_wrap .deadlineTime`).text(
            moment(deadlineDatetime).format('YY.MM.DD HH:mm')
        );

        $(
            `#consultChannel${consultChannel} .collabor_wrap .startDatetime`
        ).text(moment(startDatetime).format('YY.MM.DD HH:mm'));

        $(`#consultChannel${consultChannel} .collabor_wrap .endDatetime`).text(
            moment(endDatetime).format('YY.MM.DD HH:mm')
        );

        // 시간 데이터 바인딩
        if (consultChannel === 3) {
            $(
                `#consultChannel${consultChannel} .collabor_wrap .startDate`
            ).text(moment(startDatetime).format('YY.MM.DD'));
            $(
                `#consultChannel${consultChannel} .collabor_wrap .startDetetime`
            ).text(moment(startDatetime).format('HH:mm'));
            $(
                `#consultChannel${consultChannel} .collabor_wrap .endDetetime`
            ).text(moment(endDatetime).format('HH:mm'));
        }

        if (consultChannel === 1) {
            $(`#consultChannel${consultChannel} .time_select #tab-1`).html(
                canWithTime
            );
        }

        if (consultChannel === 2) {
            // startButtonHandle(_endDateTime, _unReplyCount)
        }
    }
}

export async function dateScheduleDetailRender(
    consultChannel,
    isentState,
    consultId
) {
    let selectList = [];

    if (consultChannel === 1 && isentState === 1) {
        const { result: confirmViewResult, list: confirmViewList } =
            await selectConsultConfirmView(consultId);
        selectList = confirmViewResult ? [...confirmViewList] : [];
    } else if (consultChannel === 1 && isentState !== 1) {
        const { result: consultViewResult, list: consultViewList } =
            await selectConsultView(consultId);
        selectList = consultViewResult ? [...consultViewList] : [];
    } else {
        const { result, list } =
            await selectRealTimeAndOpinionAndEmergencyConsultView(consultId);
        selectList = result ? [...list] : [];
    }
    dateSchduleDetailHandle(selectList, isentState);
}
