import { commonRequest } from '../../../utils/controller/commonRequest.js?v=2022.01.17.11.33';
import { sessionController } from '../../../utils/controller/sessionController.js?v=2022.01.27.09.24';
import {
    ip,
    LOGIN_TOKEN,
} from '../../../utils/controller/serverController.js?v=2022.01.17.11.33';
import { serverController } from '../../../utils/controller/serverController.js?v=2022.01.17.11.33';

const { requester, requestDateTime } = commonRequest();
let stompClient = {};
function connectStreamServer() {
    let headers = {
        'SX-Auth-Token': LOGIN_TOKEN,
        deviceKind: 3,
        // connType: connType,
        apiRoute: 'GWS-1',
        requester,
    };

    let streamming = new SockJS(
        `${ip}ws?SX-API-Route=${'GWS-1'}&clientKeyName=${'bioSignalSimpleData'}&connType=${1}`
    );
    stompClient = Stomp.over(streamming);

    stompClient.connect(headers, stompConnectCallBack, stompDisConnectCallBack);
}

function stompSubCribe() {
    console.log('stompClient:', stompClient);
    stompClient.subscribe(
        '/topic/public/bioSignalSimpleData/SEERS_2203220944_176V',
        (e) => {
            console.log('subcribe:::', e);
        }
    );
}

function stompDisConnect() {}

async function stompConnectCallBack(e) {
    console.log('connect callBack:::', e);
    stompSubCribe();
    await getMonitoringSickBed();
}

async function stompDisConnectCallBack() {}

// connectStreamServer();

export async function getMonitoringSickBed() {
    return await serverController.ajaxAwaitController(
        'API/Util/CheckingPing',
        'POST',
        JSON.stringify({
            ...commonRequest(),
        }),
        (res) => {
            console.log('checkPing:', res);
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}
