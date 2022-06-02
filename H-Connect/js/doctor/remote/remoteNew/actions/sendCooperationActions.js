const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);
const { PopupController } = await import(
    importVersion(
        '/H-Connect/js/utils/module/popupController/popupController.js'
    )
);
const {
    insertRemoteConsult,
    insertOpinionConsult,
    insertConsult,
    updateConsult,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/remoteNewAPI.js'
    )
);
const { serviceData, validateCoopAll, calendarData } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/dataActions.js'
    )
);
const { renderCooperationSection } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/cooperationSectionRenders.js'
    )
);
const {
    renderChoiceDoctorEmptyControll,
    renderActivateChoiceDoctorLength,
    renderResetCheckBox,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/commonRenders.js'
    )
);
const { createCooperationPopupTmpl, cancelCooperationPopupTmpl } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/templates/cooperationSectionTmpl.js'
    )
);

function createCooperationAction() {
    const _createCooperationBtnStr = '#create_cooperation_btn';
    const _createCooperationPopup = new PopupController({
        /* 협진 생성 팝업 생성 */
        target: {
            openButton: _createCooperationBtnStr,
            appendWrap: '.createCooperation_popup_wrap',
        },
        templates: {
            popup: createCooperationPopupTmpl,
        },
        openControll: true,
        popupBtn: {
            submitBtn: {
                target: '.btn_check',
                close: true,
                action: (_info) => {
                    _info.closePopup();
                    const _isModify = isModifyClickBtnRedirectRemotePage();
                    if (!_isModify) {
                        const _surgerySelected =
                            $('.surgery_box').attr('data-option-role');
                        renderCooperationSection(_surgerySelected);
                        renderChoiceDoctorEmptyControll(true);
                        renderActivateChoiceDoctorLength();
                        renderResetCheckBox();
                    }
                },
            },
        },
    });

    function calcSendData() {
        let _sectionData = {};

        const _surgerySelected = $('.surgery_box').attr('data-option-role');
        switch (_surgerySelected) {
            case '실시간원격협진':
                const {
                    startDatetime: rtStartDatetime,
                    endDatetime: rtEndDatetime,
                } = serviceData.realTime.date();
                _sectionData = {
                    remoteState: serviceData.realTime.type(),
                    startDatetime: rtStartDatetime,
                    endDatetime: rtEndDatetime,
                };
                break;
            case '소견요청협진':
                const {
                    startDatetime: opiStartDatetime,
                    endDatetime: opiEndDatetime,
                } = serviceData.opinion.date();
                _sectionData = {
                    startDatetime: opiStartDatetime,
                    endDatetime: opiEndDatetime,
                };
                break;
            case '협진일정요청':
                const { deadlineTime } =
                    serviceData.requestSchedule.deadlineDate();
                const { scheduleInfo } =
                    serviceData.requestSchedule.scheduleCanDateList();
                _sectionData = {
                    deadline: deadlineTime,
                    scheduleInfo: scheduleInfo,
                };
                break;
        }

        const _caseInfo = serviceData.content.caseList();
        const _memberInfo = serviceData.content.doctorList();

        return {
            ..._sectionData,
            caseInfo: _caseInfo,
            memberInfo: _memberInfo,
        };
    }

    async function fetchSendData(_remoteData) {
        const _sendRemoteData = _remoteData ?? {};
        const _surgerySelected = $('.surgery_box').attr('data-option-role');
        switch (_surgerySelected) {
            case '실시간원격협진':
                const { result: remoteResult } =
                    (await insertRemoteConsult(_sendRemoteData)) ?? {};

                if (remoteResult) {
                    _createCooperationPopup.openPopup();
                } else {
                    _createCooperationPopup.closePopup();
                    alert('실시간 원격 협진 생성에 실패했습니다.');
                }
                break;
            case '소견요청협진':
                const { result: opinionResult } =
                    (await insertOpinionConsult(_sendRemoteData)) ?? {};
                if (opinionResult) {
                    _createCooperationPopup.openPopup();
                } else {
                    _createCooperationPopup.closePopup();
                    alert('소견 요청 협진 생성에 실패했습니다.');
                }
                break;
            case '협진일정요청':
                const { getParams } = history;
                const _modifyParam = getParams('modify');
                let requestScheduleResultTemp = false;

                if (_modifyParam) {
                    // 일정 수정 시
                    // const { result: requestScheduleResult } =
                    //     (await insertConsult(_sendRemoteData)) ?? {};
                    // requestScheduleResultTemp = requestScheduleResult;
                    requestScheduleResultTemp = true;
                } else {
                    // 일정 요청 시
                    const { result: requestScheduleResult } =
                        (await updateConsult(_sendRemoteData)) ?? {};
                    requestScheduleResultTemp = requestScheduleResult;
                }

                if (requestScheduleResultTemp) {
                    _createCooperationPopup.openPopup();
                } else {
                    _createCooperationPopup.closePopup();
                    alert('협진 일정 요청에 실패했습니다.');
                }
                break;
        }
    }

    $(_createCooperationBtnStr).on('click', async function () {
        // 협진 생성
        const _checkValidateAll = validateCoopAll();

        if (_checkValidateAll) {
            const _getSendData = calcSendData();
            fetchSendData(_getSendData);
        }
    });
}

function isModifyClickBtnRedirectRemotePage() {
    const { getParams } = history;
    const _modifyParam = getParams('modify');
    const _fromLinkParam = getParams('from');
    const _calcFromLinkParam = `/doctor/${_fromLinkParam}.html`;

    if (_modifyParam) {
        const _endYear = calendarData.year();
        const _endMonth = $('input[data-key="rqd_end_month"]').val();
        const _endDay = $('input[data-key="rqd_end_date"]').val();

        if (_fromLinkParam == 'remote_alarm') {
            window.location.href = `${_calcFromLinkParam}?consultId=${_modifyParam}`;
        } else {
            window.location.href = `${_calcFromLinkParam}?consultId=${_modifyParam}&endDatetime=${_endYear}-${_endMonth}-${_endDay}`;
        }
        return true;
    } else {
        return false;
    }
}

function cancelCooperationAction() {
    const _cancelCooperationPopup = new PopupController({
        /* 북마크 추가 팝업 생성 */
        target: {
            openButton: '.new_remote .btn_list .btn_cancel',
            appendWrap: '.createCooperation_popup_wrap',
        },
        templates: {
            popup: cancelCooperationPopupTmpl,
        },
        popupBtn: {
            cancelBtn: {
                target: '.btn_no',
                close: true,
            },
            submitBtn: {
                target: '.btn_cut',
                close: true,
                action: (_info) => {
                    _info.closePopup();
                    const _isModify = isModifyClickBtnRedirectRemotePage();
                    if (!_isModify) {
                        window.location.href = '/doctor/remote.html';
                    }
                },
            },
        },
    });
}

function initAction() {
    createCooperationAction();
    cancelCooperationAction();
}
initAction();
