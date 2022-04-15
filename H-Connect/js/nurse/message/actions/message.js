'use strict';
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const { serverController, ip } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const { sessionController } = await import(
    importVersion('/H-Connect/js/utils/controller/sessionController.js')
);

const userData = JSON.parse(localStorageController.getLocalS('userData'));
const { userCode: requester, organization: organizationCode } = userData;
const LOGIN_TOKEN = sessionController.getSession('accesToken');
let passingParameter = {
    'SX-Auth-Token': LOGIN_TOKEN,
    deviceKind: 3,
    // connType: connType,
    apiRoute: 'GWS-1',
    requester,
};
// `${ip}ws?SX-API-Route=${'GWS-1'}&clientKeyName=${'bioSignalData'}&connType=${1}`
console.log('io');
console.log(ip);
let streamming = new SockJS(`${ip}ws`);
let stompClient = Stomp.over(streamming);

function callBack(frame) {
    const data = frame.headers;
    console.log('data===');
    console.log(data);
    stompClient.subscribe(
        '/topic/public/bioSignalData/SEERS_2203031645_V9U6',
        function (data) {
            const aaa = JSON.parse(data);
            console.log('aaa===');
            console.log(aaa);
        },
        (err) => {
            console.log(err);
        }
    );
}

function connectonError(err) {
    console.log(err);
}

stompClient.connect(passingParameter, callBack, connectonError);

// let requestAPI = function () {
//     this.headers = {
//         'Content-Type': 'application/json;charset=UTF-8',
//     };
//     this.dataType = 'json';
//     this.parameters = null;
//     this.async = true;
//     this.url = null;
//     this.type = 'POST';
//     this.timeout = 30000;
//     this.cache = false;
//     this.successParameters = null;
//     this.errorFunction = null;

//     this.setHeader = function (headers) {
//         this.headers = headers;
//     };
//     this.setDataType = function (dataType) {
//         this.dataType = dataType;
//     };
//     this.setParameter = function (parameters) {
//         this.parameters = parameters;
//     };
//     this.setAsync = function (async) {
//         this.async = async;
//     };
//     this.setUrl = function (url) {
//         this.url = url;
//     };
//     this.etType = function (type) {
//         this.type = type;
//     };
//     this.setTimeout = function (timeout) {
//         this.timeout = timeout;
//     };
//     this.setCache = function (cache) {
//         this.cache = cache;
//     };
//     this.setSuccessParameters = function (parameters) {
//         this.successParameters = parameters;
//     };
//     this.setErrorFunction = function (callback) {
//         this.errorFunction = callback;
//     };

//     this.API = function (
//         onSuccessFunc = null,
//         etcParams = { isFormData: false }
//     ) {
//         let isFormData = false;
//         if (etcParams.hasOwnProperty('isFormData') === true) {
//             isFormData = etcParams.isFormData;
//         }
//         let _self = this;
//         let cloneObj = {
//             url: this.url,
//             parameters: this.parameters,
//             async: this.async,
//             successParameters: this.successParameters,
//         };
//         let res = null;
//         let options = {
//             url: this.url,
//             type: this.type,
//             async: this.async,
//             cache: this.cache,
//             timeout: this.timeout,
//             headers: this.headers,
//             dataType: this.dataType,
//             data:
//                 isFormData === false
//                     ? JSON.stringify(this.parameters)
//                     : this.parameters,
//             success: function (data) {
//                 // let log = `
//                 //         =============== API log ===============
//                 //         url:::::::::::::, ${cloneObj.url}
//                 //         parameter::::::::, ${JSON.stringify(cloneObj.parameters)}
//                 //         =======================================
//                 // `;
//                 // console.log(log);

//                 if (data.result == false) {
//                     _self.errorFunction(data);
//                     return;
//                 }

//                 if (cloneObj.async === false) {
//                     res = data;
//                 } else if (onSuccessFunc != null) {
//                     onSuccessFunc(
//                         data,
//                         cloneObj.parameters,
//                         cloneObj.successParameters
//                     );
//                     return;
//                 }
//             },
//             error: function (xhr, ajaxOptions, thrownError) {
//                 console.log(xhr.status);
//                 console.log(xhr.statusText);
//                 console.log(xhr.responseText);
//                 console.log(xhr.readyState);
//                 console.log('xhr.status::::::::::', xhr.status);
//                 console.log('xhr.statusText::::::::::', xhr.statusText);
//                 console.log('xhr.responseText::::::::::', xhr.responseText);
//                 console.log('xhr.readyState::::::::::', xhr.readyState);
//                 _self.errorFunction(xhr);
//                 return;
//             },
//         };
//         if (isFormData === true) {
//             options['processData'] = false;
//             options['contentType'] = false;
//             options['mimeType'] = 'multipart/form-data';
//         }
//         $.ajax(options);
//         return res;
//     };
// };
// // CUSTOM.MODULE['socket'].STOMP.CLIENT
// let CUSTOM = {
//     MODULE: {
//         socket: {
//             STOMP: {
//                 CLIENT: null,
//             },
//         },
//     },
//     EVENT: {
//         HTML: [],
//     },
// };

// let GBL = {
//     DEBUG: {
//         USE: true,
//     },
//     DEEP_COPY: {
//         TYPE: 'stringify', // stringify, cloneDeep
//     },
//     SESSION_RENEW: {
//         IS_USE: false,
//         INTERVAL: {
//             START: false,
//             TERM: 1000,
//         },
//     },
//     DESIGN: {
//         SITE_META: {
//             NAME: null,
//             TYPE: null,
//             TITLE: null,
//             DESCRIPTION: null,
//             KEYWORDS: null,
//             AUTHOR: null,
//             IMAGE: null,
//             IMAGE_WIDTH: null,
//             IMAGE_HEIGHT: null,
//             URL: null,
//         },
//         THEME: 'default',
//         MAIN_DIV_NAME: '#app',
//         HEADER_NAME: '#header',
//         FOOTER_NAME: '#footer',
//         SIDE_MENU_NAME: '#side-menu',
//         PAGE_DIV_NAME: '#main-contents',
//         PAGE_PARENT_DIV_NAME: '#page-wrapper',
//         APP_VER_DIV_NAME: '#wrap',
//         PAGING_DIV_NAME: 'paging',
//         NO_DATA_MSG: '등록된 데이타가 없습니다.',
//         LAYOUT: {
//             IGNORE_CONTROLLER_NAMES: [],
//             IS_USE: function (controllerName) {
//                 for (
//                     let i = 0;
//                     i < GBL.DESIGN.LAYOUT.IGNORE_CONTROLLER_NAMES.length;
//                     i++
//                 ) {
//                     if (
//                         GBL.DESIGN.LAYOUT.IGNORE_CONTROLLER_NAMES[i] ==
//                         controllerName
//                     ) {
//                         return false;
//                     }
//                 }
//                 return true;
//             },
//             // LOADING_DONE: false, // interval로 로딩 여부를 확인하지 않고, async promise로 처리함
//             EXIST: false,
//             CLEAR: function () {
//                 $(`${GBL.DESIGN.MAIN_DIV_NAME}`).html('');
//                 GBL.DESIGN.LAYOUT.EXIST = false;
//             },
//         },
//         // CUSTOM_ASSET_LOADING_DONE: false,
//         SET_SITE_NAME: function () {
//             document.title = GBL.DESIGN.SITE_META.NAME;
//         },
//         SET_SITE_META_ALL: function () {
//             document
//                 .querySelector('meta[name="name"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.NAME);
//             document
//                 .querySelector('meta[name="type"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.TYPE);
//             document
//                 .querySelector('meta[name="title"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.TITLE);
//             document
//                 .querySelector('meta[name="description"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.DESCRIPTION);
//             document
//                 .querySelector('meta[name="keywords"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.KEYWORDS);
//             document
//                 .querySelector('meta[name="author"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.AUTHOR);

//             document
//                 .querySelector('meta[property="og:name"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.NAME);
//             document
//                 .querySelector('meta[property="og:type"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.TYPE);
//             document
//                 .querySelector('meta[property="og:title"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.TITLE);
//             document
//                 .querySelector('meta[property="og:description"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.DESCRIPTION);
//             document
//                 .querySelector('meta[property="og:keywords"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.KEYWORDS);
//             document
//                 .querySelector('meta[property="og:author"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.AUTHOR);
//             document
//                 .querySelector('meta[property="og:image"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.IMAGE);
//             document
//                 .querySelector('meta[property="og:image:width"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.IMAGE_WIDTH);
//             document
//                 .querySelector('meta[property="og:image:height"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.IMAGE_HEIGHT);
//             document
//                 .querySelector('meta[property="og:url"]')
//                 .setAttribute('content', GBL.DESIGN.SITE_META.URL);
//         },
//         SELECT_MENU: function () {},
//         SET_PAGE_PARENT_DIV_HTML: function () {},
//         DEFAULT_CONTROLLER: null,
//         APP_EXPLAIN_CONFIRM: false,
//     },
//     SITE_MENU: {
//         URL: null,
//         CHOICE_CONTROLLER: null,
//     },
//     MODULE: {
//         OBJ: {},
//         IS_LOADING: {},
//         IS_PRE_LOADING: {},
//     },
//     CONTROLLER: {
//         OBJ: {},
//         IS_PRE_LOADING: {},
//     },
//     WINDOW_HISTORY_STATE: {
//         DEPTH: 5,
//         URL: [],
//         IS_CHANGE: function () {
//             if (GBL.WINDOW_HISTORY_STATE.URL.length > 1) {
//                 let back = GBL.WINDOW_HISTORY_STATE.URL[1].split('/')[1];
//                 let current = GBL.WINDOW_HISTORY_STATE.URL[0].split('/')[1];
//                 if (back != current) {
//                     return true;
//                 }
//             }
//             return false;
//         },
//         IS_SUB_CHANGE: function () {
//             if (GBL.WINDOW_HISTORY_STATE.URL.length > 1) {
//                 let back = GBL.WINDOW_HISTORY_STATE.URL[1].split('/');
//                 let current = GBL.WINDOW_HISTORY_STATE.URL[0].split('/');
//                 if (back[1] == current[1]) {
//                     if (back[2] != current[2]) {
//                         return true;
//                     }
//                 }
//             }
//             return false;
//         },
//         IS_FULL_CHANGE: function () {
//             if (GBL.WINDOW_HISTORY_STATE.URL.length > 1) {
//                 let back = GBL.WINDOW_HISTORY_STATE.URL[1];
//                 let current = GBL.WINDOW_HISTORY_STATE.URL[0];
//                 if (back != current) {
//                     return true;
//                 }
//             }
//             return false;
//         },
//         GET_NOW_CONTROLLER: function () {
//             return GBL.WINDOW_HISTORY_STATE.URL[0].split('/')[1];
//         },
//         GET_NOW_ACTION: function () {
//             return GBL.WINDOW_HISTORY_STATE.URL[0].split('/')[2];
//         },
//     },
//     ACCOUNT: {
//         INFO: localStorageController.getLocalS('userData'),
//         TOKEN: sessionController.getSession('accesToken'),
//         CHECK: {
//             INTERVAL: {
//                 OBJ: null,
//                 TERM: 1000,
//                 COUNT: 0,
//                 INIT: function () {
//                     if (GBL.ACCOUNT.CHECK.INTERVAL.OBJ != null) {
//                         window.clearInterval(GBL.ACCOUNT.CHECK.INTERVAL.OBJ);
//                         GBL.ACCOUNT.CHECK.INTERVAL.OBJ = null;
//                         GBL.ACCOUNT.CHECK.INTERVAL.COUNT = 0;
//                     }
//                 },
//             },
//             RUN: function () {},
//         },
//         AFTER_LOGIN_URL: '/patient/index',
//         COOKIE: {
//             TERM: {
//                 REMEMBER_ID: 30, // days
//                 AUTO_LOGIN: 365,
//             },
//         },
//         LOGIN_FAIL: {
//             TYPE: 'normal', // normal(실패만 알려줌), detail(자세히 알려줌)
//             CODE: {
//                 // 아래 문구가 포함되는 걸 찾는다.
//                 NULL: 'Account is null',
//                 INCORRECT: 'The password is incorrect',
//                 BOTH: ['Account is null', 'The password is incorrect'],
//             },
//             MESSAGE: {
//                 NULL: '계정이 존재하지 않습니다. 아이디와 비밀번호를 정확하게 입력하세요.',
//                 INCORRECT:
//                     '비밀번호가 정확하지 않습니다. 비밀번호를 정확하게 입력하세요.',
//                 BOTH: '로그인에 실패하였습니다. 아이디와 비밀번호를 정확하게 입력하세요.',
//             },
//             GET_MESSAGE: function (code) {
//                 let msg = GBL.ACCOUNT.CHECK.LOGIN_FAIL.MESSAGE.BOTH;
//                 if (GBL.ACCOUNT.CHECK.LOGIN_FAIL.TYPE === 'detail') {
//                     if (
//                         code.indexOf(GBL.ACCOUNT.CHECK.LOGIN_FAIL.CODE.NULL) !==
//                         -1
//                     ) {
//                         msg = GBL.ACCOUNT.CHECK.LOGIN_FAIL.MESSAGE.NULL;
//                     } else if (
//                         code.indexOf(
//                             GBL.ACCOUNT.CHECK.LOGIN_FAIL.CODE.INCORRECT
//                         ) !== -1
//                     ) {
//                         msg = GBL.ACCOUNT.CHECK.LOGIN_FAIL.MESSAGE.INCORRECT;
//                     }
//                 }
//                 return msg;
//             },
//         },
//         IS_AUTH: function () {},
//         SET: function () {},
//         REFRESH_SET: function () {},
//         IS_RUN_ACTION: function (name, nowAction, ignoreAction = []) {
//             let ignoreAuth = false;
//             let checkAuth = false;
//             for (let i = 0; i < ignoreAction.length; i++) {
//                 if (ignoreAction[i] == nowAction) {
//                     ignoreAuth = true;
//                 }
//             }

//             if (ignoreAuth === false) {
//                 checkAuth = GBL.ACCOUNT.IS_AUTH(true);
//             }
//             let log = `
//                 =============== IS_RUN_ACTION log ===============
//                 name:::::::::::::, ${name}
//                 nowAction:::::::::::::, ${nowAction}
//                 ignoreAuth:::::::::::::, ${ignoreAuth}
//                 checkAuth::::::::, ${checkAuth}
//                 =================================================
//             `;
//             console.log(log);

//             if (
//                 ignoreAuth === true ||
//                 (ignoreAuth === false && checkAuth === true)
//             ) {
//                 return true;
//             }
//             return false;
//         },
//     },
//     API: {
//         BASE_URL:
//             'https://www.hconnect-test-api.mobicareconsole.com/mobiCAREConsole',
//         FAKE: {
//             ['/API/Manager/SelectWard']: true,
//         }, // true/false, false일 경우 실제 호출을 하지 않고, 임의로 등록한 json으로 가상 api 처리를 한다. 단! api 주소 자체를 키값으로 지정한다. example 확인 필요
//         URL: {
//             ACCOUNT: {
//                 LOGIN: 'aaa',
//             },
//         },
//         RESPONSE: {
//             CODE: {},
//         },
//         SET_BASE_URL: function () {
//             if (
//                 (location.hostname.indexOf('seers') != -1 ||
//                     location.hostname.indexOf('13.209.51.114') != -1) &&
//                 location.hostname.indexOf('test') == -1
//             ) {
//                 console.log('############################## base - 운영 서버');
//                 GBL.API.BASE_URL =
//                     'https://www.apirelease.seers-pet.com/mobiCAREPet/API'; // release
//             } else {
//                 console.log(
//                     '############################## base - 테스트 서버'
//                 );
//                 GBL.API.BASE_URL =
//                     'https://www.apirelease.seers-pet.com/mobiCAREPet/API'; // test
//             }
//         },
//     },
//     PAGING: {
//         DATA: {
//             PAGE: {
//                 PER_COUNT: 10,
//                 PER_PAGE: 10,
//             },
//         },
//     },
// };
// let FAKE_API_JSON = {};
// FAKE_API_JSON[GBL.API.URL.ACCOUNT.LOGIN] = {
//     result: true,
//     extra: null,
//     error: 0,
//     message: null,
//     remoteIp: '1.223.237.86',
//     accessToken: 'SEERS_zaid_20211112155200907_2941D8D3_TOKEN_MNG',
//     userAccount: {
//         id: 'zaid',
//         password: null,
//         organizationCode: 'SEERS',
//         userCode: 'SEERS_zaid',
//         employeeCode: 'SXzaid',
//         department: null,
//         position: null,
//         level: 8,
//         name: 'zaid',
//         phoneNumber: '+821073665332',
//         email: 'zaid.yoon@seerstech.com',
//         status: 0,
//         deactivate: 0,
//         dateTime: '2021-04-29 10:28:49',
//         gmtCode: 'GMT+0900',
//         timezone: 'Asia/Seoul',
//         updateDateTime: null,
//         lastUpdatePwDateTime: null,
//         modifyPwAlertDateTime: null,
//         deactivateDateTime: null,
//         organizationName: 'Seerstechnology',
//         profilePhotoUrl: null,
//     },
//     organization: {
//         organizationId: 1,
//         organizationCode: 'SEERS',
//         organizationName: 'Seerstechnology',
//         countryCode: 'KR',
//         countryName: 'Republic of Korea',
//         state: 'Gyeonggi-do',
//         city: 'Sujeong-gu, Seongnam-si',
//         address: '76, Bokjeong-ro',
//         latitude: 37.59549224936482,
//         longitude: 127.0795200273486,
//         phoneNumber: '+8224947582',
//         level: 10,
//         expiration: 0,
//         expirationDateTime: '2220-10-27 12:04:24',
//         dateTime: '2021-04-29 10:34:24',
//         gmtCode: 'GMT+0900',
//         timezone: 'Asia/Seoul',
//         etc: '(주)씨어스테크놀로지',
//     },
//     apiServerInfoList: [
//         {
//             apiServerId: 1,
//             serverType: 2,
//             apiRoute: 'GWS-1',
//             main: 1,
//             unused: 0,
//             baseUrl: 'https://www.apitest.seers-pet.com/mobiCAREPet',
//             etc: 'Data Server 1',
//             dateTime: '2021-04-14 20:50:00',
//         },
//         {
//             apiServerId: 3,
//             serverType: 3,
//             apiRoute: 'GWS-1',
//             main: 0,
//             unused: 0,
//             baseUrl: 'https://www.apitest.seers-pet.com/mobiCAREPet',
//             etc: 'Gateway Server 1',
//             dateTime: '2021-05-24 10:50:00',
//         },
//     ],
//     wardList: [
//         {
//             organizationCode: 'SEERS',
//             wardCode: 'SEERS_B4CR',
//             ward: '씨어스테크놀로지',
//             orderNumber: 0,
//             etc: null,
//             deactivate: 0,
//             sickRoomList: [
//                 {
//                     organizationCode: 'SEERS',
//                     wardCode: 'SEERS_B4CR',
//                     sickRoomCode: 'SEERS_SICK_ROOM_KYT2',
//                     sickRoom: '1401호',
//                     etc: null,
//                     deactivate: 0,
//                     ward: '씨어스테크놀로지',
//                     sickBedList: null,
//                 },
//                 {
//                     organizationCode: 'SEERS',
//                     wardCode: 'SEERS_B4CR',
//                     sickRoomCode: 'SEERS_SICK_ROOM_C84F',
//                     sickRoom: '1402호',
//                     etc: null,
//                     deactivate: 0,
//                     ward: '씨어스테크놀로지',
//                     sickBedList: [
//                         {
//                             organizationCode: 'SEERS',
//                             wardCode: 'SEERS_B4CR',
//                             sickRoomCode: 'SEERS_SICK_ROOM_C84F',
//                             sickBedCode: 'SEERS_SICK_BED_FGW5',
//                             sickBed: '1-1',
//                             etc: null,
//                             deactivate: 0,
//                             ward: '씨어스테크놀로지',
//                             sickRoom: '1402호',
//                         },
//                         {
//                             organizationCode: 'SEERS',
//                             wardCode: 'SEERS_B4CR',
//                             sickRoomCode: 'SEERS_SICK_ROOM_C84F',
//                             sickBedCode: 'SEERS_SICK_BED_4F2A',
//                             sickBed: '1-2',
//                             etc: null,
//                             deactivate: 0,
//                             ward: '씨어스테크놀로지',
//                             sickRoom: '1402호',
//                         },
//                         {
//                             organizationCode: 'SEERS',
//                             wardCode: 'SEERS_B4CR',
//                             sickRoomCode: 'SEERS_SICK_ROOM_C84F',
//                             sickBedCode: 'SEERS_SICK_BED_TQ13',
//                             sickBed: '1-3',
//                             etc: null,
//                             deactivate: 0,
//                             ward: '씨어스테크놀로지',
//                             sickRoom: '1402호',
//                         },
//                         {
//                             organizationCode: 'SEERS',
//                             wardCode: 'SEERS_B4CR',
//                             sickRoomCode: 'SEERS_SICK_ROOM_C84F',
//                             sickBedCode: 'SEERS_SICK_BED_L1E0',
//                             sickBed: '1-4',
//                             etc: null,
//                             deactivate: 0,
//                             ward: '씨어스테크놀로지',
//                             sickRoom: '1402호',
//                         },
//                         {
//                             organizationCode: 'SEERS',
//                             wardCode: 'SEERS_B4CR',
//                             sickRoomCode: 'SEERS_SICK_ROOM_C84F',
//                             sickBedCode: 'SEERS_SICK_BED_21D4',
//                             sickBed: '2-1',
//                             etc: null,
//                             deactivate: 0,
//                             ward: '씨어스테크놀로지',
//                             sickRoom: '1402호',
//                         },
//                         {
//                             organizationCode: 'SEERS',
//                             wardCode: 'SEERS_B4CR',
//                             sickRoomCode: 'SEERS_SICK_ROOM_C84F',
//                             sickBedCode: 'SEERS_SICK_BED_69U2',
//                             sickBed: '2-2',
//                             etc: null,
//                             deactivate: 0,
//                             ward: '씨어스테크놀로지',
//                             sickRoom: '1402호',
//                         },
//                         {
//                             organizationCode: 'SEERS',
//                             wardCode: 'SEERS_B4CR',
//                             sickRoomCode: 'SEERS_SICK_ROOM_C84F',
//                             sickBedCode: 'SEERS_SICK_BED_7HQE',
//                             sickBed: '2-3',
//                             etc: null,
//                             deactivate: 0,
//                             ward: '씨어스테크놀로지',
//                             sickRoom: '1402호',
//                         },
//                         {
//                             organizationCode: 'SEERS',
//                             wardCode: 'SEERS_B4CR',
//                             sickRoomCode: 'SEERS_SICK_ROOM_C84F',
//                             sickBedCode: 'SEERS_SICK_BED_78GH',
//                             sickBed: '2-4',
//                             etc: null,
//                             deactivate: 0,
//                             ward: '씨어스테크놀로지',
//                             sickRoom: '1402호',
//                         },
//                         {
//                             organizationCode: 'SEERS',
//                             wardCode: 'SEERS_B4CR',
//                             sickRoomCode: 'SEERS_SICK_ROOM_C84F',
//                             sickBedCode: 'SEERS_SICK_BED_4592',
//                             sickBed: '3-1',
//                             etc: null,
//                             deactivate: 0,
//                             ward: '씨어스테크놀로지',
//                             sickRoom: '1402호',
//                         },
//                         {
//                             organizationCode: 'SEERS',
//                             wardCode: 'SEERS_B4CR',
//                             sickRoomCode: 'SEERS_SICK_ROOM_C84F',
//                             sickBedCode: 'SEERS_SICK_BED_3STW',
//                             sickBed: '3-2',
//                             etc: null,
//                             deactivate: 0,
//                             ward: '씨어스테크놀로지',
//                             sickRoom: '1402호',
//                         },
//                         {
//                             organizationCode: 'SEERS',
//                             wardCode: 'SEERS_B4CR',
//                             sickRoomCode: 'SEERS_SICK_ROOM_C84F',
//                             sickBedCode: 'SEERS_SICK_BED_OU54',
//                             sickBed: '4-1',
//                             etc: null,
//                             deactivate: 0,
//                             ward: '씨어스테크놀로지',
//                             sickRoom: '1402호',
//                         },
//                         {
//                             organizationCode: 'SEERS',
//                             wardCode: 'SEERS_B4CR',
//                             sickRoomCode: 'SEERS_SICK_ROOM_C84F',
//                             sickBedCode: 'SEERS_SICK_BED_R001',
//                             sickBed: '4-2',
//                             etc: null,
//                             deactivate: 0,
//                             ward: '씨어스테크놀로지',
//                             sickRoom: '1402호',
//                         },
//                     ],
//                 },
//             ],
//         },
//     ],
//     loginFailCount: 0,
//     loginFailMaxCount: 0,
// };
// FAKE_API_JSON[GBL.API.URL.ACCOUNT.LOGOUT] = {
//     result: true,
//     extra: null,
//     error: 0,
//     message: null,
//     remoteIp: null,
// };
// const CONST = {
//     VERSION: '0.1.0',
//     API: {
//         BASE_URL: GBL.API.BASE_URL.replace('/API', ''),
//         URL: {
//             SERVER: {
//                 // STREAM_LIST: '/Server/SelectAPIServer',
//                 // STREAM_LIST: `/ws?SX-API-Route=${'GWS-1'}&clientKeyName=${'bioSignalData'}&connType=${1}`,
//                 // STREAM_LIST: `/topic/public/bioSignalData/SEERS_2203031645_V9U6`,
//                 STREAM_LIST: `/API/Manager/SelectWard`,
//             },
//         },
//     },
//     STOMP: {
//         SERVER_TYPE: {
//             CODE: {
//                 EVENT: 1,
//                 DATA: 2,
//                 GATEWAY: 3,
//             },
//             STR: {
//                 EVENT: 'EVENT',
//                 DATA: 'DATA',
//             },
//             TITLE: {},
//         },
//         DATA_TYPE: {
//             NORMAL: 'bioSignalData',
//             SIMPLE: 'bioSignalSimpleData',
//         },
//         CONNECT_TYPE: {
//             CODE: {
//                 GATEWAY: 1,
//                 WEB: 2,
//                 EVENT: 1,
//             },
//         },
//         EVENT_TYPE: {
//             CODE: {
//                 MEASUREMENT: 10,
//                 WARD: 20,
//             },
//             OBJ_NAME: {},
//         },
//         CLIENT: null,
//         CLIENT_KEY: {
//             DATA: null,
//             EVENT: null,
//         },
//         SUBSCRIBE: {},
//     },
//     FUNCTION: null,

//     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     // 사이트별 모듈에서 상이하게 처리해야 할 부분은 init 에 추가를 하던가? 아니면 새로운 함수를 추가하여 활용한다.
//     // INIT : config 값 변경시 사용, default.js 에 선언된 함수를 사이트별로 변경시 사용.
//     // POST_PROCESS: 해당 모듈의 액션 처리 후 진행해야 할 부분이 있다면 추가, controller에 index이외의 action이 있다면 추가 가능
//     // 예시 - init)
//     // // 버전은 기본 버전 뒤에 .0부터 올린다.
//     // CONST.VERSION = `${CONST.VERSION}.0`;
//     // 예시 - 함수 변경(일단! custom에 default 함수 그대로 복사해서 통째로 바꾼다. - 아직 더 좋은 방법이 생각나지 않는다. ㅠㅠ )
//     // if(CUSTOM_FUNCTION.getApiServerList !== null) {
//     //     CONST.FUNCTION.getApiServerList = CUSTOM_FUNCTION.getApiServerList;
//     // }
//     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     INIT: function () {
//         let date = new Date();
//         let stime = date.toString('yyyy-MM-dd HH:mm:ss');
//         console.log('now - ', stime);
//         // 아래 영역에 코드 작성
//         ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     },
//     POST_PROCESS: {
//         index: function () {
//             // 아래 영역에 코드 작성
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//         },

//         // controller에 index이외의 action이 있다면 직접 추가
//         ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     },
//     SET_FUNCTION: function (defaultFunction, customFunction) {
//         // vanilla 로 구현 방법이 생각이 안나서 jquery 씀.
//         $.extend(true, defaultFunction, customFunction);
//         CONST.FUNCTION = defaultFunction;
//     },
//     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// };
// CONST.STOMP.SERVER_TYPE.TITLE[CONST.STOMP.SERVER_TYPE.CODE.EVENT] =
//     CONST.STOMP.SERVER_TYPE.STR.EVENT;
// CONST.STOMP.SERVER_TYPE.TITLE[CONST.STOMP.SERVER_TYPE.CODE.DATA] =
//     CONST.STOMP.SERVER_TYPE.STR.DATA;
// CONST.STOMP.EVENT_TYPE.OBJ_NAME[CONST.STOMP.EVENT_TYPE.CODE.MEASUREMENT] =
//     'measurementInfo';
// CONST.STOMP.EVENT_TYPE.OBJ_NAME[CONST.STOMP.EVENT_TYPE.CODE.WARD] = 'wardList';
// CONST.INIT();

// export { CONST };

// let custom = {
//     preFileLoading: async function () {
//         return new Promise(function (resolve, reject) {
//             let loadingEnd = function () {
//                 resolve(true);
//             };
//             let options = {
//                 files: [
//                     `https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css${ver_string}`,
//                     // `/assets/css/common/bootstrap/bootstrap-3.3.2.min.css${ver_string}`,
//                     `/assets/css/theme/${GBL.DESIGN.THEME}/reset.css${ver_string}`,
//                     `/assets/css/theme/${GBL.DESIGN.THEME}/common.css${ver_string}`,
//                     `/assets/css/theme/${GBL.DESIGN.THEME}/style.css${ver_string}`,
//                     `/assets/css/theme/${GBL.DESIGN.THEME}/add.css${ver_string}`,
//                     // `/js/socket/sockjs-client/1.5.0/sockjs.js`,
//                     // `/js/socket/stomp.js/2.3.3/stomp.js`
//                 ],
//                 errorAfterType: 'stop',
//                 callback: loadingEnd,
//             };
//             if (GBL.DEEP_COPY.TYPE === 'cloneDeep') {
//                 options.files.push(
//                     `/js/util/lodash/lodash-4.17.21.min.js${ver_string}`
//                 );
//             }
//             let fileLoading = new preFileLoading();
//             fileLoading.setInit(options);
//             fileLoading.run();
//         });
//     },
//     process: {
//         init: function () {
//             console.log('custom process - init');
//             GBL.DESIGN.SET_SITE_NAME();
//             GBL.DESIGN.SET_SITE_META_ALL();

//             // 아래 영역에 코드 작성
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             // 자동 로그인 확인.
//             // if(GBL.ACCOUNT.IS_AUTH() === false) {
//             //     GBL.ACCOUNT.CHECK.AUTO_LOGIN();
//             // }
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//         },
//         preForOutOfControllerScope: function () {
//             console.log('custom process - preForOutOfControllerScope');

//             // 아래 영역에 코드 작성(공통부분)
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             // 디자인에서 직접 선언을 하지 않고, 다른 controller, model, module에서 선언한 이벤트 제거
//             for (let i = 0; i < CUSTOM.EVENT.HTML.length; i++) {
//                 $(`${CUSTOM.EVENT.HTML[i]}`).unbind();
//             }
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//         },
//         postForOutOfControllerScope: function () {
//             console.log('custom process - postForOutOfControllerScope');
//             GBL.MODULE.IS_LOADING['popup'] = Seers.Loader.moduleLoad(
//                 'popup',
//                 'index'
//             );
//         },
//         pre: function () {
//             console.log('custom process - pre');

//             // 아래 영역에 코드 작성(공통부분)
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             // 페이지가 바뀔때마다 신규 호출 개수를 조회한다.(향후 스트림으로 처리를 할 지도 모름)
//             // 인증이 됐을 경우에만..
//             if (GBL.ACCOUNT.IS_AUTH() === true) {
//                 // custom.preprocess.getUnReadCallCount();
//             }
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////

//             //메뉴 변경 시 액션 처리 전 처리되어야 할 것들..
//             if (
//                 GBL.WINDOW_HISTORY_STATE.IS_CHANGE() === true ||
//                 GBL.WINDOW_HISTORY_STATE.IS_SUB_CHANGE() === true ||
//                 GBL.WINDOW_HISTORY_STATE.IS_FULL_CHANGE() === true
//             ) {
//                 // 아래 영역에 코드 작성
//                 ///////////////////////////////////////////////////////////////////////////////////////////////////////
//                 ///////////////////////////////////////////////////////////////////////////////////////////////////////
//             }
//         },
//         post: function () {
//             console.log('custom process - post');

//             // 아래 영역에 코드 작성(공통부분)
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////

//             //메뉴 변경 시 액션 처리 후 처리되어야 할 것들..
//             if (
//                 GBL.WINDOW_HISTORY_STATE.IS_CHANGE() === true &&
//                 GBL.WINDOW_HISTORY_STATE.GET_NOW_CONTROLLER() == 'patient'
//             ) {
//                 // 아래 영역에 코드 작성
//                 ///////////////////////////////////////////////////////////////////////////////////////////////////////
//                 // 무조건 세션 리프레시는 초기화
//                 GBL.SESSION_RENEW.INTERVAL.START = false;
//                 ///////////////////////////////////////////////////////////////////////////////////////////////////////
//             }
//         },
//         reset: function () {
//             console.log('custom process - reset');

//             // 아래 영역에 코드 작성
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             localStorage.clear();
//             sessionStorage.clear();
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//         },
//         afterLogin: function (parameters = null) {
//             console.log('custom process - afterLogin');

//             // 아래 영역에 코드 작성
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             // 반드시 custom/constant.js에 아래 전역변수를 선언해야한다.
//             if (parameters !== null) {
//                 if (CUSTOM.MODULE['socket'].STOMP.CLIENT === null) {
//                     let socketModuleParameter = null;
//                     if (parameters.hasOwnProperty('loginResponse') === true) {
//                         if (
//                             parameters.loginResponse.hasOwnProperty(
//                                 'apiServerInfoList'
//                             ) === true
//                         ) {
//                             socketModuleParameter = {
//                                 objList:
//                                     parameters.loginResponse.apiServerInfoList,
//                             };
//                         }
//                     }
//                     GBL.MODULE.IS_LOADING['socket'] = Seers.Loader.moduleLoad(
//                         'socket',
//                         'index',
//                         socketModuleParameter
//                     );
//                 }
//             }

//             if (GBL.SESSION_RENEW.IS_USE === true) {
//                 setTimeout(
//                     custom.sessionRenew,
//                     GBL.SESSION_RENEW.INTERVAL.TERM
//                 );
//             }
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//         },
//         afterLogout: function () {
//             console.log('custom process - post');

//             // 아래 영역에 코드 작성
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             if (typeof SOCKET_D3 !== 'undefined') {
//                 SOCKET_D3.CHART.setAllDataInit('all');
//             }
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//         },
//         error: function () {
//             console.log('custom process - post');

//             // 아래 영역에 코드 작성
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             // 다르게 처리를 원할 경우 아래 내용을 주석처리 후 추가
//             Seers.Loader.directControllerLoad('error', 'viewForErrorPage');
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//         },
//         sessionStorageInit: function () {
//             console.log('custom process - sessionStorageInit');

//             // 아래 영역에 코드 작성
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             // 새로고침을 하면 기존 session 스토리지 값을 모두 초기화한다.
//             // 특정 항목을 남기려면, 아래 내용을 주석 처리하고, 새 코드를 작성한다.
//             sessionStorage.clear();
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//         },
//     },
//     etc: {
//         // 아래 영역에 코드 작성
//         ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         decimalToHexadecimal: function (value, notation = 16) {
//             let number = `000${value.toString(notation)}`.slice(-5);
//             return `${number.slice(0, 1).toUpperCase()}:${number
//                 .slice(1, 3)
//                 .toUpperCase()}:${number.slice(-2).toUpperCase()}`;
//         },
//         getMacaddress: function (type = CUSTOM.DEVICE.TYPE.CODE.ECG, value) {
//             if (type == CUSTOM.DEVICE.TYPE.CODE.ECG) {
//                 return `${
//                     CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.ECG
//                 }${custom.etc.decimalToHexadecimal(value)}`;
//             } else if (type == CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE) {
//                 return `${
//                     CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.TEMPERATURE
//                 }${custom.etc.decimalToHexadecimal(value)}`;
//             } else if (type == CUSTOM.DEVICE.TYPE.CODE.TAG) {
//                 return `${
//                     CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.TAG
//                 }${custom.etc.decimalToHexadecimal(value)}`;
//             }
//             return CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.SPO2;
//         },
//         showGateway: function () {
//             let gatewayShowId = ['zaid', 'franklin'];
//             let showGateway = function () {
//                 for (let i = 0; i < gatewayShowId.length; i++) {
//                     if (GBL.ACCOUNT.INFO.id.indexOf(gatewayShowId[i]) !== -1) {
//                         return true;
//                     }
//                 }
//                 return false;
//             };
//             if (
//                 GBL.ACCOUNT.INFO.isZaid === true ||
//                 (showGateway() && GBL.ACCOUNT.INFO.organizationCode === 'SEERS')
//             ) {
//                 if (
//                     showGateway() &&
//                     GBL.ACCOUNT.INFO.organizationCode === 'SEERS'
//                 ) {
//                     $('#contentsBySubMenuGateway').show();
//                     $('#btn_new_firmware').show();
//                 }
//             }
//         },
//         ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     },

//     request: {
//         // etcParams = {isFormData: false} // 계속 추가됨
//         api: function (
//             url,
//             parameter,
//             onSuccessFunc = null,
//             onSuccessParams = null,
//             header = null,
//             etcParams = { isFormData: false }
//         ) {
//             // fake 여부 확인해서 처리
//             let fakeApi = false;
//             if (typeof GBL.API.FAKE[url] !== 'undefined') {
//                 fakeApi = GBL.API.FAKE[url];
//             }
//             if (fakeApi === true) {
//                 return custom.request.fake(
//                     url,
//                     parameter,
//                     onSuccessFunc,
//                     onSuccessParams
//                 );
//             } else {
//                 // 에러 처리는 따로 파라미터로 받지 않고, 공통 처리한다.
//                 let errorFunction = function (data) {
//                     // ajax success 에서의 에러 처리
//                     if (data.hasOwnProperty('error') === true) {
//                         // 로그인 화면으로 이동..
//                         if (
//                             data.error == GBL.API.RESPONSE.CODE.SESSION_CLOSED
//                         ) {
//                             // alert(log);
//                             Seers.Loader.goMove('seers', 'login');
//                             return;
//                         }
//                         if (GBL.SITE_MENU.CHOICE_CONTROLLER != 'login') {
//                             sessionStorage.setItem(
//                                 'error',
//                                 JSON.stringify(data)
//                             );
//                             // Seers.Loader.directControllerLoad(
//                             //     'error',
//                             //     'viewForErrorPage'
//                             // );
//                         } else {
//                             let msg = GBL.ACCOUNT.CHECK.LOGIN_FAIL.GET_MESSAGE(
//                                 data.message
//                             );
//                             Seers.Loader.moduleLoad('alert', 'index', {
//                                 msg: msg,
//                                 id: 'alert',
//                             });
//                         }
//                     }

//                     // ajax error 에서의 에러 처리
//                     else {
//                         let error = JSON.parse(data.responseText);
//                         if (error.status === 404) {
//                         }
//                         sessionStorage.setItem(
//                             'error',
//                             JSON.stringify(data.responseText)
//                         );
//                         // Seers.Loader.directControllerLoad(
//                         //     'error',
//                         //     'viewForErrorPage'
//                         // );
//                     }
//                 };
//                 let req = new requestAPI();
//                 let defaultParams = custom.request.getDefaultParam(
//                     true,
//                     parameter
//                 );
//                 let params = null;
//                 let isFormData = false;
//                 if (etcParams.hasOwnProperty('isFormData') === true) {
//                     isFormData = etcParams.isFormData;
//                 }
//                 if (isFormData === true) {
//                     params = new FormData();
//                     params.append('requestUserCode', parameter.requestUserCode);
//                     if (parameter.hasOwnProperty('organizationCode') === true) {
//                         params.append(
//                             'organizationCode',
//                             parameter.organizationCode
//                         );
//                     }
//                     params.append('fwVersion', parameter.fwVersion);
//                     params.append('checkSum', parameter.checkSum);
//                     params.append('level', parameter.level);
//                     params.append('etc', parameter.etc);
//                     params.append('file', parameter.file);
//                     params.append('fileName', parameter.fileName);
//                     for (const [key, value] of Object.entries(defaultParams)) {
//                         params.append(key, value);
//                     }
//                 } else {
//                     params = Object.assign(defaultParams, parameter);
//                 }

//                 if (onSuccessFunc == null) {
//                     req.setAsync(false);
//                 }
//                 if (onSuccessParams != null) {
//                     req.setSuccessParameters(onSuccessParams);
//                 }
//                 req.setErrorFunction(errorFunction);

//                 if (header != null) {
//                     req.setHeader(header);
//                 } else {
//                     req.setHeader({
//                         'Content-Type': 'application/json;charset=UTF-8',
//                         'SX-Auth-Token': GBL.ACCOUNT.TOKEN,
//                         'SX-Client-IP': null,
//                     });
//                 }

//                 if (url.indexOf('http') == -1) {
//                     req.setUrl(GBL.API.BASE_URL + url);
//                 } else {
//                     req.setUrl(url);
//                 }
//                 req.setParameter(params);
//                 return req.API(onSuccessFunc, { isFormData: isFormData });
//             }
//         },
//         fake: function (
//             url,
//             parameter,
//             onSuccessFunc = null,
//             onSuccessParams = null
//         ) {
//             let fakeAsyncFunction = async function () {
//                 onSuccessFunc(
//                     Object.assign({}, { result: true }, FAKE_API_JSON[url]),
//                     parameter,
//                     onSuccessParams
//                 );
//                 return true;
//             };

//             if (onSuccessFunc !== null) {
//                 fakeAsyncFunction();
//             } else {
//                 return Object.assign({}, { result: true }, FAKE_API_JSON[url]);
//             }
//             return true;
//         },

//         getDefaultParam: function (authNotInclude = false, parameter = {}) {
//             let params = {};
//             let date = new Date();

//             if (GBL.ACCOUNT.INFO !== null) {
//                 if (parameter.hasOwnProperty('requester') === false) {
//                     params.requester = GBL.ACCOUNT.INFO.userCode;
//                 }
//                 if (parameter.hasOwnProperty('organizationCode') === false) {
//                     params.organizationCode = GBL.ACCOUNT.INFO.organizationCode;
//                 }
//             }
//             if (authNotInclude === false) {
//                 params.requester = null;
//                 params.organizationCode = null;
//             }

//             params.deviceKind = custom.request.getDeviceKindCode();
//             params.timezone = 'Asia/Seoul';
//             params.gmtCode = commonRequest().gmtCode;
//             params.requestDateTime = date.toString('yyyy-MM-dd HH:mm:ss');
//             params.systemTime = date.getTime();
//             params.countryCode = 'Ko';
//             params.countryName = 'Korea';

//             return params;
//         },
//         getDeviceKindCode: function () {
//             return 3;
//         },
//     },

//     preprocess: {
//         getUnReadCallCount: function () {
//             let resultFunction = function (response, obj) {
//                 $('[data-content-name="unReadCallCount"]').hide();
//                 if (response.result === true) {
//                     if (response.count > 0) {
//                         $('[data-content-name="unReadCallCount"]').text(
//                             response.count
//                         );
//                         $('[data-content-name="unReadCallCount"]').show();
//                     }
//                 }
//             };

//             // 호출 데이타 조회
//             let passingParams = {
//                 requester: GBL.ACCOUNT.INFO.userCode,
//             };
//             custom.request.api(
//                 GBL.API.URL.CALL.SelectUnReadCount,
//                 passingParams,
//                 resultFunction
//             );
//         },
//         parentClassChange: function (choiceClass = null) {
//             $(`${GBL.DESIGN.PAGE_PARENT_DIV_NAME}`).attr('class', choiceClass);
//         },
//         headerInfoChange: function (title = null, info = null) {
//             $(`#headerTitle`).text(title);
//             $(`#headerInfo`).text(info);
//         },
//     },

//     sessionRenew: function () {
//         let successSessionRenew = function (response) {
//             if (response.result === true) {
//                 CookieHelper.set(
//                     'userAccount',
//                     CookieHelper.get('userAccount'),
//                     null
//                 );
//                 CookieHelper.set('accessToken', response.accessToken, null);
//                 GBL.ACCOUNT.TOKEN = response.accessToken;
//                 GBL.SESSION_RENEW.INTERVAL.START = true;
//                 setTimeout(
//                     custom.sessionRenew,
//                     GBL.SESSION_RENEW.INTERVAL.TERM
//                 );
//             }
//         };
//         custom.request.api(
//             GBL.API.URL.ACCOUNT.UTIL.SESSION_RENEW,
//             {},
//             successSessionRenew
//         );
//     },
// };

// export const FUNCTION = {
//     UTIL: {
//         getApiServerList: function () {
//             let objList = null;
//             let passingParams = {
//                 organizationCode,
//                 requester,
//             };
//             let response = custom.request.api(
//                 CONST.API.URL.SERVER.STREAM_LIST,
//                 passingParams
//             );
//             if (response) {
//                 objList = response.apiServerInfoList;
//             }

//             console.log('objList');
//             console.log(objList);
//             return objList;
//         },
//         connectStreamServer: function (parameter = null) {
//             let objList = null;
//             if (parameter !== null) {
//                 if (parameter.hasOwnProperty('objList') === true) {
//                     objList = parameter.objList;
//                 }
//             }
//             if (objList === null) {
//                 objList = FUNCTION.UTIL.getApiServerList();
//             }
//             console.log('objList==');
//             console.log(objList);
//             if (objList !== undefined) {
//                 CUSTOM.MODULE['socket'].STOMP.CLIENT = [];
//                 for (let i = 0; i < objList.length; i++) {
//                     let selectServer = objList[i];
//                     if (
//                         selectServer.serverType !=
//                             CONST.STOMP.SERVER_TYPE.CODE.GATEWAY &&
//                         (selectServer.unused === 0 ||
//                             selectServer.unused === false)
//                     ) {
//                         let clientKeyName = 'etc';
//                         if (
//                             typeof CONST.STOMP.SERVER_TYPE.TITLE[
//                                 selectServer.serverType
//                             ] != 'undefined'
//                         ) {
//                             clientKeyName =
//                                 CONST.STOMP.SERVER_TYPE.TITLE[
//                                     selectServer.serverType
//                                 ];
//                         }
//                         clientKeyName = `${clientKeyName}_${(
//                             '0' + String(selectServer.apiServerId)
//                         ).substr(-2)}`;
//                         let connType = CONST.STOMP.CONNECT_TYPE.CODE.WEB;
//                         if (
//                             selectServer.serverType ==
//                             CONST.STOMP.SERVER_TYPE.CODE.EVENT
//                         ) {
//                             connType = CONST.STOMP.CONNECT_TYPE.CODE.EVENT;
//                         }
//                         let passingParameter = {
//                             'SX-Auth-Token': GBL.ACCOUNT.TOKEN,
//                             deviceKind: custom.request.getDeviceKindCode(),
//                             connType: connType,
//                             apiRoute: selectServer.apiRoute,
//                             requester: GBL.ACCOUNT.INFO.userCode,
//                         };
//                         let streamming = new SockJS(
//                             `${selectServer.baseUrl}/ws?SX-API-Route=${selectServer.apiRoute}&clientKeyName=${clientKeyName}&connType=${connType}`
//                         );
//                         console.log(
//                             `${selectServer.baseUrl}/ws?SX-API-Route=${selectServer.apiRoute}&clientKeyName=${clientKeyName}&connType=${connType} >> sessionid::::::::::::`,
//                             streamming._generateSessionId()
//                         );
//                         CUSTOM.MODULE['socket'].STOMP.CLIENT[clientKeyName] =
//                             Stomp.over(streamming);
//                         CUSTOM.MODULE['socket'].STOMP.CLIENT[
//                             clientKeyName
//                         ].debug = null;
//                         CUSTOM.MODULE['socket'].STOMP.CLIENT[
//                             clientKeyName
//                         ].connect(
//                             passingParameter,
//                             FUNCTION.CALLBACK.stompOnConnected,
//                             FUNCTION.CALLBACK.stompOnError
//                         );
//                         // CUSTOM.MODULE['socket'].STOMP.CLIENT[clientKeyName].heartbeat.outgoing = 1000 * 10; // default 1000 * 10
//                     }
//                 }
//             }
//         },
//     },

//     CALLBACK: {
//         stompOnConnected: function (response) {
//             let tempParameter = String.getUrlParam(this.ws.url);
//             if (
//                 typeof tempParameter['clientKeyName'] != 'undefined' &&
//                 typeof tempParameter['connType'] != 'undefined'
//             ) {
//                 // 2021-10-07 생체 신호 구독은 2가지로 구분함
//                 // 1. 기존 구조는 BioSignalData
//                 // 2. 마지막 값 구조는 BioSignalSimpleData
//                 let type = CONST.STOMP.SERVER_TYPE.STR.DATA.toLowerCase(); // "data"
//                 // 2021-07-07 event server 삭제, data 서버에서 모두 사용
//                 // data 구독은 측정을 볼때 처리하고, event 는 로그인 시 바로 구독 처리
//                 if (
//                     tempParameter['connType'] ==
//                     CONST.STOMP.CONNECT_TYPE.CODE.WEB
//                 ) {
//                     CUSTOM.MODULE['socket'].STOMP.CLIENT_KEY['DATA'] =
//                         tempParameter['clientKeyName'];

//                     type = CONST.STOMP.SERVER_TYPE.STR.EVENT.toLowerCase(); // "event";
//                     CUSTOM.MODULE['socket'].STOMP.CLIENT_KEY['EVENT'] =
//                         tempParameter['clientKeyName'];
//                     FUNCTION.CALLBACK.stompForSubscribe(type);
//                 }

//                 FUNCTION.POST.stompOnConnected();
//             }
//         },
//         stompOnError: function (error) {
//             console.log('error::::::::::::', error);
//         },
//         stompForSubscribe: function (type, measurementCode = null) {
//             let processConnectSubscribe = function () {
//                 let keyname = null;
//                 if (type === CONST.STOMP.SERVER_TYPE.STR.EVENT.toLowerCase()) {
//                     keyname = CUSTOM.MODULE['socket'].STOMP.CLIENT_KEY['EVENT'];
//                 } else {
//                     keyname = CUSTOM.MODULE['socket'].STOMP.CLIENT_KEY['DATA'];
//                 }

//                 if (keyname !== null) {
//                     let url = `/topic/public/${type}`;
//                     if (measurementCode != null) {
//                         url = `/topic/public/${type}/${measurementCode}`;
//                     }
//                     if (measurementCode != null) {
//                         if (type === CONST.STOMP.DATA_TYPE.NORMAL) {
//                             CUSTOM.MODULE['socket'].STOMP.SUBSCRIBE[
//                                 measurementCode
//                             ] = CUSTOM.MODULE['socket'].STOMP.CLIENT[
//                                 keyname
//                             ].subscribe(
//                                 url,
//                                 FUNCTION.CALLBACK.stompOnMessageReceived
//                             );
//                         } else {
//                             CUSTOM.MODULE['socket'].STOMP.SUBSCRIBE[
//                                 measurementCode
//                             ] = CUSTOM.MODULE['socket'].STOMP.CLIENT[
//                                 keyname
//                             ].subscribe(
//                                 url,
//                                 FUNCTION.CALLBACK
//                                     .stompOnMessageReceivedForSimple
//                             );
//                         }
//                     } else {
//                         CUSTOM.MODULE['socket'].STOMP.SUBSCRIBE[
//                             CONST.STOMP.SERVER_TYPE.STR.EVENT.toLowerCase()
//                         ] = CUSTOM.MODULE['socket'].STOMP.CLIENT[
//                             keyname
//                         ].subscribe(
//                             url,
//                             FUNCTION.CALLBACK.stompOnMessageReceived
//                         );
//                     }
//                 } else {
//                     setTimeout(function () {
//                         processConnectSubscribe();
//                     }, 100);
//                 }
//             };
//             setTimeout(function () {
//                 processConnectSubscribe();
//             }, 100);
//         },
//         stompOnMessageReceivedForSimple: function (response) {
//             let getDeviceObject = function (type, meaurementCode) {
//                 return [
//                     $(
//                         `#${CUSTOM.DEVICE.DATA.TYPE.STR[type]}_title_${meaurementCode}`
//                     ),
//                     $(
//                         `#${CUSTOM.DEVICE.DATA.TYPE.STR[type]}_value_${meaurementCode}`
//                     ),
//                 ];
//             };
//             let isDisconnect = function (status) {
//                 return (
//                     status === CUSTOM.DEVICE.STATUS.CODE.RECODING_START ||
//                     status === CUSTOM.DEVICE.STATUS.CODE.BLE_CONNECTED ||
//                     status === CUSTOM.DEVICE.STATUS.CODE.LEAD_ON
//                 );
//             };

//             let obj = null;
//             let objTitle = null;
//             let message = JSON.parse(response.body);
//             if (message.hasOwnProperty('measurementCode') === true) {
//                 if (message.measurementCode !== null) {
//                     // bioSignalSimpleData 값이 있으면 마지막 데이타
//                     if (
//                         message.hasOwnProperty('bioSignalSimpleData') === true
//                     ) {
//                         if (message.bioSignalSimpleData !== null) {
//                             [objTitle, obj] = getDeviceObject(
//                                 CUSTOM.DEVICE.DATA.TYPE.CODE.HEART,
//                                 message.measurementCode
//                             );
//                             if (obj.text() === '') {
//                                 obj.text('-');
//                                 obj.removeClass('disconnect');
//                             }
//                             if (message.bioSignalSimpleData.hr > 0) {
//                                 objTitle.removeClass('disconnect');
//                                 obj.removeClass('disconnect');
//                                 obj.text(message.bioSignalSimpleData.hr);
//                             }

//                             [objTitle, obj] = getDeviceObject(
//                                 CUSTOM.DEVICE.DATA.TYPE.CODE.EWS,
//                                 message.measurementCode
//                             );
//                             if (obj.text() === '') {
//                                 obj.text('-');
//                                 obj.removeClass('disconnect');
//                             }
//                             if (message.bioSignalSimpleData.ews > -1) {
//                                 objTitle.removeClass('disconnect');
//                                 obj.removeClass('disconnect');
//                                 obj.text(message.bioSignalSimpleData.ews);
//                             }

//                             [objTitle, obj] = getDeviceObject(
//                                 CUSTOM.DEVICE.DATA.TYPE.CODE.ACT,
//                                 message.measurementCode
//                             );
//                             if (obj.text() === '') {
//                                 obj.text('-');
//                                 obj.removeClass('disconnect');
//                             }
//                             if (message.bioSignalSimpleData.activity > 0) {
//                                 objTitle.removeClass('disconnect');
//                                 obj.removeClass('disconnect');
//                                 obj.text(message.bioSignalSimpleData.activity);
//                             }

//                             [objTitle, obj] = getDeviceObject(
//                                 CUSTOM.DEVICE.DATA.TYPE.CODE.TEMPERATURE,
//                                 message.measurementCode
//                             );
//                             if (obj.text() === '') {
//                                 obj.text('-');
//                                 obj.removeClass('disconnect');
//                             }
//                             if (message.bioSignalSimpleData.temp > 0) {
//                                 objTitle.removeClass('disconnect');
//                                 obj.removeClass('disconnect');
//                                 obj.text(
//                                     message.bioSignalSimpleData.temp.toFixed(1)
//                                 );
//                             }
//                         }
//                     }

//                     // deviceStatusInfo 값이 있으면 장비 상태
//                     if (message.hasOwnProperty('deviceStatusInfo') === true) {
//                         if (message.deviceStatusInfo !== null) {
//                             // 아래 제외는 모두 끊어진 상태
//                             // DEVICE_STATUS - RECODING_START/ BLE_CONNECTED/ LEAD_ON

//                             // 심전도 관련(hr, ews, activity)
//                             if (
//                                 message.deviceStatusInfo.deviceType ===
//                                 CUSTOM.DEVICE.DATA.TYPE.CODE.ECG
//                             ) {
//                                 if (
//                                     isDisconnect(
//                                         message.deviceStatusInfo
//                                             .deviceStatusInfoId
//                                     ) === false &&
//                                     message.deviceStatusInfo
//                                         .deviceStatusInfoId !==
//                                         DEVICE_STATUS.NONE
//                                 ) {
//                                     [objTitle, obj] = getDeviceObject(
//                                         CUSTOM.DEVICE.DATA.TYPE.CODE.HEART,
//                                         message.measurementCode
//                                     );
//                                     objTitle.addClass('disconnect');
//                                     obj.addClass('disconnect');

//                                     [objTitle, obj] = getDeviceObject(
//                                         CUSTOM.DEVICE.DATA.TYPE.CODE.EWS,
//                                         message.measurementCode
//                                     );
//                                     objTitle.addClass('disconnect');
//                                     obj.addClass('disconnect');

//                                     [objTitle, obj] = getDeviceObject(
//                                         CUSTOM.DEVICE.DATA.TYPE.CODE.ACT,
//                                         message.measurementCode
//                                     );
//                                     objTitle.addClass('disconnect');
//                                     obj.addClass('disconnect');
//                                 } else {
//                                     [objTitle, obj] = getDeviceObject(
//                                         CUSTOM.DEVICE.DATA_TYPE.HEART,
//                                         message.measurementCode
//                                     );
//                                     objTitle.removeClass('disconnect');
//                                     obj.removeClass('disconnect');

//                                     [objTitle, obj] = getDeviceObject(
//                                         CUSTOM.DEVICE.DATA_TYPE.EWS,
//                                         message.measurementCode
//                                     );
//                                     objTitle.removeClass('disconnect');
//                                     obj.removeClass('disconnect');

//                                     [objTitle, obj] = getDeviceObject(
//                                         CUSTOM.DEVICE.DATA_TYPE.ACT,
//                                         message.measurementCode
//                                     );
//                                     objTitle.removeClass('disconnect');
//                                     obj.removeClass('disconnect');
//                                 }
//                             }

//                             // 체온
//                             else if (
//                                 message.deviceStatusInfo.deviceType ===
//                                 CUSTOM.DEVICE.DATA.TYPE.CODE.TEMPERATURE
//                             ) {
//                                 if (
//                                     isDisconnect(
//                                         message.deviceStatusInfo
//                                             .deviceStatusInfoId
//                                     ) === false
//                                 ) {
//                                     [objTitle, obj] = getDeviceObject(
//                                         CUSTOM.DEVICE.DATA.TYPE.CODE
//                                             .TEMPERATURE,
//                                         message.measurementCode
//                                     );
//                                     objTitle.addClass('disconnect');
//                                     obj.addClass('disconnect');
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         },
//         stompOnMessageReceived(response) {
//             let message = JSON.parse(response.body);
//             // 이벤트 관련 처리
//             if (message.hasOwnProperty('eventType') === true) {
//                 if (
//                     message.eventType == CONST.STOMP.EVENT_TYPE.CODE.MEASUREMENT
//                 ) {
//                     Seers.Loader.moduleLoad(
//                         'patient_change',
//                         'index',
//                         message[
//                             CONST.STOMP.EVENT_TYPE.OBJ_NAME[
//                                 CONST.STOMP.EVENT_TYPE.CODE.MEASUREMENT
//                             ]
//                         ]
//                     );
//                 } else if (
//                     message.eventType == CONST.STOMP.EVENT_TYPE.CODE.WARD
//                 ) {
//                     if (
//                         url.getNowController() == 'patient' &&
//                         url.getNowAction() != 'view'
//                     ) {
//                         GBL.MODULE.IS_LOADING['ward_list'] =
//                             Seers.Loader.moduleLoad('ward_list', 'index', {
//                                 wardList:
//                                     message[
//                                         CONST.STOMP.EVENT_TYPE.OBJ_NAME[
//                                             CONST.STOMP.EVENT_TYPE.CODE.WARD
//                                         ]
//                                     ],
//                             });
//                     }
//                 }
//             }

//             // 데이타 관련 처리
//             // 기존에는 streamPacket 상위 키 하위값에 정보가 있었는데, 이제는 해당 키값이 없어짐(2021.05.24 확인)
//             // else if(message.hasOwnProperty("streamPacket") === true) {
//             else {
//                 let date = new Date();
//                 let chartId = null;
//                 let streamPacket = message;
//                 // console.log("IPMAPI.message::::::::::", message);
//                 // console.log("streamPacket.ecgDataList.length::::::::::", streamPacket.ecgDataList.length);
//                 // console.log("streamPacket.ecgDataList::::::::::", streamPacket.ecgDataList);
//                 // console.log("streamPacket::::::::::", streamPacket);
//                 // console.log("stompOnMessageReceived.now::::::::::::", date.toString('yyyy-MM-dd HH:mm:ss'));
//                 if (streamPacket != null) {
//                     // ecg 데이타 유효성 검사하여 유효성이 안될경우 null 처리 하기
//                     if (streamPacket.bioSignalData !== null) {
//                         if (
//                             streamPacket.bioSignalData.hasOwnProperty(
//                                 'ecgDataList'
//                             ) !== 'undefined'
//                         ) {
//                             streamPacket.bioSignalData.ecgDataList =
//                                 SOCKET_D3.CHART.isValidEcgData(
//                                     streamPacket.bioSignalData.ecgDataList
//                                 );
//                         }
//                         if (
//                             streamPacket.bioSignalData.hasOwnProperty(
//                                 'ewsDataList'
//                             ) !== 'undefined'
//                         ) {
//                             streamPacket.bioSignalData.ewsDataList =
//                                 SOCKET_D3.CHART.isValidEwsData(
//                                     streamPacket.bioSignalData.ewsDataList
//                                 );
//                         }
//                     }

//                     // if(streamPacket.measurementCode === "KR_HUMC_2112140950_W390") { // 박준웅
//                     if (
//                         CUSTOM.CHART.CONFIG.LOG.codes.indexOf(
//                             streamPacket.measurementCode
//                         ) !== -1 &&
//                         (location.hostname === 'localhost' ||
//                             GBL.ACCOUNT.INFO.isZaid === true) &&
//                         CUSTOM.CHART.CONFIG.IGNORE.codes.indexOf(
//                             streamPacket.measurementCode
//                         ) === -1
//                     ) {
//                         console.log(
//                             'streamPacket.measurementCode:::::::::::',
//                             streamPacket.measurementCode
//                         );
//                         // console.log("streamPacket.ecgDataList::::::::::", Array.deepCopy(streamPacket.bioSignalData.ecgDataList));
//                         // console.log("streamPacket.heartRateDataList::::::::::", Array.deepCopy(streamPacket.bioSignalData.heartRateDataList));
//                         // console.log("streamPacket.tempDataList::::::::::", Array.deepCopy(streamPacket.bioSignalData.tempDataList));
//                         // console.log("streamPacket.respDataList::::::::::", Array.deepCopy(streamPacket.bioSignalData.respDataList));
//                         console.log(
//                             'streamPacket.ewsDataList::::::::::',
//                             Array.deepCopy(
//                                 streamPacket.bioSignalData.ewsDataList
//                             )
//                         );
//                     }
//                     // if(SOCKET_D3.CHART.isIgnore(streamPacket.measurementCode) === false) {
//                     if (
//                         CUSTOM.CHART.CONFIG.IGNORE.codes.indexOf(
//                             streamPacket.measurementCode
//                         ) === -1
//                     ) {
//                         // 생체 데이타
//                         if (streamPacket.bioSignalData !== null) {
//                             if (
//                                 streamPacket.deviceType ==
//                                 CUSTOM.DEVICE.TYPE.CODE.ECG
//                             ) {
//                                 if (
//                                     streamPacket.bioSignalData.ecgDataList !=
//                                         null &&
//                                     CUSTOM.CHART.CONFIG.ECG.use === true
//                                 ) {
//                                     chartId = SOCKET_D3.CHART.getChartId(
//                                         'ECG',
//                                         streamPacket.measurementCode
//                                     );
//                                     if (CUSTOM.CHART.LOG.IS_USE === true) {
//                                         console.log(
//                                             'now::::',
//                                             date.toString('yyyy-MM-dd HH:mm:ss')
//                                         );
//                                         console.log(
//                                             'streamPacket.ecgDataList::::::::::',
//                                             Array.deepCopy(
//                                                 streamPacket.bioSignalData
//                                                     .ecgDataList
//                                             )
//                                         );
//                                     }
//                                 }
//                                 if (
//                                     streamPacket.bioSignalData
//                                         .activityLevelDataList != null &&
//                                     CUSTOM.CHART.CONFIG.ACT.use === true
//                                 ) {
//                                     chartId = SOCKET_D3.CHART.getChartId(
//                                         'ACT',
//                                         streamPacket.measurementCode
//                                     );
//                                     if (CUSTOM.CHART.LOG.IS_USE === true) {
//                                         console.log(
//                                             'now::::',
//                                             date.toString('yyyy-MM-dd HH:mm:ss')
//                                         );
//                                         console.log(
//                                             'streamPacket.activityLevelDataList::::::::::',
//                                             Array.deepCopy(
//                                                 streamPacket.bioSignalData
//                                                     .activityLevelDataList
//                                             )
//                                         );
//                                     }
//                                 }
//                                 if (
//                                     streamPacket.bioSignalData.ewsDataList !=
//                                         null &&
//                                     CUSTOM.CHART.CONFIG.EWS.use === true
//                                 ) {
//                                     chartId = SOCKET_D3.CHART.getChartId(
//                                         'EWS',
//                                         streamPacket.measurementCode
//                                     );
//                                     if (CUSTOM.CHART.LOG.IS_USE === true) {
//                                         console.log(
//                                             'now::::',
//                                             date.toString('yyyy-MM-dd HH:mm:ss')
//                                         );
//                                         console.log(
//                                             'streamPacket.ewsDataList::::::::::',
//                                             Array.deepCopy(
//                                                 streamPacket.bioSignalData
//                                                     .ewsDataList
//                                             )
//                                         );
//                                     }
//                                 }
//                                 if (
//                                     streamPacket.bioSignalData
//                                         .heartRateDataList != null &&
//                                     CUSTOM.CHART.CONFIG.HEART.use === true
//                                 ) {
//                                     chartId = SOCKET_D3.CHART.getChartId(
//                                         'HEART',
//                                         streamPacket.measurementCode
//                                     );
//                                     if (CUSTOM.CHART.LOG.IS_USE === true) {
//                                         console.log(
//                                             'now::::',
//                                             date.toString('yyyy-MM-dd HH:mm:ss')
//                                         );
//                                         console.log(
//                                             'streamPacket.heartRateDataList::::::::::',
//                                             Array.deepCopy(
//                                                 streamPacket.bioSignalData
//                                                     .heartRateDataList
//                                             )
//                                         );
//                                     }
//                                 }
//                             }
//                             if (
//                                 streamPacket.deviceType ==
//                                 CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE
//                             ) {
//                                 chartId = SOCKET_D3.CHART.getChartId(
//                                     'TEMP',
//                                     streamPacket.measurementCode
//                                 );
//                                 if (
//                                     streamPacket.bioSignalData.tempDataList !=
//                                         null &&
//                                     CUSTOM.CHART.CONFIG.TEMP.use === true
//                                 ) {
//                                     if (CUSTOM.CHART.LOG.IS_USE === true) {
//                                         console.log(
//                                             'now::::',
//                                             date.toString('yyyy-MM-dd HH:mm:ss')
//                                         );
//                                         console.log(
//                                             'streamPacket.tempDataList::::::::::',
//                                             Array.deepCopy(
//                                                 streamPacket.bioSignalData
//                                                     .tempDataList
//                                             )
//                                         );
//                                     }
//                                 }
//                             }

//                             SOCKET_D3.CHART.setDataInit(
//                                 streamPacket.measurementCode
//                             );

//                             // 수신 주기보다 지연되서 데이타를 순신할 경우 해당 시간이 null인데, 수신된 값으로 업데이트 후 그래프 다시 그리기
//                             if (
//                                 streamPacket.deviceType ==
//                                     CUSTOM.DEVICE.TYPE.CODE.ECG ||
//                                 streamPacket.deviceType ==
//                                     CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE
//                             ) {
//                                 if (
//                                     streamPacket.deviceType ==
//                                     CUSTOM.DEVICE.TYPE.CODE.ECG
//                                 ) {
//                                     CUSTOM.MODULE['socket'].RECEIVE.COUNT.ECG[
//                                         streamPacket.measurementCode
//                                     ]++;
//                                 }
//                                 if (
//                                     streamPacket.deviceType ==
//                                     CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE
//                                 ) {
//                                     CUSTOM.MODULE['socket'].RECEIVE.COUNT
//                                         .TEMPERATURE[
//                                         streamPacket.measurementCode
//                                     ]++;
//                                 }
//                             }

//                             for (let key in CUSTOM.CHART.CONFIG) {
//                                 if (
//                                     streamPacket.deviceType ==
//                                         CUSTOM.CHART.CONFIG[key][
//                                             'deviceType'
//                                         ] &&
//                                     CUSTOM.CHART.CONFIG[key]['use'] === true &&
//                                     CUSTOM.CHART.CONFIG.IGNORE.codes.indexOf(
//                                         streamPacket.measurementCode
//                                     ) === -1
//                                 ) {
//                                     let streamPacketList =
//                                         streamPacket.bioSignalData[
//                                             CUSTOM.CHART.CONFIG[key][
//                                                 'receiveVariable'
//                                             ]
//                                         ];
//                                     if (streamPacketList != null) {
//                                         // ECG, TEMP connect 처리
//                                         if (
//                                             streamPacket.deviceType ==
//                                                 CUSTOM.DEVICE.TYPE.CODE.ECG ||
//                                             streamPacket.deviceType ==
//                                                 CUSTOM.DEVICE.TYPE.CODE
//                                                     .TEMPERATURE
//                                         ) {
//                                             SOCKET_D3.DEVICE.showConnect(
//                                                 CUSTOM.DEVICE.TYPE.STR[
//                                                     streamPacket.deviceType
//                                                 ],
//                                                 streamPacket.measurementCode
//                                             );
//                                             SOCKET_D3.CHART.setReceiveChartData(
//                                                 key,
//                                                 streamPacket
//                                             );
//                                         }
//                                     }
//                                 }
//                             }
//                         }

//                         // 장치 상태
//                         if (streamPacket.deviceStatusInfo !== null) {
//                             // let passingParams = {deviceType: "ECG", measurementCode: "zaid_002", status: 2, battery: null}
//                             // Seers.Loader.moduleLoad("device_info", "index", passingParams);

//                             ////////////////////////////////////////////////////////////////////////////////////////////////////////
//                             // 아직 처리 못함
//                             if (
//                                 streamPacket.deviceType ==
//                                 CUSTOM.DEVICE.TYPE.CODE.DEVICE_STATUS
//                             ) {
//                                 if (streamPacket.deviceStatusInfo != null) {
//                                     let passingParams = {
//                                         deviceType: CUSTOM.DEVICE.TYPE.STR.ECG,
//                                         measurementCode:
//                                             streamPacket.measurementCode,
//                                         status: streamPacket.deviceStatusInfo
//                                             .status,
//                                         battery: null,
//                                     };
//                                     if (
//                                         streamPacket.deviceStatusInfo
//                                             .deviceType ==
//                                         CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE
//                                     ) {
//                                         passingParams.deviceType =
//                                             CUSTOM.DEVICE.TYPE.STR.TEMPERATURE;
//                                     }
//                                     MODULE_IS_LOADING['device_info'] =
//                                         Seers.Loader.moduleLoad(
//                                             'device_info',
//                                             'index',
//                                             passingParams
//                                         );
//                                 }

//                                 // 배터리
//                                 if (
//                                     streamPacket.deviceType ==
//                                         CUSTOM.DEVICE.TYPE.CODE.ECG ||
//                                     (streamPacket.deviceType ==
//                                         CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE &&
//                                         CUSTOM.CHART.CONFIG.IGNORE.codes.indexOf(
//                                             streamPacket.measurementCode
//                                         ) === -1)
//                                 ) {
//                                     let passingParams = {
//                                         deviceType: CUSTOM.DEVICE.TYPE.STR.ECG,
//                                         measurementCode:
//                                             streamPacket.measurementCode,
//                                         status: null,
//                                         battery: streamPacket.batteryValue,
//                                     };
//                                     if (
//                                         streamPacket.deviceType ==
//                                         CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE
//                                     ) {
//                                         passingParams.deviceType =
//                                             CUSTOM.DEVICE.TYPE.STR.TEMPERATURE;
//                                     }
//                                     MODULE_IS_LOADING['device_info'] =
//                                         Seers.Loader.moduleLoad(
//                                             'device_info',
//                                             'index',
//                                             passingParams
//                                         );
//                                 }
//                             }
//                             ////////////////////////////////////////////////////////////////////////////////////////////////////////
//                         }
//                     }
//                 }
//             }
//         },
//     },

//     POST: {
//         stompOnConnected: function () {
//             // 아래 영역에 코드 작성
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             console.log('test succeess1');
//         },
//         stompOnMessageReceived: function () {
//             // 아래 영역에 코드 작성
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             console.log('test succeess2');
//         },
//         stompOnMessageReceivedForSimple: function () {
//             // 아래 영역에 코드 작성
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//             console.log('test succeess3');
//         },
//     },
// };

// FUNCTION.UTIL.connectStreamServer({
//     loginResponse: {
//         apiServerInfoList: {},
//     },
// });
