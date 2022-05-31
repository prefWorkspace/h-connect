const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);
const { selectConsultConfirmView } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/remoteNewAPI.js'
    )
);
const { renderCooperationSection } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/cooperationSectionRenders.js'
    )
);
const { coopRequestScheduleBlockTmpl, coopContentCaseBlockTmpl } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/templates/cooperationSectionTmpl.js'
    )
);
const { choiceDoctorItemTmpl } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/templates/attendeesSectionTmpl.js'
    )
);

const {
    coopSurgerySelector,
    coopContentSelector,
    coopParticipantInformSelector,
    choiceDoctorSelector,
} = await import(
    importVersion('/H-Connect/js/doctor/remote/remoteNew/actions/selector.js')
);
const { calendarData } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/dataActions.js'
    )
);

function selectRequestScheduleOption() {
    $('.surgery_label').text('협진 일정 요청');
    renderCooperationSection('협진일정요청');
}

function deadlineTimeRender({ deadlineDatetime }) {
    const _deadMonth = moment(deadlineDatetime).format('MM');
    const _deadDay = moment(deadlineDatetime).format('DD');
    const _deadHours = moment(deadlineDatetime).format('hh');
    const _deadMinutes = moment(deadlineDatetime).format('mm');

    $('input[data-key="rqd_end_month"]').val(_deadMonth);
    $('input[data-key="rqd_end_date"]').val(_deadDay);
    $('input[data-key="rqd_end_hours"]').val(_deadHours);
    $('input[data-key="rqd_end_minutes"]').val(_deadMinutes);

    const _calendarModule = calendarData.module();
    _calendarModule.module.gotoDate(new Date(deadlineDatetime));
    _calendarModule.selectDateCalendar({
        dateStr: moment(deadlineDatetime).format('YYYY-MM-DD'),
    });
    _calendarModule.resetTodaySelect();
}

function scheduleInfoListRender({ scheduleInfoList }) {
    if (!scheduleInfoList) return;
    const _scheduleCanHtmlStr = scheduleInfoList.htmlFor((_item) => {
        const { consultStartDatetime, consultEndDatetime } = _item ?? {};
        const canMonth = moment(consultStartDatetime).format('MM');
        const canDay = moment(consultStartDatetime).format('DD');

        const startHours = moment(consultStartDatetime).format('hh');
        const startMinutes = moment(consultStartDatetime).format('mm');

        const endHours = moment(consultEndDatetime).format('hh');
        const endMinutes = moment(consultEndDatetime).format('mm');

        return coopRequestScheduleBlockTmpl({
            canMonth,
            canDay,
            startHours,
            startMinutes,
            endHours,
            endMinutes,
        });
    });
    coopSurgerySelector.requestSchedule.scheduleCan
        .wrapEl()
        .html(_scheduleCanHtmlStr);
}

function caseInfoListRender({ caseInfoList }) {
    if (!caseInfoList) return;

    coopContentSelector.case.wrapEl().html();
    caseInfoList.map((_item, _index) => {
        const {
            caseTitle,
            patientName,
            caseContents,
            patientGender,
            patientAge,
            patientId,
            patientWard,
            patientWardRoom,
            patientCondition,
        } = _item ?? {};
        if (_index === 0) {
            coopContentSelector.case.wrapEl().html(
                coopContentCaseBlockTmpl({
                    caseTitle,
                    patientName,
                    caseContents,
                })
            );
        } else {
            coopContentSelector.case.wrapEl().append(
                coopContentCaseBlockTmpl({
                    caseTitle,
                    patientName,
                    caseContents,
                })
            );
        }
        const _patientData = {
            patientName: patientName,
            patientGender: patientGender,
            patientAge: patientAge,
            patientCode: patientId,
            patientWard: patientWard,
            patientWardRoom: patientWardRoom,
            patientCondition: patientCondition,
        };
        $('textarea[data-key="cont_patient_name"]')
            .eq(_index)
            .data(_patientData);
    });
}

function memberInfoListRender({ memberInfoList }) {
    if (!memberInfoList) return;
    const _memberInfoListHtmlStr = memberInfoList.htmlFor((_item) => {
        const { doctorId, doctorName, doctorClass, doctorClassName } =
            _item ?? {};

        return choiceDoctorItemTmpl({
            userId: doctorId,
            userName: doctorName,
            departmentCode: doctorClass,
            departmentName: doctorClassName,
        });
    });
    choiceDoctorSelector.wrapEl().html(_memberInfoListHtmlStr);
    coopParticipantInformSelector.wrapEl().html(_memberInfoListHtmlStr);
}

async function getCooperationInformationForUpdate(_consultId) {
    const _getInformation = await selectConsultConfirmView(_consultId);
    const { deadlineDatetime, scheduleInfoList, caseInfoList, memberInfoList } =
        _getInformation ?? {};
    /* 초기 세팅 설정 */
    selectRequestScheduleOption();
    /* 일정 요청 마감 일자 */
    deadlineTimeRender({ deadlineDatetime });
    /* 협진 가능시간 선택 */
    scheduleInfoListRender({ scheduleInfoList });
    /* 협진 내용 */
    caseInfoListRender({ caseInfoList });
    /* 협진 참여자 정보 */
    memberInfoListRender({ memberInfoList });
}

function initUpdateRender() {
    const { getParams } = history;
    const _modifyParam = getParams('modify');
    if (!_modifyParam) return;

    getCooperationInformationForUpdate(_modifyParam);
}

initUpdateRender();
