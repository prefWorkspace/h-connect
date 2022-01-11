import serverController from "../module/serverController.js";
import commonRequest from "../module/commonRequest.js";
import localStorageController from "../module/localStorage.js";

const id_Input = document.querySelector(".login #id"); 
const pw_Input = document.querySelector(".login #pw"); 
const login_Button = document.querySelector(".login #login_button")
const saveId_input = document.querySelector(".login .check #id_save")
const autoLogin_input = document.querySelector(".login .check #auto_login");


// function auto_Login(){
//     if(autoLogin_input.checked)
// }

function get_Saved_Id(){
    const getId = localStorageController.getLocalS("Hconnect-id");
    if(getId){
        id_Input.value = getId;
    }
}

function Login_Fetch(){

    const req = JSON.stringify({
            id: id_Input.value,
            password: pw_Input.value,
            ...commonRequest()
    })

    serverController.connectFetchController("API/Account/LoginHIS", "POST", req, (res) => {
        console.log(res);
        if(res.result){
            const userData = res.userAccount;
            localStorageController.setLocalS("accesToken", res.accessToken);
            if(saveId_input.checked) localStorageController.setLocalS("Hconnect-id", id_Input.value);
            
            switch(userData.level){
                case 1: 
                    // location.href = "nurse/index.html";
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
                    // location.href = "nurse/index.html";
                    break;
            }
        }else{
            localStorageController.removeLocalS("accesToken");
        }
    }, (err) => console.log(err));
}

get_Saved_Id();
login_Button.addEventListener("click", Login_Fetch);

// onclick="location.href='nurse/index.html'"