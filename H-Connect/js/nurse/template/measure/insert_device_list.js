function Create_new_DeviceList(device, serial){
    
    const data = `
        <div id="device" data-device="${device_NameToType(device)}" data-serial="${serial}">
            <p id="device_name">${device}</p>
            <p id="device_serial">${serial}</p>

            <div class="btn_list">
                <button type="button" class="btn bl btn_modify">수정</button>
                <button type="button" class="btn rd btn_delete">삭제</button>
            </div>
        </div>
    `;

    $(".section.new_hospital .container .device_room .btn_add").before(data);
    $(".section.new_hospital .container .device_room .btn_list .btn_modify").on("click", update_device)
    $(".section.new_hospital .container .device_room .btn_list .btn_delete").on("click", delte_device)
}

function update_device(){
    $(".pop.update_device .overlay").fadeIn();
    const target = $(this);

    $(".pop.update_device .pop_cont .btn_list .btn_check").on("click", function(){  
        
        const device_name = $(".pop.update_device .content .left_label").text();
        const device_serial = $(".pop.update_device .content input").val();

        $(target).parent().parent().find("#device_name").text(device_name);
        $(target).parent().parent().find("#device_serial").text(device_serial);
        $(".pop.update_device .overlay").fadeOut();
    })

}

function delte_device(){
    $(this).parent().parent().remove();
}