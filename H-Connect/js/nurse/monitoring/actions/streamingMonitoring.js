import { commonRequest } from '../../../utils/controller/commonRequest.js';
import { sessionController } from '../../../utils/controller/sessionController.js';
import { ip, LOGIN_TOKEN } from '../../../utils/controller/serverController.js';

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
    stompClient.subcribe(
        '/topic/public/bioSignalSimpleData/SEERS_2203220944_176V',
        (e) => {
            console.log('subcribe:::', e);
        }
    );
}

function stompDisConnect() {}

function stompConnectCallBack(e) {
    console.log('connect callBack:::', e);
    stompSubCribe();
}

function stompDisConnectCallBack() {}

// connectStreamServer();
