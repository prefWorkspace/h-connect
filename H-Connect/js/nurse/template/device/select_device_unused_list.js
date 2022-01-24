function select_device_unused_list(deviceRegisterList){
    let deviceList = "";

    //리스트 지우기 
    $("div").remove(".section.return_device .device_list .device_item .item_row");

    if(!deviceRegisterList) return;

    for(let i = 0; i < deviceRegisterList.length; i++){
        deviceList += `
            <div class="item_row">
                <p class="item_name">${deviceName(deviceRegisterList[i].deviceType)}</p>
                <p class="item_num">${deviceRegisterList[i].serialNumber}</p>
                <p class="use_line">반납완료</p>

                <button data-serialnumber=${deviceRegisterList[i].serialNumber} data-type="${deviceRegisterList[i].deviceType}" type="button" class="btn rd btn_cancel">
                    취소
                </button>
            </div>
        `;
    }

    $(".section.return_device .device_list .device_item").html(deviceList);
    $(".section.return_device .device_list .device_item .item_row .btn_cancel").on("click", cancel_device_modal_action)
}

function cancel_device_modal_action(){
    $('.pop.delete_return .overlay').fadeIn();
    $(".pop.delete_return .overlay .btn_list .btn_cut").attr("data-serialNumber", $(this).data("serialnumber"));
    $(".pop.delete_return .overlay .btn_list .btn_cut").attr("data-type", $(this).data("type"));
}
