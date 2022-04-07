'use strict';

//측정현황 및 병상 수정
export function wardItem(item) {
    return `
        <li class="optionItem ward_list" data-wardcode="${item.wardCode}">${item.ward}</li>
    `;
}

export function sicRoomItem(item) {
    return `
        <li class="optionItem room_list option" data-sickroomcode="${item.sickRoomCode}">${item.sickRoom}</li>
    `;
}

//신규 병상 등록
export function nWardItem(item) {
    return `
        <li class="optionItem ward_list2" data-sparebed="${
            item.wardSpareBedCount
        }" data-wardcode="${item.wardCode}">
            <p>${item.ward}</p>
            <span class="bed_count lot" 
                >${
                    item.wardSpareBedCount > 0
                        ? '+' + item.wardSpareBedCount
                        : '0'
                } 여유</span
            >
        </li>
    `;
}

export function nSicRoomItem(item) {
    return `
        <li class="optionItem room_list2" data-sparebed="${
            item.roomSpareBedCount
        }" data-sickroomcode="${item.sickRoomCode}">
            <p><span>${item.sickRoom}</span> 호실</p>
            <span class="bed_count lot">${
                item.roomSpareBedCount > 0 ? '+' + item.roomSpareBedCount : '0'
            } 여유</span>
        </li>
    `;
}

export function nSickBedItem(item) {
    return `
        <li class="optionItem bed_list">${item.sickBed}번 병상</li>
    `;
}
