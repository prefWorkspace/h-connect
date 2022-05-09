'use strict';

export function remoteAlarmTemplates(_data) {
    const {
        consultId,
        consultConfirm,
        deadlineDatetime,
        isentState,
        name,
        replyCount,
        unconfirmedReplyCount,
        memberInfoList,
    } = _data;

    if (isentState === 1) {
        return `
            <div data-consultid="${consultId}" data-isentstate="1" class="row my_return">
                <div>
                    <p class="time">
                        <span>${moment(deadlineDatetime).format(
                            'YY.MM.DD'
                        )}</span>
                        <span>${moment(deadlineDatetime).format(
                            'HH:mm'
                        )}</span> 까지
                    </p>

                    <p class="you_or">협진일정 회신</p>
                    <p class="me_or">
                        <span class="green">회신 ${replyCount}명.</span>
                        <span class="red">미회신 ${unconfirmedReplyCount}명.</span>
                    </p>
                </div>

                <p class="who send_me">${name}</p>
            </div>
        `;
    } else {
        if (consultConfirm === 'Y') {
            return `
                <div data-consultid="${consultId}" data-consultconfirm="${consultConfirm}" data-isentstate="0" class="row clear_return">
                    <div>
                        <p class="time">
                            <span>${moment(deadlineDatetime).format(
                                'YY.MM.DD'
                            )}</span>
                            <span>${moment(deadlineDatetime).format(
                                'HH:mm'
                            )}</span> 까지
                        </p>

                        <p class="you_or">협진일정 요청 수신</p>
                        <p class="me_or done">회신완료</p>
                    </div>

                    <p class="who">${name} ${
                memberInfoList.length > 0 && `외 ${memberInfoList.length}명`
            }</p>
                </div>
            `;
        } else {
            return `
                <div data-consultid="${consultId}" data-consultconfirm="${consultConfirm}" data-isentstate="0" class="row no_return">
                    <div>
                        <p class="time">
                            <span>${moment(deadlineDatetime).format(
                                'YY.MM.DD'
                            )}</span>
                            <span>${moment(deadlineDatetime).format(
                                'HH:mm'
                            )}</span> 까지
                        </p>

                        <p class="you_or">협진일정 요청 수신</p>
                        <p class="me_or">회신하지 않음</p>
                    </div>

                    <p class="who">${name} ${
                memberInfoList.length > 0 && `외 ${memberInfoList.length}명`
            }</p>
                </div>
            `;
        }
    }
}
