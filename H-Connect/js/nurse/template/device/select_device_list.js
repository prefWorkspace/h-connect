function select_device_list(deviceRegisterList){
    let deviceList = "";

    //리스트 지우기 
    $("div").remove(".section.new_device .device_list .device_item .item_row");

    if(!deviceRegisterList) return;

    for(let i = 0; i < deviceRegisterList.length; i++){
        deviceList += `
            <div class="item_row">
                <p class="item_name">${deviceName(deviceRegisterList[i].deviceType)}</p>
                <p class="item_num">${deviceRegisterList[i].serialNumber}</p>
                <p class="use_line">사용가능</p>

                <button data-serialnumber=${deviceRegisterList[i].serialNumber} type="button" class="btn rd btn_delete">
                    삭제
                </button>
            </div>
        `;
    }

    
    $(".section.new_device .device_list .device_item").html(deviceList);
    $(".section.new_device .device_list .device_item .item_row .btn_delete").on("click", delete_device_modal_action)
}

function deviceName(deviceType){
    switch(deviceType){
        case 1: 
            return "심전도 패치";
        case 3:
            return "산소포화도 측정장치"
        case 2: 
            return "체온 패치"
    }
    
}

function delete_device_modal_action(){
    $('.pop.delete_regi .overlay').fadeIn();
    $(".pop.delete_regi .overlay .btn_list .btn_cut").attr("data-serialNumber", $(this).data("serialnumber"));
}