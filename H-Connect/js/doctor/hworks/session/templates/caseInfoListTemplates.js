'use strict';

export function caseInfoListTemplates(_data, num) {
    const {
        caseContents,
        caseTitle,
        patientGender,
        patientName,
        patientAge,
        patientId,
    } = _data;
    return `
    <div class="case">
        <div>
            <p>Case ${num}.</p>
            <p>
                ${caseTitle}
            </p>
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

                <div>
                    ${caseTitle}
                </div>
            </div>

            <div class="pati_name">
                <p>환자명.</p>

                <div>
                    ${patientName} (${patientAge}. ${
        patientGender === 'M' ? '남' : '여'
    }).${patientId}
                    number
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
    const { doctorName, doctorLevelName } = _data;

    return `
        <p>${doctorName} ${doctorLevelName}</p>
    `;
}

export function emergencyTitle(_data) {
    const { caseTitle, patientAge, patientGender } = _data;

    return `
    <p>${caseTitle} (${patientAge}세. ${
        patientGender === 'M' ? '남' : '여'
    })</p>
    `;
}
