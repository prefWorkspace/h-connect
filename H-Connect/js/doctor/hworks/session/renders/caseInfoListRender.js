'use strict';

const { caseInfoListTemplates, doctorListTemplates, emergencyTitle } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/hworks/session/templates/caseInfoListTemplates.js'
        )
    );

// 원격협진, 소견협진 협진내용 데이터 바인딩
export function caseInfoListRender(data, memberInfoList, consultChannel) {
    let html = '';
    let withMember = '';
    let witOutMember = '';
    const withMemberData = memberInfoList.filter(
        (item) => item.remoteState !== 'N'
    );
    const withOutMemberData = memberInfoList.filter(
        (item) => item.remoteState === 'N'
    );
    if (!data || data.length === 0) {
        return;
    }

    for (let i = 0; i < data.length; i++) {
        html += caseInfoListTemplates(data[i], i + 1);
    }

    for (let i = 0; i < withMemberData.length; i++) {
        withMember += doctorListTemplates(withMemberData[i]);
    }

    for (let i = 0; i < withOutMemberData.length; i++) {
        witOutMember += doctorListTemplates(withOutMemberData[i]);
    }

    $(`#consultChannel${consultChannel} .collabor_wrap .cont .cont_list`).html(
        html
    );

    $(`#consultChannel${consultChannel} .member .cont_list .with`)
        .parent()
        .find('case_cont div')
        .html(withMember);

    $(`#consultChannel${consultChannel} .member .cont_list .with .count`).text(
        `${withMemberData.length}명`
    );

    $(`#consultChannel${consultChannel} .member .cont_list .without`)
        .parent()
        .find('case_cont div')
        .html(witOutMember);
    $(
        `#consultChannel${consultChannel} .member .cont_list .without .count`
    ).text(`${withOutMemberData.length}명`);
}

// 응급협진 참여의사 데이터 바인딩
export function remoteDoctorRender(memberInfoList, consultChannel) {
    let html = '';
    let memberCount = 0;
    if (!memberInfoList || memberInfoList.length === 0) {
        return;
    }

    for (let i = 0; i < memberInfoList.length; i++) {
        const { remoteState } = memberInfoList[i];

        // 원격에 참여하진 않은 의사는 빼기
        // if (remoteState === 'N') {
        //     continue;
        // } else {
        //     memberCount += 1;
        //     html += doctorListTemplates(memberInfoList[i]);
        // }
        memberCount += 1;
        html += doctorListTemplates(memberInfoList[i]);
    }

    $(`#consultChannel${consultChannel} .member .count`).text(
        `${memberCount}명`
    );
    $(`#consultChannel${consultChannel} .member .case_cont div`).html(html);
}

// 응급협진 협진내용 데이터 바인딩
export function emergencyTitleRender(caseInfoList, consultChannel) {
    let html = '';

    if (!caseInfoList || caseInfoList.length === 0) {
        return;
    }

    for (let i = 0; i < caseInfoList.length; i++) {
        html += emergencyTitle(caseInfoList[i]);
    }

    $('p').remove(`#consultChannel${consultChannel} .collabor_wrap .cont p`);
    $(`#consultChannel${consultChannel} .collabor_wrap .cont h2`).after(html);
}
