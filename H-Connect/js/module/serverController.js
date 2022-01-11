// 서버 ip
const ip = "https://www.hconnect-test-api.mobicareconsole.com/mobiCAREConsole/"; 

const LOGIN_TOKEN = "";

const serverController = {
  connectFetchController: async ( path, method, body, callBack, errorCallBack) => {
        return fetch(`${ip}${path}`, {
            // credentials: "include",
            method: method,
            body: body ? body : null,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "sx-auth-token": null,
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



