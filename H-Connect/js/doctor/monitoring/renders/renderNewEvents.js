'use strict';

const { eventListItem } = await import(
    importVersion(
        '/H-Connect/js/doctor/monitoring/templates/templateEvent.js'
    )
);

export async function renderNewEventList(_eventList) {
    if (!_eventList) return;
    // declare tempNewEventList
    let templateNewEventList = ``;

    let eventList = _eventList;

    // render NewEventList Header
    templateNewEventList += `
    <div class="title">
        <div>
            <div class="img_container">
                <img
                    src="/H-Connect/img/header/monitoring.svg"
                    alt="모니터 아이콘"
                />
            </div>
            <h2>새로운 환자 이벤트</h2>
        </div>
        <p>
            새로 발생한 이벤트 및 확인하지 않은 이벤트
            목록입니다.
        </p>
    </div>
    <div class="alarm">
        <p><span>${eventList.length}</span> 개의 확인하지 않은 이벤트</p>
        <div>
            <button type="button" class="btn_new on">
                신규 이벤트
            </button>
            <button type="button" class="btn_pre">
                지난 이벤트
            </button>
        </div>
    </div>
    <div class='ecglist'>`;

    // render NewEventList
    eventList.forEach((evt) => {
        templateNewEventList += eventListItem(evt);
    });
    templateNewEventList += '</div>';
    // Attach To Parent
    $('.section.new_patient.new').html(templateNewEventList);
}