//신규 장치 등록 장치 조회 첫화면
function select_device(deviceType = 0, search = null){

    const req = JSON.stringify({
        ...commonRequest(),
        search,
        deviceType,
        pageNumber: 1,
        count: 10
    })

    serverController.ajaxAwaitController("API/Device/SelectDeviceRegisterPage", "POST", req, (res) => {
        if(res.result){
            select_device_list(res.deviceRegisterList); //신규장치 등록 모든 리스트 조회후 UI표현
            countingDevice(res.deviceRegisterList); // 장치 카운트
        }
    }, (err) => {console.log(err)})
}

// 검색 기능 이벤트
function search_Handel(){
    const search = $(".section.new_device .device_list .search_container input").val();
    select_device(8, search);
}

//셀렉트 박스 옵션 선택 했을 경우
$(".section.new_device .device_list .select_device .device_optionItem").on("click", function(){
    const deviceType = $(this).data("type");
    select_device(deviceType);
});

//search 검색 기능
$(".section.new_device .device_list .search_container button").on("click", search_Handel)

//search 검색 기능 Enter키 눌러도 검색 가능
$(".section.new_device .device_list .search_container input").on("keypress", function(e){
    if(e.key === "Enter"){
        search_Handel();
    }
})

//장치 카운팅 함수
function countingDevice(deviceRegisterList){
    let ECG_COUNT = 0;
    let TEMP_COUNT = 0;
    let SpO2_COUNT = 0;

    for(let i = 0; i < deviceRegisterList?.length; i++){
        switch(deviceRegisterList[i].deviceType){
            case 1: 
                ECG_COUNT++;
                break;
            case 2:
                TEMP_COUNT++;
                break;
            case 3:
                SpO2_COUNT++;
                break;
        }
    }

    $("#ecg_count").text(ECG_COUNT);
    $("#spo2_count").text(SpO2_COUNT);
    $("#temp_count").text(TEMP_COUNT);
}

select_device(0, null);