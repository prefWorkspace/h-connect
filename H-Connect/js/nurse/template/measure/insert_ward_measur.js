
//측정 관리 => 측정 현황 셀렉트 박스

function Create_ward_list_measure(wardList){
    let ward_list_html = ``;
    let sickRoom_list_html = ``;

    for(let i = 0; i < wardList.length; i++){
        ward_list_html += `
        <li class="optionItem ward_list" data-index="${i}" data-wardcode="${wardList[i].wardCode}">${wardList[i].ward}</li>
        `;
    }

    for(let i = 0; i < wardList[0].sickRoomList.length; i++){
        sickRoom_list_html += `
            <li class="optionItem room_list roomoption" data-sickroomcode="${wardList[0].sickRoomList[i].sickRoomCode}">${wardList[0].sickRoomList[i].sickRoom} 호실</li>
        `;
    }
    
    //측정 현황 병동 선택 셀렉 박스
    $(".section.measure_status .search_select .selectBox2.s_select .optionList.ward_option").html(ward_list_html);
    // $(".section.measure_status .search_select .selectBox2.s_select .label.ward_label").text(wardList[0].ward);  //원래 첫번째 인자 넣었는데 병동 선택으로 
    
    //측정 현황 병실 선택 셀렉 박스 
    $(".section.measure_status .search_select .selectBox2.s_select .optionList.room_option .optionItem.room_list").after(sickRoom_list_html);
    
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
        
        const index = $(this).data("index"); //선택한 wardList의 인덱스
        let new_sickRoomList = ``; 
        const $title = $(this).text();  //선택한 옵션의 이름

        $(".section.measure_status .search_select .selectBox2.s_select .ward_label").text($title); //선택한 옵션의 이름 변경
        $(".section.measure_status .search_select .selectBox2.s_select .room_label").text("병실전체"); // 병동 옵션이 바뀔시 병실은 디폴트값으로 다시 변경

        $("li").remove(".section.measure_status .search_select .selectBox2.s_select .optionList.room_option .room_list.roomoption"); //병실의 리스트 지우기

        for(let i = 0; i < wardList[index].sickRoomList.length; i++){
            new_sickRoomList += `
            <li class="optionItem room_list roomoption" data-sickroomcode="${wardList[index].sickRoomList[i].sickRoomCode}">${wardList[index].sickRoomList[i].sickRoom} 호실</li>
            `;
        }

        $(".section.measure_status .search_select .selectBox2.s_select .optionList.room_option .optionItem.room_list").after(new_sickRoomList); //병실에 병동의 맞는 새로운 리스트 정렬
        $(".section.measure_status .search_select .selectBox2.s_select .optionList.room_option .optionItem.room_list").on("click",roomSelectHandle) //리스트 정렬후 다시 이벤트 
        
        $(this).parent().parent().removeClass("active"); //셀렉트 박스 비활성화 
    });

    //병실 셀렉트 박스 옵션 선택 이벤트
    $(".section.measure_status .search_select .selectBox2.s_select .optionList.room_option .optionItem.room_list").on("click",roomSelectHandle) // 첫화면에서 병실 셀렉트 박스 이벤트 걸기
}

//병실 셀렉트 박스 옵션 변경 함수
function roomSelectHandle(){
    const $title = $(this).text();
    $(".section.measure_status .search_select .selectBox2.s_select .room_label").text($title);
    $(this).parent().parent().removeClass("active");
} 


//측정관리 => 신규 병상등록 병동 셀렉트 박스 
function Create_ward_list_measure_Bed(wardList){
    let ward_list_html = ``;
    let sickRoom_list_html = ``;

    for(let i = 0; i < wardList.length; i++){
        ward_list_html += `
            <li class="optionItem ward_list2" data-index="${i}" data-wardcode="${wardList[i].wardCode}">
                <p>${wardList[i].ward}</p>
                <span class="bed_count lot">+8 여유</span>
            </li>
        `;
    }

    // for(let i = 0; i < wardList[0].sickRoomList.length; i++){
    //     sickRoom_list_html += `
    //         <li class="optionItem room_list2" data-sickroomcode="${wardList[0].sickRoomList[i].sickRoomCode}" data-etc="${wardList[0].sickRoomList[i].etc}">
    //             <p>
    //                 <span>${wardList[0].sickRoomList[i].sickRoom}</span> 호실
    //             </p>
    //             <span class="bed_count lot">+1 여유</span>
    //         </li>
    //     `;
    // }
    
    //측정 현황 병동 선택 셀렉 박스
    $(".section.new_hospital .hospital_patient .selectBox2.s_select .optionList.ward_option2").html(ward_list_html);
    // $(".section.new_hospital .hospital_patient .selectBox2.s_select .label.ward_label").text(wardList[0].ward);  //원래 첫번째 인자 넣었는데 병동 선택으로 
    
    //측정 현황 병실 선택 셀렉 박스 
    // $(".section.new_hospital .hospital_patient .selectBox2.s_select .optionList.room_option2").html(sickRoom_list_html);
    
    //병동 셀렉트 박스 활성화
    $(".section.new_hospital .hospital_patient .selectBox2.s_select .ward_label2").on("click", function(){
        $(this).parent().toggleClass("active");
    })

    //병실 셀렉트 박스 활성화 
    $(".section.new_hospital .hospital_patient .selectBox2.s_select .room_label2").on("click", function(){
        $(this).parent().toggleClass("active");
    })

    //병상 셀렉트 박스 활성화 
    $(".section.new_hospital .hospital_patient .selectBox2.select_bed .bed_label").on("click", function(){
        $(this).parent().toggleClass("active");
    })

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

    //병실 셀렉트 박스 옵션 선택 이벤트
    $(".section.new_hospital .hospital_patient .selectBox2.s_select .optionList.room_option2 .optionItem.room_list2").on("click",roomSelectHandle2) // 첫화면에서 병실 셀렉트 박스 이벤트 걸기
}

// 측정관리 => 신규 병상등록 병실 셀렉트 박스
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


} //병실 셀렉트 박스 옵션 변경 함수



function Create_Ward_measure(){
    const data = `
        <div class="status_list">
            <p>
                <span>심장병동</span>.
                <span>1301</span>호실.
                <span>1</span>병상.
            </p>

            <p>
                <span>김환자</span>.
                (<span>63</span>.
                <span>남</span>.
                <span>patient no</span>)
            </p>

            <div class="device_list">
                <div>심전도</div>
                <div>산소포화도</div>
                <div>체온</div>
            </div>

            <div class="btn_list">
                <button type="button" class="btn bl btn_modify">수정</button>
                <button type="button" class="btn rd btn_delete">삭제</button>
            </div>
        </div>
    `;
    $(".nurse.nurse_measure .wrap_inner .section.measure_status .container").append(data);
    $(".nurse.nurse_measure .wrap_inner .section.measure_status .container .status_list").fadeIn();

}