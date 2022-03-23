import { commonRequest } from '../../../utils/controller/commonRequest.js';
import { sessionController } from '../../../utils/controller/sessionController.js';
import { ip, LOGIN_TOKEN } from '../../../utils/controller/serverController.js';
// websoket 선언 ()안에는 호출할 url을 작성해준다.
// const wsUrl = '127.0.0.1:5501';
// const ws = new WebSocket(`ws://${wsUrl}`);

// ws.onopen = (event) => { //
//     let sendData = { event : 'open'};
//     ws.send(JSON.stringify(sendData));
// }
// ws.onmessage = (event)=> { // 받는거
//     let recData = JSON.parse(event.data);
//     switch (recData.event) {
//         case 'response' :
//         console.log(recData.data);
//         break;
//     }
// }
// onsubmit // 보ㅓ내기

// let sendData = {
//     event: 'request',
//     data: 'some data...'
// };
// ws.send(JSON.stringify(sendData));

// const {requester} = commonRequest();
// const accessToken = cookieController.getCookie("accesToken");

// const ws = new WebSocket(`${sockeIp}/ws?SX-API-Route=/topic/public/bioSignalData/${"SEERS_2201191502_RPR7"}&SX-Auth-Token=${accessToken}&deviceKind=${3}&requester=${requester}&requestDateTime=2021-05-17 14:23:45`);

// ws.addEventListener('open', function(e){
//     // console.log("open:",e)
// })
// ws.addEventListener('message', function(e){
//     // console.log("message:",e)
// })

// const { requester, requestDateTime } = commonRequest();

// const headers = {
//     "SX-Auth-Token": `${LOGIN_TOKEN}`,
//     deviceKinde: 3,
//     apiRoute: "GWS-1",
//     requester,
//     requestDateTime
// };

// let sockJs = new SockJS(`${ip}ws?SX-API-Route=GWS-1&clientKeyName=${"bioSignalData"}&connType=${1}`);
// console.log("sockJs:",sockJs);
// function callvak(frame){
//     console.log("asedfasdfas");
//     console.log(frame);
//     stompClient.subscribe("/topic/public/bioSignalData/SEERS_2201251404_IEU0", function(data){
//         const aaa = JSON.parse(data);
//         console.log("aaa===");
//         console.log(aaa);
//     }, (err) => {
//         console.log(err);
//     })
// };

// function connectonError(err){
//     console.log(err)
// };
// let sockJs = new SockJS(``);

// let stompClient = Stomp.over(sockJs);
// console.log("stompClient===");
// console.log(stompClient);
// stompClient.connect(headers, callvak, connectonError);

// const { requester, requestDateTime } = commonRequest();

// let passingParameter = {
//     'SX-Auth-Token': LOGIN_TOKEN,
//     deviceKind: 3,
//     // connType: connType,
//     apiRoute: 'GWS-1',
//     requester
// }

// let streamming = new SockJS(`${ip}ws?SX-API-Route=${'GWS-1'}&clientKeyName=${"bioSignalData"}&connType=${1}`)
// let stompClient = Stomp.over(streamming);
// console.log(stompClient);
// stompClient.connect(passingParameter, callBack, connectonError);
// function callBack(frame){
//     console.log("asedfasdfas");
//     console.log(frame);
//     stompClient.subscribe("/topic/public/bioSignalData/SEERS_2201251404_IEU0", function(data){
//         const aaa = JSON.parse(data);
//         console.log("aaa===");
//         console.log(aaa);
//     }, (err) => {
//         console.log(err);
//     })
// };

// function connectonError(err){
//     console.log(err)
// };
