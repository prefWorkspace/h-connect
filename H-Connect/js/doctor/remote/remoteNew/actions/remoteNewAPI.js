const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { departmentDoctorListToBasicList } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/dataActions.js'
    )
);

function getUserInfo() {
    return JSON.parse(localStorageController.getLocalS('userData'));
}

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
    const { id } = getUserInfo();
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
    const { id } = getUserInfo();
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
    const { id } = getUserInfo();
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
    const { id } = getUserInfo();
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
    }
}

export async function insertBookMarkDetail({
    bookmarkId,
    addUserId,
    addUserName,
    addUserDepartmentName,
    addUserDepartmentCode,
}) {
    /* 의료진 즐겨찾기 탭 별 의사 리스트 추가 API */
    const { id } = getUserInfo();
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
    const { id } = getUserInfo();
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
    const { id } = getUserInfo();
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
export async function selectHisDoctorHost(_id) {
    /* 호스트 정보 받아오기 API */
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/SelectHisDoctorList',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            userId: _id,
            searchUserId: _id,
        }),
        (res) => {},
        (err) => console.log(err)
    );
    if (res.result) {
        return departmentDoctorListToBasicList(res.doctorInfoList)[0] ?? null;
    }
}

export async function insertRemoteConsult(_data) {
    /* 실시간 원격 협진 / 다학제 통합 진료 협진 생성 */
    const { caseInfo, memberInfo, startDatetime, endDatetime, remoteState } =
        _data ?? {};

    const { id } = getUserInfo();
    if (!id) return;
    const { userName, departmentCode, departmentName } =
        (await selectHisDoctorHost(id)) ?? {}; // 호스트 정보 받아오기
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/InsertRemoteConsult',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            hostName: userName,
            hostClass: departmentCode,
            hostClassName: departmentName,
            caseInfo: caseInfo, // case info list
            memberInfo: memberInfo, // 협진 참여자 list
            startDatetime: startDatetime,
            endDatetime: endDatetime,
            remoteState: remoteState,
            userId: id,
        }),
        (res) => {},
        (err) => console.log(err)
    );
    return res;
}
export async function insertOpinionConsult(_data) {
    /* 소견 요청 협진 생성 */
    const { caseInfo, memberInfo, startDatetime, endDatetime } = _data ?? {};

    const { id } = getUserInfo();
    if (!id) return;
    const { userName, departmentCode, departmentName } =
        (await selectHisDoctorHost(id)) ?? {}; // 호스트 정보 받아오기
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/InsertOpinionConsult',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            hostName: userName,
            hostClass: departmentCode,
            hostClassName: departmentName,
            caseInfo: caseInfo, // case info list
            memberInfo: memberInfo, // 협진 참여자 list
            startDatetime: startDatetime,
            endDatetime: endDatetime,
            userId: id,
        }),
        (res) => {},
        (err) => console.log(err)
    );
    return res;
}
export async function insertConsult(_data) {
    /* 협진 일정 요청 생성 */
    const { deadline, caseInfo, memberInfo, scheduleInfo } = _data ?? {};

    const { id } = getUserInfo();
    if (!id) return;
    const { userName, departmentCode, departmentName } =
        (await selectHisDoctorHost(id)) ?? {}; // 호스트 정보 받아오기
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/InsertConsult',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            hostName: userName,
            hostClass: departmentCode,
            hostClassName: departmentName,
            deadline: deadline,
            caseInfo: caseInfo, // case info list
            memberInfo: memberInfo, // 협진 참여자 list
            scheduleInfo: scheduleInfo,
            userId: id,
        }),
        (res) => {},
        (err) => console.log(err)
    );
    return res;
}

export async function selectScheduleCheck(_data) {
    /* 협진가능시간 선택에서 의사 일정과 중복인지 확인 하는 API */
    const { checkDatetime } = _data ?? {};
    console.log('checkDatetime: ', checkDatetime);

    const { id } = getUserInfo();
    if (!id) return;
    const res = await serverController.ajaxAwaitController(
        'API/Doctor/SelectScheduleCheck',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            userId: id,
            checkDatetime: checkDatetime,
        }),
        (res) => {},
        (err) => console.log(err)
    );
    return res;
}
