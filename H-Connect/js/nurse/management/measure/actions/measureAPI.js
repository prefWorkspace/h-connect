'use strict';
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

// const { createMeasureList } = await import(
//     importVersion(
//         '/H-Connect/js/nurse/management/measure/renders/createMeasureList.js'
//     )
// );

// const { CONSTANT_MEASURE } = await import(
//     importVersion('/H-Connect/js/nurse/management/measure/renders/constant.js')
// );
//입원한 환자 카운트
let patient_count;
const userData = localStorageController.getLocalS('userData');
const { userCode: requester, organizationCode: organization } =
    JSON.parse(userData);

//모든 측정 정보가져오기
export async function selectMeasurementInfoList(
    wardCode = null,
    sickRoomCode = null,
    sickBedCode = null
) {
    const req = JSON.stringify({
        ...commonRequest(),
        wardCode,
        sickRoomCode,
        sickBedCode,
        measurementType: 'BM',
        measurementStatusList: null,
        search: null,
    });

    return serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoList',
        'POST',
        req,
        (res) => {
            if (res.result) {
                // patient_count = data_List ? data_List.length : 0;
                // $('.section.measure_status .cont .search_select p span').text(
                //     patient_count
                // );
                // createMeasureList(data_List);
            }
        },
        (err) => {
            console.log(err);
        }
    );
}
