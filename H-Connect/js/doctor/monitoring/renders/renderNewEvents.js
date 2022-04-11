'use strict';

const { newEventListItem } = await import(
    importVersion(
        '/H-Connect/js/doctor/monitoring/templates/templateNewEvents.js'
    )
);

const { getNewEventList } = await import(importVersion('/H-Connect/js/doctor/monitoring/dummyData.js'));

export function renderNewEventList() {
    // declare tempNewEventList
    let templateNewEventList = ``;

    if (getNewEventList().result) {
        let eventList = getNewEventList().eventList;
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
            templateNewEventList += newEventListItem(evt);
        });
        templateNewEventList += '</div>';
        // Attach To Parent
        $('.section.new_patient.new').html(templateNewEventList);
    }
}

export function addEventToNewEventList(params) {
    let { selectedId } = params;
    const $newEventRow = $('.section.new_patient.new .row');

    if (selectedId) {
        $newEventRow.forEach((row) => {
            if (row.data('id') === selectedId) {
                row.addClass('on');
                return false;
            }
        });
    } 

    // Add Event To Select Pre Events Btn
    $('.btn_pre').off().on('click', function () {
        selectedId = null;
        $('.section.new_patient.new').css('display', 'none');
        $('.section.new_patient.pre').css('display', 'BLOCK');
        
    })

    // Add Event To New Event List
    $newEventRow.off().on('click', function () {
        $newEventRow.removeClass('on');

        const $this = $(this);
        selectedId = $this.data('id');
        if (!$this.hasClass('on')) $this.addClass('on');
    });
}

export function renderAndAddEventNewEventList(params) {
    renderNewEventList();
    addEventToNewEventList(params);
}
