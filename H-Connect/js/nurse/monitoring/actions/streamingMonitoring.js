import { commonRequest } from '../../../utils/controller/commonRequest.js';
import { sessionController } from '../../../utils/controller/sessionController.js';
import { ip, LOGIN_TOKEN } from '../../../utils/controller/serverController.js';

const { requester, requestDateTime } = commonRequest();

let passingParameter = {
  'SX-Auth-Token': LOGIN_TOKEN,
  deviceKind: 3,
  // connType: connType,
  apiRoute: 'GWS-1',
  requester,
};

// let streamming = new SockJS(
//   `${ip}ws?SX-API-Route=${'GWS-1'}&clientKeyName=${'bioSignalSimpleData'}&connType=${1}`
// );
// let stompClient = Stomp.over(streamming);
// stompClient.connect(passingParameter, callBack, connectonError);
// function callBack(frame) {
//   console.log(frame);
//   stompClient.subscribe(
//     '/topic/public/bioSignalSimpleData/SEERS_2201251404_IEU0',
//     function (data) {
//       const aaa = JSON.parse(data);
//       console.log('aaa===');
//       console.log(aaa);
//     },
//     (err) => {
//       console.log(err);
//     }
//   );
// }

// function connectonError(err) {
//   console.log(err);
// }
