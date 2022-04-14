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

function auto_Login() {
    if (autoLogin_input.checked) {
        return;
    }
}

function get_Saved_Id() {
    const getId = localStorageController.getLocalS('Hconnect-id'); //로컬스토리지에 저장된 id
    if (getId) {
        $('.login #id').val(getId);
        $('.login .check #id_save').attr('checked', true);
    }
}

function Login_Fetch() {
    const id_Input = $('.login #id').val(); //아이디 input 값
    const pw_Input = $('.login #pw').val(); //비밀번호 input 값

    if (id_Input === '' || pw_Input === '') {
        return;
    }

    const req = JSON.stringify({
        id: id_Input,
        password: pw_Input,
        ...commonRequest(),
    });

    serverController.ajaxAwaitController(
        'API/Account/LoginHIS',
        'POST',
        req,
        (res) => {
            if (res.result) {
                const userData = res.userAccount;
                const apiServerinfoList = res.apiServerinfoList;

                sessionController.setSession('accesToken', res.accessToken);
                localStorageController.setLocalS('userData', userData);

                if (apiServerinfoList) {
                    localStorageController.setLocalS(
                        'apiserverinfoList',
                        apiServerinfoList
                    );
                }

                switch (userData.level) {
                    case 1:
                        location.href = 'nurse/index.html';
                        break;
                    case 2:
                        location.href = 'nurse/index.html';
                        break;
                    case 5:
                        location.href = 'doctor/index.html';
                        break;
                    case 8:
                        location.href = 'nurse/index.html';
                        break;
                    case 14:
                        location.href = 'nurse/index.html';
                        break;
                }
            } else {
                cookieController.removeCookie('accesToken');
                alert('로그인이 실패 했습니다');
            }
        },
        (err) => console.log(err)
    );
}

function Enter_Press_Login(e) {
    if (e.key === 'Enter') {
        Login_Fetch();
    }
}

function saved_Id() {
    const saveId_input = $('.login .check #id_save').is(':checked'); // 아이디 저장 체크 박스 boolean

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
