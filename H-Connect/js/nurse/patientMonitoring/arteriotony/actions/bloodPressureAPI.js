import { serverController } from '../../../../utils/controller/serverController.js';

import { commonRequest } from '../../../../utils/controller/commonRequest.js';
import { history } from '../../../../utils/controller/historyController.js';

const historyParams = history.getParams(['measurement_code', 'page']);

export const selectBloodPressurePage = async () => {
    const resPage = historyParams.page || 1;
    const res = await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBloodPressurePage',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyParams.measurement_code,
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
            measurementCode: historyParams.measurement_code,
            ..._data,
        })
    );
}
export async function updateBloodPressure(_data) {
    const res = await serverController.ajaxAwaitController(
        'API/BioSignal/UpdateBloodPressure',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyParams.measurement_code,
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
            measurementCode: historyParams.measurement_code,
            ..._data,
        })
    );
    // if (!res.measurementInfo) {
    // }
}
