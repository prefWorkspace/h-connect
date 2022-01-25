
function Create_newSickRoom(sickRoomList){
    
    let data = "";
    //bedNum 입원중 환자 및 장치 개수 체크
    for(let i = 0; i < sickRoomList.length; i++){    
        data += `
            <div class="ward_list" data-sickroomcode=${sickRoomList[i].sickRoomCode}>
                <p>
                    <span>${sickRoomList[i].sickRoom}</span> 호실.
                    <span>${sickRoomList[i].numberPatientRoom}</span>인실
                </p>

                <div class="ward_count">
                    <p>
                        <span>${sickRoomList[i].roomPatientCount}</span> 명의 환자 입원 중
                    </p>

                    <p>
                        <span>${sickRoomList[i].roomDeviceCount}</span> 개의 장치 운영 중
                    </p>
                </div>

                <div class="btn_list">
                    <button type="button" class="btn btn_modify bl" data-sickroomcode=${sickRoomList[i].sickRoomCode} >수정</button>
                    <button type="button" class="btn rd btn_delete" data-sickroomcode=${sickRoomList[i].sickRoomCode} >삭제</button>
                </div>
            </div>
        `;
    }

    $(".section.right.hospital_room .container .cont .container").html(data);
    $(".section.right.hospital_room .container .cont .container .ward_list").fadeIn();
}