const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

export async function selectMeasurementInfoList(_searchVal) {
    /* 환자 검색 정보 리스트 불러오기 API */
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoList',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementType: 'BM', // ET : 긴급이송 / BM : 병상모니터링
            search: _searchVal,
        }),
        (res) => {},
        (err) => console.log(err)
    );
    if (res.result) {
        return res.measurementInfoSimpleList;
    }
}

export async function selectBookMarkList() {
    /* 의사 리스트 불러오기 API */
    const { id } = JSON.parse(localStorageController.getLocalS('userData'));
    if (!id) return;
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/selectBookMarkList',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            bookmarkChannel: 1,
            userId: id,
        }),
        (res) => {},
        (err) => console.log(err)
    );
    if (res.result) {
        return res.doctorInfoList;
    }
}
export async function selectHisDoctorList() {
    /* 의사 리스트 불러오기 API */
    const { id } = JSON.parse(localStorageController.getLocalS('userData'));
    if (!id) return;
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/SelectHisDoctorList',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            userId: id,
        }),
        (res) => {},
        (err) => console.log(err)
    );
    if (res.result) {
        return res.doctorInfoList;
    }
}
