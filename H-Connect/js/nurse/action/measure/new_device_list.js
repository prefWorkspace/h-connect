function new_device_list(){
    const device = $(".pop.regi_device .overlay .selectBox2 .label").text();
    const serial = $(".pop.regi_device .overlay .content input").val();

    Create_new_DeviceList(device, serial)
}

$(".pop.regi_device .overlay .btn_list .btn_check").on("click", new_device_list)