
//병상 수정 이벤트 
function sickBed_Update_Handle(){
    
    const wardCode = $(".section.modifi_hospital .hospital_patient .mward_label").data("wardcode");
    const sickRoomCode = $(".section.modifi_hospital .hospital_patient .mroom_label").data("sickroomcode");
    const sickBed = $(".section.modifi_hospital .hospital_patient .mbed_label").text();

    const patient_name = $(".section.modifi_hospital #patient_name").val();
    const patient_age = $(".section.modifi_hospital #patient_age").val(); 
    const patient_gender = $(".section.modifi_hospital .hospital_patient .patient_info .sex_label").text(); 
    const patient_MRNCode = $(".section.modifi_hospital #patient_MRN").val(); 

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

    //병상 수정인데, 병실 키값을 씀. 문의 후 다시 작업
    const req = JSON.stringify({
        requester,
        organizationCode,
        wardCode,
        sickRoomCode,
        sickBed,
        orderNumber: 1,
        etc: patient_info,
        ...commonRequest()
    });

    serverController.ajaxAwaitController("API/Manager/UpdateSickBed", "POST", req, (res) => {
        if(res.result){
            location.reload();
        }else{
            session_renew(res);
        }
    }, (err) => {console.log(err)})
}

$(".section.modifi_hospital .container .btn_list .btn_add").on("click", sickBed_Update_Handle);