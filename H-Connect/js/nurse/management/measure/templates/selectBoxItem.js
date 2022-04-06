'use strict';

export function wardItem(item) {
    return `
        <li class="optionItem ward_list" data-wardcode="${item.wardCode}">${item.ward}</li>
    `;
}

export function sicRoomItem(item) {
    return `
        <li class="optionItem room_list" data-sickroomcode="${item.sickRoomCode}">${item.sickRoom}</li>
    `;
}
