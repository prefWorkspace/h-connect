const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

/* s: 환자 측정 상세 정보 */
export const selectMeasurementInfoDetail = async () => {
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
        return null;
    }
};
/* e: 환자 측정 상세 정보 */

/* s : 환자 생체 신호 알람 데이터 */
export const SelectAlarmSettingMeasurement = async () => {
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/SelectAlarmSettingMeasurement',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: history.getParams('measurement_code'),
        }),
        (res) => {},
        (err) => console.log(err)
    );
    if (res.result) {
        return res;
    } else {
        return null;
    }
};
/* e : 환자 생체 신호 알람 데이터 */

/* s : 환자 생체 신호 알람 업데이트 */
export const UpdateAlarmSettingMeasurement = async (_data) => {
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/UpdateAlarmSettingMeasurement',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: history.getParams('measurement_code'),
            hrAlertAlarm: 0,
        }),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
    if (res.result) {
        return res;
    } else {
        return null;
    }
};
/* e : 환자 생체 신호 알람 업데이트 */
