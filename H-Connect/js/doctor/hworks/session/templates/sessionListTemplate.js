'use strict';

function restDateHandle(startDatetime) {
    const today = new Date();
    const start = moment(startDatetime, 'YYYY-MM-DD HH:mm:ss');
    const end = moment(today, 'YYYY-MM-DD HH:mm:ss');
    const diffDay = moment.duration(end.diff(start)).asDays();
    const diffHour = moment.duration(end.diff(start)).asHours();
    const diffMin = moment.duration(end.diff(start)).asMinutes();
    const restDay = parseInt(diffDay);
    const restHour = parseInt(diffHour % 24);
    const restMin = parseInt(diffMin % 60);

    return `${restDay > 0 ? restDay + '일' : ''} ${
        restHour > 0 ? restHour + '시간' : ''
    } ${restMin > 0 ? restMin + '분' : ''}`;
}

export function sessionListTemplate(_data) {
    const {
        caseInfoList,
        memberInfoList,
        consultChannelName,
        consultChannel,
        listCount,
        consultId,
        endDatetime,
        startDatetime,
    } = _data;

    let doctorLevelName, doctorName;
    if (memberInfoList !== null) {
        doctorLevelName = memberInfoList[0].doctorLevelName;
        doctorName = memberInfoList[0].doctorName;
    }
    let html;
    const rest = restDateHandle(startDatetime);

    switch (consultChannel) {
        //협진일정 요청
        case 1:
            html = `
                <div class="row opi" data-consultchannel="${consultChannel}">
                    <div>
                        <div class="img_container">
                            <img
                                src="/H-Connect/img/header/clinic.svg"
                                alt="청진기 아이콘"
                            />
                        </div>

                        <p class="time">${moment(endDatetime).format(
                            'HH:mm'
                        )} 까지</p>
                        <p class="place">${consultChannelName} 협진.</p>
                        <p class="wait">${rest} 경과</p>
                    </div>

                    <p>${doctorName} ${doctorLevelName} 외 ${
                memberInfoList.length - 1
            }명</p>
                </div>`;
            break;
        //소견요청 협진
        case 2:
            html = `
                <div class="row opi" data-consultchannel="${consultChannel}" data-consultid="${consultId}">
                    <div>
                        <div class="img_container">
                            <img
                                src="/H-Connect/img/header/clinic.svg"
                                alt="청진기 아이콘"
                            />
                        </div>

                        <p class="time">${moment(endDatetime).format(
                            'HH:mm'
                        )} 까지</p>
                        <p class="place">${consultChannelName} 협진.</p>
                        <p class="wait">${rest} 경과</p>
                    </div>

                    <p>${doctorName} ${doctorLevelName} 외 ${
                memberInfoList.length - 1
            }명</p>
                </div>`;
            break;

        // 원격협진
        case 3:
            html = `
            <div class="row clinic" data-consultchannel="${consultChannel}" data-consultid="${consultId}">
                <div>
                    <div class="img_container">
                        <img
                            src="/H-Connect/img/header/clinic.svg"
                            alt="사람 아이콘"
                        />
                    </div>

                        <p class="time">${moment(endDatetime).format(
                            'HH:mm'
                        )}</p>
                        <p class="place">${consultChannelName}.</p>
                        <p class="wait">${rest} 경과</p>
                </div>
                <p>${doctorName} ${doctorLevelName} 외 ${
                memberInfoList.length - 1
            }명</p>
            </div>
                `;
            break;
        // 선별진료
        case 4:
            const { patientName, patientAge, patientGender, patientId } =
                caseInfoList[0];
            html = `
                <div data-consultchannel="${consultChannel}" data-patientcode="${patientId}" class="row remote">
                    <div>
                        <div class="img_container">
                            <img
                                src="/H-Connect/img/header/clinic.svg"
                                alt="사람 아이콘"
                            />
                        </div>

                        <p class="time">${moment(startDatetime).format(
                            'HH:mm'
                        )}</p>
                        <p class="place">${consultChannelName}.</p>
                        <p class="wait">${rest} 경과</p>
                    </div>
                    <p>${patientName} 님 (${patientAge}. ${
                patientGender === 'M' ? '남' : '여'
            })</p>
                </div>
            `;
            break;
        // 응급협진
        case 5:
            html = `<div class="row red" data-consultchannel="${consultChannel}" data-consultid="${consultId}">
                    <div>
                        <div class="img_container">
                            <img
                                src="/H-Connect/img/icon/call.svg"
                                alt="전화기 아이콘"
                            />
                        </div>

                        <p class="time">${moment(startDatetime).format(
                            'HH:mm'
                        )}</p>
                        <p class="place">${consultChannelName} 요청.</p>
                        <p class="wait">${rest} 경과</p>
                    </div>

                    <p>응급상황실</p>
                </div>`;
            break;
    }

    return html;
}
