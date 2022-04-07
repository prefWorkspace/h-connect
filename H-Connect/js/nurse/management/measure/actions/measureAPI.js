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
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

export async function insertMeasurementInfo(codeObj, patientData) {
    const obj = {
        ...commonRequest(),
        ...codeObj,
        ...patientData,
        requester,
        organizationCode,
        orderNumber: 1,
    };

    $('.pop.new_room_pop .overlay').hide();

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
