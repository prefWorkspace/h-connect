import { serverController } from '../../../../utils/controller/serverController.js?v=2022.01.17.11.33';

import { commonRequest } from '../../../../utils/controller/commonRequest.js?v=2022.01.17.11.33';
import { history } from '../../../../utils/controller/historyController.js?v=2022.01.26.12.45';

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
