const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const { request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const historyMesurementCode = history.getParams('measurement_code');
const userData = localStorageController.getLocalS('userData');
const {
    userCode: requester,
    id: userId,
    organizationCode,
} = JSON.parse(userData);

export const selectBloodPressurePage = async () => {
    const historyPage = history.getParams('page');
    const resPage = parseInt(historyPage, 10) || 1;
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

//담당의 에게 메세지 보내기
export async function selectHisDoctor() {
    const obj = {
        requester,
        organizationCode,
        userId,
        searchDate: request_Date_Data(),
        ...commonRequest(),
    };
    return serverController.ajaxAwaitController(
        'API/Doctor/SelectHisDoctorList',
        'POST',
        JSON.stringify(obj),
        (res) => {},
        (err) => console.log(err)
    );
}

//진료과 리스트
export async function selectHusDoctorMedList() {
    const obj = {
        requester,
        userId,
        organizationCode,
        ...commonRequest(),
    };

    return await serverController.ajaxAwaitController(
        'API/Doctor/SelectHisDoctorMedList',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}
