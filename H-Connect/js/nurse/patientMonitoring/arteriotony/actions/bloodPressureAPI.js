const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);

const historyMesurementCode = history.getParams('measurement_code');
// const historyPage = history.getParams('page');

export const selectBloodPressurePage = async () => {
    const historyPage = history.getParams('page');
    const resPage = parseInt(historyPage, 10) || 1;
    console.log('resPage:', resPage);
    const res = await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBloodPressurePage',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMesurementCode,
            pageNumber: resPage,
            count: 10,
        })
    );
    return {
        page: resPage,
        totalCount: res.totalCount,
        records:
            res.bloodPressureList &&
            res.bloodPressureList.map((record) => ({
                ...record,
                recordDateTime: new Date(record.recordDateTime),
            })),
    };
};

export async function insertBloodPressure(_data) {
    return await serverController.ajaxAwaitController(
        'API/BioSignal/InsertBloodPressure',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMesurementCode,
            ..._data,
        })
    );
}
export async function updateBloodPressure(_data) {
    console.log(_data);
    return await serverController.ajaxAwaitController(
        'API/BioSignal/UpdateBloodPressure',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMesurementCode,
            ..._data,
        })
    );
    // if (!res.measurementInfo) {
    // }
}
export async function deleteBloodPressure(_data) {
    const res = await serverController.ajaxAwaitController(
        'API/BioSignal/DeleteBloodPressure',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMesurementCode,
            ..._data,
        })
    );
    // if (!res.measurementInfo) {
    // }
}
