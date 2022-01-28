"use strict";

function insertMeasurementInfo(){

    const _wardCode = $(".section.new_hospital .hospital_patient .ward_label2").attr("data-wardcode");
    const _sickRoomCode = $(".section.new_hospital .hospital_patient .room_label2").attr("data-sickroomcode");
    const _sickBedCode = $(".section.new_hospital .hospital_patient .patient_room .bed_label").attr("data-sickbedcode");
    const _sickBed = $(".section.new_hospital .hospital_patient .bed_label").text();

    const _name = $("#patient_name").val();
    const _birthday = $("#patient_age").val(); 
    const _gender = $(".section.new_hospital .hospital_patient .patient_info .sex_label").text(); 
    const _patientCode = $("#patient_MRN").val(); 

    const _deviceInfoList = [];
    $(".section.new_hospital #device").each(function(index, item){
        console.log(getMacaddress($(item).data("device"), $(item).data("serial")))
        const obj = {
            deviceType: $(item).data("device"),
            serialNumber: $(item).data("serial"),
            macAddress: getMacaddress($(item).data("device"), $(item).data("serial"))
        }
        _deviceInfoList.push(obj);
    });

    //유효성 검사
    const valid = _wardCode === undefined || _sickRoomCode === undefined || _sickBed === "병상선택" || 
        _name === "" || _birthday === "" || _patientCode === "" || _gender === "성별";
    
    //유효성 검사 차단
    if(valid) return;

    const { requestDateTime:_startDateTime } = commonRequest();
    
    const req_measure = JSON.stringify({
        ...commonRequest(),
        wardCode: _wardCode,
        sickRoomCode: _sickRoomCode,
        sickBedCode: _sickBedCode,
        name: _name,
        birthday: null,
        gender: _gender === "남자" ? 1 : 2,
        patientCode: _patientCode,
        etc: null,
        patientStatus: 3,
        ssn: null,
        foreigner: 0,
        phoneNumber: null,
        measurementType: "BM",
        measurementStatus: 2,
        duration: 1,
        startDateTime: _startDateTime,
        deviceInfoList: _deviceInfoList,
    });

    const _req_selecet = JSON.stringify({
        ...commonRequest(),
        wardCode: _wardCode,
        sickRoomCode: _sickRoomCode,
        sickBedCode: _sickBedCode,
        measurementType: "BM",
    });

    console.log(_wardCode, _sickRoomCode, _sickBedCode)

    let _isMeasurementInfoList;

    serverController.ajaxAwaitController("API/Measurement/SelectMeasurementInfoList", "POST", _req_selecet, (res) => {
        console.log(res)
        if(res.result){
            if(!res.measurementInfoSimpleList){
                serverController.ajaxAwaitController("API/Measurement/InsertMeasurementInfo", "POST", req_measure, (res) => {
                    console.log(res)
                    if(res.result){
                        location.reload();
                    }
                }, (err) => {console.log(err)})
            }else{
                alert("병상에 이미 측정이 되고있습니다");
            }
        }
    }, (err) => {console.log(err)})

}

//병상등록 버튼 이벤트 and measureInsertInfo
$("#btn_new_hospital").off().on("click", insertMeasurementInfo);
