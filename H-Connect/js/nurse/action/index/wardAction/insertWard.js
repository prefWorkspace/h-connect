"use strict";


//유저 정보 
const userData = JSON.parse(localStorageController.getLocalS("userData"));

function insertWard(){
    const _ward_Name = $(".new_ward .content #ward_Name").val();
    const _orderNumber = $(".nurse .ward .cont").length + 1;   
    const _req = JSON.stringify({
        ward: _ward_Name,
        _orderNumber,
        etc: "",
        ...commonRequest()
    })
    

    serverController.ajaxAwaitController("API/Manager/InsertWard", "POST", _req, (res) => {
        if(res.result){
            $("div").remove(".cont");
            selectWard();
        }
    }, (err) => {console.log(err)});
}

$(".new_ward .btn_list #ward_Button").on("click", insertWard);
