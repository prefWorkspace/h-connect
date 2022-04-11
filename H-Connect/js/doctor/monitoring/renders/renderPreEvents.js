'use strict';

const { preEventListItem } = await import(
    importVersion(
        '/H-Connect/js/doctor/monitoring/templates/templatePreEvents.js'
    )
);

const { getNewEventList } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/dummyData.js')
);

export function renderPreEventList() {
    // declare tempPreEventList
    let templatePreEventList = ``;

    if (getNewEventList().result) {
        let eventList = getNewEventList().eventList.filter(
            (list) => list.isConfirm
        );
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
        eventList.sort(function (a, b) {
            return new Date('20' + b.date) - new Date('20' + a.date);
        });
        // render PreEventList
        eventList.forEach((evt) => {
            templatePreEventList += preEventListItem(evt);
        });
        templatePreEventList += `</div>`;
        // Attach To Parent
        $('.section.new_patient.pre').html(templatePreEventList);
    }
}

export function addEventToPreEventList(params) {
    let { selectedId } = params;
    const $preEventRow = $('.section.new_patient.pre .row');

    if (selectedId) {
        $preEventRow.forEach((row) => {
            if (row.data('id') === selectedId) {
                row.addClass('on');
                return false;
            }
        });
    }

    // Add Event To Select New Events Btn
    $('.btn_new')
        .off()
        .on('click', function () {
            $preEventRow.removeClass('on');
            selectedId = null;
            $('.section.new_patient.pre').css('display', 'none');
            $('.section.new_patient.new').css('display', 'BLOCK');
        });

    // Add Event To Pre Event List
    $preEventRow.off().on('click', function () {
        $preEventRow.removeClass('on');
        const $this = $(this);
        selectedId = $this.data('id');
        if (!$this.hasClass('on')) $this.addClass('on');
    });
}

export function renderAndAddEventPreEventList(params) {
    renderPreEventList();
    addEventToPreEventList(params);
}
