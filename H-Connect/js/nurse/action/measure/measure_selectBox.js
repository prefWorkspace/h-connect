
//측정현황 셀렉트 박스 이벤트 
function measure_selectBox_handle(wardList){

    //병동 셀렉트 박스 활성화
    $(".section.measure_status .search_select .selectBox2.s_select .ward_label").on("click", function(){
        $(this).parent().toggleClass("active");
    })

    //병실 셀렉트 박스 활성화 
    $(".section.measure_status .search_select .selectBox2.s_select .room_label").on("click", function(){
        $(this).parent().toggleClass("active");
    })

    //병동 셀렉트 박스 옵션 선택 이벤트
    $(".section.measure_status .search_select .selectBox2.s_select .optionList.ward_option .ward_list").on("click", function(){
        const target = $(this);
        click_ward_option(target, wardList)
    });

}

//병실 셀렉트 박스 옵션 변경 함수
function roomSelectHandle(wardList, e){

    const $title = $(e.target).text(); // 클릭한 노드의 텍스트

    let codeList = {
        wardCode: "",
        sickRoomCode: "",
        sickBedCode: ""
    }
    
    if($title === "병실전체"){

        //선택한 병동에 해당하는 리스트 생성 및 뿌리기
        selectMeasurementInfoList(wardList.wardCode, null, null);

        $(e.target).parent().parent().removeClass("active");

        sickBed_Event(wardList);

        return;
    }

    const $index = $(e.target).data("index"); //클릭한 노드가 가지는 sickRoom index \
    const checkRoomList = wardList.sickRoomList[$index];
    const check_sickBedLsit = checkRoomList.sickBedList; // 해당하는 병상 리스트 불러오기

    //셀렉트 박스 이름 변경
    $(".section.measure_status .search_select .selectBox2.s_select .room_label").text($title);

    // 병상 목록 지우기
    $("div").remove(".nurse.nurse_measure .wrap_inner .section.measure_status .container .status_list"); 
    
    if(check_sickBedLsit){
        codeList = {
            wardCode: wardList.wardCode,
            sickRoomCode: wardList.sickRoomList[$index].sickRoomCode,
            sickBedCode: ""
        }

        //선택한 병동 및 병실에 해당하는 리스트 생성 및 뿌리기
        selectMeasurementInfoList(wardList.wardCode, wardList.sickRoomList[$index].sickRoomCode, null);
    }
    
    $(e.target).parent().parent().removeClass("active");

    sickBed_Event(wardList);

} 

// 병상 수정 클릭 이벤트 함수
function clickUpdateSickBed(wardList, e){{
    $('.nurse_measure .new_hospital').hide(); //신규 병상 등록 콘텐츠 숨김
    $('.nurse_measure .modifi_hospital').show(); //병산 수정 콘텐츠 등장

    const arr =[];
    $(e.target).parent().parent().find("p span").each(function(index, value){
        arr.push($(value).text());
    });
    
    const wardCode = $(e.target).data("wardcode");
    const sickRoomCode = $(e.target).data("sickroomcode");
    const sickBedCode = $(e.target).data("sickbedcode");

    const [ ward, sickRoom, sickBed, patient_name, patient_age, patient_gender, patient_MRN ] = arr;
    
    $(".section.modifi_hospital .hospital_patient #patient_name").val(patient_name)
    $(".section.modifi_hospital .hospital_patient .patient_info #patient_age").val(patient_age);
    $(".section.modifi_hospital .hospital_patient .patient_info .sex_label2").text(patient_gender === "남자" ? "남" : "여");
    $(".section.modifi_hospital .hospital_patient .patient_info #patient_MRN").val(patient_MRN);
    $(".section.modifi_hospital .hospital_patient .patient_room .select_ward .mward_label").text(ward);
    $(".section.modifi_hospital .hospital_patient .patient_room .select_ward .mward_label").attr("data-wardCode", wardCode);
    $(".section.modifi_hospital .hospital_patient .patient_room .select_room .mroom_label").text(sickRoom);
    $(".section.modifi_hospital .hospital_patient .patient_room .select_room .mroom_label").attr("data-sickRoomCode", sickRoomCode);
    $(".section.modifi_hospital .hospital_patient .patient_room .select_bed .mbed_label").text(sickBed);
    $(".section.modifi_hospital .hospital_patient .patient_room .select_bed .mbed_label").attr("data-sickBedCode", sickBedCode);

    Create_ward_list_update_Bed(wardList); // 병상 수정에서 병동 선택 셀렉트 박스
    update_SickBed_selectBox_handle(wardList, e); 
}}

// 병상 클릭시 배경색 변화
function backgroundChange(){
    $('.measure_status .container .status_list').toggleClass("on");
    $('.measure_status .container .status_list').not(this).removeClass('on');

}

// 병사에 관한 css 및 수정 삭제 이벤트 거는 함수
function sickBed_Event(wardList){

    //수정버튼 클릭
    $('.measure_status .container .status_list .btn_list .btn_modify').on('click', (e) => clickUpdateSickBed(wardList, e));

    //삭제 이벤트 함수
    delete_sickBed_handle();

    //병실 클릭시 배경색 변화
    $('.measure_status .container .status_list').on("click", backgroundChange)
}

//병동 셀렉트 박스 옵션 선택 이벤트
function click_ward_option(target, wardList){
    let new_sickRoomList = ``; 
    let patientList = ``;
    const index = $(target).data("index"); //선택한 wardList의 인덱스
    const $title = $(target).text();  //선택한 옵션의 이름

    //선택한 옵션의 이름 변경
    $(".section.measure_status .search_select .selectBox2.s_select .ward_label").text($title); 

    // 병동 옵션이 바뀔시 병실은 디폴트값으로 다시 변경
    $(".section.measure_status .search_select .selectBox2.s_select .room_label").text("병실전체"); 

    //병실의 리스트 지우기
    $("li").remove(".section.measure_status .search_select .selectBox2.s_select .optionList.room_option .room_list.roomoption"); 

    //병실 옵션 목록 생성
    for(let i = 0; i < wardList[index].sickRoomList.length; i++){
        new_sickRoomList += `
            <li class="optionItem room_list roomoption" data-wardindex="${index}" data-index="${i}" data-sickroomcode="${wardList[index].sickRoomList[i].sickRoomCode}">${wardList[index].sickRoomList[i].sickRoom} 호실</li>
        `;
    }

    //병실에 병동의 맞는 새로운 리스트 정렬
    $(".section.measure_status .search_select .selectBox2.s_select .optionList.room_option .optionItem.room_list").after(new_sickRoomList); 

    //리스트 정렬후 다시 이벤트 
    $(".section.measure_status .search_select .selectBox2.s_select .optionList.room_option .optionItem.room_list").on("click", (e) => roomSelectHandle(wardList[index], e));
    
    //환자 리스트 일단 지우기
    $("div").remove(".nurse.nurse_measure .wrap_inner .section.measure_status .container .status_list"); 

    // 측정현황 병동 클릭시 템플릿 뿌리기
    let codeList = {
        wardCode: "",
        sickRoomCode: "",
        sickBedCode: ""
    }

    //측정 현황 해당 환자 목록 생성
    const sickRoomArr = [...wardList[index].sickRoomList]; 

    //선택한 병동에 해당하는 리스트 생성 및 뿌리기
    selectMeasurementInfoList(wardList[index].wardCode, null, null);

    //신규 병상 등록 콘텐츠 등장
    $('.nurse_measure .new_hospital').show(); 

    //병상 수정 콘텐츠 숨김 
    $('.nurse_measure .modifi_hospital').hide(); 
    
    sickBed_Event(wardList);

    //셀렉트 박스 비활성화 
    $(target).parent().parent().removeClass("active"); 
}
