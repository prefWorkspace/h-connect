const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
import { history } from '../../../../utils/controller/historyController.js?v=2022.01.26.12.45';
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

export const getPrerecordByPage = async (page) => {
    const res = await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBloodPressurePage',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: getMesureMentCode(),
            pageNumber: page,
            count: 10,
        })
    );
    console.log(res);
    return {
        totalCount: res.totalCount,
        records:
            res.bloodPressureList &&
            res.bloodPressureList.map((record) => ({
                ...record,
                recordDateTime: new Date(record.recordDateTime),
            })),
    };
};
const getMesureMentCode = () => {
    return history.getParams('measurement_code');
};
