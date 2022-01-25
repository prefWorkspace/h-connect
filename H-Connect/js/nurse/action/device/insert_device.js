function insert_device(){

    const device_name = $("#device_name").text();
    const serialNumber = $("#device_serial").val();

    const req = JSON.stringify({
        ...commonRequest(),
        serialNumber,
        deviceType: device_name_type(device_name)
    });

    serverController.ajaxAwaitController("API/Device/InsertDeviceRegister", "POST", req, (res) => {
        console.log(res);
        if(res.result){
            select_device(0, null);
        }
    }, (err) => {console.log(err)})
}

function device_name_type(devieName){
    switch(devieName){
        case "심전도 패치":
            return 1;
        case "체온 패치":
            return 2;
        case "산소포화도 측정장치":
            return 3;            
    }
}

$(".pop.regi_device .overlay .btn_list .btn_check").on("click", insert_device);