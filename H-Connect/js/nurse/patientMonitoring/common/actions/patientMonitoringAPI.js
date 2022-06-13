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

/* 환자 상세 정보 받아오기 */
export const SelectMeasurementInfoDetail = async () => {
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoDetail',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMeasurementCode,
        })
    );
    if (!res.result) {
        throw new Error('환자 정보를 가져오는데 실패했습니다.');
    }
    return res;
};

/* 환자 생체 신호 알람 조회 */
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

/* 환자 생체 신호 알람 업데이트 */
export const UpdateAlarmSettingMeasurement = async (_data) => {
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/UpdateAlarmSettingMeasurement',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMeasurementCode,
            ..._data,
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

// 등록된 수동 혈압의 데이터
export const SelectBloodPressurePage = async (page = 1, count = 10) => {
    // 페이지별로 받아옴
    const res = await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBloodPressurePage',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            pageNumber: page,
            count: count,
            measurementCode: historyMeasurementCode,
        })
    );
    if (!res?.bloodPressureList) {
        return null;
    } else {
        return res.bloodPressureList;
    }
};

//
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
export const UpdateArrhythmiaSettingInfo = async (_data) => {
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/UpdateArrhythmiaSettingInfo',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMeasurementCode,
            ..._data,
        })
    );
    if (res.result) {
        return res;
    } else {
        return null;
    }
};

/* s : 생체신호 트렌드 데이터 페이지 조회 */
export const SelectBioSignalsTrendDataPage = async (_page) => {
    const res = await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBioSignalsTrendDataPage',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMeasurementCode,
            pageNumber: _page,
            count: 10,
        })
    );
    return {
        page: _page,
        totalCount: res.totalCount,
        records: res.bioSignalsTrendDataList,
    };
};

/* 글로벌 환경 세팅 */
export const SelectGlobalSetting = async () => {
    const res = await serverController.ajaxAwaitController(
        'API/Global/SelectGlobalSetting',
        'POST',
        JSON.stringify({
            ...commonRequest(),
        })
    );
    if (res.result) {
        return res;
    } else {
        return null;
    }
};
export const UpdateGlobalSetting = async (_trendSecond) => {
    const res = await serverController.ajaxAwaitController(
        'API/Global/UpdateGlobalSetting',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            bioSignalsTrendSecond: _trendSecond,
        })
    );
    if (res.result) {
        return res;
    } else {
        return null;
    }
};

/* 생체 신호 알림 페이지 조회 */
export const SelectBioSignalEventSimplePage = async (_page) => {
    const mesurementInfoDetail = (await SelectMeasurementInfoDetail()) ?? {};

    const startDateTime = moment(
        mesurementInfoDetail.measurementInfo.startDateTime
    ).format('YYYY-MM-DD HH:mm:ss');
    const endDateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    const res = await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBioSignalEventSimplePage',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMeasurementCode,
            pageNumber: _page,
            count: 10,
            endDateTime: endDateTime,
            startDateTime: startDateTime,
        })
    );
    return {
        page: _page,
        totalCount: res.totalCount,
        records: res.bioSignalEventSimpleList,
    };
};

/* 생체 신호 알림 상세 조회 */
export const SelectBioSignalEvent = async (_eventId) => {
    const res = await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBioSignalEvent',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMeasurementCode,
            bioSignalEventId: _eventId,
        })
    );
    if (res.result) {
        return res;
    } else {
        return null;
    }
};

/* 생체 신호 알림 confirm 업데이트 */
export const UpdateBioSignalEvent = async (_eventId, _confirm) => {
    const res = await serverController.ajaxAwaitController(
        'API/BioSignal/UpdateBioSignalEvent',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMeasurementCode,
            bioSignalEventId: _eventId,
            confirm: _confirm,
        })
    );
    if (res.result) {
        return res;
    } else {
        return null;
    }
};
/* 생체 신호 알림 삭제 */
export const DeleteBioSignalEvent = async (_eventId) => {
    const res = await serverController.ajaxAwaitController(
        'API/BioSignal/DeleteBioSignalEvent',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: historyMeasurementCode,
            bioSignalEventId: _eventId,
        })
    );
    if (res.result) {
        return res;
    } else {
        return null;
    }
};
