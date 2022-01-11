import serverController from "../module/serverController.js";
import commonRequest from "../module/commonRequest.js";

const ward_Name = document.querySelector(".new_ward .content #ward_Name");
const ward_Insert_Button = document.querySelector(".new_ward .btn_list #ward_Button");


function Insert_New_Ward(){

    const data = {
        requester: "SEERS_admin",
        organizationCode: "SEERS",
        ward: ward_Name.ariaValueMax,
        orderNumber: 1,
        etc: "",
        ...commonRequest()
    }

    const json = JSON.stringify(data);

    serverController.connectFetchController("API/Manager/InserWard", "POST", json, (res) => {
        console.log(res)
        if(res.result){
            console.log("서버 통신 성공")
        }
    }, (err) => {console.log(err)});
}

ward_Insert_Button.addEventListener("click", Insert_New_Ward);
