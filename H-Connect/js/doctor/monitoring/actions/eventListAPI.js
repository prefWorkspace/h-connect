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

const {
    insertNewEventScreen,
    insertPreEventScreen,
    updateBioSignalEvent,
    deleteBioSignalEvent,
} = await import(
    importVersion('/H-Connect/js/doctor/monitoring/actions/eventScreenAPI.js')
);

export async function selectBioSignalEvemtSimpleList(confirm) {
    const req = JSON.stringify({
        confirm,
        order: 'DESC',
        ...commonRequest(),
    });

    let result = {};
    // return {
    //     bioSignalEventSimpleList: null,
    //     error: 0,
    //     extra: '',
    //     message: null,
    //     remoteIp: null,
    //     result: true,
    //     totalCount: 0,
    // };
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
    let res = await selectBioSignalEvemtSimpleList(0);
    let eventList = res.bioSignalEventSimpleList?.slice(0, 10);
    await renderNewEventList(eventList);
    if (!eventList) {
        insertNewEventScreen(null);
    }
    if (eventList) {
        $('.section.new_patient.new .ecglist')
            .children()
            .first()
            .addClass('on');
        selectedEventId = $('.section.new_patient.new .row.on').data('id');
        eventList.forEach((list) => {
            if (list.bioSignalEventId === selectedEventId) {
                insertNewEventScreen(list);
                $(document).on('click', '.event .btn_con', function () {
                    updateBioSignalEvent(list, 2);
                    insertNewEventList();
                });
                $(document).on('click', '.event .btn_delete', function () {
                    deleteBioSignalEvent(list);
                    insertNewEventList();
                });
                return false;
            }
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
                    $(document).on('click', '.event .btn_con', function () {
                        updateBioSignalEvent(list, 2);
                        insertNewEventList();
                    });
                    $(document).on('click', '.event .btn_delete', function () {
                        deleteBioSignalEvent(list);
                        insertNewEventList();
                    });
                    return false;
                }
            });
        });
    }

    // Add Event To Select Pre Events Btn
    $('.btn_pre').on('click', async function () {
        await insertEventList('PRE');
        $('.section.new_patient.new').css('display', 'none');
        $('.section.rhythm.new_rhythm').css('display', 'none');
        $('.section.new_patient.pre').css('display', 'block');
        $('.section.rhythm.pre_rhythm').css('display', 'block');
    });
}

export async function insertPreEventList() {
    let res = await selectBioSignalEvemtSimpleList(2);
    let eventList = res.bioSignalEventSimpleList;
    await renderPreEventList(eventList);
    if (!eventList) {
        insertPreEventScreen(null);
    }
    if (eventList) {
        $('.section.new_patient.pre .ecglist')
            .children()
            .first()
            .addClass('on');
        selectedEventId = $('.section.new_patient.pre .row.on').data('id');
        eventList.forEach((list) => {
            if (list.bioSignalEventId === selectedEventId) {
                insertPreEventScreen(list);
                $(document).on('click', '.event .btn_delete', function () {
                    deleteBioSignalEvent(list);
                    insertPreEventList();
                });
                return false;
            }
        });

        // Add Event To New Event List
        $('.section.new_patient.pre .row').on('click', async function () {
            $('.section.new_patient.pre .row').removeClass('on');

            const $this = $(this);
            selectedEventId = $this.data('id');
            if (!$this.hasClass('on')) $this.addClass('on');
            for await (const list of eventList) {
                if (list.bioSignalEventId === selectedEventId) {
                    await insertPreEventScreen(list);
                    $(document).on('click', '.event .btn_delete', function () {
                        deleteBioSignalEvent(list);
                        insertPreEventList();
                    });

                    break;
                }
            }
        });
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
