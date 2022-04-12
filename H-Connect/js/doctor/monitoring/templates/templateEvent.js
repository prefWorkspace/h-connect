'use strict';

const { dateFormat, eventTypeConstant } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/common.js')
);

export function eventListItem(item) {
    const { ymd, hms } = dateFormat(new Date(item.eventDateTime))
    return `
        <div class='row' data-id='${item.bioSignalEventId}' data-name='${
        item.name
    }' data-patientcode='${item.patientCode}'>
            <p>${ymd} ${hms}</p>
            <div>
                <p>${item.name} (${item.age}. ${
        item.gender & 1 ? '남' : '여'
    }. ${item.patientCode})</p>
                <div>
                    <p>${eventTypeConstant(item.eventType)}</p>
                    <div class="img_container">
                        <img src="/H-Connect/img/icon/btn_next_green.svg" alt="오른쪽 화살표" />
                    </div>
                </div>
            </div>
        </div>
    `;
}
