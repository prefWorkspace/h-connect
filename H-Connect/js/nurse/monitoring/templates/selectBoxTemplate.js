'use strict';

export function wardListItem(item) {
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

export function sickRoomListItem(item) {
    return `
        <li class="optionItem room_list2" data-sparebed="${
            item.roomSpareBedCount
        }" data-sickroomcode="${item.sickRoomCode}">
            <p><span>${item.sickRoom}</span> 호실</p>
            <span class="bed_count lot"
                >${
                    item.roomSpareBedCount > 0
                        ? '+' + item.roomSpareBedCount
                        : '0'
                } 여유</span
            >
        </li>
    `;
}

export function sickBedListItem(item) {
    return `
        <li class="optionItem bed_list" data-sickbedcode="${item.sickBedCode}">
            ${item.sickBed}번 병상
        </li>
    `;
}

export function patientHISList(_data) {
    const {
        patientNo,
        bedNo,
        gender,
        patientName,
        roomName,
        wardName,
        birthday,
    } = _data;

    return `
        <li data-bedname="${bedNo}" data-wardname="${wardName}" data-roomname="${roomName}" class="optionItem name_list">
            <span>${patientName}</span>
            <span>${birthday.slice(0, 4)}</span>
            <span>${gender === 'M' ? '남' : '여'}</span>
            <span>${patientNo}</span>
        </li>
    `;
}
