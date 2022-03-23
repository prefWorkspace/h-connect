'use strict';
import { device_TypeToName } from '../../../../utils/controller/deviceNameController.js';

export function unusedDeviceList(item) {
    return `
        <div class="item_row">
            <p class="item_name">${device_TypeToName(item.deviceType)}</p>
            <p class="item_num">${item.serialNumber}</p>
            <p class="use_line">반납완료</p>

            <button data-serialnumber=${item.serialNumber} data-type="${
        item.deviceType
    }" type="button" class="btn rd btn_cancel">
                취소
            </button>
        </div>
    `;
}
