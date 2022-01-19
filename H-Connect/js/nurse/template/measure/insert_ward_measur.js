
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
    
    $(".section.measure_status .container .cont .search_select .selectBox2.s_select .optionList.ward_option").html(ward_list_html);
    // $(".section.measure_status .container .cont .search_select .selectBox2.s_select .label.ward_label").text(wardList[0].ward);  //원래 첫번째 인자 넣었는데 병동 선택으로 
    $(".section.measure_status .container .cont .search_select .selectBox2.s_select .optionList.room_option .optionItem.room_list").after(sickRoom_list_html);
    
    $(".section.measure_status .container .cont .search_select .selectBox2.s_select .ward_label").on("click", function(){
        $(this).parent().addClass("active");
    })

    $(".section.measure_status .container .cont .search_select .selectBox2.s_select .optionList.ward_option .ward_list").on("click", function(){
        
        const index = $(this).data("index");
        let new_sickRoomList = ``;
        const $title = $(this).text();
        $(".section.measure_status .container .cont .search_select .selectBox2.s_select .ward_label").text($title);

        $("li").remove(".section.measure_status .container .cont .search_select .selectBox2.s_select .optionList.room_option .room_list.roomoption");

        for(let i = 0; i < wardList[index].sickRoomList.length; i++){
            new_sickRoomList += `
            <li class="optionItem room_list roomoption" data-sickroomcode="${wardList[index].sickRoomList[i].sickRoomCode}">${wardList[index].sickRoomList[i].sickRoom} 호실</li>
            `;
        }
        $(".section.measure_status .container .cont .search_select .selectBox2.s_select .optionList.room_option .optionItem.room_list").after(new_sickRoomList);
        // $(".section.measure_status .container .cont .search_select .selectBox2.s_select").parent().parent().removeClass("active");
        $(this).parent().parent().removeClass("active");
    });
}

function Create_ward_list_measure_Bed(){

}

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