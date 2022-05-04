'use strict';

export function noCheckConsultTemplates(_data) {
    const { orderNo, caseTitle } = _data;

    return `
        <div
            class="row"
            onclick="location.href='remote_check.html'"
        >
            <div>
                <p class="time">
                    <span>21.09.15</span>&nbsp;
                    <span>18:00</span> 까지
                </p>

                <p class="case">Case ${orderNo}.</p>

                <p class="discussion">
                    ${caseTitle}
                </p>
            </div>

            <p class="count">
                <span>4</span> 개의 소견
            </p>
        </div>
    `;
}

export function errorText() {
    return `<p class="error_text">조회된 데이타가 없습니다</p>`;
}
