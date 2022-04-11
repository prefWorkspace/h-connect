'use strict';

const { devType } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/common.js')
);

export function newEventListItem(item) {
    return `
        <div class='row' data-id='${item.eventId}'>
            <p>${item.date}</p>
            <div>
                <p>${item.patientName} (${item.patientAge}. ${
        item.patientGender & 1 ? '남' : '여'
    }. ${item.patientId})</p>
                <div>
                    <p>${devType(item.deviceType)}</p>
                    <div class="img_container">
                        <img src="/H-Connect/img/icon/btn_next_green.svg" alt="오른쪽 화살표" />
                    </div>
                </div>
            </div>
        </div>
    `;
}