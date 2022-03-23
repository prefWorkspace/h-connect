'use strict';

export function wardSelectBox(item) {
    return `
        <li class="optionItem ward_list" data-wardcode="${item.wardCode}">${
        item.ward || '병동1'
    }</li>
    `;
}
