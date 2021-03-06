'use strict';

const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

let { selectedEventId, searchKeyword } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/common.js')
);

const { renderNewEventList } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/renders/renderNewEvents.js')
);

const { renderPreEventList } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/renders/renderPreEvents.js')
);

const { insertNewEventScreen, insertPreEventScreen, deleteBioSignalEvent } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/monitoring/actions/eventScreenAPI.js'
        )
    );

export async function selectBioSignalEvemtSimpleList(confirm) {
    const req = JSON.stringify({
        confirm,
        order: 'DESC',
        ...commonRequest(),
    });

    let result = {};

    await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBioSignalEventSimpleList',
        'POST',
        req,
        (res) => {
            result = res;
        },
        (err) => {
            console.log(err);
        }
    );

    return result;
}

export async function insertNewEventList() {
    let res = await selectBioSignalEvemtSimpleList(2);
    let eventList = res.bioSignalEventSimpleList;
    await renderNewEventList(eventList);

    $('.section.new_patient.new .ecglist').children().first().addClass('on');
    selectedEventId = $('.section.new_patient.new .row.on').data('id');
    eventList.forEach((list) => {
        if (list.bioSignalEventId === selectedEventId) {
            insertNewEventScreen(list);
            return false;
        }
    });

    // Add Event To Select Pre Events Btn
    $('.btn_pre').on('click', async function () {
        await insertEventList('PRE');
        $('.section.new_patient.new').css('display', 'none');
        $('.section.rhythm.new_rhythm').css('display', 'none');
        $('.section.new_patient.pre').css('display', 'block');
        $('.section.rhythm.pre_rhythm').css('display', 'block');
    });

    // Add Event To New Event List
    $('.section.new_patient.new .row').on('click', function () {
        $('.section.new_patient.new .row').removeClass('on');

        const $this = $(this);
        selectedEventId = $this.data('id');
        if (!$this.hasClass('on')) $this.addClass('on');
        eventList.forEach((list) => {
            if (list.bioSignalEventId === selectedEventId) {
                insertNewEventScreen(list);
                return false;
            }
        });
    });
}

export async function insertPreEventList() {
    let res = await selectBioSignalEvemtSimpleList(0);
    let eventList = res.bioSignalEventSimpleList.slice(0, 10);
    await renderPreEventList(eventList);

    $('.section.new_patient.pre .ecglist').children().first().addClass('on');
    selectedEventId = $('.section.new_patient.pre .row.on').data('id');
    eventList.forEach((list) => {
        if (list.bioSignalEventId === selectedEventId) {
            insertPreEventScreen(list);
            return false;
        }
    });

    // Add Event To Select New Events Btn
    $('.btn_new').on('click', async function () {
        await insertEventList('NEW');
        $('.section.new_patient.pre').css('display', 'none');
        $('.section.rhythm.pre_rhythm').css('display', 'none');
        $('.section.new_patient.new').css('display', 'block');
        $('.section.rhythm.new_rhythm').css('display', 'block');
    });

    // Add Event To New Event List
    $('.section.new_patient.pre .row').on('click', function () {
        $('.section.new_patient.pre .row').removeClass('on');

        const $this = $(this);
        selectedEventId = $this.data('id');
        if (!$this.hasClass('on')) $this.addClass('on');
        eventList.forEach((list) => {
            if (list.bioSignalEventId === selectedEventId) {
                insertPreEventScreen(list);

                $('.title_preSection .btn_delete').on('click', function () {
                    selectedEventId = $(
                        '.section.new_patient.pre .row.on'
                    ).data('id');
                    console.log(selectedEventId);
                    deleteBioSignalEvent(selectedEventId);
                    insertEventList('PRE');
                });
                return false;
            }
        });
    });

    // Add Event to Search Button
    $('.alarm .search_container .btn_search').on('click', function () {
        searchKeyword = $('.alarm .search_container input').val();
        insertEventList('SEA');
    });
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
    if (!_searchKeyword) {
        $.each($preSectionRow, function () {
            $(this).css('display', 'flex');
        });
    } else {
        $.each($preSectionRow, function () {
            const targetCode = $(this).data('patientcode');
            const targetName = $(this).data('name');
            if (
                targetCode.includes(_searchKeyword) ||
                targetName.includes(_searchKeyword)
            ) {
                $(this).css('display', 'block');
            } else {
                $(this).css('display', 'none');
            }
        });
    }
}

insertEventList('NEW');
