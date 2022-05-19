'use strict';

// - 실시간원격협진(실시간원격협진) rgba(0, 122, 148, 0.8)
// - 실시간원격협진(다학제통합진료) rgba(0, 59, 148, 0.8)
{
    /* <div class="plan start">
    <p>원격협진</p>
</div> */
}

// consultChannel 1
// 협진 일정 요청
// - 협진일정요청 협진 rgba(226, 42, 116, 0.8)
{
    /* <div
class="plan request"
onclick="location.href='remote.html'"
>
<p>협진일정요청</p>
</div> */
}

// consultChannel 2
// 소견협진 요청
// - 소견요청협진 rgba(255, 128, 0, 0.8)
{
    /* <div
    class="plan opinion"
    onclick="location.href='remote.html'"
>
    <p>소견요쳥</p>
</div> */
}

// consultChannel 3
// 실시간 협진 요청

// consultChannel 4
// 선별 진료

// consultChannel 5
//  응급협진 요청

// consultChannel 6
// 외래
// - 외래진료 rgba(53, 0, 57, 0.8)
{
    /* <div class="plan ambul">
    <p>외래진료</p>
</div> */
}

// consultChannel 7
// 수술
// - 수술 rgba(48, 3, 157, 0.8)
{
    /* <div class="plan ambul surgery">
    <p>수술</p>
</div> */
}

// consultChannel 8
// 휴가
// - 휴가 rgba(68, 68, 68, 0.8)
{
    /* <div class="plan holiday">
    <p>휴가</p>
</div> */
}

// 한시간 동안의 height: 48px 시작은 42px 부터 시작

// 탬플릿 함수를 여러개 만들지 않고 하나로 통일했습니다.
// 각 데이터안에 consultChannel로 분기처리
export function myCalendarTemplate(_data) {
    const { consultChannel, consultChannelName, startDatetime, endDatetime } =
        _data;
    const start = +moment(startDatetime).format('HH');
    const end =
        +moment(endDatetime).format('HH') > 18
            ? 18
            : +moment(endDatetime).format('HH');
    const topStart = start - 8 > 0 ? 42 + (start - 9) * 48 : 42;
    const topLength = end - start > 10 ? 48 * 9 : 48 * (end - start);
    const id = moment(startDatetime).format('YYYYMMDD');

    switch (consultChannel) {
        case 1:
            // 협진 일정
            return `
                <div
                style="top: ${topStart}px; height: ${topLength}px"
                class="plan request"
                onclick="location.href='remote.html'"
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
                    onclick="location.href='remote.html'"
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
