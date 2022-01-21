
//측정 관리 => 측정 현황 셀렉트 박스

function Create_ward_list_measure(wardList){
    let ward_list_html = ``;
    let sickRoom_list_html = ``;

    for(let i = 0; i < wardList.length; i++){
        ward_list_html += `
            <li class="optionItem ward_list" data-index="${i}" data-wardcode="${wardList[i].wardCode}">${wardList[i].ward}</li>
        `;
    }

    // for(let i = 0; i < wardList[0].sickRoomList.length; i++){
    //     sickRoom_list_html += `
    //         <li class="optionItem room_list roomoption" data-sickroomcode="${wardList[0].sickRoomList[i].sickRoomCode}">${wardList[0].sickRoomList[i].sickRoom} 호실</li>
    //     `;
    // }
    
    //측정 현황 병동 선택 셀렉 박스 대입
    $(".section.measure_status .search_select .selectBox2.s_select .optionList.ward_option").html(ward_list_html);
    // $(".section.measure_status .search_select .selectBox2.s_select .label.ward_label").text(wardList[0].ward);  //원래 첫번째 인자 넣었는데 병동 선택으로 
    
    //측정 현황 병실 선택 셀렉 박스 대입
    $(".section.measure_status .search_select .selectBox2.s_select .optionList.room_option .optionItem.room_list").after(sickRoom_list_html);
    
}

function Create_Ward_measure(ward, sickRoom, sickBed, sickRoomCode, patient){

    if(!ward || !sickRoom || !sickBed || !sickRoomCode) return;
    if(patient === "" || patient === undefined) return;

    const {patient_name, patient_age, patient_gender, patient_MRNCode} = JSON.parse(patient);

    const data = `
        <div class="status_list" data-sickroomcode="${sickRoomCode}" >
            <p>
                <span>${ward}</span>.
                <span>${sickRoom}</span>.
                <span>${sickBed}</span>.
            </p>

            <p>
                <span>${patient_name}</span>.
                (<span>${patient_age}</span>.
                <span>${patient_gender}</span>.
                <span>${patient_MRNCode}</span>)
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

    
    $(".nurse.nurse_measure .wrap_inner .section.measure_status .container .container").append(data);
    $(".nurse.nurse_measure .wrap_inner .section.measure_status .container .status_list").fadeIn();
}

