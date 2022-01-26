"use strict";

function selectMeasurementInfoList(wardCode = null, sickRoomCode = null, sickBedCode = null){
    
    const req = JSON.stringify({
        ...commonRequest(),
        wardCode,
        sickRoomCode,
        sickBedCode,
        measurementType: "BM",
        measurementStatusList: null,
        search: null
    })

    serverController.ajaxAwaitController("API/Measurement/SelectMeasurementInfoList", "POST", req, (res) => {
        if(res.result){
            const data_List = res.measurementInfoSimpleList;
            Create_Ward_measure(data_List);
        }
    }, (err) => {console.log(err)})
}

function getWardData(){
    const req = JSON.stringify({
        includeSickRoom: true,
        includeSickBed: true,
        ...commonRequest()
    });

    serverController.ajaxAwaitController("API/Manager/SelectWard", "POST", req, (res) => {
        if(res.result){
            const wardList = [...res.wardList];
            Create_ward_list_measure(wardList); //측정 현황 셀렉트 박스
            measure_selectBox_handle(wardList); //측정현황 셀렉트 박스 이벤트
            
            Create_ward_list_measure_Bed(wardList); //측정관리 신규 병상등록 병동 셀렉트 박스 
            new_SickBed_selectBox_handle(wardList); //측정관리 신규병상 등록 셀렉트 박스 이벤트
        }else{
            session_renew(res);
        }
    })
}

getWardData();
