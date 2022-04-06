'use strict';

export function measureList(data_List) {
    const {
        name,
        gender,
        ward,
        sickRoom,
        sickBed,
        patientCode,
        age,
        wardCode,
        sickRoomCode,
        sickBedCode,
        apiRoute,
        measurementCode,
        deviceInfoList,
    } = data_List;

    const device = [];
    if (deviceInfoList !== null) {
        for (let i = 0; i < deviceInfoList.length; i++) {
            device.push(deviceInfoList[i].deviceType);
        }
    }

    return `
        <div class="status_list" data-sickbedcode="${sickBedCode}" >
            <p>
                <span>${ward}동</span>.
                <span>${sickRoom}</span>. 
                <span>${sickBed}병상</span>.
            </p>

            <p>
                <span>${name}</span>.
                (<span>${age || '00'}</span>.
                <span>${gender === 1 ? '남자' : '여자'}</span>.
                <span>${patientCode}</span>)
            </p>

            <div class="device_list">
                <div class="${
                    device.some((item) => item === 1) ? null : 'off'
                }">심전도</div>
                <div class="${
                    device.some((item) => item === 3) ? null : 'off'
                }">산소포화도</div>
                <div class="${
                    device.some((item) => item === 2) ? null : 'off'
                }">체온</div>
            </div>

            <div class="btn_list">
                <button type="button" class="btn rdf btn_end" data-measurementcode=${measurementCode} data-sickroomcode="${sickRoomCode}" data-wardcode="${wardCode}" data-sickbedcode="${sickBedCode}" data-route=${apiRoute}>측정종료</button>
            </div>
        </div>
    `;
}
