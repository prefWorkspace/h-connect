"use strict";

/****************** 사이트별로 변경이 필요한 부분은 수정해서 사용. ***************************************/
let custom = {
    preFileLoading: async function() {
        return new Promise(function(resolve, reject) {
            let loadingEnd = function() {
                resolve(true);
            }
            let options = {
                files: [
                    `https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css${ver_string}`,
                    // `/assets/css/common/bootstrap/bootstrap-3.3.2.min.css${ver_string}`,
                    `/assets/css/theme/${GBL.DESIGN.THEME}/reset.css${ver_string}`,
                    `/assets/css/theme/${GBL.DESIGN.THEME}/common.css${ver_string}`,
                    `/assets/css/theme/${GBL.DESIGN.THEME}/style.css${ver_string}`,
                    `/assets/css/theme/${GBL.DESIGN.THEME}/add.css${ver_string}`,
                    // `/js/socket/sockjs-client/1.5.0/sockjs.js`,
                    // `/js/socket/stomp.js/2.3.3/stomp.js`
                ],
                errorAfterType: "stop",
                callback: loadingEnd
            }
            if(GBL.DEEP_COPY.TYPE === "cloneDeep") {
                options.files.push(`/js/util/lodash/lodash-4.17.21.min.js${ver_string}`)
            }
            let fileLoading = new preFileLoading();
            fileLoading.setInit(options);
            fileLoading.run();
        });
    },
    process: {
        init: function() {
            console.log("custom process - init");
            GBL.DESIGN.SET_SITE_NAME();
            GBL.DESIGN.SET_SITE_META_ALL();

            // 아래 영역에 코드 작성
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            // 자동 로그인 확인.
            // if(GBL.ACCOUNT.IS_AUTH() === false) {
            //     GBL.ACCOUNT.CHECK.AUTO_LOGIN();
            // }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        },
        preForOutOfControllerScope: function() {
            console.log("custom process - preForOutOfControllerScope");

            // 아래 영역에 코드 작성(공통부분)
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            // 디자인에서 직접 선언을 하지 않고, 다른 controller, model, module에서 선언한 이벤트 제거
            for (let i = 0; i < CUSTOM.EVENT.HTML.length; i++) {
                $(`${CUSTOM.EVENT.HTML[i]}`).unbind();
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        },
        postForOutOfControllerScope: function() {
            console.log("custom process - postForOutOfControllerScope");
            GBL.MODULE.IS_LOADING['popup'] = Seers.Loader.moduleLoad("popup", "index");
        },
        pre: function() {
            console.log("custom process - pre");

            // 아래 영역에 코드 작성(공통부분)
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            // 페이지가 바뀔때마다 신규 호출 개수를 조회한다.(향후 스트림으로 처리를 할 지도 모름)
            // 인증이 됐을 경우에만..
            if(GBL.ACCOUNT.IS_AUTH() === true) {
                // custom.preprocess.getUnReadCallCount();
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////

            //메뉴 변경 시 액션 처리 전 처리되어야 할 것들..
            if(GBL.WINDOW_HISTORY_STATE.IS_CHANGE() === true || GBL.WINDOW_HISTORY_STATE.IS_SUB_CHANGE() === true || GBL.WINDOW_HISTORY_STATE.IS_FULL_CHANGE() === true) {
                // 아래 영역에 코드 작성
                ///////////////////////////////////////////////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////////////////////////////////////////////
            }
        },
        post: function() {
            console.log("custom process - post");

            // 아래 영역에 코드 작성(공통부분)
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////

            //메뉴 변경 시 액션 처리 후 처리되어야 할 것들..
            if(GBL.WINDOW_HISTORY_STATE.IS_CHANGE() === true && GBL.WINDOW_HISTORY_STATE.GET_NOW_CONTROLLER() == "patient") {
                // 아래 영역에 코드 작성
                ///////////////////////////////////////////////////////////////////////////////////////////////////////
                // 무조건 세션 리프레시는 초기화
                GBL.SESSION_RENEW.INTERVAL.START = false;
                ///////////////////////////////////////////////////////////////////////////////////////////////////////
            }
        },
        reset: function() {
            console.log("custom process - reset");

            // 아래 영역에 코드 작성
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            localStorage.clear();
            sessionStorage.clear();
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        },
        afterLogin: function(parameters = null) {
            console.log("custom process - afterLogin");

            // 아래 영역에 코드 작성
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            // 반드시 custom/constant.js에 아래 전역변수를 선언해야한다.
            if(parameters !== null) {
                if(CUSTOM.MODULE['socket'].STOMP.CLIENT === null) {
                    let socketModuleParameter = null;
                    if(parameters.hasOwnProperty("loginResponse") === true) {
                        if(parameters.loginResponse.hasOwnProperty("apiServerInfoList") === true) {
                            socketModuleParameter = {
                                objList: parameters.loginResponse.apiServerInfoList
                            }
                        }
                    }
                    GBL.MODULE.IS_LOADING['socket'] = Seers.Loader.moduleLoad("socket", "index", socketModuleParameter);
                }
            }

            if(GBL.SESSION_RENEW.IS_USE === true) {
                setTimeout(custom.sessionRenew, GBL.SESSION_RENEW.INTERVAL.TERM);
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        },
        afterLogout: function() {
            console.log("custom process - post");

            // 아래 영역에 코드 작성
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            if(typeof SOCKET_D3 !== "undefined") {
                SOCKET_D3.CHART.setAllDataInit("all");
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        },
        error: function() {
            console.log("custom process - post");

            // 아래 영역에 코드 작성
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            // 다르게 처리를 원할 경우 아래 내용을 주석처리 후 추가
            Seers.Loader.directControllerLoad("error", "viewForErrorPage");
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        },
        sessionStorageInit: function() {
            console.log("custom process - sessionStorageInit");

            // 아래 영역에 코드 작성
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            // 새로고침을 하면 기존 session 스토리지 값을 모두 초기화한다.
            // 특정 항목을 남기려면, 아래 내용을 주석 처리하고, 새 코드를 작성한다.
            sessionStorage.clear();
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        }
    },
    etc: {
        // 아래 영역에 코드 작성
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        decimalToHexadecimal : function(value, notation = 16) {
            let number = (`000${value.toString(notation)}`).slice(-5);
            return `${number.slice(0,1).toUpperCase()}:${number.slice(1,3).toUpperCase()}:${number.slice(-2).toUpperCase()}`;
        },
        getMacaddress : function(type = CUSTOM.DEVICE.TYPE.CODE.ECG, value) {
            if(type == CUSTOM.DEVICE.TYPE.CODE.ECG) {
                return `${CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.ECG}${custom.etc.decimalToHexadecimal(value)}`;
            }
            else if(type == CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE) {
                return `${CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.TEMPERATURE}${custom.etc.decimalToHexadecimal(value)}`;
            }
            else if(type == CUSTOM.DEVICE.TYPE.CODE.TAG) {
                return `${CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.TAG}${custom.etc.decimalToHexadecimal(value)}`;
            }
            return CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.SPO2
        },
        showGateway: function() {
            let gatewayShowId = ["zaid", "franklin"];
            let showGateway = function() {
                for(let i = 0; i < gatewayShowId.length; i++) {
                    if(GBL.ACCOUNT.INFO.id.indexOf(gatewayShowId[i]) !== -1) {
                        return true;
                    }
                }
                return false;
            }
            if(GBL.ACCOUNT.INFO.isZaid === true || (showGateway() && GBL.ACCOUNT.INFO.organizationCode === "SEERS")) {
                if(showGateway() && GBL.ACCOUNT.INFO.organizationCode === "SEERS") {
                    $('#contentsBySubMenuGateway').show();
                    $('#btn_new_firmware').show();
                }
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    },

    request: {
        // etcParams = {isFormData: false} // 계속 추가됨
        api: function(url, parameter, onSuccessFunc = null, onSuccessParams = null, header = null, etcParams = {isFormData: false}) {
            // fake 여부 확인해서 처리
            let fakeApi = false;
            if(typeof GBL.API.FAKE[url] !== "undefined") {
                fakeApi = GBL.API.FAKE[url];
            }
            if(fakeApi === true) {
                return custom.request.fake(url, parameter, onSuccessFunc, onSuccessParams);
            }
            else {
                // 에러 처리는 따로 파라미터로 받지 않고, 공통 처리한다.
                let errorFunction = function(data) {
                    // ajax success 에서의 에러 처리
                    if(data.hasOwnProperty("error") === true) {
                        // 로그인 화면으로 이동..
                        if(data.error == GBL.API.RESPONSE.CODE.SESSION_CLOSED) {
                            // alert(log);
                            Seers.Loader.goMove("seers", "login");
                            return;
                        }
                        if(GBL.SITE_MENU.CHOICE_CONTROLLER != "login") {
                            sessionStorage.setItem("error", JSON.stringify(data));
                            Seers.Loader.directControllerLoad("error", "viewForErrorPage");
                        }
                        else {
                            let msg = GBL.ACCOUNT.CHECK.LOGIN_FAIL.GET_MESSAGE(data.message);
                            Seers.Loader.moduleLoad("alert", "index", {msg: msg, id: "alert"});
                        }
                    }

                    // ajax error 에서의 에러 처리
                    else {
                        let error = JSON.parse(data.responseText);
                        if(error.status === 404) {}
                        sessionStorage.setItem("error", JSON.stringify(data.responseText));
                        Seers.Loader.directControllerLoad("error", "viewForErrorPage");
                    }
                }
                let req = new requestAPI();
                let defaultParams = custom.request.getDefaultParam(true, parameter);
                let params = null;
                let isFormData = false;
                if(etcParams.hasOwnProperty("isFormData") === true) {
                    isFormData = etcParams.isFormData;
                }
                if(isFormData === true) {
                    params = new FormData();
                    params.append('requestUserCode', parameter.requestUserCode);
                    if(parameter.hasOwnProperty("organizationCode") === true) {
                        params.append('organizationCode', parameter.organizationCode);
                    }
                    params.append('fwVersion', parameter.fwVersion);
                    params.append('checkSum', parameter.checkSum);
                    params.append('level', parameter.level);
                    params.append('etc', parameter.etc);
                    params.append('file', parameter.file);
                    params.append('fileName', parameter.fileName);
                    for (const [key, value] of Object.entries(defaultParams)) {
                        params.append(key, value);
                    }
                }
                else {
                    params = Object.assign(defaultParams, parameter);
                }

                if(onSuccessFunc == null) {
                    req.setAsync(false);
                }
                if(onSuccessParams != null) {
                    req.setSuccessParameters(onSuccessParams);
                }
                req.setErrorFunction(errorFunction);

                if(header != null) {
                    req.setHeader(header);
                }
                else {
                    req.setHeader({
                        "Content-Type": "application/json;charset=UTF-8",
                        'SX-Auth-Token': GBL.ACCOUNT.TOKEN,
                        'SX-Client-IP': null
                    });
                }

                if(url.indexOf("http") == -1) {
                    req.setUrl(GBL.API.BASE_URL + url);
                }
                else {
                    req.setUrl(url);
                }
                req.setParameter(params);
                return req.API(onSuccessFunc, {isFormData: isFormData});
            }
        },
        fake: function(url, parameter, onSuccessFunc = null, onSuccessParams = null) {
            let fakeAsyncFunction = async function() {
                onSuccessFunc(Object.assign({}, {result: true}, FAKE_API_JSON[url]), parameter, onSuccessParams);
                return true;
            }

            if(onSuccessFunc !== null) {
                fakeAsyncFunction();
            }
            else {
                return Object.assign({}, {result: true}, FAKE_API_JSON[url]);
            }
            return true;
        },

        getDefaultParam: function(authNotInclude = false, parameter = {}) {
            let params = {};
            let date = new Date();

            if(GBL.ACCOUNT.INFO !== null) {
                if(parameter.hasOwnProperty("requester") === false) {
                    params.requester = GBL.ACCOUNT.INFO.userCode;
                }
                if(parameter.hasOwnProperty("organizationCode") === false) {
                    params.organizationCode = GBL.ACCOUNT.INFO.organizationCode;
                }
            }
            if(authNotInclude === false) {
                params.requester = null;
                params.organizationCode = null;
            }

            params.deviceKind = custom.request.getDeviceKindCode();
            params.timezone =  "Asia/Seoul";
            params.gmtCode = 'GMT' + date.getUTCOffset();
            params.requestDateTime = date.toString('yyyy-MM-dd HH:mm:ss');
            params.systemTime = date.getTime();
            params.countryCode = "Ko";
            params.countryName = "Korea";

            return params;
        },
        getDeviceKindCode: function() {
            return 3
        }
    },

    preprocess: {
        getUnReadCallCount: function() {
            let resultFunction = function(response, obj) {
                $('[data-content-name="unReadCallCount"]').hide();
                if(response.result === true) {
                    if(response.count > 0) {
                        $('[data-content-name="unReadCallCount"]').text(response.count);
                        $('[data-content-name="unReadCallCount"]').show();
                    }
                }
            }

            // 호출 데이타 조회
            let passingParams = {
                requester: GBL.ACCOUNT.INFO.userCode
            }
            custom.request.api(GBL.API.URL.CALL.SelectUnReadCount, passingParams, resultFunction);
        },
        parentClassChange: function(choiceClass = null) {
            $(`${GBL.DESIGN.PAGE_PARENT_DIV_NAME}`).attr("class", choiceClass);
        },
        headerInfoChange: function(title = null, info = null) {
            $(`#headerTitle`).text(title);
            $(`#headerInfo`).text(info);
        }
    },

    sessionRenew: function() {
        let successSessionRenew = function(response) {
            if(response.result === true) {
                CookieHelper.set('userAccount', CookieHelper.get('userAccount'), null);
                CookieHelper.set('accessToken', response.accessToken, null);
                GBL.ACCOUNT.TOKEN = response.accessToken;
                GBL.SESSION_RENEW.INTERVAL.START = true;
                setTimeout(custom.sessionRenew, GBL.SESSION_RENEW.INTERVAL.TERM);
            }
        }
        custom.request.api(GBL.API.URL.ACCOUNT.UTIL.SESSION_RENEW, {}, successSessionRenew);
    }
}