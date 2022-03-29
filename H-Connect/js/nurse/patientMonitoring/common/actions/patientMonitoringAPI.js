const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
import { history } from '../../../../utils/controller/historyController.js?v=2022.01.26.12.45';

const historyMeasurementCode = history.getParams('measurement_code');

export const SelectMeasurementInfoDetail = async () => {
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoDetail',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMeasurementCode,
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
