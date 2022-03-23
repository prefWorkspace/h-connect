'use strict';
import { device_TypeToName } from '../../../../utils/controller/deviceNameController.js';

export function deviceList(item) {
    return `
        <div class="item_row">
            <p class="item_name">${device_TypeToName(item.deviceType)}</p>
            <p class="item_num">${item.serialNumber}</p>
            <p class="use_line">사용가능</p>

            <button data-serialnumber=${
                item.serialNumber
            } type="button" class="btn rd btn_delete">
                삭제
            </button>
        </div>
    `;
}
