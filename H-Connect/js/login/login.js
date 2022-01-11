import serverController from "../serverController/serverController.js";

const id_Input = document.querySelector(".login #id"); 
const pw_Input = document.querySelector(".login #pw"); 
const login_Button = document.querySelector(".login #login_button")
const saveId_input = document.querySelector(".login .check #id_save")
const autoLogin_input = document.querySelector(".login .check #auto_login");

async function Login_Fetch(){

    const req = {
        id: id_Input.value,
        password: pw_Input.value
    }
    const res_JSON = JSON.stringify(req);
    serverController.connectFetchController("API/Account/LoginHIS", "POST", res_JSON, (res) => {
        console.log(res);
    }, (err) => console.log(err));
}

console.log(login_Button);
login_Button.addEventListener("click", Login_Fetch);

// onclick="location.href='nurse/index.html'"