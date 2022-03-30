const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
import { history } from '../../../../utils/controller/historyController.js?v=2022.01.26.12.45';

export const getPatientInfo = async () => {
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoDetail',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: history.getParams('measurement_code'),
        })
    );
    if (!res.measurementInfo) {
        throw new Error('환자 정보를 가져오는데 실패했습니다.');
    }
    return {
        ...res.measurementInfo,
        gender: decodeGender(res.measurementInfo.gender),
    };
};

const decodeGender = (number) => {
    return number === 1 ? '남' : '여';
};
