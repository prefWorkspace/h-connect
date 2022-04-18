'use strict';

let { selectedEventId, searchKeyword } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/common.js')
);

const { renderNewEventList } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/renders/renderNewEvents.js')
);

const { renderPreEventList } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/renders/renderPreEvents.js')
);

const { eventListItem } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/templates/templateEvent.js')
);

const {
    insertNewEventScreen,
    insertPreEventScreen,
    updateBioSignalEvent,
    deleteBioSignalEvent,
} = await import(
    importVersion('/H-Connect/js/doctor/monitoring/actions/eventScreenAPI.js')
);

const {
    selectBioSignalEventSimpleList,
    selectBioSignalEventSimplePage,
    selectBioSignalEvent,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/monitoring/actions/selectBioSignalEventActions.js'
    )
);

const SCROLL_LIST_NUMBER = 10;
let pageNumber = 1;
let callListNumber = 10;

$.fn.hasScrollBar = function () {
    return (
        (this.prop('scrollHeight') == 0 && this.prop('clientHeight') == 0) ||
        this.prop('scrollHeight') > this.prop('clientHeight')
    );
};

export async function insertNewEventList() {
    let res = await selectBioSignalEventSimpleList(0);
    let eventList = res.bioSignalEventSimpleList?.slice(0, 10);
    await renderNewEventList(eventList);
    $('.section.new_patient.new').ready(async function () {
        if (!eventList) {
            insertNewEventScreen(null);
        }

        if (eventList) {
            for await (const evt of eventList) {
                insertNewEvent(evt);
            }
            $('.section.new_patient.new .ecglist .row').first().addClass('on');
            const targetEvent = await eventList[0];
            insertNewEventScreen(targetEvent);
        }

        // Add Event To Select Pre Events Btn
        $('.btn_pre').on('click', async function () {
            await insertEventList('PRE');
            $('.section.new_patient.new').css('display', 'none');
            $('.section.rhythm.new_rhythm').css('display', 'none');
            $('.section.new_patient.pre').css('display', 'block');
            $('.section.rhythm.pre_rhythm').css('display', 'block');
        });
    });
}

export async function insertNewEvent(event) {
    const $newEvent = await eventListItem(event);
    $('.section.new_patient.new .ecglist').append($newEvent);
    $(`.section.new_patient.new .row[data-id=${event.bioSignalEventId}]`).on(
        'click',
        async function () {
            const $this = $(this);
            if ($this.hasClass('on')) return;
            $('.section.new_patient.new .row.on').removeClass('on');
            $this.addClass('on');
            await insertNewEventScreen(event);
            $('.event').off('click', '.btn_con');
            $('.event').on('click', '.btn_con', function () {
                updateBioSignalEvent(event, 2);
                $(document).remove($this);
                insertNewEventList();
            });
            $('.event').off('click', '.btn_delete');
            $('.event').on('click', '.btn_delete', function () {
                deleteBioSignalEvent(event);
                $(document).remove($this);
                insertNewEventList();
            });
        }
    );
}

//입원환자 모니터링 왼쪽 지난 이벤트 렌더링 및 이벤트 연결 함수
export async function insertPreEventList() {
    let res = await selectBioSignalEventSimpleList(2);
    let eventList = res.bioSignalEventSimpleList;
    await renderPreEventList(eventList);
    $('.section.new_patient.pre').ready(async function () {
        if (!eventList) {
            insertPreEventScreen(null);
        }
        if (eventList) {
            for await (const evt of eventList) {
                insertPreEvent(evt);
            }
            $('.section.new_patient.pre .ecglist .row').first().addClass('on');
            const targetEvent = await eventList[0];
            insertPreEventScreen(targetEvent);
        }

        // Add Event To Select New Events Btn
        $('.btn_new').on('click', async function () {
            await insertEventList('NEW');
            $('.section.new_patient.pre').css('display', 'none');
            $('.section.rhythm.pre_rhythm').css('display', 'none');
            $('.section.new_patient.new').css('display', 'block');
            $('.section.rhythm.new_rhythm').css('display', 'block');
        });

        // Add Event to Search Button
        $('.alarm .search_container .btn_search').on('click', function () {
            searchKeyword = $('.alarm .search_container input').val();
            insertEventList('SEA');
        });
    });
}

export async function insertPreEvent(event) {
    const $preEvent = await eventListItem(event);
    $('.section.new_patient.pre .ecglist').append($preEvent);
    $(`.section.new_patient.pre .row[data-id=${event.bioSignalEventId}]`).on(
        'click',
        async function () {
            const $this = $(this);
            if ($this.hasClass('on')) return;
            $('.section.new_patient.pre .row.on').removeClass('on');
            $this.addClass('on');
            await insertPreEventScreen(event);
            $('.event').off('click', '.btn_con');
            $('.event').off('click', '.btn_delete');
            $('.event').on('click', '.btn_delete', function () {
                deleteBioSignalEvent(event);
                insertPreEventList();
            });
        }
    );
}

export async function insertEventList(listType) {
    if (listType === 'NEW') await insertNewEventList();
    else if (listType === 'PRE') await insertPreEventList();
    else if (listType === 'SEA')
        await insertPreEventListBySearch(searchKeyword);
}

// Search Event Lisy by Keyword
async function insertPreEventListBySearch(_searchKeyword) {
    const $preSectionRow = $('.section.new_patient.pre .row');
    const searchKeywordLower = String(_searchKeyword).toLowerCase();
    if (!searchKeywordLower) {
        $preSectionRow.css('display', 'block');
    } else {
        $.each($preSectionRow, function () {
            const targetCode = String(
                $(this).data('patientcode')
            ).toLowerCase();
            const targetName = String($(this).data('name')).toLowerCase();
            if (
                targetCode.includes(searchKeywordLower) ||
                targetName.includes(searchKeywordLower)
            ) {
                $(this).css('display', 'block');
            } else {
                $(this).css('display', 'none');
            }
        });
    }
    $preSectionRow.removeClass('on');
}

insertEventList('NEW');
