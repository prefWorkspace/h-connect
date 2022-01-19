
function Create_newSickRoom(title, sickRoomCode, bedNum, roomPeple){
    //bedNum 입원중 환자 및 장치 개수 체크 
    const data = `
        <div class="ward_list" data-sickroomcode=${sickRoomCode}>
            <p>
                <span>${title}</span> 호실.
                <span>${roomPeple}</span>인실
            </p>

            <div class="ward_count">
                <p>
                    <span>0</span> 명의 환자 입원 중
                </p>

                <p>
                    <span>0</span> 개의 장치 운영 중
                </p>
            </div>

            <div class="btn_list">
                <button type="button" class="btn btn_modify bl" data-sickroomcode=${sickRoomCode} >수정</button>
                <button type="button" class="btn rd btn_delete" data-sickroomcode=${sickRoomCode} >삭제</button>
            </div>
        </div>
    `
    $(".section.right.hospital_room .container .cont .container").append(data);
    $(".section.right.hospital_room .container .cont .container .ward_list").fadeIn();
}