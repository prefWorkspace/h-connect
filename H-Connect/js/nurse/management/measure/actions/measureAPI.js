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

const { request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const userData = localStorageController.getLocalS('userData');
const { userCode: requester, organizationCode } = JSON.parse(userData);

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

export async function insertMeasurementInfo(codeObj, patientData, pop) {
    const obj = {
        ...commonRequest(),
        ...codeObj,
        ...patientData,
        requester,
        organizationCode,
        orderNumber: 1,
    };
    const { ward, sickRoom, sickBed } = pop;

    $('.pop.new_room_pop .overlay').fadeOut();
    $('.pop.arteriotony_regi h3 span:nth-of-type(1)').text(ward + ' ');
    $('.pop.arteriotony_regi h3 span:nth-of-type(2)').text(sickRoom);
    $('.pop.arteriotony_regi h3 span:nth-of-type(3)').text(sickBed);

    $('.pop.arteriotony_regi .overlay').fadeIn();

    return serverController.ajaxAwaitController(
        'API/Measurement/InsertMeasurementInfo',
        'POST',
        JSON.stringify(obj),
        (res) => {
            console.log(res);
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}

export async function recodingEndMeasurementInfo(measurementCode) {
    const obj = {
        requester,
        measurementCode,
        measurementStatus: 3,
        dateTime: request_Date_Data(),
    };

    return serverController.ajaxAwaitController(
        'API/Measurement/UpdateMeasurementInfoStatus',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => {
            console.log(err);
        }
    );
}
