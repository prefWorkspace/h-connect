// 협진 영억
export const coopSurgerySelector = {
    wrapEl: coopSurgeryWrapEl,
    requestSchedule: {
        deadline: {},
        scheduleCan: {
            wrapEl: coopScheduleCanWrapEl,
            itemEls: coopScheduleCanItemEls,
            delBtnEl: coopScheduleCanDelBtnEl,
        },
    },
};
export const coopContentSelector = {
    wrapEl: coopContentWrapEl,
    case: {
        wrapEl: coopContentCaseWrapEl,
        itemEls: coopContentCaseItemEls,
        delBtnEl: coopContentCaseDelBtnEl,
    },
};

// 협진 참여자
export const coopParticipantInformSelector = {
    wrapEl: coopParticipantInformWrapEl,
    itemEls: coopParticipantInformItemEls,
    numberEl: coopParticipantInformNumberEl,
};
// 의료진 선택
export const doctorListSelector = {
    wrapEl: doctorWrapEl,
};
export const choiceDoctorSelector = {
    wrapEl: choiceDoctorWrapEl,
    itemEls: choiceDoctorItemEls,
    numberEl: choiceDoctorNumberEl,
};
export const bookmarkTabSelector = {
    wrapEl: bookmarkTabWrapEl,
    itemEls: bookmarkTabItemEls,
};
export const bookmarkListSelector = {
    wrapEl: bookmarkListWrapEl,
    itemEls: bookmarkListItemEls,
};

// 협진 종류
function coopSurgeryWrapEl(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `#cooperation-section #surgery-wrap${hasClass ? '.' + hasClass : ''}`
    );
}

// 협진 일정 요청
function coopScheduleCanWrapEl(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `#cooperation-section #surgery-wrap .ut_wrap .ut_container${
            hasClass ? '.' + hasClass : ''
        }`
    );
}
function coopScheduleCanItemEls(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `#cooperation-section #surgery-wrap .ut_wrap .ut_container .up_box${
            hasClass ? '.' + hasClass : ''
        }`
    );
}
function coopScheduleCanDelBtnEl(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `#cooperation-section #surgery-wrap .ut_wrap .ut_container .up_box .btn_delete_time${
            hasClass ? '.' + hasClass : ''
        }`
    );
}

// 협진 콘텐츠
function coopContentWrapEl(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `#cooperation-section #content-wrap${hasClass ? '.' + hasClass : ''}`
    );
}

// 협진 케이스
function coopContentCaseWrapEl(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `#cooperation-section .content .content-case-wrap${
            hasClass ? '.' + hasClass : ''
        }`
    );
}
function coopContentCaseItemEls(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `#cooperation-section .content .content-case-wrap .content-caseblock${
            hasClass ? '.' + hasClass : ''
        }`
    );
}
function coopContentCaseDelBtnEl(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `#cooperation-section .content .content-case-wrap .content-caseblock .btn_case_delete${
            hasClass ? '.' + hasClass : ''
        }`
    );
}

// 협진 참여자
function coopParticipantInformWrapEl(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `#cooperation-section .participant .member${
            hasClass ? '.' + hasClass : ''
        }`
    );
}
function coopParticipantInformItemEls(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `#cooperation-section .participant .member .mem${
            hasClass ? '.' + hasClass : ''
        }`
    );
}
function coopParticipantInformNumberEl(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `#cooperation-section .participant .title .choice_doctor_length${
            hasClass ? '.' + hasClass : ''
        }`
    );
}

// 의료진 선택
function doctorWrapEl(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `.choice_staff .container .list_inner${hasClass ? '.' + hasClass : ''}`
    );
}
function choiceDoctorWrapEl(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `.choice_staff .choice .choice_member${hasClass ? '.' + hasClass : ''}`
    );
}
function choiceDoctorItemEls(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `.choice_staff .choice .choice_member .mem${
            hasClass ? '.' + hasClass : ''
        }`
    );
}
function choiceDoctorNumberEl(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `.choice_staff .choice_doctor_length${hasClass ? '.' + hasClass : ''}`
    );
}

function bookmarkTabWrapEl(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `.favorite_list .favorite_list_wrap${hasClass ? '.' + hasClass : ''}`
    );
}
function bookmarkTabItemEls(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `.favorite_list .favorite_list_wrap .group_list${
            hasClass ? '.' + hasClass : ''
        }`
    );
}

function bookmarkListWrapEl(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `.favorite_list .group_container${hasClass ? '.' + hasClass : ''}`
    );
}
function bookmarkListItemEls(_props) {
    const { hasClass } = _props ?? {};
    return $(
        `.favorite_list .group_container .doctor-list-item${
            hasClass ? '.' + hasClass : ''
        }`
    );
}
