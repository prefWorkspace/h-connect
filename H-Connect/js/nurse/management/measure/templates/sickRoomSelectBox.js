'use strict';

export function sickRoomSelectBox(item) {
    return `
        <li class="optionItem room_list" data-wardcode="${item.wardCode}" data-sickroomcode="${item.sickRoomCode}">${item.sickRoom}실</li>
    `;
}
