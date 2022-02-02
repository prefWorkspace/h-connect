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



const { requester, requestDateTime } = commonRequest();


const headers = {
    "SX-Auth-Token": `${LOGIN_TOKEN}`,
    deviceKinde: 3,
    apiRoute: "GWS-1",
    requester, 
    requestDateTime
};
// `${ip}ws?SX-API-Route=${"GWS-1"}&SX-Auth-Token=${LOGIN_TOKEN}&deviceKind=${3}&requester=${requester}&requestDateTime=${requestDateTime}`
let sockJs = new SockJS(`${ip}ws`);

let stompClient = Stomp.over(sockJs);

stompClient.connect(headers, function(frame){
    stompClient.subscribe("/topic/public/bioSignalData/SEERS_2201251404_IEU0/", function(data){
        const aaa = JSON.parse(data);
        console.log("aaa===");
        console.log(aaa);
    }, (err) => {
        console.log(err)
    })
})
