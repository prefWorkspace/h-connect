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