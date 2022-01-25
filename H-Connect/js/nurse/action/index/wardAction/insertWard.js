
const ward_Name = document.querySelector(".new_ward .content #ward_Name");
const ward_Insert_Button = document.querySelector(".new_ward .btn_list #ward_Button");

//유저 정보 
const userData = JSON.parse(localStorageController.getLocalS("userData"));

function Insert_New_Ward(){
    const orderNumber = $(".nurse .ward .cont").length + 1;   
    const req = JSON.stringify({
        ward: ward_Name.value,
        orderNumber,
        etc: "",
        ...commonRequest()
    })
    

    serverController.ajaxAwaitController("API/Manager/InsertWard", "POST", req, (res) => {
        if(res.result){
            $("div").remove(".cont");
            getWardData();
        }
    }, (err) => {console.log(err)});
}

$(".new_ward .btn_list #ward_Button").on("click", Insert_New_Ward);
