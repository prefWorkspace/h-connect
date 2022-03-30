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
    }
};
/* e: 환자 측정 상세 정보 */

/* s: 환자 측정 상세 정보 */
export const SelectMeasurementInfoBioDataPage = async () => {
    const { wardCode, sickRoomCode, sickBedCode } =
        await selectMeasurementInfoDetail();
    console.log(wardCode, sickRoomCode, sickBedCode);
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoBioDataPage',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementType: 'BM',
            wardCode: wardCode,
            sickRoomCode: sickRoomCode,
            sickBedCode: sickBedCode,
            startDateTime: null,
            endDateTime: null,
            pageNumber: 10000,
            count: 10000,
        }),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
    console.log(res);
    if (res.result) {
        return res.measurementInfo;
    } else {
    }
};
// console.log(SelectMeasurementInfoBioDataPage());

/* e: 환자 측정 상세 정보 */

export const updateMeasurementInfoStatus = async () => {
    const { apiRoute } = await selectMeasurementInfoDetail();
    const res = await serverController.ajaxMeasurementController(
        'API/Measurement/UpdateMeasurementInfoStatus',
        apiRoute,
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: history.getParams('measurement_code'),
            measurementStatus: 2,
            dateTime: '2022-03-30 20:04:24',
        }),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
    console.log(res);
    if (res.result) {
        return res.measurementInfo;
    } else {
    }
};
// updateMeasurementInfoStatus();
