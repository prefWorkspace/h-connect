const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
// console.log(commonRequest);

export const selectMeasurementInfoDetail = async () => {
    /* s: 환자 측정 상세 정보 */
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoDetail',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: history.getParams('measurement_code'),
        }),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
    if (res.result) {
        return res.measurementInfo;
    } else {
    }
    /* e: 환자 측정 상세 정보 */
};
