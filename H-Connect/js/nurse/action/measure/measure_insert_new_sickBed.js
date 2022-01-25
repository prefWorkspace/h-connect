
//병상등록 버튼 이벤트 and measureInsertInto
$("#btn_new_hospital").on("click", function(){
    
    const wardCode = $(".section.new_hospital .hospital_patient .ward_label2").data("wardcode");
    const sickRoomCode = $(".section.new_hospital .hospital_patient .room_label2").data("sickroomcode");
    const sickBed = $(".section.new_hospital .hospital_patient .bed_label").text();

    const name = $("#patient_name").val();
    const birthday = $("#patient_age").val(); 
    const gender = $(".section.new_hospital .hospital_patient .patient_info .sex_label").text(); 
    const patientCode = $("#patient_MRN").val(); 

    //유효성 검사
    const valid = wardCode === undefined || sickRoomCode === undefined || sickBed === "병상선택" || 
        name === "" || birthday === "" || patientCode === "" || gender === "성별";
    
    //유효성 검사 차단
    if(valid) return;

    const patient_info = {
        name,
        birthday,
        gender,
        patientCode,
    }

    const req_newBed = JSON.stringify({
        wardCode,
        sickRoomCode,
        sickBed,
        orderNumber: 1,
        etc: JSON.stringify(patient_info),
        ...commonRequest()
    })
    
    const req_measure = JSON.stringify({
        ...req_newBed,
        ...patient_info,
        etc: "",
        patientStatus: 3,
        ssn: null,
        foreigner: 0,
        phoneNumber: null,
        measurementType: "BM",
        measurementStatus: 2,
        duration: 1,
        startDateTime: "",
        deviceInfoList: [],
    })

    // serverController.ajaxAwaitController("API/Manager/InsertSickBed", "POST", req_newBed, (res) => {
    //     if(res.result){
    //         serverController.ajaxAwaitController("API/Measurement/InsertMeasurementInfo", "POST", req_measure, (res) => {
    //             console.log(res)
    //             if(res.result){
    //                 location.reload();
    //             }
    //         }, (err) => {console.log(err)})
    //     }
    // }, (err) => {console.log(err)})
});