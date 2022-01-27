"use strict";

/****************** 사이트별로 변경이 필요한 부분은 수정해서 사용. ***************************************/
GBL.DEBUG.USE = true;
GBL.DEEP_COPY.TYPE = "cloneDeep";
GBL.SESSION_RENEW.IS_USE = true;
GBL.SESSION_RENEW.INTERVAL.TERM = 1000 * 60 * 60; //1000 * 60 * 60;
GBL.ACCOUNT.AFTER_LOGIN_URL = "/ward/index";
GBL.ACCOUNT.IS_AUTH = function(loginMove = false) {
    if(GBL.ACCOUNT.TOKEN == null) {
        if(typeof CookieHelper.get('accessToken') != "undefined") {
            GBL.ACCOUNT.REFRESH_SET();
            GBL.ACCOUNT.CHECK.RUN();
            return true;
        }
    }
    else {
        GBL.ACCOUNT.CHECK.RUN();
        return true;
    }
    GBL.ACCOUNT.CHECK.INTERVAL.INIT();
    if(loginMove === true) {
        Seers.Loader.goMove("seers", "login");
    }
    return false;
}
GBL.ACCOUNT.IS_AUTH_CHECK = function() {
    GBL.ACCOUNT.CHECK.INTERVAL.OBJ = setInterval(function() {
        if(GBL.ACCOUNT.IS_AUTH() === false) {
            Seers.Loader.goMove("seers", "login");
            window.clearInterval(GBL.ACCOUNT.CHECK.INTERVAL.OBJ);
            GBL.ACCOUNT.CHECK.INTERVAL.OBJ = null;
        }
    }, GBL.ACCOUNT.CHECK.INTERVAL.TERM);
}
GBL.ACCOUNT.SET = function(response = null) {
    if(response == null) {
        GBL.ACCOUNT.INFO = null;
        GBL.ACCOUNT.TOKEN = null;
        GBL.ACCOUNT.CHECK.INTERVAL.INIT();
        CookieHelper.remove('userAccount');
        CookieHelper.remove('accessToken');
    }
    else {
        GBL.ACCOUNT.INFO = response.userAccount;
        GBL.ACCOUNT.INFO.isZaid = false;
        if(GBL.ACCOUNT.INFO.id.indexOf("zaid") !== -1) {
            GBL.ACCOUNT.INFO.isZaid = true;
        }
        GBL.ACCOUNT.TOKEN = response.accessToken;

        CookieHelper.set('userAccount', JSON.stringify(response.userAccount), null);
        CookieHelper.set('accessToken', response.accessToken, null);

    }
}
GBL.ACCOUNT.REFRESH_SET = function() {
    if(CookieHelper.get('accessToken') != undefined && CookieHelper.get('userAccount') != undefined) {
        GBL.ACCOUNT.INFO = JSON.parse(CookieHelper.get('userAccount'));
        GBL.ACCOUNT.TOKEN = CookieHelper.get('accessToken');
    }
}
GBL.ACCOUNT.CHECK.RUN = function() {
    if(GBL.ACCOUNT.CHECK.INTERVAL.OBJ == null) {
        console.log("GBL.ACCOUNT.CHECK.INTERVAL.OBJ");
        GBL.ACCOUNT.IS_AUTH_CHECK();
    }
}
GBL.DESIGN.THEME = "hconnect";
GBL.DESIGN.PAGE_DIV_NAME = "#main-contents";
GBL.DESIGN.PAGE_PARENT_DIV_NAME = "#wrap_content";
GBL.DESIGN.HEADER_NAME = "#page-header";
GBL.DESIGN.SIDE_MENU_NAME = "#side-menu";
GBL.DESIGN.APP_VER_DIV_NAME = ".login_container";
GBL.DESIGN.LAYOUT.IGNORE_CONTROLLER_NAMES = ["login", "error", "logout", "fullMonitoring", "fullMonitoringNew2"];
GBL.DESIGN.DEFAULT_CONTROLLER = "ward";
GBL.DESIGN.APP_EXPLAIN_CONFIRM = true; // 최종 설치 여부..
GBL.DESIGN.SITE_META.NAME = "H-Connect";
GBL.DESIGN.SITE_META.TYPE = "H-Connect";
GBL.DESIGN.SITE_META.TITLE = "H-Connect";
GBL.DESIGN.SITE_META.DESCRIPTION =  "H-Connect";
GBL.DESIGN.SITE_META.KEYWORDS = "H-Connect";
GBL.DESIGN.SITE_META.AUTHOR = "H-Connect";
GBL.DESIGN.SITE_META.IMAGE = null;
GBL.DESIGN.SITE_META.IMAGE_WIDTH = null;
GBL.DESIGN.SITE_META.IMAGE_HEIGHT = null;
GBL.DESIGN.SITE_META.URL = null;
GBL.DESIGN.SELECT_MENU = function(controller, addParams = {}) {
    // 아래 주석 참고하여 직접 구현
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // let selector = null;
    // if(addParams.hasOwnProperty("selector") === true) {
    //     selector = addParams.selector;
    // }
    // if(selector !== null) {
    //     $(`${selector}`).each(
    //         function(index, item) {
    //             let obj = $(item);
    //             let objInfo = obj.data("info");
    //             let objInfoDatas = objInfo.datas;
    //             if(objInfoDatas.indexOf(controller) != -1) {
    //                 obj.removeClass('off');
    //                 obj.removeClass('on').addClass('on');
    //             }
    //             else {
    //                 obj.removeClass('on');
    //                 obj.removeClass('off').addClass('off');
    //             }
    //         }
    //     );
    // }
    // 직접 구현
    let selector = null;
    if(addParams.hasOwnProperty("selector") === true) {
        selector = addParams.selector;
    }
    else {
        selector = `${GBL.DESIGN.SIDE_MENU_NAME} > li`;
    }
    if(selector !== null) {
        $(`${selector}`).each(
            function (index, item) {
                let obj = $(item);
                let objInfo = obj.data("info");
                let objInfoDatas = objInfo.datas;
                if (objInfoDatas.indexOf(controller) != -1) {
                    obj.removeClass('off');
                    obj.removeClass('on').addClass('on');
                } else {
                    obj.removeClass('on');
                    obj.removeClass('off').addClass('off');
                }
            }
        );
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

GBL.PAGING.DATA.PAGE.PER_COUNT = 10;
GBL.PAGING.DATA.PAGE.PER_PAGE = 10;
GBL.API.FAKE = false; // true/false: true로 설정시 fake_api_json_.js를 init에 넣어 로딩한다. 이후 false면 다시 삭제한다.
GBL.API.URL = {
    ACCOUNT: {
        LOGIN: "/Account/Login",
        LOGOUT: "/Account/Logout"
    },

    // 추가 내용 정리
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
};
GBL.API.RESPONSE.CODE = {
    SUCCESS: 0x0000,
    INVALID_PARAMETER: 0x0001,
    DATABASE_ERROR: 0x0002,
    ACCOUNT_INFO_FAIL: 0x0003,
    AUTHORITY_ERROR: 0x0004,
    INCORRECT_DATA: 0x0005,
    SESSION_CLOSED: 0x00F1,
};
// GBL.API.SET_BASE_URL = function() {
//     if((location.hostname.indexOf('seers') != -1 || location.hostname.indexOf('13.209.51.114') != -1) && location.hostname.indexOf('test') == -1) {
//         console.log('############################## custom - 운영 서버');
//         GBL.API.BASE_URL = "https://www.apirelease.seers-pet.com/mobiCAREPet/API";   // release
//     }
//     else {
//         console.log('############################## custom - 테스트 서버');
//         GBL.API.BASE_URL = "https://www.apitest.seers-pet.com/mobiCAREPet/API";   // test
//     }
// }
GBL.API.SET_BASE_URL = function() {
    console.log("GBL.API.SET_BASE_URL = function() {:::::::::::::::::");
    if((location.hostname.indexOf('seers') != -1 || location.hostname.indexOf('13.209.51.114') != -1) && location.hostname.indexOf('test') == -1) {
        console.log('############################## custom - 운영 서버');
        GBL.API.BASE_URL = "https://www.smarter-release-api.mobicareconsole.com/mobiCAREConsole/API";   // release
    }
    else {
        console.log('############################## custom - 테스트 서버');
        GBL.API.BASE_URL = "https://www.smarter-release-api.mobicareconsole.com/mobiCAREConsole/API";   // test
    }
}

// GBL.API.URL = {
//     ACCOUNT: {
//         // LOGIN: "/Account/Login",
//         LOGIN: "https://07619642-3076-4c0d-9333-4bc8f4d94f8b.mock.pstmn.io/login",
//         AUTO_LOGIN: "https://07619642-3076-4c0d-9333-4bc8f4d94f8b.mock.pstmn.io/autoLogin",
//         // LOGOUT: "/Account/Logout"
//         LOGOUT: "https://07619642-3076-4c0d-9333-4bc8f4d94f8b.mock.pstmn.io/logout",
//         FindPassword: "https://07619642-3076-4c0d-9333-4bc8f4d94f8b.mock.pstmn.io/findPassword"
//     },
//     ALARM: {
//         SelectAlarmPage: "https://07619642-3076-4c0d-9333-4bc8f4d94f8b.mock.pstmn.io/SelectAlarmPage",
//         SelectAlarmDetail: "https://07619642-3076-4c0d-9333-4bc8f4d94f8b.mock.pstmn.io/SelectAlarmDetail",
//     },
//     CALL: {
//         SelectCallPage: "https://07619642-3076-4c0d-9333-4bc8f4d94f8b.mock.pstmn.io/SelectCallPage",
//         SelectUnReadCount: "https://07619642-3076-4c0d-9333-4bc8f4d94f8b.mock.pstmn.io/SelectUnReadCount",
//     }
// };
GBL.API.URL = {
    // ACCOUNT: {
    //     // LOGIN: "/Account/Login",
    //     LOGIN: "https://www.apitest.seers-pet.com/mobiCAREPet/API/Account/Login",
    //     AUTO_LOGIN: "http://w8g29.mocklab.io/autoLogin",
    //     // LOGOUT: "/Account/Logout"
    //     LOGOUT: "https://www.apitest.seers-pet.com/mobiCAREPet/API/Account/Logout",
    //     FindPassword: "http://w8g29.mocklab.io/findPassword"
    // },
    // ALARM: {
    //     SelectAlarmPage: "http://w8g29.mocklab.io/SelectAlarmPage",
    //     SelectAlarmDetail: "http://w8g29.mocklab.io/SelectAlarmDetail",
    // },
    // CALL: {
    //     SelectCallPage: "http://w8g29.mocklab.io/SelectCallPage",
    //     SelectUnReadCount: "http://w8g29.mocklab.io/SelectUnReadCount",
    // },

    SERVER: {
        STREAM_LIST: "/Server/SelectAPIServer"
    },
    ACCOUNT: {
        LOGIN: "/Account/Login",
        LOGOUT: "/Account/Logout",
        // UpdateAccount: '/Manager/UpdateAccount',
        // SelectAccountDetail: '/Manager/SelectAccountDetail',
        // UpdatePassword: '/Manager/UpdatePassword',
        UTIL: {
            SESSION_RENEW: "/AccountUtil/SessionRenew"
        }
    },
    MANAGER: {
        WARD: {
            SELECT: "/Manager/SelectWard",
            INSERT: "/Manager/InsertWard",
            UPDATE: "/Manager/UpdateWard",
            DELETE: "/Manager/DeleteWard",
        },
        SICK_ROOM: {
            SELECT: "/Manager/SelectSickRoom",
            INSERT: "/Manager/InsertSickRoom",
            UPDATE: "/Manager/UpdateSickRoom",
            DELETE: "/Manager/DeleteSickRoom",
        },
        SICK_BED: {
            SELECT: "/Manager/SelectSickBed",
            INSERT: "/Manager/InsertSickBed",
            UPDATE: "/Manager/UpdateSickBed",
            DELETE: "/Manager/deleteMeasurementInfo",
        },
        GATEWAY: {
            SELECT: "/Manager/SelectGatewayInfoPage",
            DETAIL: "/Manager/SelectGatewayInfo",
            INSERT: "/Manager/InsertGatewayInfo",
            UPDATE: "/Manager/UpdateGatewayInfo",
            DELETE: "/Manager/DeleteGatewayInfo",
        },
        FIRMWARE: {
            SELECT: "/Manager/SelectGatewayFwInfoPage",
            DETAIL: "/Manager/SelectGatewayFwInfo",
            INSERT: "/Manager/InsertGatewayFwInfo",
            DELETE: "/Manager/DeleteGatewayFwInfo",
        },
        ORGANIZATION: {
            SELECT: "/Manager/SelectOrganizationSimplePage"
        }
    },
    MEASUREMENT: {
        SELECT_MEASUREMENT_INFO_PAGE: "/Measurement/SelectMeasurementInfoPage",
        SELECT_MEASUREMENT_INFO_LIST: "/Measurement/SelectMeasurementInfoList",
        SELECT_MEASUREMENT_INFO_DETAIL: "/Measurement/SelectMeasurementInfoDetail",
        INSERT_MEASUREMENT_INFO: "/Measurement/InsertMeasurementInfo",
        DELETE_MEASUREMENT_INFO: "/Measurement/DeleteMeasurementInfo",
        UPDATE_MEASUREMENT_INFO: "/Measurement/UpdateMeasurementInfo",
        UPDATE_MEASUREMENT_INFO_STATUS: "/Measurement/UpdateMeasurementInfoStatus",
        INSERT_MEASUREMENT_INSERT_DEVICE_INFO: "/Measurement/InsertDeviceInfo",
        INSERT_MEASUREMENT_UPDATE_DEVICE_INFO: "/Measurement/UpdateDeviceInfo",
        INSERT_MEASUREMENT_DELETE_DEVICE_INFO: "/Measurement/DeleteDeviceInfo",
        SELECT_INTEGRATED_DATA_INFO_LIST: "/Measurement/SelectIntegratedDataInfoList",
        SELECT_INTEGRATED_DATA_INFO_PAGE: "/Measurement/SelectIntegratedDataInfoPage",
        SELECT_INTEGRATED_DATA_INFO_DETAIL: "/Measurement/SelectIntegratedDataInfoDetail",
        SELECT_ACTIVITY_LEVEL_LIST: "/Measurement/SelectActivityLevelList",
        SELECT_HEART_RATE_LIST: "/Measurement/SelectHeartRateList",
        SELECT_EWS_LIST: "/Measurement/SelectEwsList",
        SELECT_TEMPERATURE_LIST: "/Measurement/SelectTemperatureList",
        SELECT_SPO2_LIST: "/Measurement/SelectSpO2List",
        SELECT_RESP_LIST: "/Measurement/SelectRespList",
        SELECT_DEVICE_LAST_DATA: "/Measurement/SelectDeviceLastData"
    },
    DEVICE: {
        SELECT: "/Device/SelectDeviceRegisterPage",
        UNUSED_SELECT: "/Device/SelectDeviceRegisterUnusedPage",
        INSERT: "/Device/InsertDeviceRegister",
        UPDATE: "/Device/UpdateDeviceRegister",
        DELETE: "/Device/DeleteDeviceRegister",
    },
};


// 아래 영역에 custom 함수 재정의, 전역 변수 코드 작성
// 예시
// CUSTOM.CHART = {
//     IS_USE: true
// }
// GBL.API.FAKE[GBL.API.URL.ACCOUNT.LOGIN] = true; // true/false: true로 설정시 fake_api_json_.js를 init에 넣어 로딩한다. 이후 필요없을때 주석처리 또는 삭제
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 로그인시 아이디기억, 자동로그인 여부 값 쿠키 기간
GBL.ACCOUNT.CHECK.COOKIE = {
    TERM: {
        REMEMBER_ID: 30, // days
        AUTO_LOGIN: 365
    }
}
GBL.ACCOUNT.CHECK.LOGIN_FAIL = {
    TYPE: "normal", // normal(실패만 알려줌), detail(자세히 알려줌)
    CODE: { // 아래 문구가 포함되는 걸 찾는다.
        NULL: "Account is null",
        INCORRECT: "The password is incorrect",
        BOTH: []
    },
    MESSAGE: {
        NULL: "계정이 존재하지 않습니다. 아이디와 비밀번호를 정확하게 입력하세요.",
        INCORRECT: "비밀번호가 정확하지 않습니다. 비밀번호를 정확하게 입력하세요.",
        BOTH: null
    },
    GET_MESSAGE: function(code) {
        let msg = GBL.ACCOUNT.CHECK.LOGIN_FAIL.MESSAGE.BOTH;
        if(GBL.ACCOUNT.CHECK.LOGIN_FAIL.TYPE === "detail") {
            if(code.indexOf(GBL.ACCOUNT.CHECK.LOGIN_FAIL.CODE.NULL) !== -1) {
                msg = GBL.ACCOUNT.CHECK.LOGIN_FAIL.MESSAGE.NULL;
            }
            else if(code.indexOf(GBL.ACCOUNT.CHECK.LOGIN_FAIL.CODE.INCORRECT) !== -1) {
                msg = GBL.ACCOUNT.CHECK.LOGIN_FAIL.MESSAGE.INCORRECT;
            }
        }
        return msg;
    }
}
GBL.ACCOUNT.CHECK.LOGIN_FAIL.CODE.BOTH.push(GBL.ACCOUNT.CHECK.LOGIN_FAIL.CODE.NULL);
GBL.ACCOUNT.CHECK.LOGIN_FAIL.CODE.BOTH.push(GBL.ACCOUNT.CHECK.LOGIN_FAIL.CODE.INCORRECT);
GBL.ACCOUNT.CHECK.LOGIN_FAIL.MESSAGE.BOTH = "로그인에 실패하였습니다. 아이디와 비밀번호를 정확하게 입력하세요.";

CUSTOM.REFRESH = {
    ECG: {
        INTERVAL: {
            OBJ: {},
            TERM: 1000 * 60 * 5
        }
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
GBL.SITE_MENU.URL =  {
    PATIENT_LIST: "/patient/index",
    PATIENT_VIEW: "/patient/view",
};

// 소켓통신 + 실시간 챠트 처리시 추가 전역 변수
CUSTOM.DEVICE = {
    TYPE: {
        CODE: {
            ECG: 1,
            TEMPERATURE: 2,
            SPO2: 3,
            HEARTRATE: 4,
            TAG: 8,
            DEVICE_STATUS: 9
        },
        STR: {
            ECG: "ECG",
            TEMPERATURE: "TEMPERATURE",
            TEMP: "TEMP",
            TAG: "TAG"
        },
        PREFIX_ADDRESS: {
            ECG: "08:D5:C0:5",
            TEMPERATURE: "08:D5:C0:6",
            SPO2: "00:1C:05:FF:3A:CC",
            TAG: "08:D5:C0:1"
        },
        TITLE: {}
    },
    STATUS: {
        CODE: {
            NONE: 0,
            RECODING_START: 1,
            BLE_CONNECTED: 2,
            LEAD_ON: 3,
            LEAD_OFF: 4,
            BLE_DISCONNECTED: 5,
            RECORDING_STOP: 6,
            RECORDING_FORCE_STOP: 7,
            DEFAULT: 99
        },
        STR: {
            0: "NONE",
            1: "Recording Start",
            2: "Connect",//"BLE Connected",
            3: "LEAD ON",
            4: "LEAD OFF",
            5: "Disconnect",//"BLE Disconnected",
            6: "Recording Stop",
            7: "Recording Force Stop",
            99: "-"
        }
    },
    DATA: {
        TYPE: {
            CODE: {
                ACT: 1,
                HEART: 2,
                EWS: 16,
                TEMPERATURE: 32,
                SPO2: 48
            },
            STR: []
        }
    },
}
Object.keys(CUSTOM.DEVICE.DATA.TYPE.CODE).forEach(function(v){
    let value = v;
    if(v == "TEMPERATURE") {
        value = "TEMP"
    }
    CUSTOM.DEVICE.DATA.TYPE.STR[CUSTOM.DEVICE.DATA.TYPE.CODE[v]] = value;
})
CUSTOM.DEVICE.TYPE.TITLE[CUSTOM.DEVICE.TYPE.CODE.ECG] = "심전도패치";
CUSTOM.DEVICE.TYPE.TITLE[CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE] = "체온패치";
CUSTOM.DEVICE.TYPE.TITLE[CUSTOM.DEVICE.TYPE.CODE.SPO2] = "산소포화도";
CUSTOM.DEVICE.TYPE.TITLE[CUSTOM.DEVICE.TYPE.CODE.TAG] = "위치태그";




CUSTOM.MEASUREMENT = {
    STATUS: {
        CODE: {
            NONE: 0,
            WAITING: 1,
            RECODING_START: 2,
            RECODING_END: 3,
            COMPLETED: 8,
            DELETE: 10
        },
        TITLE: {}
    },
    STATUS_TITLE: {},
    RESPONSE: null,
    SET_INIT: function() {
        CUSTOM.MEASUREMENT.RESPONSE = null;
    },
    ROOM_NUMBER: "101"
};
CUSTOM.MEASUREMENT.STATUS.TITLE[CUSTOM.MEASUREMENT.STATUS.CODE.WAITING] = "대기";
CUSTOM.MEASUREMENT.STATUS.TITLE[CUSTOM.MEASUREMENT.STATUS.CODE.RECODING_START] = "측정중";
CUSTOM.MEASUREMENT.STATUS.TITLE[CUSTOM.MEASUREMENT.STATUS.CODE.RECODING_END] = "완료";
CUSTOM.MEASUREMENT.STATUS.TITLE[CUSTOM.MEASUREMENT.STATUS.CODE.COMPLETED] = "종료";
CUSTOM.CHART = {
    IS_USE: true,
    IS_DEVEL: true,
    LOG: {
        IS_USE: false
    },
    REAL_TIME: {
        IS_USE: true
    },
    STACK: {
        IS_USE: true
    },
    WARNNING: {
        INFO: {
            EWS: {
                score: 3
            },
            DEVICE_MESSAGE: "LEAD OFF, DISCONNECTED",
        }
    },
    RUN_TIME: {
        start: null,
        end: null
    },

    CONFIG: {
        ECG: {
            use: true,
            setInitChartDataFunctionName: "setInitChartDataForD3",
            getChartDataFunctionName: "getInitChartDataForD3",
            initFunctionName: "setInitChartDatas", // 원래 함수 setInitEcgDatas
            getFunctionName: "getChartDatasForReverse2", // 원래 함수 getEcgDatas,,,, getChartDatas or getChartDatasForReverse
            deviceType: CUSTOM.DEVICE.TYPE.CODE.ECG,
            receiveVariable: "ecgDataList",
            viewInfo: {
                'list': {
                    'valueId': null,
                    'chartId': "ECG_chart_{measurementCode}"
                },
                'detail': {
                    'valueId': null,
                    'maxValueId': null,
                    'minValueId': null,
                    'chartId': "ecgChart_{measurementCode}",
                },
                'chartColor': "#74DF00"
            },
            data: {
                receiveDevel: {},
                receiveOrigin: {},
                chart: {}, //실제 차트에 쓰일 데이타
                chartBack: {}, //한바퀴가 돌고, 뒤에 데이타가 남아져있는 효과를 위한 이전 텀의 데이타
                chartStack: {}, //인터벌을 똘때마다 현재 데이타를 쌓은 임시 데이타
                listSecond: 4,
                viewSecond: 10,
                listCount: 512,
                viewCount: 1280,
                breakValue: null,
                breakValueBackDataUse: false, // 누락된 데이탁 있을 경우 바로 전 데이타의 값으로 처리 여부
                reverseCount: {},
                edgeEffectCount: 16,
                baseData: {
                    use: {
                        list: false,
                        view: false
                    },
                    term: {
                        list: {
                            startDateTime: null,
                        },
                        view: {
                            startDateTime: null,
                        },
                        endDateTime: null,
                    },
                    latestCheckTerm: 3 //초
                }
            },
            minmax: {
                min: 0,
                max: 0
            },
            // second 로 그래프를 처리할때 변수
            interval: {
                dataTerm: 1000 / 128, // 초, 데이타 사이의 간격, 1000을 더 나눠야 하는데, 계산시 처리에 문제가 있어서 그 부분은 실제 적용시 처리
                term: 50, //밀리초, setInterval에 사용
                socketReceiveTerm: 3,
                perSocketReceiveTermDataCount: 384,
                newProcessTerm: {},
                processTerm: 0.05,
                doubleProcessTerm: 0.125,
                correct: {
                    normal: 0.66,
                    min: 0.33,
                    max: 0.34
                },
                proceedTime: {},
                obj: {},
                first: {},
                socketReceiveDelay: {}
            },
            chartMinmax: {
                minimum: 1800,
                maximum: 2600
            },
            chartRealtime: false,
            chartConnect: false,
            chartObject: {},
            correct: {
                seconds: 0.0001
            },
            chartOption: {
                fill: "none",
                stroke_width: 1,
                stroke_color: "#74DF00",
                sensitivity: {
                    default: { // 표준감도 범위 4mV
                        min: -1,
                        max: +3
                    }
                }
            }
        },

        HEART: {
            use: true,
            setInitChartDataFunctionName: "setInitChartDataForD3",
            getChartDataFunctionName: "getInitChartDataForD3",
            initFunctionName: "setInitChartDatas",
            getFunctionName: "getChartDatasForReverse2", // getChartDatas or getChartDatasForReverse
            deviceType: CUSTOM.DEVICE.TYPE.CODE.ECG,
            receiveVariable: "heartRateDataList",
            viewInfo: {
                'list': {
                    'valueId': "HEART_value_{measurementCode}",
                    'chartId': null
                },
                'detail': {
                    'valueId': "hrVal_{measurementCode}",
                    'maxValueId': "hrMax_{measurementCode}",
                    'minValueId': "hrMin_{measurementCode}",
                    'chartId': "hrChart_{measurementCode}",
                },
                'chartColor': "#8F70CE"
            },
            data: {
                receiveDevel: {},
                receiveOrigin: {},
                chart: {},
                chartBack: {},
                chartStack: {}, //인터벌을 똘때마다 현재 데이타를 쌓은 임시 데이타
                listSecond: 60,
                viewSecond: 3600,
                listCount: 15,
                viewCount: 900,
                breakValue: null,
                breakValueBackDataUse: false, // 누락된 데이탁 있을 경우 바로 전 데이타의 값으로 처리 여부
                reverseCount: {},
                edgeEffectCount: 2,
                baseData: {
                    apiUrl: GBL.API.URL.MEASUREMENT.SELECT_HEART_RATE_LIST,
                    receiveVariable: "rawDataIntList",
                    use: {
                        list: true,
                        view: true
                    },
                    term2: {
                        list: -60,
                        view: -3600
                    },
                    latestCheckTerm: 10 //초
                }
            },
            minmax: {
                min: 0,
                max: 0
            },
            // second 로 그래프를 처리할때 변수
            interval: {
                dataTerm: 3, // 초, 데이타 사이의 간격, 1000을 더 나눠야 하는데, 계산시 처리에 문제가 있어서 그 부분은 실제 적용시 처리
                term: 3000, //밀리초, setInterval에 사용
                socketReceiveTerm: 4,
                perSocketReceiveTermDataCount: 1,
                newProcessTerm: {},
                processTerm: 3,
                doubleProcessTerm: 6,
                correct: {
                    normal: 0.66,
                    min: 0.33,
                    max: 0.34
                },
                proceedTime: {},
                obj: {},
                first: {},
                socketReceiveDelay: {}
            },
            chartMinmax: {
                minimum: 0,
                maximum: 250
            },
            chartRealtime: false,
            chartConnect: false,
            chartObject: {},
            correct: {
                seconds: 0.0001
            },
            chartOption: {
                fill: "none",
                stroke_width: 1,
                stroke_color: "#EED011"
            }
        },

        ACT: {
            use: true,
            setInitChartDataFunctionName: "setInitChartDataForD3",
            getChartDataFunctionName: "getInitChartDataForD3",
            initFunctionName: "setInitChartDatas",
            getFunctionName: "getChartDatasForReverse2", // getChartDatas or getChartDatasForReverse
            deviceType: CUSTOM.DEVICE.TYPE.CODE.ECG,
            receiveVariable: "activityLevelDataList",
            viewInfo: {
                'list': {
                    'valueId': "ACT_value_{measurementCode}",
                    'chartId': "ACT_chart_{measurementCode}"
                },
                'detail': {
                    'valueId': "actVal_{measurementCode}",
                    'maxValueId': "actMax_{measurementCode}",
                    'minValueId': "actMin_{measurementCode}",
                    'chartId': "actChart_{measurementCode}",
                },
                'chartColor': "#5882FA"
            },
            data: {
                receiveDevel: {},
                receiveOrigin: {},
                chart: {},
                chartBack: {},
                chartStack: {}, //인터벌을 똘때마다 현재 데이타를 쌓은 임시 데이타
                listSecond: 30,
                viewSecond: 3600,
                listCount: 20,
                viewCount: 1200,
                breakValue: null,
                breakValueBackDataUse: false, // 누락된 데이탁 있을 경우 바로 전 데이타의 값으로 처리 여부
                reverseCount: {},
                edgeEffectCount: 1,
                baseData: {
                    apiUrl: GBL.API.URL.MEASUREMENT.SELECT_ACTIVITY_LEVEL_LIST,
                    receiveVariable: "rawDataIntList",
                    use: {
                        list: true,
                        view: true
                    },
                    term2: {
                        list: -60,
                        view: -3600
                    },
                    latestCheckTerm: 6 //초
                }
            },
            minmax: {
                min: 0,
                max: 0
            },
            // second 로 그래프를 처리할때 변수
            interval: {
                dataTerm: 3, // 초, 데이타 사이의 간격, 1000을 더 나눠야 하는데, 계산시 처리에 문제가 있어서 그 부분은 실제 적용시 처리
                term: 3000, //밀리초, setInterval에 사용
                socketReceiveTerm: 3,
                perSocketReceiveTermDataCount: 1,
                newProcessTerm: {},
                processTerm: 3,
                doubleProcessTerm: 6,
                correct: {
                    normal: 0.66,
                    min: 0.33,
                    max: 0.34
                },
                proceedTime: {},
                obj: {},
                first: {},
                socketReceiveDelay: {}
            },
            chartMinmax: {
                minimum: 0,
                maximum: 11
            },
            chartRealtime: false,
            chartConnect: true,
            chartObject: {},
            correct: {
                seconds: 0.0001
            },
            chartOption: {
                fill: "none",
                stroke_width: 1,
                stroke_color: "#5882FA"
            }
        },

        EWS: {
            use: true,
            setInitChartDataFunctionName: "setInitChartDataForD3",
            getChartDataFunctionName: "getInitChartDataForD3",
            initFunctionName: "setInitChartDatas",
            getFunctionName: "getChartDatasForReverse2", // getChartDatas or getChartDatasForReverse
            deviceType: CUSTOM.DEVICE.TYPE.CODE.ECG,
            receiveVariable: "ewsDataList",
            viewInfo: {
                'list': {
                    'valueId': "EWS_value_{measurementCode}",
                    'chartId': "EWS_chart_{measurementCode}"
                },
                'detail': {
                    'valueId': "ewsVal_{measurementCode}",
                    'maxValueId': "ewsMax_{measurementCode}",
                    'minValueId': "ewsMin_{measurementCode}",
                    'chartId': "ewsChart_{measurementCode}",
                },
                'chartColor': "#A4A4A4"
            },
            data: {
                receiveDevel: {},
                receiveOrigin: {},
                chart: {},
                chartBack: {},
                chartStack: {}, //인터벌을 똘때마다 현재 데이타를 쌓은 임시 데이타
                listSecond: 30,
                viewSecond: 3600,
                listCount: 20,
                viewCount: 1200,
                breakValue: null,
                breakValueBackDataUse: false, // 누락된 데이탁 있을 경우 바로 전 데이타의 값으로 처리 여부
                reverseCount: {},
                edgeEffectCount: 1,
                baseData: {
                    apiUrl: GBL.API.URL.MEASUREMENT.SELECT_EWS_LIST,
                    receiveVariable: "ewsSimpleList",
                    use: {
                        list: true,
                        view: true
                    },
                    term2: {
                        list: -60,
                        view: -3600
                    },
                    latestCheckTerm: 6 //초
                }
            },
            minmax: {
                min: 0,
                max: 0
            },
            // second 로 그래프를 처리할때 변수
            interval: {
                dataTerm: 3, // 초, 데이타 사이의 간격
                term: 3000, //밀리초, setInterval에 사용
                socketReceiveTerm: 3, // 웹 소켓 수신 간격
                perSocketReceiveTermDataCount: 1, // 웹 소켓 수신시 데이타 개수
                processCount: 1, //interval 간격에 처리되는 데이터 수
                newProcessTerm: {},
                processTerm: 3,
                doubleProcessTerm: 6,
                correct: {
                    normal: 0.66,
                    min: 0.33,
                    max: 0.34
                },
                proceedTime: {},
                obj: {},
                first: {},
                socketReceiveDelay: {}
            },
            chartMinmax: {
                minimum: -1,
                maximum: 4
            },
            chartRealtime: false,
            chartConnect: true,
            chartObject: {},
            correct: {
                seconds: 0.0001
            },
            chartOption: {
                fill: "none",
                stroke_width: 1,
                stroke_color: "#FFFFFF"
            }
        },

        TEMP: {
            use: true,
            setInitChartDataFunctionName: "setInitChartDataForD3",
            getChartDataFunctionName: "getInitChartDataForD3",
            initFunctionName: "setInitChartDatas",
            getFunctionName: "getChartDatasForReverse2", // getChartDatas or getChartDatasForReverse
            deviceType: CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE,
            receiveVariable: "tempDataList",
            viewInfo: {
                'list': {
                    'valueId': "TEMP_value_{measurementCode}",
                    'chartId': "TEMP_chart_{measurementCode}"
                },
                'detail': {
                    'valueId': "tempVal_{measurementCode}",
                    'maxValueId': "tempMax_{measurementCode}",
                    'minValueId': "tempMin_{measurementCode}",
                    'chartId': "tempChart_{measurementCode}",
                },
                'chartColor': "#EED011"
            },
            data: {
                receiveDevel: {},
                receiveOrigin: {},
                chart: {},
                chartBack: {},
                chartStack: {}, //인터벌을 똘때마다 현재 데이타를 쌓은 임시 데이타
                listSecond: 600,
                viewSecond: 3600,
                listCount: 10,
                viewCount: 60,
                breakValue: null,
                breakValueBackDataUse: false, // 누락된 데이탁 있을 경우 바로 전 데이타의 값으로 처리 여부
                reverseCount: {},
                edgeEffectCount: 0,
                baseData: {
                    apiUrl: GBL.API.URL.MEASUREMENT.SELECT_TEMPERATURE_LIST,
                    receiveVariable: "rawDataDecimalList",
                    use: {
                        list: true,
                        view: true
                    },
                    term2: {
                        list: -600,
                        view: -3600
                    },
                    latestCheckTerm: 120 //초
                }
            },
            minmax: {
                min: 0,
                max: 0
            },
            // second 로 그래프를 처리할때 변수
            interval: {
                dataTerm: 60, // 초, 데이타 사이의 간격
                term: 60000, //밀리초, setInterval에 사용
                socketReceiveTerm: 60, // 웹 소켓 수신 간격
                perSocketReceiveTermDataCount: 1, // 웹 소켓 수신시 데이타 개수
                processCount: 1, //interval 간격에 처리되는 데이터 수
                newProcessTerm: {},
                processTerm: 60,
                doubleProcessTerm: 120,
                correct: {
                    normal: 0.66,
                    min: 0.33,
                    max: 0.34
                },
                proceedTime: {},
                obj: {},
                first: {},
                socketReceiveDelay: {}
            },
            chartMinmax: {
                minimum: 25,
                maximum: 42
            },
            chartRealtime: false,
            chartConnect: true,
            chartObject: {},
            correct: {
                seconds: 0.0001
            },
            chartOption: {
                fill: "none",
                stroke_width: 1,
                stroke_color: "#5882FA"
            }
        },

        SPO2: {
            use: false,
            initFunctionName: "setInitChartDatas",
            getFunctionName: "getChartDatasForReverse2", // getChartDatas or getChartDatasForReverse
            deviceType: CUSTOM.DEVICE.TYPE.CODE.SPO2,
            receiveVariable: "spO2DataList",
            viewInfo: {
                'list': {
                    'valueId': "SPO2_value_{measurementCode}",
                    'chartId': "SPO2_chart_{measurementCode}"
                },
                'detail': {
                    'valueId': "spo2Val_{measurementCode}",
                    'maxValueId': "spo2Max_{measurementCode}",
                    'minValueId': "spo2Min_{measurementCode}",
                    'chartId': "spo2Chart_{measurementCode}",
                },
                'chartColor': "#dd44a5"
            },
            data: {
                receiveDevel: {},
                receiveOrigin: {},
                chart: {},
                chartBack: {}, //한바퀴가 돌고, 뒤에 데이타가 남아져있는 효과를 위한 이전 텀의 데이타
                chartStack: {}, //인터벌을 똘때마다 현재 데이타를 쌓은 임시 데이타
                listSecond: 30,
                viewSecond: 3600,
                listCount: 20,
                viewCount: 1200,
                breakValue: null,
                breakValueBackDataUse: false, // 누락된 데이탁 있을 경우 바로 전 데이타의 값으로 처리 여부
                reverseCount: {},
                edgeEffectCount: 1,
                baseData: {
                    apiUrl: GBL.API.URL.MEASUREMENT.SELECT_SPO2_LIST,
                    receiveVariable: "rawDataIntList",
                    use: {
                        list: false,
                        view: false
                    },
                    term2: {
                        list: -60,
                        view: -3600
                    },
                    latestCheckTerm: 3 //초
                }
            },
            minmax: {
                min: 0,
                max: 0
            },
            // second 로 그래프를 처리할때 변수
            interval: {
                dataTerm: 3, // 초, 데이타 사이의 간격
                term: 3000, //밀리초, setInterval에 사용
                socketReceiveTerm: 3, // 웹 소켓 수신 간격
                perSocketReceiveTermDataCount: 1, // 웹 소켓 수신시 데이타 개수
                processCount: 1, //interval 간격에 처리되는 데이터 수
                newProcessTerm: {},
                processTerm: 3,
                doubleProcessTerm: 6,
                correct: {
                    normal: 0.66,
                    min: 0.33,
                    max: 0.34
                },
                proceedTime: {},
                obj: {},
                first: {},
                socketReceiveDelay: {}
            },
            chartMinmax: {
                minimum: 80,
                maximum: 105
            },
            correct: {
                seconds: 0.0001
            },
            chartRealtime: false,
            chartConnect: true,
            chartObject: {}
        },

        RESP: {
            use: true,
            initFunctionName: "setInitChartDatas",
            getFunctionName: "getChartDatasForReverse2", // getChartDatas or getChartDatasForReverse
            deviceType: CUSTOM.DEVICE.TYPE.CODE.ECG,
            receiveVariable: "respDataList",
            viewInfo: {
                'list': {
                    'valueId': "RESP_value_{measurementCode}",
                    'chartId': "RESP_chart_{measurementCode}"
                },
                'detail': {
                    'valueId': "respVal_{measurementCode}",
                    'maxValueId': "respMax_{measurementCode}",
                    'minValueId': "respMin_{measurementCode}",
                    'chartId': "respChart_{measurementCode}",
                },
                'chartColor': "#e83305"
            },
            data: {
                receiveDevel: {},
                receiveOrigin: {},
                chart: {},
                chartBack: {}, //한바퀴가 돌고, 뒤에 데이타가 남아져있는 효과를 위한 이전 텀의 데이타
                chartStack: {}, //인터벌을 똘때마다 현재 데이타를 쌓은 임시 데이타
                listSecond: 30,
                viewSecond: 3600,
                listCount: 20,
                viewCount: 1200,
                breakValue: null,
                breakValueBackDataUse: false, // 누락된 데이탁 있을 경우 바로 전 데이타의 값으로 처리 여부
                reverseCount: {},
                edgeEffectCount: 1,
                baseData: {
                    apiUrl: GBL.API.URL.MEASUREMENT.SELECT_RESP_LIST,
                    receiveVariable: "rawDataIntList",
                    use: {
                        list: false,
                        view: false
                    },
                    term2: {
                        list: -60,
                        view: -3600
                    },
                    latestCheckTerm: 3 //초
                }
            },
            minmax: {
                min: 0,
                max: 0
            },
            // second 로 그래프를 처리할때 변수
            interval: {
                dataTerm: 3, // 초, 데이타 사이의 간격
                term: 3000, //밀리초, setInterval에 사용
                socketReceiveTerm: 3, // 웹 소켓 수신 간격
                perSocketReceiveTermDataCount: 1, // 웹 소켓 수신시 데이타 개수
                processCount: 1, //interval 간격에 처리되는 데이터 수
                newProcessTerm: {},
                processTerm: 3,
                doubleProcessTerm: 6,
                correct: {
                    normal: 0.66,
                    min: 0.33,
                    max: 0.34
                },
                proceedTime: {},
                obj: {},
                first: {},
                socketReceiveDelay: {}
            },
            chartMinmax: {
                minimum: 10,
                maximum: 40
            },
            correct: {
                seconds: 0.0001
            },
            chartRealtime: false,
            chartConnect: true,
            chartObject: {},
            chartOption: {
                fill: "none",
                stroke_width: 1,
                stroke_color: "#58fac7"
            }
        },
        DEVICE_STATUS: {
            use: false,
            initFunctionName: null,
            getFunctionName: null,
            deviceType: CUSTOM.DEVICE.TYPE.CODE.DEVICE_STATUS
        },
        HEARTRATE: {
            use: false,
            initFunctionName: null,
            getFunctionName: null,
            deviceType: CUSTOM.DEVICE.TYPE.CODE.HEARTRATE
        },
        IGNORE: {
            use: false,
            // codes: "c004,c003,c002,c001,b013,b011,b010,b009,b008,b007,b006,b005,b004,b003,b002,b001"
            // codes: "c002,c001,b013,b011,b010,b009,b008,b007,b006,b005,b004,b003,b002,b001"
            codes: [
                // "SEERS_2112150016_J581",
                // "SEERS_2112151858_SMD5",
                // "SEERS_2112151814_8A3W",
                // "SEERS_2112151819_A787",
                // "SEERS_2112151817_AWV7",
                // "SEERS_2112151902_WQTV",
                // "SEERS_2112161014_3LFS",
                // "SEERS_2112151815_3677",
                // "SEERS_2112161025_A773",
                // "SEERS_2112151816_8646",
                // "SEERS_2112151859_13RW",
                // "SEERS_2112151818_72EQ",
            ]
            // codes: []
        },
        LOG: {
            codes: [
                // "SEERS_2112150016_BEV1"
            ] // "SEERS_2112151500_F5T4"
        }
    }
}
CUSTOM.MODULE['socket'] = {
    RECEIVE: {
        COUNT: {
            ECG: {},
            TEMPERATURE: {}
        }
    },
    STOMP: {
        CLIENT: null,
        CLIENT_KEY: {
            DATA: null,
            EVENT: null
        },
        SUBSCRIBE: {},
        MULTI_SUBSCRIBE: {
            NORMAL: {},
            SIMPLE: {}
        }
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

GBL.API.GATEWAY_BASE_URL = null;
GBL.ACCOUNT.CHECK.AUTO_LOGIN = function() {
    if(CookieHelper.get("seers_auto_login") != undefined) {
        if(CookieHelper.get("seers_auto_login") !== null) {
            GBL.ACCOUNT.TOKEN = CookieHelper.get('accessToken');
            let parameter = {
                "id": $("#id_input").val(),
            }
            let response = custom.request.api(GBL.API.URL.ACCOUNT.AUTO_LOGIN, parameter);
            GBL.ACCOUNT.SET(response);
        }
    }
}
GBL.WINDOW_HISTORY_STATE.IS_SUB_CHANGE = function() {
    if(GBL.WINDOW_HISTORY_STATE.URL.length > 1) {
        let back = GBL.WINDOW_HISTORY_STATE.URL[1].split("/");
        let current = GBL.WINDOW_HISTORY_STATE.URL[0].split("/");
        if(back[1] == current[1]) {
            if(back[2] != current[2]) {
                return true;
            }
        }
    }
    return false;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////