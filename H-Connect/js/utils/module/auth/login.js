'use strict';

const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { sessionController } = await import(
    importVersion('/H-Connect/js/utils/controller/sessionController.js')
);
const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

// 자동로그인 작업 예정
const userLevelHref = function auto_Login() {
    if (autoLogin_input.checked) {
        return;
    }
};

function get_Saved_Id() {
    const getId = localStorageController.getLocalS('Hconnect-id'); //로컬스토리지에 저장된 id
    if (getId) {
        $('.login #id').val(getId);
        $('.login .check #id_save').attr('checked', true);
    }
}

async function loginHisAPI(id, password) {
    const obj = {
        id,
        password,
        ...commonRequest(),
    };

    return serverController.ajaxAwaitController(
        'API/Account/LoginHIS',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}

function loginSuccessHandle(loginResult) {
    const {
        userAccount: userData,
        apiServerinfoList,
        message,
        accessToken,
    } = loginResult;
    let userLevelHref;

    sessionController.setSession('accesToken', accessToken);
    localStorageController.setLocalS('userData', userData);
    const { level } = userData;

    if (apiServerinfoList) {
        localStorageController.setLocalS(
            'apiserverinfoList',
            apiServerinfoList
        );
    }

    switch (level) {
        case 1:
            userLevelHref = 'nurse/index.html';
            break;
        case 2:
            userLevelHref = 'nurse/index.html';
            break;
        case 5:
            userLevelHref = 'doctor/index.html';
            break;
        case 8:
            userLevelHref = 'nurse/index.html';
            break;
        case 14:
            userLevelHref = 'nurse/index.html';
            break;
    }
    localStorageController.setLocalS('userLevelHref', userLevelHref);
    location.href = userLevelHref;
}

async function Login_Fetch() {
    const id_Input = $('.login #id').val();
    const pw_Input = $('.login #pw').val();

    if (id_Input === '' || pw_Input === '') {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
        return;
    }

    saved_Id();
    const loginResult = await loginHisAPI(id_Input, pw_Input);

    if (loginResult.result) {
        loginSuccessHandle(loginResult);
    } else {
        alert(
            `로그인에 실패 했습니다. ${loginResult.loginFailMaxCount}회 중 ${loginResult.loginFailCount}실패. \n ${loginResult.loginFailMaxCount}이상 실패 시, 계정이 잠겨버립니다.`
        );
    }

    // serverController.ajaxAwaitController(
    //     'API/Account/LoginHIS',
    //     'POST',
    //     req,
    //     (res) => {
    //         const {
    //             loginFailCount,
    //             loginFailMaxCount,
    //             result,
    //             userAccount: userData,
    //             apiServerinfoList,
    //             message,
    //         } = res;
    //         if (result) {
    //             sessionController.setSession('accesToken', res.accessToken);
    //             localStorageController.setLocalS('userData', userData);
    //             const level = userData.level;
    //             let userLevelHref;

    //             if (apiServerinfoList) {
    //                 localStorageController.setLocalS(
    //                     'apiserverinfoList',
    //                     apiServerinfoList
    //                 );
    //             }

    //             switch (level) {
    //                 case 1:
    //                     userLevelHref = 'nurse/index.html';
    //                     break;
    //                 case 2:
    //                     userLevelHref = 'nurse/index.html';
    //                     break;
    //                 case 5:
    //                     userLevelHref = 'doctor/index.html';
    //                     break;
    //                 case 8:
    //                     userLevelHref = 'nurse/index.html';
    //                     break;
    //                 case 14:
    //                     userLevelHref = 'nurse/index.html';
    //                     break;
    //             }
    //             localStorageController.setLocalS(
    //                 'userLevelHref',
    //                 userLevelHref
    //             );
    //             location.href = userLevelHref;
    //         } else {
    //             alert(
    //                 `로그인에 실패 했습니다. ${loginFailMaxCount}회 중 ${loginFailCount}실패. \n ${loginFailMaxCount}이상 실패 시, 계정이 잠겨버립니다.`
    //             );
    //         }
    //     },
    //     (err) => console.log(err)
    // );
}

function Enter_Press_Login(e) {
    if (e.key === 'Enter') {
        Login_Fetch();
    }
}

function saved_Id() {
    const saveId_input = $('.login .check #id_save').is(':checked'); // 아이디 저장 체크 박스 boolean
    const id_Input = $('#id').val();

    if (saveId_input) {
        localStorageController.setLocalS('Hconnect-id', id_Input);
    } else {
        localStorageController.removeLocalS('Hconnect-id');
    }
}

get_Saved_Id();

$('.login #pw').on('keypress', Enter_Press_Login);

$('.login #login_button').on('click', Login_Fetch);

$('.login .input_wrap').on('click', saved_Id);
