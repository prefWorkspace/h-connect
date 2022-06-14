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
    const { consultEndDatetime, consultId, consultStartDatetime, orderNo } =
        _data;

    const day = moment(consultEndDatetime).day();
    return `
        <div>
            <div class="check">
                <input
                    data-consultid="${consultId}"
                    data-caseno="${orderNo}"
                    type="checkbox"
                    data-isentstate="0"
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
export function remoteAlarmTimeTemplateIsent(_data, memberInfoList) {
    const { consultEndDatetime, consultStartDatetime, orderNo, consultId } =
        _data;
    const day = moment(consultEndDatetime).day();
    let attendCount = 0;

    let doctorListHTML = '';
    if (memberInfoList.length > 0) {
        for (let i = 0; i < memberInfoList.length; i++) {
            const { doctorName, doctorLevelName, replyState } =
                memberInfoList[i];
            if (replyState === 'N') {
                continue;
            }
            doctorListHTML += `<p>${doctorName} ${doctorLevelName}</p>`;
            attendCount++;
        }
    }

    return `
        <div data-orderno="${orderNo}">
            <div class="check">
                <div class="input_wrap">
                    <input
                    data-consultid="${consultId}"
                    data-caseno="${orderNo}"
                    data-isentstate="1"
                        type="checkbox"
                        id="time${orderNo}"
                        class="green_custom"
                    />
                    <label for="time${orderNo}"></label>
                    <label for="time${orderNo}"
                        >${moment(consultEndDatetime).format(
                            'YY.MM.DD'
                        )} ${numToDay(day)}요일 ${moment(
        consultStartDatetime
    ).format('HH:mm')} ~
                        ${moment(consultEndDatetime).format('HH:mm')}</label
                    >
                </div>

                <span>${attendCount}명 참석</span>
            </div>

            <div class="people">
            ${doctorListHTML}
            </div>
        </div>
    `;
}

// 내가 보낸 일정 요청에서 협진 가능시간
export function remoteAlarmTimeTemplateIsentmetab2(_data, memberInfoList) {
    const { consultEndDatetime, consultStartDatetime, orderNo, consultId } =
        _data;
    const day = moment(consultEndDatetime).day();

    let doctorListHTML = '';
    if (!memberInfoList) {
        for (let i = 0; i < memberInfoList.length; i++) {
            doctorListHTML += `<p>${memberInfoList[i].doctorName} ${memberInfoList[i].doctorLevelName}</p>`;
        }
    }

    return `
        <div data-orderno="${orderNo}">
            <div class="check">
                <div class="input_wrap">
                    <input
                    data-consultid="${consultId}"
                    data-caseno="${orderNo}"
                    data-isentstate="1"
                        type="checkbox"
                        id="metab2time${orderNo}"
                        class="green_custom"
                    />
                    <label for="metab2time${orderNo}"></label>
                    <label for="metab2time${orderNo}"
                        >${moment(consultEndDatetime).format(
                            'YY.MM.DD'
                        )} ${numToDay(day)}요일 ${moment(
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

// 의사 리스트
export function remoteAlarmDoctorTemplate(_data) {
    const { doctorLevelName, doctorName, host } = _data;

    if (host === 'Y') {
        return '';
    }
    return `
        <p>${doctorName} ${doctorLevelName}</p>
    `;
}
