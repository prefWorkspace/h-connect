"use strict";

$("#header .pop.logout .btn_bye").on("click", function(){

    const req = JSON.stringify({
        requester,
        ...commonRequest()
    })

    serverController.ajaxAwaitController("API/Account/LogoutHIS", "POST", req, (res) => {
        if(res.result){
            $('.pop.logout').fadeOut();
            sessionController.removeSession("accesToken");
            localStorageController.removeLocalS("userData");
            location.href="/index.html";
        }
    })
})

