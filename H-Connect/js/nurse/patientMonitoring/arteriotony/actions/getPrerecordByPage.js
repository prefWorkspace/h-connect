import { serverController } from '../../../../utils/controller/serverController.js?v=2022.01.17.11.33';
import { history } from '../../../../utils/controller/historyController.js?v=2022.01.26.12.45';
import { commonRequest } from '../../../../utils/controller/commonRequest.js?v=2022.01.17.11.33';

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
