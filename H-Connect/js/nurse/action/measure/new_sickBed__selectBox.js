
// 측정관리 신규병상 등록 셀렉트 박스 이벤트
function new_SickBed_selectBox_handle(wardList){

    //병동 셀렉트 박스 활성화
    $(".section.new_hospital .hospital_patient .selectBox2.s_select .ward_label2").on("click", function(){
        $(this).parent().toggleClass("active");
    });

    //병실 셀렉트 박스 활성화 
    $(".section.new_hospital .hospital_patient .selectBox2.s_select .room_label2").on("click", function(){
        $(this).parent().toggleClass("active");
    });

    //병상 셀렉트 박스 활성화 
    $(".section.new_hospital .hospital_patient .selectBox2.select_bed .bed_label").on("click", function(){
        $(this).parent().toggleClass("active");
    });

    //병동 셀렉트 박스 옵션 선택 이벤트
    $(".section.new_hospital .hospital_patient .selectBox2.s_select .optionList.ward_option2 .ward_list2").on("click", function(){
        
        const index = $(this).data("index"); //선택한 wardList의 인덱스
        let new_sickRoomList = ``; 
        const $title = $(this).find("p").text();  //선택한 옵션의 이름

        $(".section.new_hospital .hospital_patient .selectBox2.s_select .ward_label2").text($title); //선택한 옵션의 이름 변경
        $(".section.new_hospital .hospital_patient .selectBox2.s_select .ward_label2").attr("data-wardcode", $(this).data("wardcode")); //선택한 옵션의 이름 변경
        
        
        $(".section.new_hospital .hospital_patient .selectBox2.s_select .room_label2").text("병실선택"); // 병동 옵션이 바뀔시 병실은 디폴트값으로 다시 변경
        $(".section.new_hospital .hospital_patient .selectBox2.select_bed .bed_label").text("병상선택"); // 병동 옵션이 바뀔시 병상은 디폴트값으로 다시 변경

        $("li").remove(".section.new_hospital .hospital_patient .selectBox2.s_select .optionList.room_option2 .room_list2"); //병실의 리스트 지우기
        $("li").remove(".section.new_hospital .hospital_patient .selectBox2.select_bed .optionList.bed_option .bed_list"); //병상의 리스트 지우기

        for(let i = 0; i < wardList[index].sickRoomList.length; i++){
            new_sickRoomList += `
                <li class="optionItem room_list2" data-sickroomcode="${wardList[index].sickRoomList[i].sickRoomCode}" data-etc="${wardList[index].sickRoomList[i].etc}">
                    <p>
                        <span>${wardList[index].sickRoomList[i].sickRoom}</span> 호실
                    </p>
                    <span class="bed_count lot">+1 여유</span>
                </li>
            `;
        }

        $(".section.new_hospital .hospital_patient .selectBox2.s_select .optionList.room_option2").html(new_sickRoomList); //병실 셀렉트박스  병동에 맞는 새로운 리스트 정렬
        $(".section.new_hospital .hospital_patient .selectBox2.s_select .optionList.room_option2 .optionItem.room_list2").on("click",roomSelectHandle2) //리스트 정렬후 다시 이벤트 
        
        $(this).parent().parent().removeClass("active"); //셀렉트 박스 비활성화 
    });

    // 첫화면에서 병실 셀렉트 박스 이벤트 걸기
    // $(".section.new_hospital .hospital_patient .selectBox2.s_select .optionList.room_option2 .optionItem.room_list2").on("click",roomSelectHandle2) 
}

// 측정관리 신규 병상등록 병실 셀렉트 박스
function roomSelectHandle2(){
    let new_sickBed_html = "";
    const $bedNumber = $(this).data("etc"); //몇 인실인지 확인
    const $title = $(this).find("p").text();
    
    $(".section.new_hospital .hospital_patient .selectBox2.s_select .room_label2").text($title);
    $(".section.new_hospital .hospital_patient .selectBox2.s_select .room_label2").attr("data-sickroomcode", $(this).data("sickroomcode"));
    $(this).parent().parent().removeClass("active");

    for(let i = 0 ; i < $bedNumber; i++){
        new_sickBed_html += `
            <li class="optionItem bed_list">${i+1}번 병상</li>
        `;
    }
    $(".section.new_hospital .hospital_patient .selectBox2.select_bed .optionList.bed_option").html(new_sickBed_html);
    
    $(".section.new_hospital .hospital_patient .selectBox2.select_bed .optionList.bed_option .bed_list").on("click", function(){
        const $title = $(this).text();
        $(".section.new_hospital .hospital_patient .selectBox2.select_bed .bed_label").text($title);
        $(this).parent().parent().removeClass("active");
    });

} 

//측정관리 병상 수정 셀렉트박스 이벤트
function update_SickBed_selectBox_handle(wardList, e){

    
     //병동 셀렉트 박스 활성화
     $(".section.modifi_hospital .hospital_patient .selectBox2.select_ward .mward_label").on("click", function(){
        $(e.target).parent().toggleClass("active");
    });

    //병실 셀렉트 박스 활성화 
    $(".section.modifi_hospital .hospital_patient .selectBox2.select_room .mroom_label").on("click", function(){
        $(e.target).parent().toggleClass("active");
    });

    //병상 셀렉트 박스 활성화 
    $(".section.modifi_hospital .hospital_patient .selectBox2.select_bed .mbed_label").on("click", function(){
        $(e.target).parent().toggleClass("active");
    });

    
    //병동 셀렉트 박스 옵션 선택 이벤트
    //============================================클릭 이벤트 안먹혀 씨발
    $(".section.modifi_hospital .hospital_patient .selectBox2.select_ward .optionList.mward_option .mward_list").on("click", function(){
        
        const index = $(this).data("index"); //선택한 wardList의 인덱스
        let new_sickRoomList = ``; 
        const $title = $(this).find("p").text();  //선택한 옵션의 이름

        $(".section.modifi_hospital .hospital_patient .selectBox2.select_ward .mward_label").text($title); //선택한 옵션의 이름 변경
        $(".section.modifi_hospital .hospital_patient .selectBox2.select_ward .mward_label").attr("data-wardcode", $(e.target).data("wardcode")); //선택한 옵션의 이름 변경
        
        
        $(".section.modifi_hospital .hospital_patient .selectBox2.select_room .mroom_label").text("병실선택"); // 병동 옵션이 바뀔시 병실은 디폴트값으로 다시 변경
        $(".section.modifi_hospital .hospital_patient .selectBox2.select_bed .mbed_label").text("병상선택"); // 병동 옵션이 바뀔시 병상은 디폴트값으로 다시 변경

        $("li").remove(".section.modifi_hospital .hospital_patient .selectBox2.select_room .optionList.mroom_option .mroom_list"); //병실의 리스트 지우기
        $("li").remove(".section.modifi_hospital .hospital_patient .selectBox2.select_bed .optionList.mbed_option .mbed_list"); //병상의 리스트 지우기

        for(let i = 0; i < wardList[index].sickRoomList.length; i++){
            new_sickRoomList += `
                <li class="optionItem mroom_list" data-sickroomcode="${wardList[index].sickRoomList[i].sickRoomCode}" data-etc="${wardList[index].sickRoomList[i].etc}">
                    <p>
                        <span>${wardList[index].sickRoomList[i].sickRoom}</span> 호실
                    </p>
                    <span class="bed_count lot">+1 여유</span>
                </li>
            `;
        }

        $(".section.modifi_hospital .hospital_patient .selectBox2.select_room .optionList.mroom_option").html(new_sickRoomList); //병실 셀렉트박스  병동에 맞는 새로운 리스트 정렬
        $(".section.modifi_hospital .hospital_patient .selectBox2.select_room .optionList.mroom_option .optionItem.mroom_list").on("click",roomSelectHaupdate_room_selectBox_handlendle2) //리스트 정렬후 다시 이벤트 
        
        $(this).parent().parent().removeClass("active"); //셀렉트 박스 비활성화 
    });

    // 첫화면에서 병실 셀렉트 박스 이벤트 걸기
    // $(".section.modifi_hospital .hospital_patient .selectBox2.s_select .optionList.room_option2 .optionItem.room_list2").on("click",roomSelectHandle2) 
}

// 측정관리 => 수정 병실 셀렉트 박스
function update_room_selectBox_handle(){
    let new_sickBed_html = "";
    const $bedNumber = $(this).data("etc"); //몇 인실인지 확인
    const $title = $(this).find("p").text();
    
    $(".section.modifi_hospital .hospital_patient .selectBox2.select_room .mroom_label").text($title);
    $(".section.modifi_hospital .hospital_patient .selectBox2.select_room .mroom_label").attr("data-sickroomcode", $(this).data("sickroomcode"));
    $(this).parent().parent().removeClass("active");

    for(let i = 0 ; i < $bedNumber; i++){
        new_sickBed_html += `
            <li class="optionItem mbed_list">${i+1}번 병상</li>
        `;
    }
    $(".section.modifi_hospital .hospital_patient .selectBox2.select_bed .optionList.mbed_option").html(new_sickBed_html);
    
    $(".section.modifi_hospital .hospital_patient .selectBox2.select_bed .optionList.mbed_option .bed_list").on("click", function(){
        const $title = $(this).text();
        $(".section.modifi_hospital .hospital_patient .selectBox2.select_bed .mbed_label").text($title);
        $(this).parent().parent().removeClass("active");
    });

} 