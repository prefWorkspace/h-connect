'use strict';

export function iMadeOpinionTemplate(_data) {
    const { consultId, orderNo, caseTitle, replyCount, endDatetime } = _data;

    return `
        <div data-consultid="${consultId}" class="row">
            <div>
                <p class="time">
                    <span>${moment(endDatetime).format('YY.MM.DD')}</span>
                    <span>${moment(endDatetime).format('HH:mm')}</span> 까지
                </p>

                <p>
                    Case<span> ${orderNo}.</span>.
                    <span>${caseTitle}</span>
                </p>
            </div>

            <p class="count">
                <span>${replyCount}</span> 개의 소견
                <span>(내가 만듬)</span>
            </p>
        </div>
    `;
}

export function opinionTemplate(_data) {
    const { consultId, orderNo, caseTitle, replyCount, endDatetime } = _data;

    return `
        <div data-consultid="${consultId}" class="row">
            <div>
                <p class="time">
                    <span>${moment(endDatetime).format('YY.MM.DD')}</span>
                    <span>${moment(endDatetime).format('HH:mm')}</span> 까지
                </p>

                <p>
                    Case<span> ${orderNo}.</span>.
                    <span>${caseTitle}</span>
                </p>
            </div>

            <p class="count">
                <span>${replyCount}</span> 개의 소견
            </p>
        </div>
    `;
}
