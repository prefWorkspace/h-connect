'use strict';

export function dataScheduleTemplates(_data) {
    const {
        consultChannelName,
        isentState,
        consultChannel,
        startDatetime,
        memberInfoList,
        consultId,
    } = _data;

    let html = '';
    let remote_member = '';
    let doctorLevelName = '-',
        doctorName = '-';
    if (memberInfoList !== null) {
        doctorLevelName = memberInfoList[0].doctorLevelName;
        doctorName = memberInfoList[0].doctorName;
    }

    switch (consultChannel) {
        //협진일정 요청
        case 1:
            if (isentState === 1) {
                remote_member = '내가 보냄';
                html = `
                <div data-isentstate="${isentState}" data-consultid="${consultId}" data-consultchannle="${consultChannel}" class="row request_remote">
                    <div>
                        <p>${moment(startDatetime).format('HH:mm')}</p>
                        <p>${consultChannelName}</p>
                    </div>
                    <p class="remote_member me">${remote_member}</p>
                </div>
                `;
            } else {
                remote_member = `${doctorName} ${doctorLevelName} ${
                    memberInfoList && memberInfoList.length > 1
                        ? `외 ${memberInfoList.length}`
                        : ''
                }`;

                html = `
                <div data-consultid="${consultId}" data-isentstate="${isentState}" data-consultchannle="${consultChannel}" class="row remote_ask">
                    <div>
                        <p>${moment(startDatetime).format('HH:mm')}</p>
                        <p>${consultChannelName}</p>
                    </div>
                    <p class="remote_member">${remote_member}</p>
                </div>
            `;
            }
            break;
        //소견요청 협진
        case 2:
            remote_member = `${doctorName} ${doctorLevelName} ${
                memberInfoList && memberInfoList.length > 1
                    ? `외 ${memberInfoList.length}`
                    : ''
            }`;
            html = `
                <div data-isentstate="${isentState}" data-consultid="${consultId}" data-consultchannle="${consultChannel}" class="row end_remote">
                    <div>
                        <p>${moment(startDatetime).format('HH:mm')}</p>
                        <p>${consultChannelName}</p>
                    </div>
                    <p class="remote_member">${remote_member}</p>
                </div>
            `;
            break;

        // 원격협진
        case 3:
            remote_member = `${doctorName} ${doctorLevelName} ${
                memberInfoList && memberInfoList.length > 1
                    ? `외 ${memberInfoList.length}`
                    : ''
            }`;
            html = `
                <div data-isentstate="${isentState}" data-consultid="${consultId}" data-consultchannle="${consultChannel}" class="row start_remote">
                    <div>
                        <p>${moment(startDatetime).format('HH:mm')}</p>
                        <p>${consultChannelName}</p>
                    </div>
                
                    <p class="remote_member">${remote_member}</p>
                </div>
            `;
            break;
        // 선별진료
        // 일단 대기, 시안에 없음
        // case 4:
    }

    return html;
}
