"use strict";

//입원한 환자 카운트
let patient_count;

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
        console.log(res)
        if(res.result){
            const data_List = res.measurementInfoSimpleList;
            patient_count = data_List ? data_List.length : 0;
            $(".section.measure_status .cont .search_select p span").text(patient_count);
            Create_Ward_measure(data_List);
        }
    }, (err) => {console.log(err)})
}

function selectWard_measurement(){

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

            let ward_count = wardList ? wardList.length : 0;
            let sickRoom_count = 0;
            let sickBed_count = 0;
            wardList.map(item => {
                item.sickRoomList ? sickRoom_count += item.sickRoomList.length : null
                item.sickRoomList.map( room => {
                    sickBed_count += room.sickBedList.length;
                })
            });
            $(".section.new_hospital .cont p span").text( sickBed_count - patient_count );
            sickBed_Event(wardList);
        }else{
            session_renew(res);
        }
    })
}

selectWard_measurement();
selectMeasurementInfoList();
