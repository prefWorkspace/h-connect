// import cookieController from "./cookieController.js";
// import localStorageController from "./localStorageController.js";

// 서버 ip
const ip = "https://www.hconnect-test-api.mobicareconsole.com/mobiCAREConsole/"; 
 
const LOGIN_TOKEN = cookieController.getCookie("accesToken");

// const serverController = {
//   connectFetchController: async ( path, method, body, callBack, errorCallBack) => {
//         return fetch(`${ip}${path}`, {
//             // credentials: "include",
//             method: method,
//             body: body ? body : null,
//             headers: {
//                 "Content-Type": "application/json;charset=UTF-8",
//                 "SX-Auth-Token": LOGIN_TOKEN ? LOGIN_TOKEN : null,
//             }
//         })
//         .then(function (res){
//             return res.json();
//         })
//         .then(function (data){
//             if(callBack) callBack(data);
//             return data;
//         })
//         .catch(function(e){
//             if(errorCallBack) errorCallBack(e);
//         });
//     },
// };

/* jquery ajax */
const serverController = {
    ajaxAwaitController: (path,type,formData,callBack,errorCallBack) => {
        return  $.ajax({
            beforeSend: function (xhr){
                xhr.setRequestHeader("SX-Auth-Token", LOGIN_TOKEN ? LOGIN_TOKEN : null);
            },
            url:`${ip}${path}`,
            type: type,
            data: formData ? formData : null,
            processData: false,
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                if(callBack) callBack(data);
                return data;
            },
            error : function(e){
            if(errorCallBack)
                errorCallBack(e);
                alert("실패하였습니다");
            return null;
            }
        });
    }
};

const session_renew = (res) => {

    if(res.message !== "session_renew") return;

    const req = JSON.stringify({
        requester,
        ...commonRequest()
    });

    serverController.ajaxAwaitController("API/AccountUtil/SessionRenew", "POST", req, (res) => {
        if(res.result){
            cookieController.setCookie("accesToken", res.accessToken, 10 * 365);
            location.reload();
        }
    }, (err) => {console.log(err)})
}

// export default serverController;