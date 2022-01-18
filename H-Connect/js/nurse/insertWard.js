
// import serverController from "../module/serverController.js";
// import commonRequest from "../module/commonRequest.js";
// import localStorageController from "../module/localStorageController.js";


const ward_Name = document.querySelector(".new_ward .content #ward_Name");
const ward_Insert_Button = document.querySelector(".new_ward .btn_list #ward_Button");

//유저 정보 
const userData = JSON.parse(localStorageController.getLocalS("userData"));

function Insert_New_Ward(){
    
    const req = JSON.stringify({
        requester: userData.userCode,
        organizationCode: userData.organizationCode,
        ward: ward_Name.value,
        orderNumber: 1,
        etc: "",
        ...commonRequest()
    })

    serverController.ajaxAwaitController("API/Manager/InsertWard", "POST", req, (res) => {
        if(res.result){
            const title = $(".new_ward .content #ward_Name").val();
            create_newWard(title);
        }
    }, (err) => {console.log(err)});
}


$(".new_ward .btn_list #ward_Button").on("click", Insert_New_Ward);