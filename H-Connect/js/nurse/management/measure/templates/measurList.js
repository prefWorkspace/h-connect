'use strict';

export function measureList(data_List) {
    const {
        name,
        gender,
        ward,
        sickRoom,
        sickBed,
        patientCode,
        birthday,
        wardCode,
        sickRoomCode,
        sickBedCode,
        apiRoute,
        measurementCode,
    } = data_List;

    return `
        <div class="status_list" data-sickroomcode="${sickRoomCode}" >
            <p>
                <span>${ward}동</span>.
                <span>${sickRoom}</span>. 
                <span>${sickBed}병상</span>.
            </p>

            <p>
                <span>${name}</span>.
                (<span>${birthday || '0000-00-00'}</span>.
                <span>${gender === 1 ? '남자' : '여자'}</span>.
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
