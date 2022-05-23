'use strict';

const { dataScheduleTemplates } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/index/templates/dateScheduleTemplates.js'
    )
);

const { dateScheduleCaseDetailTemplates, doctorListTemplates } = await import(
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

const { selectMycalendar } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/mok.js')
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

function dateSchduleDetailHandle(_scheduleData, isentState, consultId) {
    let html = '';
    let withMember = '';
    let witOutMember = '';

    const {
        memberInfoList,
        caseInfoList,
        deadlineDatetime,
        endDatetime,
        startDatetime,
        consultChannel,
    } = selectMycalendar.find((item) => item.consultId === consultId);
    const aaa = selectMycalendar.find((item) => item.consultId === consultId);
    console.log('aaa==');
    console.log(aaa);
    // _scheduleData[0];

    const withMemberData = memberInfoList.filter(
        (item) => item.remoteState !== 'N'
    );

    const withOutMemberData = memberInfoList.filter(
        (item) => item.remoteState === 'N'
    );

    for (let i = 0; i < withMemberData.length; i++) {
        withMember += doctorListTemplates(withMemberData[i]);
    }

    for (let i = 0; i < withOutMemberData.length; i++) {
        witOutMember += doctorListTemplates(withOutMemberData[i]);
    }

    for (let i = 0; i < caseInfoList.length; i++) {
        html += dateScheduleCaseDetailTemplates(caseInfoList[i]);
    }

    // caseInfo 및 참여자 정보
    if (isentState === 1) {
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

        $(`#consultChannel${consultChannel} .collabor_wrap .deadlineTime`).text(
            moment(deadlineDatetime).format('YY.MM.DD HH:mm')
        );

        $(
            `#consultChannel${consultChannel} .collabor_wrap .startDatetime`
        ).text(moment(startDatetime).format('YY.MM.DD HH:mm'));

        $(`#consultChannel${consultChannel} .collabor_wrap .endDatetime`).text(
            moment(endDatetime).format('YY.MM.DD HH:mm')
        );
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
        selectList = [...confirmViewList];
    } else if (consultChannel === 1 && isentState !== 1) {
        const { result: consultViewResult, list: consultViewList } =
            await selectConsultView(consultId);
        selectList = [...consultViewList];
    } else {
        const { result, list } =
            await selectRealTimeAndOpinionAndEmergencyConsultView(consultId);
        selectList = [...list];
    }

    dateSchduleDetailHandle(selectList, isentState, consultId);
}
