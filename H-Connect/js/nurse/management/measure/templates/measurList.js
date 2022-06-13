'use strict';

const { device_TypeToName } = await import(
    importVersion('/H-Connect/js/utils/controller/deviceNameController.js')
);

const { birthdayToAge } = await import(
    importVersion('/H-Connect/js/utils/common/utils.js')
);

export function measureList(data_List) {
    const {
        name,
        gender,
        ward,
        sickRoom,
        sickBed,
        patientCode,
        age,
        birthday,
        wardCode,
        sickRoomCode,
        sickBedCode,
        apiRoute,
        measurementCode,
        deviceInfoList,
        measurementStatus,
    } = data_List;

    // measurementStatus의 상태 값에 따라 측정 종료 버튼 달라짐
    // 0 : NONE
    // 1 : WAITING
    // 2 : RECODING_START
    // 3 : RECODING_END
    // 8 : COMPLETED
    // console.log(measurementStatus);

    const device = [];
    if (deviceInfoList !== null) {
        for (let i = 0; i < deviceInfoList.length; i++) {
            device.push(deviceInfoList[i].deviceType);
        }
    }

    return `
        <div class="status_list" data-measurementcode="${measurementCode}" data-wardcode="${wardCode}" data-sickroomcode="${sickRoomCode}" data-sickbedcode="${sickBedCode}" >
            <p>
                <span>${ward}동</span>.
                <span>${sickRoom}</span>. 
                <span>${sickBed}병상</span>.
            </p>

            <p>
                <span>${name}</span>.
                (<span>${birthday ? birthdayToAge(birthday) : '00'}</span>.
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
                <button ${
                    measurementStatus === 1 && 'disabled'
                } type="button" class="btn rdf btn_end" data-measurementcode=${measurementCode} data-sickroomcode="${sickRoomCode}" data-wardcode="${wardCode}" data-sickbedcode="${sickBedCode}" data-route=${apiRoute}>측정종료</button>
            </div>
        </div>
    `;
}

export function modifiDeviceList(item) {
    return `
        <div id=${item.deviceInfoId} class="device_Item">
            <p>${device_TypeToName(item.deviceType)}</p>
            <p>${item.serialNumber}</p>

            <div class="btn_list">
                <button
                    data-deviceinfoid="${item.deviceInfoId}"
                    data-measurementcode="${item.measurementCode}"
                    type="button"
                    class="btn bl"
                >
                    장치수정
                </button>
                <button
                    data-measurementcode="${item.measurementCode}"
                    data-deviceinfoid="${item.deviceInfoId}"
                    type="button"
                    class="btn rd btn_delete"
                >
                    장치제거
                </button>
            </div>
        </div>
    `;
}
