'use strict';

export function dataScheduleTemplates(_data) {
    const {
        consultChannelName,
        isentState,
        consultChannel,
        startDatetime,
        memberInfoList,
        consultId,
        confirmState,
    } = _data;

    let html = '';
    let remote_member = '';

    const { doctorLevelName, doctorName } =
        memberInfoList.find((item) => item.host === 'Y') ?? {};

    if (isentState === 1) {
        remote_member = '내가 보냄';
    } else {
        remote_member = `${doctorName} ${doctorLevelName} ${
            memberInfoList && memberInfoList.length > 1
                ? `외 ${memberInfoList.length - 1}명`
                : ''
        }`;
    }

    switch (consultChannel) {
        //협진일정 요청
        case 1:
            html = `
                <div data-confirmstate="${confirmState}" data-consultid="${consultId}" data-isentstate="${isentState}" data-consultchannle="${consultChannel}" class="row remote_ask">
                    <div>
                        <p>${moment(startDatetime).format('HH:mm')}</p>
                        <p>${consultChannelName}</p>
                    </div>
                    <p class="remote_member ${
                        isentState === 1 ? 'me' : ''
                    }">${remote_member}</p>
                </div>
            `;
            break;
        //소견요청 협진
        case 2:
            html = `
                <div data-confirmstate="${confirmState}" data-isentstate="${isentState}" data-consultid="${consultId}" data-consultchannle="${consultChannel}" class="row end_remote">
                    <div>
                        <p>${moment(startDatetime).format('HH:mm')}</p>
                        <p>${consultChannelName}</p>
                    </div>
                    <p class="remote_member ${
                        isentState === 1 ? 'me' : ''
                    }">${remote_member}</p>
                </div>
            `;
            break;

        // 원격협진
        case 3:
            html = `
                <div data-confirmstate="${confirmState}" data-isentstate="${isentState}" data-consultid="${consultId}" data-consultchannle="${consultChannel}" class="row start_remote">
                    <div>
                        <p>${moment(startDatetime).format('HH:mm')}</p>
                        <p>${consultChannelName}</p>
                    </div>
                
                    <p class="remote_member ${
                        isentState === 1 ? 'me' : ''
                    }">${remote_member}</p>
                </div>
            `;
            break;
        // 선별진료
        // 일단 대기, 시안에 없음
        // case 4:
    }

    return html;
}
