'use strict';

// 내가 보냄 일정 요청
export function isentRemoteAlarmTemplates(_data) {
    const { deadlineDatetime, replyCount, unconfirmedReplyCount, name } = _data;

    return `
        <div
            class="row"
            onclick="location.href='remote_alarm.html'"
        >
            <p class="time">
                <span>${moment(deadlineDatetime).format(
                    'YY.MM.DD'
                )}</span>&nbsp;
                <span>${moment(deadlineDatetime).format('HH:mm')}</span> 까지
            </p>

            <p class="answer">협진일정 회신</p>

            <p class="reply">
                <span class="check">회신 ${replyCount}명.</span>
                <span class="no_check"
                    >미회신 ${unconfirmedReplyCount}명.</span
                >
            </p>

            <p class="name my">${name}</p>
        </div>
    `;
}

// 수신받은 일정요청
export function isentNotRemoteAlarmTemplates(_data) {
    const { deadlineDatetime, replyState, name } = _data;

    return `
        <div
        class="row"
        onclick="location.href='remote_alarm.html'"
        >
            <p class="time">
                <span>${moment(deadlineDatetime).format(
                    'YY.MM.DD'
                )}</span>&nbsp;
                <span>${moment(deadlineDatetime).format('HH:mm')}</span> 까지
            </p>
            
            <p class="answer">협진일정 요청 수신</p>
            
            <p class="reply">${
                replyState === 'N' ? '회신하지 않음' : '회신완료'
            }</p>
            
            <p class="name">${name}</p>
        </div> 
    `;
}

export function errorText() {
    return `<p class="error_text">조회된 데이타가 없습니다</p>`;
}
