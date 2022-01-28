"use strict";

//병동 수정
function updateWard () {
    let _wardCode;
    let _orderNumber;
    let _deactivate;
    $('.nurse .ward .cont .ward_list .btn_list .btn_modify').off().on('click', function () {
        $('.pop.update_ward .overlay').fadeIn();
        $('.nurse .hospital_room .title .btn_new_room').attr("disabled", false);
        _wardCode = $(this).data("wardcode");
        _orderNumber = $(this).data("on");
        _deactivate = $(this).data("deactivate");
    });



    $(".update_ward .btn_list #ward_update_Button").on("click", function(){
        const _ward = $(".update_ward .content #ward_Name").val();
        const _req = JSON.stringify({
            requester,
            organizationCode,
            wardCode: _wardCode,
            ward: _ward,
            nickName: "Update",
            orderNumber: _orderNumber,
            deactivate: _deactivate,
            ...commonRequest()
        })
        serverController.ajaxAwaitController("API/Manager/UpdateWard", "POST", _req, (res) => {
            if(res.result){
                // location.reload();
                $("div").remove(".nurse .ward .cont");
                selectWard();
            }
        }, (err) => {console.log(err)})
        
    })
}



