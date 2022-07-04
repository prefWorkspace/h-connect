const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);
const { sessionController } = await import(
    importVersion('/H-Connect/js/utils/controller/sessionController.js')
);

const urlObj = {
    DEVELOPMENT: {
        IP: 'https://www.hconnect-test-api.mobicareconsole.com/mobiCAREConsole/',
        SOCKET_IP:
            'wss://www.hconnect-test-api.mobicareconsole.com/mobiCAREConsole',
        CLIENT: [
            '127.0.0.1',
            'localhost',
            'hconnect-test.mobicareconsole.com',
            'doctor.mobicareconsole.com',
        ], // 클라이언트 url 입력
    },
    PRODUCTION: {
        IP: '',
        SOCKET_IP: '',
        CLIENT: ['', ''], // 클라이언트 url 입력
    },
};

// 서버 ip
export const ip = ipBaseUrl('IP');
export const sockeIp = ipBaseUrl('SOCKET_IP');

function ipBaseUrl(_base) {
    // 개발 , 실서버 확인
    const _getHostName = window.location.hostname;
    let resultURL = urlObj?.PRODUCTION[_base];
    for (const [modelKey, modelValue] of Object.entries(urlObj)) {
        modelValue?.CLIENT?.map((_clientIp) => {
            if (_clientIp == _getHostName) {
                resultURL = urlObj[modelKey][_base];
                return;
            }
        });
    }
    return resultURL;
}

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
                    history.linkTo('/');
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

export async function session_renew(res) {
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
                sessionController.setSession('accesToken', res.accessToken);
                location.reload();
            }
        },
        (err) => {
            console.log(err);
        }
    );
}
