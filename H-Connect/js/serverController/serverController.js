// 서버 ip
const ip = "http://www.hconnect-test-api.mobicareconsole.com/mobiCAREConsole/"; 


const serverController = {
  connectFetchController: async (
    path,
    method,
    body,
    callBack,
    errorCallBack
    ) => {
        return fetch(`${ip}${path}`, {
            credentials: "include",
            method: method,
            body: body ? body : null,
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(function (res) {
            console.log(res)
            return res.json();
        })
        .then(function (data) {
            if (callBack) callBack(data);
            return data;
        })
        .catch(function (e) {
            if (errorCallBack) errorCallBack(e);
        });
    },
};

export default serverController;



