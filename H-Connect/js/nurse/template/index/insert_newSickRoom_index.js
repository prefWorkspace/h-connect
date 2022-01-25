
function Create_newSickRoom(sickRoomList){
    //bedNum 입원중 환자 및 장치 개수 체크
    console.log(sickRoomList) 
    const data = `
    <div class="ward_list" data-sickroomcode=${sickRoomList.sickRoomCode}>
            <p>
                <span>${sickRoomList.sickRoom}</span> 호실.
                <span>${sickRoomList.numberPatientRoom}</span>인실
            </p>

            <div class="ward_count">
                <p>
                    <span>${sickRoomList.roomPatientCount}</span> 명의 환자 입원 중
                </p>

                <p>
                    <span>${sickRoomList.roomDeviceCount}</span> 개의 장치 운영 중
                </p>
            </div>

            <div class="btn_list">
                <button type="button" class="btn btn_modify bl" data-sickroomcode=${sickRoomList.sickRoomCode} >수정</button>
                <button type="button" class="btn rd btn_delete" data-sickroomcode=${sickRoomList.sickRoomCode} >삭제</button>
            </div>
        </div>
    `
    $(".section.right.hospital_room .container .cont .container").append(data);
    $(".section.right.hospital_room .container .cont .container .ward_list").fadeIn();
}