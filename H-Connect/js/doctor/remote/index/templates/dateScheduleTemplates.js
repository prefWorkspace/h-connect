'use strict';

export function dataScheduleTemplates(_data) {
    const {
        consultChannelName,
        isentState,
        consultChannel,
        startDatetime,
        memberInfoList,
    } = _data;

    let html = '';
    let doctorLevelName = '-',
        doctorName = '-';
    if (memberInfoList !== null) {
        doctorLevelName = memberInfoList[0].doctorLevelName;
        doctorName = memberInfoList[0].doctorName;
    }
    switch (consultChannel) {
        //협진일정 요청
        case 1:
            html = `
                <div data-isentstate="${isentState}" data-consultchannle="${consultChannel}" class="row remote_ask">
                    <div>
                        <p>${moment(startDatetime).format('HH:mm')}</p>
                        <p>${consultChannelName}</p>
                    </div>
                
                    <p>${doctorName} ${doctorLevelName} ${
                memberInfoList && memberInfoList.length > 1
                    ? `외 ${memberInfoList.length}`
                    : ''
            }</p>
                </div>
            `;
            break;
        //소견요청 협진
        case 2:
            html = `
                <div data-consultchannle="${consultChannel}" class="row end_remote">
                    <div>
                        <p>${moment(startDatetime).format('HH:mm')}</p>
                        <p>${consultChannelName}</p>
                    </div>
                
                    <p>${doctorName} ${doctorLevelName} ${
                memberInfoList && memberInfoList.length > 1
                    ? `외 ${memberInfoList.length}`
                    : ''
            }</p>
                </div>
            `;
            break;

        // 원격협진
        case 3:
            html = `
                <div data-consultchannle="${consultChannel}" class="row start_remote on">
                    <div>
                        <p>${moment(startDatetime).format('HH:mm')}</p>
                        <p>${consultChannelName}</p>
                    </div>
                
                    <p>${doctorName} ${doctorLevelName} ${
                memberInfoList.length > 1 ? `외 ${memberInfoList.length}` : ''
            }</p>
                </div>
            `;
            break;
        // 선별진료
        // 일단 대기, 시안에 없음
        // case 4:
    }

    return html;
}
