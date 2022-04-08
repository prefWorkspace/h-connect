'use strict';

const { device_TypeToName } = await import(
    importVersion('/H-Connect/js/utils/controller/deviceNameController.js')
);

export function newSickBed_device(item) {
    console.log(item);
    return `
        <div>
            <p>${device_TypeToName(item.deviceType)}</p>
            <p>${item.serialNumber}</p>

            <div class="btn_list">
                <button
                    data-serialnumber="${
                        item.serialNumber
                    }"                        
                    data-macaddress="${item.macAddress}"                        
                    type="button"
                    class="btn bl"
                >
                    장치수정
                </button>
                <button
                    data-serialnumber="${
                        item.serialNumber
                    }"                        
                    data-macaddress="${item.macAddress}"                        
                    type="button"
                    class="btn rd btn_delete"
                >
                    장치제거
                </button>
            </div>
        </div>
    `;
}
