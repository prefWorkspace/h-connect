
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
    
    //원래 첫번째 인자 넣었는데 병동 선택으로 
    // $(".section.new_hospital .hospital_patient .selectBox2.s_select .label.ward_label").text(wardList[0].ward);  
    
    //측정 현황 병실 선택 셀렉 박스 
    // $(".section.new_hospital .hospital_patient .selectBox2.s_select .optionList.room_option2").html(sickRoom_list_html);
    
}

//측정관리 병상 수정에서 병동 셀렉트 박스 대입
function Create_ward_list_update_Bed(wardList){
    let ward_list_html = ``;

    for(let i = 0; i < wardList.length; i++){
        ward_list_html += `
            <li class="optionItem mward_list" data-index="${i}" data-wardcode="${wardList[i].wardCode}">
                <p>${wardList[i].ward}</p>
                <span class="bed_count lot">+8 여유</span>
            </li>
        `;
    }

    $(".section.modifi_hospital .hospital_patient .selectBox2.select_ward .optionList.mward_option").html(ward_list_html);
} 

