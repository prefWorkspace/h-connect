const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const { device_NameToType } = await import(
    importVersion('/H-Connect/js/utils/controller/deviceNameController.js')
);

const { getMacaddress } = await import(
    importVersion('/H-Connect/js/utils/custom/utils.js')
);

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

const deviceInfoList = [];
$('.pop.new_room_pop .overlay .new_regi .blf.btn').on('click', function () {
    const deviceName = $('.pop.new_regi_pop .selectBox2 .label').text();
    const deviceType = device_NameToType(deviceName);
    const serialNumber = $(
        '.pop.new_room_pop .input_box .input_wrap input'
    ).val();

    if (serialNumber) {
        const obj = {
            deviceType,
            serialNumber,
            macAddress: getMacaddress(deviceType, serialNumber),
        };
        deviceInfoList.push(obj);
        serialNumber.val('');
        $('.pop.new_room_pop').removeClass('active');
    } else {
        alert('시리얼넘버를 바르게 입력해주세요');
    }
});

/* s: 신규 병상등록 (전체환자 보기) */
export async function insertSickBed() {
    // 담주 월요일에 작업
}
/* e: 신규 병상등록 (전체환자 보기) */
