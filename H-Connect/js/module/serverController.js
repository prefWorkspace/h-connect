import cookieController from "./cookieController.js";
import localStorageController from "./localStorage.js";
// 서버 ip
const ip = "https://www.hconnect-test-api.mobicareconsole.com/mobiCAREConsole/"; 

const LOGIN_TOKEN = cookieController.getCookie("accesToken");

const serverController = {
  connectFetchController: async ( path, method, body, callBack, errorCallBack) => {
        return fetch(`${ip}${path}`, {
            // credentials: "include",
            method: method,
            body: body ? body : null,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "SX-Auth-Token": LOGIN_TOKEN ? LOGIN_TOKEN : null,
            }
        })
        .then(function (res){
            return res.json();
        })
        .then(function (data){
            if(callBack) callBack(data);
            return data;
        })
        .catch(function(e){
            if(errorCallBack) errorCallBack(e);
        });
    },
};

export default serverController;



