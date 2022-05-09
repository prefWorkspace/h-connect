const { selectHisDoctorList } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/remoteNewAPI.js'
    )
);
const {
    // coopRealTimeRemoteSectionTmpl, // 실시간 원격 협진 템플릿
    // coopOpinionSectionTmpl, // 소견 요청 협진 템플릿
    // coopRequestScheduleSectionTmpl, // 협진 일정 요청 템플릿
    // coopContentSectionTmpl, // 협진 내용 템플릿
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/templates/attendeesSectionTmpl.js'
    )
);

export function renderSelectDoctorList(doctorList) {
    // console.log('doctorList: ', doctorList);
    $('.select_doctor .doctor_list .list_inner').html();
}

async function renderInit() {
    const _getDoctorList = await selectHisDoctorList();
    renderSelectDoctorList(_getDoctorList);
}

renderInit();
