const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);

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

export const SelectAlarmSettingMeasurement = async () => {
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/SelectAlarmSettingMeasurement',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMeasurementCode,
        })
    );
    if (!res?.measurementAlarmSetting) {
        throw new Error('조회된 데이타가 없습니다');
    }
    return res.measurementAlarmSetting;
};

/* s : 환자 생체 신호 알람 업데이트 */
export const UpdateAlarmSettingMeasurement = async (_data) => {
    console.log('_data:', _data);
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/UpdateAlarmSettingMeasurement',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMeasurementCode,
            ..._data,
        }),
        (res) => {
            console.log(res);
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
export const SelectArrhythmiaSettingInfo = async () => {
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/SelectArrhythmiaSettingInfo',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMeasurementCode,
        })
    );
    if (!res?.arrhythmiaSettingInfo) {
        throw new Error('조회된 데이타가 없습니다');
    }
    return res.arrhythmiaSettingInfo;
};
