
//측정 관리 => 측정 현황 셀렉트 박스
function Create_ward_list_measure(wardList){
    let ward_list_html = ``;
    let sickRoom_list_html = ``;

    for(let i = 0; i < wardList.length; i++){
        ward_list_html += `
            <li class="optionItem ward_list" data-index="${i}" data-wardcode="${wardList[i].wardCode}">${wardList[i].ward}</li>
        `;
    }
    
    //측정 현황 병동 선택 셀렉 박스 대입
    $(".section.measure_status .search_select .selectBox2.s_select .optionList.ward_option").html(ward_list_html);
    
    //측정 현황 병실 선택 셀렉 박스 대입
    $(".section.measure_status .search_select .selectBox2.s_select .optionList.room_option .optionItem.room_list").after(sickRoom_list_html);
}

function Create_Ward_measure(data_List){
    
    if(typeof data_List !== "object" || !data_List) return;

    let data = "";
    for(let i = 0; i < data_List.length; i++){
        const { name, gender, ward, sickRoom, sickBed, patientCode, birthday, wardCode, sickRoomCode, sickBedCode, apiRoute, measurementCode } = data_List[i];

        data += `
            <div class="status_list" data-sickroomcode="${sickRoomCode}" >
                <p>
                    <span>${ward}동</span>.
                    <span>${sickRoom}</span>. 
                    <span>${sickBed}병상</span>.
                </p>
    
                <p>
                    <span>${name}</span>.
                    (<span>${birthday}</span>.
                    <span>${gender === 1 ? "남자" : "여자"}</span>.
                    <span>${patientCode}</span>)
                </p>
    
                <div class="device_list">
                    <div>심전도</div>
                    <div>산소포화도</div>
                    <div>체온</div>
                </div>
    
                <div class="btn_list">
                    <button type="button" class="btn bl btn_modify" data-measurementcode=${measurementCode} data-sickroomcode="${sickRoomCode}" data-wardcode="${wardCode}" data-sickbedcode="${sickBedCode}" data-route=${apiRoute}>수정</button>
                    <button type="button" class="btn rd btn_delete" data-measurementcode=${measurementCode} data-sickroomcode="${sickRoomCode}" data-wardcode="${wardCode}" data-sickbedcode="${sickBedCode}" data-route=${apiRoute}>삭제</button>
                </div>
            </div>
        `;
    }

    $(".nurse.nurse_measure .wrap_inner .section.measure_status .container .container").append(data);
    $(".nurse.nurse_measure .wrap_inner .section.measure_status .container .status_list").fadeIn();
}

