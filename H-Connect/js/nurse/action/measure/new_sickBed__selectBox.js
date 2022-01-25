
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

        console.log(wardList[index].sickRoomList)
        let total_bed_count;
        let patient_count;
        for(let i = 0; i < wardList[index].sickRoomList.length; i++){
            total_bed_count = wardList[index].sickRoomList[i].sickBedList.length;
            patient_count = wardList[index].sickRoomList[i].roomPatientCount;
            new_sickRoomList += `
                <li class="optionItem room_list2" data-index=${i} data-sickroomcode="${wardList[index].sickRoomList[i].sickRoomCode}" data-etc="${wardList[index].sickRoomList[i].etc}">
                    <p>
                        <span>${wardList[index].sickRoomList[i].sickRoom}</span> 호실
                    </p>
                    <span class="bed_count lot">+${total_bed_count - patient_count} 여유</span>
                </li>
            `;
        }

        $(".section.new_hospital .hospital_patient .selectBox2.s_select .optionList.room_option2").html(new_sickRoomList); //병실 셀렉트박스  병동에 맞는 새로운 리스트 정렬
        // $(".section.new_hospital .hospital_patient .selectBox2.s_select .optionList.room_option2 .optionItem.room_list2").on("click", function(){
        $(".section.new_hospital .hospital_patient .selectBox2.s_select .optionList.room_option2 .optionItem.room_list2").on("click", function(){
            const target = $(this);
            roomSelectHandle2(wardList[index].sickRoomList, target);
        }) //리스트 정렬후 다시 이벤트 
        
        $(this).parent().parent().removeClass("active"); //셀렉트 박스 비활성화 
    });

    // 첫화면에서 병실 셀렉트 박스 이벤트 걸기
    // $(".section.new_hospital .hospital_patient .selectBox2.s_select .optionList.room_option2 .optionItem.room_list2").on("click",roomSelectHandle2) 
}

// 측정관리 신규 병상등록 병실 셀렉트 박스
function roomSelectHandle2(sickRoomList, target){

    let new_sickBed_html = "";
    const index_SickRoomList = target.data("index");
    const $bedNumber = sickRoomList[index_SickRoomList].sickBedList.length; //몇 인실인지 확인
    const $title = target.find("p").text();

    $(".section.new_hospital .hospital_patient .selectBox2.s_select .room_label2").text($title);
    $(".section.new_hospital .hospital_patient .selectBox2.s_select .room_label2").attr("data-sickroomcode", $(this).data("sickroomcode"));
    target.parent().parent().removeClass("active");

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

