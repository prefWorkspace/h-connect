'use strict';

export function sessionListTemplate(_data) {
    const {
        caseInfoList,
        memberInfoList,
        consultChannelName,
        consultChannel,
        listCount,
        consultId,
    } = _data;
    let doctorLevelName, doctorName;
    if (memberInfoList !== null) {
        doctorLevelName = memberInfoList[0].doctorLevelName;
        doctorName = memberInfoList[0].doctorName;
    }
    let html;
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

                        <p class="time">13:25 까지</p>
                        <p class="place">${consultChannelName} 협진.</p>
                        <p class="wait">2일 21시간 30분 경과</p>
                    </div>

                    <p>${doctorName} ${doctorLevelName} 외 ${memberInfoList.length}명</p>
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

                        <p class="time">13:25 까지</p>
                        <p class="place">${consultChannelName} 협진.</p>
                        <p class="wait">2일 21시간 30분 경과</p>
                    </div>

                    <p>${doctorName} ${doctorLevelName} 외 ${memberInfoList.length}명</p>
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

                        <p class="time">10:20</p>
                        <p class="place">${consultChannelName}.</p>
                        <p class="wait">5분 경과</p>
                </div>
                <p>${doctorName} ${doctorLevelName} 외 ${memberInfoList.length}명</p>
            </div>
                `;
            break;
        // 선별진료
        case 4:
            const { patientName, patientAge, patientGender } = caseInfoList[0];
            html = `
                <div data-consultchannel="${consultChannel}" class="row remote">
                    <div>
                        <div class="img_container">
                            <img
                                src="/H-Connect/img/header/clinic.svg"
                                alt="사람 아이콘"
                            />
                        </div>

                        <p class="time">10:23</p>
                        <p class="place">${consultChannelName}.</p>
                        <p class="wait">2분 경과</p>
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

                        <p class="time">10:22</p>
                        <p class="place">${consultChannelName} 요청.</p>
                        <p class="wait">3분 경과</p>
                    </div>

                    <p>응급상황실</p>
                </div>`;
            break;
    }

    return html;
}
