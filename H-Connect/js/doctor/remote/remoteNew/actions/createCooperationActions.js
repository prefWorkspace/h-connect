const { PopupController } = await import(
    importVersion(
        '/H-Connect/js/utils/module/popupController/popupController.js'
    )
);
const { insertRemoteConsult, insertOpinionConsult, insertConsult } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/remote/remoteNew/actions/remoteNewAPI.js'
        )
    );
const { serviceData, validateCoopAll } = await import(
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
const { confirmTwoPopupTmpl } = await import(
    importVersion('/H-Connect/js/common/popup/templates/commonPopupTmpl.js')
);

function createCooperationAction() {
    const _createCooperationBtnStr = '#create_cooperation_btn';
    const _createCooperationPopup = new PopupController({
        /* 북마크 추가 팝업 생성 */
        target: {
            openButton: _createCooperationBtnStr,
            appendWrap: '.createCooperation_popup_wrap',
        },
        templates: {
            popup: () => confirmTwoPopupTmpl({ type: 'confirm' }),
        },
        popupBtn: {
            cancelBtn: {
                target: '.gr',
                close: true,
            },
            submitBtn: {
                target: '.blf',
                close: false,
                action: async (_info) => {
                    const _sendRemoteData = _info.payload.remoteData ?? {};
                    const _surgerySelected =
                        $('.surgery_box').attr('data-option-role');
                    switch (_surgerySelected) {
                        case '실시간원격협진':
                            const { result: remoteResult } =
                                (await insertRemoteConsult(_sendRemoteData)) ??
                                {};

                            if (remoteResult) {
                                _info.closePopup();
                            } else
                                alert('실시간 원격 협진 생성에 실패했습니다.');
                            break;
                        case '소견요청협진':
                            const { result: opinionResult } =
                                (await insertOpinionConsult(_sendRemoteData)) ??
                                {};
                            if (opinionResult) {
                                _info.closePopup();
                            } else alert('소견 요청 협진 생성에 실패했습니다.');
                            break;
                        case '협진일정요청':
                            const { result: requestScheduleResult } =
                                (await insertConsult(_sendRemoteData)) ?? {};
                            if (requestScheduleResult) {
                                _info.closePopup();
                            } else alert('협진 일정 요청에 실패했습니다.');
                            break;
                    }
                    renderCooperationSection(_surgerySelected);
                    renderChoiceDoctorEmptyControll(true);
                    renderActivateChoiceDoctorLength();
                    renderResetCheckBox();
                },
            },
        },
    });
    $(_createCooperationBtnStr).on('click', async function () {
        // 협진 생성
        const _checkValidateAll = validateCoopAll();

        if (_checkValidateAll) {
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

            _createCooperationPopup.saveData('remoteData', {
                ..._sectionData,
                caseInfo: _caseInfo,
                memberInfo: _memberInfo,
            });
        }
    });
}
createCooperationAction();
