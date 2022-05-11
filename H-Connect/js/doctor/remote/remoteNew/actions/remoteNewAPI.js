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
    /* 북마크 탭 리스트 조회 API */
    const { id } = JSON.parse(localStorageController.getLocalS('userData'));
    if (!id) return;
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/SelectBookMarkList',
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
        return res.bookmarkInfoList;
    }
}

export async function insertBookMark({ bookmarkName }) {
    /* 의료진 즐겨찾기 "탭" 추가 API */
    const { id } = JSON.parse(localStorageController.getLocalS('userData'));
    if (!id) return;
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/InsertBookMark',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            bookmarkChannel: 1,
            bookmarkName: bookmarkName,
            userId: id,
        }),
        (res) => {},
        (err) => console.log(err)
    );
    return res;
}
export async function deleteBookMark({ bookmarkId }) {
    /* 의료진 즐겨찾기 "탭" 삭제 API */
    const { id } = JSON.parse(localStorageController.getLocalS('userData'));
    if (!id) return;
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/DeleteBookMark',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            bookmarkId: bookmarkId,
            userId: id,
        }),
        (res) => {},
        (err) => console.log(err)
    );
    if (res.result) {
        return true;
    } else {
        return false;
    }
}

export async function selectBookMarkUserList() {
    /* 북마크 탭 리스트 조회 API */
    const { id } = JSON.parse(localStorageController.getLocalS('userData'));
    if (!id) return;
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/SelectBookMarkUserList',
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
        return res.bookmarkInfoList;
    }
}

export async function insertBookMarkDetail({
    bookmarkId,
    addUserId,
    addUserName,
    addUserDepartmentName,
    addUserDepartmentCode,
}) {
    /* 의료진 즐겨찾기 탭 별 리스트 추가 API */
    const { id } = JSON.parse(localStorageController.getLocalS('userData'));
    if (!id) return;
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/InsertBookMark',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            bookmarkId: bookmarkId,
            addUserId: addUserId,
            addUserName: addUserName,
            addUserDepartmentName: addUserDepartmentName,
            addUserDepartmentCode: addUserDepartmentCode,
            userId: id,
        }),
        (res) => {},
        (err) => console.log(err)
    );
    return res;
}
function test() {
    insertBookMarkDetail({
        bookmarkId: 'prefinc3_2022-05-11T09:37:14.420',
        addUserId: 'ryan.cha',
        addUserName: 'ryan',
        addUserDepartmentName: '심장외과',
        addUserDepartmentCode: '0001',
    });
}
// test();
export async function deleteBookMarkDetail({ bookmarkId, delUserId }) {
    /* 의료진 즐겨찾기 "탭" 추가 API */
    const { id } = JSON.parse(localStorageController.getLocalS('userData'));
    if (!id) return;
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/DeleteBookMarkDetail',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            bookmarkId: bookmarkId,
            delUserId: delUserId,
            userId: id,
        }),
        (res) => {},
        (err) => console.log(err)
    );
    return res;
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
