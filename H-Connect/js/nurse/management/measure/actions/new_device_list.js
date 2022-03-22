"use strict";

function new_device_list(){
    const device_Name = $(".pop.regi_device .overlay .selectBox2 .label").text();
    const serial = $(".pop.regi_device .overlay .content input").val();

    let serial_Reg;
    device_Name === "심전도 패치" ? serial_Reg = /[A-Z0-9]{6,7}/ : serial_Reg = /[B-Z0-9]{6,7}/;

    if( !serial_Reg.test(serial) ){
        $(".pop.regi_device .overlay small").show();
        return;
    } 

    //추가한 측정장치 UI상에 표시
    Create_new_DeviceList(device_Name, serial)
    $(".pop.regi_device .overlay").fadeOut();    
}

$(".pop.regi_device .overlay .btn_list .btn_check").on("click", new_device_list)