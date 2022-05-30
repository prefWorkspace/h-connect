'use strict';

const { numToDay } = await import(
    importVersion('/H-Connect/js/utils/common/utils.js')
);

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

export function canDateWithTemplates(_data) {
    const {
        consultEndDatetime,
        consultStartDatetime,
        orderNo,
        memberInfoList,
    } = _data;
    const dayNum = moment(consultEndDatetime).day();

    let doctorListHTML = '';
    if (!memberInfoList) {
        for (let i = 0; i < memberInfoList.length; i++) {
            doctorListHTML += `<p>${memberInfoList[i].doctorName} ${memberInfoList[i].doctorLevelName}</p>`;
        }
    }

    return `
        <div>
            <div class="check">
                <div class="input_wrap">
                    <input
                    data-caseno="${orderNo}"
                        type="checkbox"
                        id="time${orderNo}"
                        class="green_custom"
                    />
                    <label for="time${orderNo}"></label>
                    <label for="time${orderNo}"
                        >${moment(consultStartDatetime).format(
                            'YY.MM.DD'
                        )} ${numToDay(dayNum)}요일 ${moment(
        consultStartDatetime
    ).format('HH:mm')} ~
                        ${moment(consultEndDatetime).format('HH:mm')}</label
                    >
                </div>

                <span>${
                    memberInfoList ? memberInfoList.length : 0
                }명 참석</span>
            </div>

            <div class="people">
                ${doctorListHTML}
            </div>
        </div>
    `;
}

export function canDateWithTemplatesisentnot(_data) {
    const { consultEndDatetime, consultStartDatetime, orderNo, consultId } =
        _data;
    const dayNum = moment(consultEndDatetime).day();
    return `
    <div>
        <div class="check">
            <input
                data-consultid="${consultId}"
                data-caseno="${orderNo}"
                type="checkbox"
                id="frist${orderNo}"
                class="green_custom"
            />
            <label for="frist${orderNo}"></label>
            <label for="frist${orderNo}"
                >${moment(consultStartDatetime).format('YY.MM.DD')} ${numToDay(
        dayNum
    )}요일 ${moment(consultStartDatetime).format('HH:mm')} ~
                ${moment(consultEndDatetime).format('HH:mm')}</label
            >
        </div>
        <p class="dupli">
            ※ 외래진료 일정과 중복됩니다.
        </p>
    </div>
    `;
}
