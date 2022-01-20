
//병상등록 버튼 이벤트
$("#btn_new_hospital").on("click", function(){
    
    const wardCode = $(".section.new_hospital .hospital_patient .ward_label2").data("wardcode");
    const sickRoomCode = $(".section.new_hospital .hospital_patient .room_label2").data("sickroomcode");
    const sickBed = $(".section.new_hospital .hospital_patient .bed_label").text();
    const patient_name = $("#patinet_name").val();
    const patient_age = $("#patient_age").val(); 
    const patient_gender = $(".section.new_hospital .hospital_patient .patient_info .sex_label").text(); 
    const patient_MRNCode = $("#patient_MRN").val(); 

    //유효성 검사
    const valid = wardCode === undefined || sickRoomCode === undefined || sickBed === "병상선택" || 
        patient_name === "" || patient_age === "" || patient_MRNCode === "" || patient_gender === "성별";

    //유효성 검사 차단
    if(valid) return;

    const patient_info = JSON.stringify({
        patient_name,
        patient_age,
        patient_gender,
        patient_MRNCode,
    })

    const req = JSON.stringify({
        requester,
        organizationCode,
        wardCode,
        sickRoomCode,
        sickBed,
        orderNumber: 1,
        etc: patient_info,
        ...commonRequest()
    })

    serverController.ajaxAwaitController("API/Manager/InsertSickBed", "POST", req, (res) => {
        console.log(res)
        if(res.result){
            location.reload();
        }
    }, (err) => {console.log(err)})
});