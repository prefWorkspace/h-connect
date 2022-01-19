


function updateWard () {
    let wardCode;
    let orderNumber;
    let deactivate;
    $('.nurse .ward .cont .ward_list .btn_list .btn_modify').off().on('click', function () {
        $('.pop.update_ward .overlay').fadeIn();
        $('.nurse .hospital_room .title .btn_new_room').attr("disabled", false);
        wardCode = $(this).data("wardcode");
        orderNumber = $(this).data("on");
        deactivate = $(this).data("deactivate");
    });



    $(".update_ward .btn_list #ward_update_Button").on("click", function(){
        const ward = $(".update_ward .content #ward_Name").val();
        const req = JSON.stringify({
            requester,
            organizationCode,
            wardCode,
            ward,
            nickName: "Update",
            orderNumber,
            deactivate,
            ...commonRequest()
        })
        serverController.ajaxAwaitController("API/Manager/UpdateWard", "POST", req, (res) => {
            if(res.result){
                // location.reload();
                $("div").remove(".cont");
                getWardData();
            }
        }, (err) => {console.log(err)})
        
    })
}



