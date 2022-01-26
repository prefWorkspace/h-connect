
//병상등록 버튼 이벤트 and measureInsertInfo
$("#btn_new_hospital").on("click", function(){
    
    const wardCode = $(".section.new_hospital .hospital_patient .ward_label2").data("wardcode");
    const sickRoomCode = $(".section.new_hospital .hospital_patient .room_label2").data("sickroomcode");
    const sickBedCode = $(".section.new_hospital .hospital_patient .patient_room .bed_label").data("sickbedcode");
    const sickBed = $(".section.new_hospital .hospital_patient .bed_label").text();

    const name = $("#patient_name").val();
    const birthday = $("#patient_age").val(); 
    const gender = $(".section.new_hospital .hospital_patient .patient_info .sex_label").text(); 
    const patientCode = $("#patient_MRN").val(); 

    const deviceInfoList = [];
    
    $(".section.new_hospital #device").each(function(index, item){
        const obj = {
            deviceType: $(item).data("device"),
            serialNumber: $(item).data("serial"),
            macAddress: custom.etc.getMacaddress($(item).data("device"), $(item).data("serial"))
        }
        deviceInfoList.push(obj);
    });

    //유효성 검사
    const valid = wardCode === undefined || sickRoomCode === undefined || sickBed === "병상선택" || 
        name === "" || birthday === "" || patientCode === "" || gender === "성별";
    
    //유효성 검사 차단
    if(valid) return;

    const { requestDateTime:startDateTime } = commonRequest();
    
    const req_measure = JSON.stringify({
        ...commonRequest(),
        wardCode,
        sickRoomCode,
        sickBedCode,
        name,
        birthday: null,
        gender: gender === "남자" ? 1 : 2,
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
        deviceInfoList,
    })

    serverController.ajaxAwaitController("API/Measurement/InsertMeasurementInfo", "POST", req_measure, (res) => {
        console.log(res)
        if(res.result){
            location.reload();
        }
    }, (err) => {console.log(err)})
});
