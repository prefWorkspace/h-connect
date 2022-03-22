function insert_device(){

    const device_name = $("#device_name").text();
    const serialNumber = $("#device_serial").val();

    const req = JSON.stringify({
        ...commonRequest(),
        serialNumber,
        deviceType: device_NameToType(device_name)
    });

    serverController.ajaxAwaitController("API/Device/InsertDeviceRegister", "POST", req, (res) => {
        console.log(res);
        if(res.result){
            select_device(0, null);
        }
    }, (err) => {console.log(err)})
}

$(".pop.regi_device .overlay .btn_list .btn_check").on("click", insert_device);