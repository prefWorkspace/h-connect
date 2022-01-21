
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
        
        let new_sickRoomList = ``; 
        let patientList = ``;
        const index = $(this).data("index"); //선택한 wardList의 인덱스
        const $title = $(this).text();  //선택한 옵션의 이름

        $(".section.measure_status .search_select .selectBox2.s_select .ward_label").text($title); //선택한 옵션의 이름 변경
        $(".section.measure_status .search_select .selectBox2.s_select .room_label").text("병실전체"); // 병동 옵션이 바뀔시 병실은 디폴트값으로 다시 변경

        $("li").remove(".section.measure_status .search_select .selectBox2.s_select .optionList.room_option .room_list.roomoption"); //병실의 리스트 지우기

        //병실 옵션 목록 생성
        for(let i = 0; i < wardList[index].sickRoomList.length; i++){
            new_sickRoomList += `
                <li class="optionItem room_list roomoption" data-sickroomcode="${wardList[index].sickRoomList[i].sickRoomCode}">${wardList[index].sickRoomList[i].sickRoom} 호실</li>
            `;
        }

        $(".section.measure_status .search_select .selectBox2.s_select .optionList.room_option .optionItem.room_list").after(new_sickRoomList); //병실에 병동의 맞는 새로운 리스트 정렬
        $(".section.measure_status .search_select .selectBox2.s_select .optionList.room_option .optionItem.room_list").on("click",() => roomSelectHandle(wardList[index])) //리스트 정렬후 다시 이벤트 
        
        //측정 현황 해당 환자 목록 생성
        const sickRoomArr = [...wardList[index].sickRoomList]; 

        $("div").remove(".nurse.nurse_measure .wrap_inner .section.measure_status .container .status_list"); //환자 리스트 일단 지우기

        for(let i = 0; i < sickRoomArr.length; i++){
            for(let j = 0; j < sickRoomArr[i].sickBedList?.length; j++){
                Create_Ward_measure(wardList[index].ward, sickRoomArr[i].sickRoom, sickRoomArr[i].sickBedList[j].sickBed, sickRoomArr[i].sickBedList[j].sickRoomCode, sickRoomArr[i].sickBedList[j].etc);
            }
        }

        $(this).parent().parent().removeClass("active"); //셀렉트 박스 비활성화 
    });

    //병실 셀렉트 박스 옵션 선택 이벤트
    // $(".section.measure_status .search_select .selectBox2.s_select .optionList.room_option .optionItem.room_list").on("click",roomSelectHandle) // 첫화면에서 병실 셀렉트 박스 이벤트 걸기
}

//병실 셀렉트 박스 옵션 변경 함수
function roomSelectHandle(wardList){
    const $title = $(this).text();
    const sickRoomCode = $(this).data("sickroomcode");
    $(".section.measure_status .search_select .selectBox2.s_select .room_label").text($title);

    for(let i = 0; i < wardList.sickRoomList.length; i++){
        /// 작업 
    }
    
    $(this).parent().parent().removeClass("active");
} 

