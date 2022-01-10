const BASIC_SERVER_URL = "http://www.hconnect-test-api.mobicareconsole.com/mobiCAREConsole/";

const id_Input = document.querySelector(".login #id"); 
const pw_Input = document.querySelector(".login #pw"); 
const login_Button = document.querySelector(".login #login")
const saveId_input = document.querySelector(".login .check #id_save")
const autoLogin_input = document.querySelector(".login .check #auto_login");

async function Login_Fetch(){

    const req = {
        id: id_Input.value,
        password: pw_Input.value
    }
    const res_JSON = JSON.stringify(req);

    await fetch(`${BASIC_SERVER_URL}API/Account/LoginHIS`, {
        credentials: "include",
        method: "POST",
        body: res_JSON,
        mode: "no-cors",
        header:{
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(res => {
        res.json()
    }).then( (data) => {
        console.log(data)
    })
    .catch( (err) => console.log(err));
}

login_Button.addEventListener("click", Login_Fetch);

// onclick="location.href='nurse/index.html'"