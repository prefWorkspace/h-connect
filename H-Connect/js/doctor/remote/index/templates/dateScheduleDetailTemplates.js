'use strict';

export function dateScheduleCaseDetailTemplates(_data) {
    const {
        orderNo,
        caseContents,
        caseTitle,
        patientGenger,
        patientAge,
        patientId,
        patientName,
    } = _data;

    return `
    <div class="case">
        <div>
            <p>Case ${orderNo}.</p>
            <p>${caseTitle}</p>
        </div>

        <div>
            <p class="more">자세히</p>
            <p class="fold">접기</p>

            <div class="img_container">
                <img
                    src="/H-Connect/img/under_arrow.svg"
                    alt="아래 화살표"
                />
            </div>
        </div>
    </div>
    <div class="case_cont">
        <div class="case_inner">
            <div class="title">
                <p>Case 1.</p>
                <div>${caseTitle}</div>
            </div>
            <div class="pati_name">
                <p>환자명.</p>
                <div>
                    ${patientName} (${patientAge}. ${
        patientGenger === 'M' ? '남' : '여'
    }).${patientId}
                </div>
            </div>
            <div class="content">
                <p>협진 내용.</p>
                <div>
                    ${caseContents}
                </div>
            </div>
        </div>
    </div>
    `;
}

export function doctorListTemplates(_data) {
    if (!_data) return;

    const { doctorName } = _data;
    return `<p>${doctorName}</p>`;
}
