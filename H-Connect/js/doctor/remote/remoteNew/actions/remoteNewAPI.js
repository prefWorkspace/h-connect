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

export async function selectBookMarkUserList({ bookmarkId }) {
    /* 북마크 유저 리스트 조회 API */
    const { id } = JSON.parse(localStorageController.getLocalS('userData'));
    if (!id) return;
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/SelectBookMarkUserList',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            userId: id,
            bookmarkId: bookmarkId ?? '',
        }),
        (res) => {},
        (err) => console.log(err)
    );
    if (res.result) {
        return res.bookmarkInfoList;
    } else {
        return false;
    }
}
selectBookMarkUserList({ bookmarkId: 'prefinc3_2022-05-11T16:19:30.129' });

export async function insertBookMarkDetail({
    bookmarkId,
    addUserId,
    addUserName,
    addUserDepartmentName,
    addUserDepartmentCode,
}) {
    /* 의료진 즐겨찾기 탭 별 의사 리스트 추가 API */
    const { id } = JSON.parse(localStorageController.getLocalS('userData'));
    if (!id) return;
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/InsertBookMarkDetail',
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
export async function deleteBookMarkDetail({ bookmarkId, delUserId }) {
    /* 의료진 즐겨찾기 탭별 의료진 제거 API */
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

export async function selectHisDoctorList(_searchName) {
    /* 의사 리스트 불러오기 API */
    const { id } = JSON.parse(localStorageController.getLocalS('userData'));
    if (!id) return;
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/SelectHisDoctorList',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            userId: id,
            searchName: _searchName,
        }),
        (res) => {},
        (err) => console.log(err)
    );
    if (res.result) {
        return res.doctorInfoList;
    }
}
export async function selectHisDoctorHost() {
    /* 의사 리스트 불러오기 API */
    const { id } = JSON.parse(localStorageController.getLocalS('userData'));
    if (!id) return;
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/SelectHisDoctorList',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            userId: id,
            searchUserId: id,
        }),
        (res) => {},
        (err) => console.log(err)
    );
    console.log(res);
    if (res.result) {
        return res.doctorInfoList;
    }
}

export async function insertRemoteConsult({
    caseInfo,
    memberInfo,
    startDatetime,
    endDatetime,
    remoteState,
}) {
    /* 실시간 원격 협진 / 다학제 통합 진료 추가 */

    const { id } = JSON.parse(localStorageController.getLocalS('userData'));
    if (!id) return;
    // const {} = await selectHisDoctorHost(); // 호스트 정보 받아오는 코드 작성 필요
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/InsertRemoteConsult',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            hostName: 'ryan', // 임시 하드코딩
            hostClass: '0', // 임시 하드코딩
            hostClassName: '일반외과', // 임시 하드코딩
            caseInfo: caseInfo, // case info list
            memberInfo: memberInfo, // 협진 참여자 list
            startDatetime: startDatetime,
            endDatetime: endDatetime,
            remoteState: remoteState,
            userId: id,
        }),
        (res) => {
            console.log('res:', res);
        },
        (err) => console.log(err)
    );
    return res;
}
export async function selectMyScheduleList() {
    /* 실시간 원격 협진 / 다학제 통합 진료 추가 */

    const { id } = JSON.parse(localStorageController.getLocalS('userData'));
    if (!id) return;
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/SelectMyScheduleList',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            startDatetime: '2022-02-07 06:00:05',
            endDatetime: '2023-07-07 06:00:05',
            userId: id,
        }),
        (res) => {
            console.log('res:', res);
        },
        (err) => console.log(err)
    );
    return res;
}
// selectMyScheduleList();
