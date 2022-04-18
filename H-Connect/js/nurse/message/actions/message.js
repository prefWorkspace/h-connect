'use strict';
const { commonRequest, request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const { serverController, ip, sockeIp } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const { sessionController } = await import(
    importVersion('/H-Connect/js/utils/controller/sessionController.js')
);

const userData = JSON.parse(localStorageController.getLocalS('userData'));
const { userCode: requester, organization: organizationCode } = userData;
const LOGIN_TOKEN = sessionController.getSession('accesToken');

//모든 측정 데이터 리스트 select API
export async function selectMeasurementInfoList(
    wardCode = null,
    sickRoomCode = null,
    sickBedCode = null,
    search
) {
    const req = JSON.stringify({
        ...commonRequest(),
        wardCode,
        sickRoomCode,
        sickBedCode,
        includeDeviceStatus: true,
        measurementType: 'BM',
        measurementStatusList: [2],
        search,
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

const { measurementInfoSimpleList } = await selectMeasurementInfoList();

let passingParameter = {
    'SX-Auth-Token': LOGIN_TOKEN,
    deviceKind: 3,
    apiRoute: 'GWS-1',
    requester,
    requestDateTime: request_Date_Data(),
};
// `${ip}ws?SX-API-Route=${'GWS-1'}&clientKeyName=${'bioSignalData'}&connType=${1}`

let streamming = new SockJS(`${ip}ws`);
let stompClient = Stomp.over(streamming);

function callBack(frame) {
    const data = frame.headers;
    for (let i = 0; i < measurementInfoSimpleList.length; i++) {
        stompClient.subscribe(
            // `/topic/public/bioSignalData/SEERS_2204061650_ZF04`,
            `/topic/public/bioSignalData/${measurementInfoSimpleList[i].measurementCode}`,
            function (data) {
                const { body } = data;
                const aaa = JSON.parse(body);
                console.log('aaa===');
                console.log(aaa);
            },
            (err) => {
                console.log(err);
            }
        );
    }
}

function connectonError(err) {
    console.log(err);
}

// stompClient.connect(passingParameter, callBack, connectonError);
