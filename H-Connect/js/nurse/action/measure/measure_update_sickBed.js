
//병상 수정 이벤트 
function sickBed_Update_Handle(){
    
    const wardCode = $(".section.modifi_hospital .hospital_patient .mward_label").data("wardcode");
    const sickRoomCode = $(".section.modifi_hospital .hospital_patient .mroom_label").data("sickroomcode");
    const sickBedCode = $(".section.modifi_hospital .hospital_patient .mbed_label").data("sickbedcode");
    const route = $(this).data("route");
    const measurementCode = $(this).data("measurementcode");
    const name = $(".section.modifi_hospital #patient_name").val();
    const birthday = $(".section.modifi_hospital #patient_age").val(); 
    const gender = $(".section.modifi_hospital .hospital_patient .patient_info .sex_label").text(); 
    const patientCode = $(".section.modifi_hospital #patient_MRN").val(); 

    //유효성 검사
    const valid = wardCode === undefined || sickRoomCode === undefined ||
        name === "" || birthday === "" || patientCode === "" || gender === "성별";

    //유효성 검사 차단
    if(valid) return;
    
    const { requestDateTime:startDateTime } = commonRequest();

    const req = JSON.stringify({
        ...commonRequest(),
        wardCode,
        sickRoomCode,
        sickBedCode,
        name,
        birthday: null,
        gender: gender === "남" ? 1 : 2,
        patientCode,
        etc: null,
        patientStatus: 3,
        ssn: null,
        foreigner: 0,
        phoneNumber: null,
        measurementType: "BM",
        measurementStatus: 2,
        duration: 1,
        startDateTime,
        measurementCode,
        deviceInfoList,
    });
    
    serverController.ajaxMeasurementController("API/Measurement/UpdateMeasurementInfo", route ,"POST", req, (res) => {
        if(res.result){
            location.reload();
        }
    }, (err) => {console.log(err)})
}

$(".section.modifi_hospital .container .btn_list .btn_add").on("click", sickBed_Update_Handle);