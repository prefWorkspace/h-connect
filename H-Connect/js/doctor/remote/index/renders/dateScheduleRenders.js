'use strict';

const { dataScheduleTemplates } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/index/templates/dateScheduleTemplates.js'
    )
);

const { dateScheduleCaseDetailTemplates } = await import(
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

export async function dateScheduleDetailRender(
    consultChannel,
    isentState,
    consultId
) {
    let html = '';
    let withMember = '';
    let witOutMember = '';

    if (consultChannel === 1 && isentState === 1) {
        const { result: confirmViewResult, list: confirmViewList } =
            await selectConsultConfirmView(consultId);
    } else if (consultChannel === 1 && isentState !== 1) {
        const { result: consultViewResult, list: consultViewList } =
            await selectConsultView(consultId);
    } else {
        const { result, list } =
            await selectRealTimeAndOpinionAndEmergencyConsultView(consultId);
    }

    // 이거는 더미 처리
    const { memberInfoList, caseInfoList } = selectMycalendar.find(
        (item) => item.consultId === consultId
    );

    // const withMemberData = memberInfoList.filter(
    //     (item) => item.remoteState !== 'N'
    // );
    // const withOutMemberData = memberInfoList.filter(
    //     (item) => item.remoteState === 'N'
    // );
    // if (!data || data.length === 0) {
    //     return;
    // }

    // for (let i = 0; i < data.length; i++) {
    //     html += caseInfoListTemplates(data[i], i + 1);
    // }

    // for (let i = 0; i < withMemberData.length; i++) {
    //     withMember += doctorListTemplates(withMemberData[i]);
    // }

    // for (let i = 0; i < withOutMemberData.length; i++) {
    //     witOutMember += doctorListTemplates(withOutMemberData[i]);
    // }

    // $(`#consultChannel${consultChannel} .collabor_wrap .cont .cont_list`).html(
    //     html
    // );

    // $(`#consultChannel${consultChannel} .member .cont_list .with`)
    //     .parent()
    //     .find('case_cont div')
    //     .html(withMember);

    // $(`#consultChannel${consultChannel} .member .cont_list .with .count`).text(
    //     `${withMemberData.length}명`
    // );

    // $(`#consultChannel${consultChannel} .member .cont_list .without`)
    //     .parent()
    //     .find('case_cont div')
    //     .html(witOutMember);
    // $(
    //     `#consultChannel${consultChannel} .member .cont_list .without .count`
    // ).text(`${withOutMemberData.length}명`);
}
