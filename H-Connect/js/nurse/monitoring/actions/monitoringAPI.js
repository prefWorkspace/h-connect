const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

//유저 데이터
const {
    userCode: requester,
    organizationCode,
    id: userId,
} = JSON.parse(localStorageController.getLocalS('userData'));

/* s: 환자 병상 갯수 확인 */
export async function selectSickBed() {
    return await serverController.ajaxAwaitController(
        'API/Manager/SelectSickBed',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            includeSickRoom: true,
            includeSickBed: true,
        }),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}
/* e: 환자 병상 갯수 확인 */

/* s: 환자 측정 리스트 가져오기 */
export async function selectMeasurementInfoList() {
    return await serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoList',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementType: 'BM', // ET : 긴급이송 / BM : 병상모니터링
            startDateTime: null,
            endDateTime: null,
            pageNumber: 1,
            count: 1000,
            // measurementStatusList: [1, 2],
        }),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}
/* e: 환자 측정 리스트 가져오기 */

/* s: 환자 측정 바이탈포함 리스트 가져오기 */
export async function selectMeasurementInfoBioDataPage() {
    return await serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoBioDataPage',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementType: 'BM', // ET : 긴급이송 / BM : 병상모니터링
            startDateTime: null,
            endDateTime: null,
            pageNumber: 1,
            count: 1000,
            measurementStatusList: [1, 2],
        }),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}
/* e: 환자 측정 리스트 가져오기 */

/* s: 환자 측정 상세 정보 */
export const selectMeasurementInfoDetail = async (_measurementCode) => {
    console.log('_measurementCode:', _measurementCode);
    const res = await serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoDetail',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: 'SEERS_2203101140_LV5E',
        }),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
    console.log(res);
    if (res.result) {
        return res.measurementInfo;
    } else {
    }
};
/* e: 환자 측정 상세 정보 */

/* s : 환자 병실 리스트 */
export async function selectSickRoom() {
    return await serverController.ajaxAwaitController(
        'API/Manager/SelectSickRoom',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            includeSickBed: true, // 병실의 병상 포함
        }),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}
/* e : 환자 병실 리스트 */

//측정 추가 및 수정 시, 장치 조회
export async function selectDeviceRegisterUnused(search) {
    const obj = {
        ...commonRequest(),
        requester,
        organizationCode,
        search,
        deviceType: 0,
        pageNumber: 1,
        count: 1000,
    };

    return serverController.ajaxAwaitController(
        'API/Device/SelectDeviceRegisterUnusedPage',
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

export async function InsertMeasurementInfo(codeObj, patientData) {
    const obj = {
        ...commonRequest(),
        ...codeObj,
        ...patientData,
        requester,
        organizationCode,
        orderNumber: 1,
    };
    return serverController.ajaxAwaitController(
        'API/Measurement/InsertMeasurementInfo',
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

// 환자 조회
// HIS 환자 정보 검색
export async function selectHisPatientList(patientName = null) {
    const obj = {
        requester,
        userId,
        organizationCode,
        patientName,
        ...commonRequest(),
    };

    return serverController.ajaxAwaitController(
        'API/Doctor/SelectHisPatientList',
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
