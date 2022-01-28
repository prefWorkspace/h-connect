
//병상 수정 이벤트 
function updateMeasurementInfo(){
    
    const _wardCode = $(".section.modifi_hospital .hospital_patient .mward_label").data("wardcode");
    const _sickRoomCode = $(".section.modifi_hospital .hospital_patient .mroom_label").data("sickroomcode");
    const _sickBedCode = $(".section.modifi_hospital .hospital_patient .mbed_label").data("sickbedcode");
    const _route = $(this).data("route");
    const _measurementCode = $(this).data("measurementcode");
    const _name = $(".section.modifi_hospital #patient_name").val();
    const _birthday = $(".section.modifi_hospital #patient_age").val(); 
    const _gender = $(".section.modifi_hospital .hospital_patient .patient_info .sex_label").text(); 
    const _patientCode = $(".section.modifi_hospital #patient_MRN").val(); 

    //유효성 검사
    const valid = _wardCode === undefined || _sickRoomCode === undefined ||
        _name === "" || _birthday === "" || _patientCode === "" || _gender === "성별";

    //유효성 검사 차단
    if(valid) return;
    
    const { requestDateTime:_startDateTime } = commonRequest();

    const req = JSON.stringify({
        ...commonRequest(),
        wardCode: _wardCode,
        sickRoomCode: _sickRoomCode,
        sickBedCode: _sickBedCode,
        name: _name,
        birthday: null,
        gender: _gender === "남" ? 1 : 2,
        patientCode: _patientCode,
        etc: null,
        patientStatus: 3,
        ssn: null,
        foreigner: 0,
        phoneNumber: null,
        measurementType: "BM",
        measurementStatus: 2,
        duration: 1,
        _startDateTime,
        measurementCode: _measurementCode,
        deviceInfoList,
    });
    
    serverController.ajaxMeasurementController("API/Measurement/UpdateMeasurementInfo", _route ,"POST", req, (res) => {
        if(res.result){
            location.reload();
        }
    }, (err) => {console.log(err)})
}

$(".section.modifi_hospital .container .btn_list .btn_add").on("click", updateMeasurementInfo);