'use strict';
const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

// 내가 보냄 일정 요청
export function isentRemoteAlarmTemplates(_data) {
    const { consultId, deadlineDatetime, replyCount, unconfirmedReplyCount } =
        _data;

    return `
        <div
            class="row"
            onclick="location.href='remote_alarm.html?consultId=${consultId}'"
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

            <p class="name my">내가 보냄</p>
        </div>
    `;
}

// 수신받은 일정요청
export function isentNotRemoteAlarmTemplates(_data) {
    const { deadlineDatetime, replyState, createId, consultId } = _data;

    return `
        <div
        class="row"
        onclick="location.href='remote_alarm.html?consultId=${consultId}'"
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
            
            <p class="name">${createId}</p>
        </div> 
    `;
}
