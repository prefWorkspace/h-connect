const {
    coopRealTimeRemoteSectionTmpl,
    coopOpinionSectionTmpl,
    coopRequestScheduleSectionTmpl,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/templates/cooperationSectionsTmpl.js'
    )
);
export function renderCooperationSection() {
    $('#cooperation-section').html('');
}
