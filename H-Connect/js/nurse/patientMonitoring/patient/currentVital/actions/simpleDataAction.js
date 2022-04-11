const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);
function goToArteriotonyPage() {
    /* NBP.mmHg, Pulse.bpm 클릭시 혈압수동입력 페이지 환자코드가지고 이동 */
    const historyMeasurementCode = history.getParams('measurement_code');
    history.linkTo(
        `/nurse/arteriotony.html?measurement_code=${historyMeasurementCode}`
    );
}
window.goToArteriotonyPage = goToArteriotonyPage;
