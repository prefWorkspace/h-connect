"use strict";

const { deviceKind, requestDateTime, requester } = commonRequest();
const apiRoute = localStorageController.getLocalS("apiserverinfoList") || "GWS-1";


const socket = new WebSocket(`${sockeIp}`/ws?);

// socket.addEventListener("open", function(){
//     console.log("start")
// })