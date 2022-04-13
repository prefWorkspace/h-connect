'use strict';

export function sickRoomList(item) {
    return `
        <div class="ward_list" data-sickroomcode=${item.sickRoomCode}>
            <p>
                <span id="sickRoom">${item.sickRoom}</span> 호실.
                <span id="patientNumber">${item.numberPatientRoom}</span>인실
            </p>

            <div class="ward_count">
                <p>
                    <span>${item.roomPatientCount}</span> 명의 환자 입원 중
                </p>

                <p>
                    <span>${item.roomDeviceCount}</span> 개의 장치 운영 중
                </p>
            </div>

            <div class="btn_list">
                <button type="button" class="btn btn_modify bl" data-sickroomcode=${item.sickRoomCode} data-wardcode=${item.wardCode} >수정</button>
                <button type="button" class="btn rd btn_delete" data-sickroomcode=${item.sickRoomCode} data-wardcode=${item.wardCode} >삭제</button>
            </div>
        </div>
    `;
}
