'use strict';

const { eventListItem } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/templates/templateEvent.js')
);

export async function renderPreEventList(_eventList) {
    // declare tempPreEventList
    let templatePreEventList = ``;
    let eventList = _eventList;
    // render PreEventList Header
    templatePreEventList += `
    <div class="title">
        <div>
            <div class="img_container">
                <img
                    src="/H-Connect/img/header/monitoring.svg"
                    alt="모니터 아이콘"
                />
            </div>

            <h2>지난 이벤트 보기</h2>
        </div>

        <p>지난 이벤트를 확인 합니다.</p>
    </div>

    <div class="alarm">
        <div class="search_container">
            <input
                type="text"
                placeholder="환자명 혹은 환자번호"
            />

            <button type="button" class="btn_search">
                <img
                    src="/H-Connect/img/header/search.svg"
                    alt="검색표시"
                />
            </button>
        </div>

        <div>
            <button type="button" class="btn_new">
                신규 이벤트
            </button>
            <button type="button" class="btn_pre on">
                지난 이벤트
            </button>
        </div>
    </div>
    <div class='ecglist'>
    `;
    if (_eventList) {
        // render PreEventList
        eventList.forEach((evt) => {
            templatePreEventList += eventListItem(evt);
        });
    }
    
    
    templatePreEventList += `</div>`;
    // Attach To Parent
    $('.section.new_patient.pre').html(templatePreEventList);
}


