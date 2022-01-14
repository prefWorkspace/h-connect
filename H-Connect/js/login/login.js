import serverController from "../module/serverController.js";
import commonRequest from "../module/commonRequest.js";
import localStorageController from "../module/localStorage.js";
import cookieController from "../module/cookieController.js";

const TEN_YEAR_DAY = 10 * 365;

function auto_Login(){
    if(autoLogin_input.checked){
        return;    
    }
};

function get_Saved_Id(){
    const getId = localStorageController.getLocalS("Hconnect-id");  //로컬스토리지에 저장된 id
    if(getId){
        $(".login #id").value = getId;
    }
};

function Login_Fetch(){

    const id_Input = $(".login #id").val();  //아이디 input 값
    const pw_Input = $(".login #pw").val(); //비밀번호 input 값
    const saveId_input = $(".login .check #id_save").is(":checked"); // 아이디 저장 체크 박스  boolean

    const req = JSON.stringify({
            id: id_Input,
            password: pw_Input,
            ...commonRequest()
    })

    serverController.ajaxAwaitController("API/Account/LoginHIS", "POST", req, (res) => {
        console.log(res)
        if(res.result){
            const userData = res.userAccount; 
            
            cookieController.setCookie("accesToken", res.accessToken, TEN_YEAR_DAY);
            localStorageController.setLocalS("userData", userData);
            if(saveId_input) localStorageController.setLocalS("Hconnect-id", id_Input.value);
            
            switch(userData.level){
                case 1: 
                    location.href = "nurse/index.html";
                    break;
                case 2: 
                    location.href = "nurse/index.html";
                    break;
                case 5: 
                    location.href = "doctor/index.html";
                    break;
                case 8: 
                    location.href = "nurse/index.html";
                    break;
                case 14: 
                    location.href = "nurse/index.html";
                    break;
            }
        }else{
            localStorageController.removeLocalS("accesToken");
        }
    }, (err) => console.log(err));
}

function Enter_Press_Login(e){
    if(e.key === "Enter"){
        Login_Fetch();
    }
}

get_Saved_Id();

// pw_Input.addEventListener("keypress", Enter_Press_Login)
$(".login #pw").on("keypress", Enter_Press_Login);

// login_Button.addEventListener("click", Login_Fetch);
$(".login #login_button").on("click", Login_Fetch);

