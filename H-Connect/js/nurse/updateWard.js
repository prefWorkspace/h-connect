


function aaa () {
    let warCode;
    let orderNumber;
    $('.nurse .ward .cont .ward_list .btn_list .btn_modify').off().on('click', function () {
        $('.pop.update_ward .overlay').fadeIn();
        $('.nurse .hospital_room .title .btn_new_room').attr("disabled", false);
        warcode = $(this).data("wardcode");
        orderNumber = $(this).data("on");
    });

    $(".update_ward .btn_list #ward_update_Button").on("click", function(){

        const req = {
            requester,
            organizationCode,
            warCode,
            orderNumber,
            ...commonRequest()
        }
        serverController.ajaxAwaitController("API/Manager/UpdateWard", "POST", )
        
    })
}



