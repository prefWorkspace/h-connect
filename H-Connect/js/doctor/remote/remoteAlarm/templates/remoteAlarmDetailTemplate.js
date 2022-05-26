'use strict';

const { numToDay } = await import(
    importVersion('/H-Connect/js/utils/common/utils.js')
);

// 협진내용 디테일 탬플릿
export function remoteAlarmCaseInfoTemplate(_data) {
    const {
        caseContents,
        caseTitle,
        patientAge,
        orderNo,
        patientGender,
        patientName,
        patientId,
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
                    <p>Case ${orderNo}.</p>

                    <div>${caseTitle}</div>
                </div>

                <div class="pati_name">
                    <p>환자명.</p>

                    <div>
                    ${patientName} (${patientAge}. ${
        patientGender === 'M' ? '남' : '여'
    }).${patientId}
                    </div>
                </div>

                <div class="content">
                    <p>협진 내용.</p>

                    <div>${caseContents}</div>
                </div>
            </div>
        </div>
    `;
}

// 협진 가능시간 탬플릿 수신 받은 부분
export function remoteAlarmTimeTemplate(_data) {
    const { consultEndDatetime, consultStartDatetime, orderNo } = _data;
    const day = moment(consultEndDatetime).day();
    return `
        <div>
            <div class="check">
                <input
                    type="checkbox"
                    id="check${orderNo}"
                    class="green_custom"
                />
                <label for="check${orderNo}"></label>
                <label for="check${orderNo}"
                    >${moment(consultStartDatetime).format(
                        'YY.MM.DD'
                    )} ${numToDay(day)}요일 ${moment(
        consultStartDatetime
    ).format('HH:mm')} ~
                    ${moment(consultEndDatetime).format('HH:mm')}</label
                >
            </div>
            <p class="dupli">
                ※ 외래진료 일정과 중복됩니다.
            </p>
        </div>
    `;
}

// 내가 보낸 일정 요청에서 협진 가능시간
export function remoteAlarmTimeTemplateIsent(_data) {
    const { consultEndDatetime, consultStartDatetime } = _data;
    const day = moment(consultEndDatetime).day();
    return `
        <div>
            <div class="check">
                <div class="input_wrap">
                    <input
                        type="checkbox"
                        id="time1"
                        class="green_custom"
                    />
                    <label for="time1"></label>
                    <label for="time1"
                        >${moment(consultEndDatetime).format(
                            'YY.MM.DD'
                        )} ${numToDay(day)}요일 ${moment(
        consultStartDatetime
    ).format('HH:mm')} ~
                        ${moment(consultEndDatetime).format('HH:mm')}</label
                    >
                </div>

                <span>-명 참석</span>
            </div>

            <div class="people">
            </div>
        </div>
    `;
}

// 의사 리스트

export function remoteAlarmDoctorTemplate(_data) {
    const { doctorLevelName, doctorName } = _data;
    return `
        <p>${doctorName} ${doctorLevelName}</p>
    `;
}