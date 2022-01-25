"use strict";

const { deviceKind, requestDateTime, requester } = commonRequest();
const apiRoute = localStorageController.getLocalS("apiserverinfoList") || "GWS-1";
const SOCKET_URL = `${sockeIp}/ws?SX-Auth-Token=${LOGIN_TOKEN}&device=${deviceKind}&apiRoute=${apiRoute}&requester=${requester}&requestDateTime=${requestDateTime}`

const socket = new WebSocket(SOCKET_URL);


//서버 통신 시작했을 때,
socket.addEventListener("open", function(){
    
})

//