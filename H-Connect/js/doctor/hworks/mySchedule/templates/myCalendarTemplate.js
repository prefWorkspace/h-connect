'use strict';

// consultChannel 1
// 협진 일정 요청

// consultChannel 2
// 소견협진 요청

// consultChannel 3
// 실시간 협진 요청

// consultChannel 4
// 선별 진료

// consultChannel 5
//  응급협진 요청

// consultChannel 6
// 외래

// consultChannel 7
// 수술

// consultChannel 8
// 휴가

// 한시간 동안의 height: 48px 시작은 42px 부터 시작
//  분단위 체크를 위해 백분률로 다시 계산

// 탬플릿 함수를 여러개 만들지 않고 하나로 통일했습니다.
// 각 데이터안에 consultChannel로 분기처리

function dateTimeHanlder(startDatetime, endDatetime) {
    const start = +moment(startDatetime).format('HH');
    const end =
        +moment(endDatetime).format('HH') > 18
            ? 18
            : +moment(endDatetime).format('HH');
    const minute = +moment(startDatetime).format('mm');
    const minuteStart = minute / 60;
    const topStart =
        start - 8 > 0 ? 42 * (1 + minuteStart) + (start - 9) * 48 : 42;
    const topLength = end - start > 10 ? 48 * 9 : 48 * (end - start);

    return {
        topStart,
        topLength,
    };
}

export function myCalendarTemplate(_data) {
    const {
        consultChannel,
        consultChannelName,
        startDatetime,
        endDatetime,
        consultId,
    } = _data;
    console.log('_data==');
    console.log(_data);

    const { topStart, topLength } = dateTimeHanlder(startDatetime, endDatetime);

    switch (consultChannel) {
        case 1:
            // 협진 일정
            return `
                <div
                style="top: ${topStart}px; height: ${topLength}px"
                class="plan request"
                onclick="location.href='remote.html?consultId=${consultId}'"
                >
                    <p>${consultChannelName}</p>
                </div>
            `;
        case 2:
            // 소견협진
            return `
                <div
                style="top: ${topStart}px; height: ${topLength}px"
                    class="plan opinion"
                    onclick="location.href='remote.html?consultId=${consultId}'"
                >
                    <p>${consultChannelName}</p>
                </div> 
            `;
        case 3:
            // 실시간 협진 일정 요청
            return `
                <div
                style="top: ${topStart}px; height: ${topLength}px"
                class="plan remote"
                onclick="location.href='remote.html?consultId=${consultId}'"
                >
                    <p>${consultChannelName}</p>
                </div>
            `;
        case 6:
            // 외레
            return `
                <div class="plan ambul" style="top: ${topStart}px; height: ${topLength}px">
                
                    <p>${consultChannelName}</p>
                </div>
            `;
        case 7:
            // 수술
            return `
                <div class="plan ambul surgery" style="top: ${topStart}px; height: ${topLength}px">
                    <p>${consultChannelName}</p>
                </div>
            `;
        case 8:
            // 휴가
            return `
                <div class="plan holiday" style="top: ${topStart}px; height: ${topLength}px">
                    <p>${consultChannelName}</p>
                </div>
            `;
    }
}

export function calendarDateTemplate(_data) {
    const { date, day, isWeekend, isToday, id } = _data;

    return `
        <div id="${id}" class="day ${isWeekend ? 'weekend' : ''} ${
        isToday ? 'today' : ''
    }">
            <div class="title">
                <p>${date} ${day}</p>
            </div>
        </div>
    `;
}
