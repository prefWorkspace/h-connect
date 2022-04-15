const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);
const { sessionController } = await import(
    importVersion('/H-Connect/js/utils/controller/sessionController.js')
);
// 서버 ip
export const ip =
    'https://www.hconnect-test-api.mobicareconsole.com/mobiCAREConsole/';
export const sockeIp =
    'wss://www.hconnect-test-api.mobicareconsole.com/mobiCAREConsole';
export const LOGIN_TOKEN = sessionController.getSession('accesToken');

/* jquery ajax */
export const serverController = {
    ajaxAwaitController: (
        path,
        type,
        formData,
        callBack,
        errorCallBack,
        route = null
    ) => {
        return $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader(
                    'SX-Auth-Token',
                    LOGIN_TOKEN ? LOGIN_TOKEN : null
                );

                if (route !== null) {
                    const keys = Object.keys(route);
                    for (let i = 0; i < keys.length; i++) {
                        let key = keys[i];
                        xhr.setRequestHeader(key, route[key]);
                    }
                }
            },
            url: `${ip}${path}`,
            type: type,
            data: formData ? formData : null,
            processData: false,
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                if (data.error === 241) {
                    history.linkTo('/index.html');
                    return alert('세션이 만료되었습니다');
                }
                if (callBack) callBack(data);
                return data;
            },
            error: function (e) {
                if (errorCallBack) errorCallBack(e);
                alert('실패하였습니다');
                return null;
            },
        });
    },
};

export const session_renew = (res) => {
    if (res.message !== 'session_renew') return;

    const req = JSON.stringify({
        requester,
        ...commonRequest(),
    });

    serverController.ajaxAwaitController(
        'API/AccountUtil/SessionRenew',
        'POST',
        req,
        (res) => {
            if (res.result) {
                cookieController.setCookie(
                    'accesToken',
                    res.accessToken,
                    10 * 365
                );
                location.reload();
            }
        },
        (err) => {
            console.log(err);
        }
    );
};
