'use strict';

const { selectRealTimeAndOpinionAndEmergencyConsultView } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/actions/hWorksAPI.js')
);

const { sessionListTemplate } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/session/templates/sessionListTemplate.js'
    )
);

const { caseInfoListRender, remoteDoctorRender, emergencyTitleRender } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/hworks/session/renders/caseInfoListRender.js'
        )
    );

const { mok } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/mok.js')
);

// 세션클릭 이벤트.
async function hworkListClick() {
    const consultId = $(this).data('consultid');
    const reservationCode = $(this).data('reservationcode');
    const consultChannel = $(this).data('consultchannel');

    $('.now_section .list .row').removeClass('on');
    $(this).addClass('on');
    $('.section.right').hide();
    $(`#consultChannel${consultChannel}`).show();

    if (consultChannel === 3 || consultChannel === 2 || consultChannel === 5) {
        const { result, list } =
            await selectRealTimeAndOpinionAndEmergencyConsultView(consultId);
        if (result && list.length === 0) {
            if (consultChannel === 2 || consultChannel === 3) {
                const { caseInfoList, memberInfoList } = mok.find(
                    (item) => item.consultId === consultId
                );
                caseInfoListRender(
                    caseInfoList,
                    memberInfoList,
                    consultChannel
                );
            } else if (consultChannel === 5) {
                const { memberInfoList, caseInfoList } = mok.find(
                    (item) => item.consultId === consultId
                );
                remoteDoctorRender(memberInfoList, consultChannel);
                emergencyTitleRender(caseInfoList, consultChannel);
            }
        }
    }

    if (consultChannel === 4) {
        // api Doctor/SelectScreeniungClinicView 사용 하는 구간
    }
}

// session List UI에 뿌리기
export function hworkSessionList(_data) {
    let html = '';

    if (_data.length === 0) {
        return;
    }

    for (let i = 0; i < _data.length; i++) {
        html += sessionListTemplate(_data[i]);
    }
    $('.now_section .list').html(html);
    $('.now_section .list .row').on('click', hworkListClick);
}
