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

    await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBioSignalEventSimpleList',
        'POST',
        req,
        (res) => {
            result = res;
        },
        (err) => {
            alert(`서버 통신에 실패하였습니다 (Error: ${err})`);
        }
    );

    return result;
}

export async function selectBioSignalEvent(_bse) {
    const { bioSignalEventId, measurementCode } = _bse;
    const req = JSON.stringify({
        ...commonRequest(),
        bioSignalEventId,
        measurementCode,
    });

    let result = {};

    await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBioSignalEvent',
        'POST',
        req,
        (res) => {
            result = res;
        },
        (err) => {
            alert(`서버 통신에 실패하였습니다 (Error: ${err})`);
        }
    );

    return result;
}

export async function insertNewEventList() {
    let res = await selectBioSignalEvemtSimpleList(0);
    let eventList = res.bioSignalEventSimpleList?.slice(0, 10);
    await renderNewEventList(eventList);
    $('.section.new_patient.new').ready(function () {
        if (!eventList) {
            insertNewEventScreen(null);
        }

        if (eventList) {
            $('.section.new_patient.new .ecglist')
                .children()
                .first()
                .addClass('on');
            selectedEventId = $('.section.new_patient.new .row.on').data('id');
            const targetEvent = eventList.filter(
                (evt) =>
                    String(evt.bioSignalEventId) === String(selectedEventId)
            )[0];
            insertNewEventScreen(targetEvent);
            $('.event').off('click', '.btn_con');
            $('.event').on('click', '.btn_con', async function () {
                await updateBioSignalEvent(targetEvent, 2);
                await insertNewEventList();
            });
            $('.event').off('click', '.btn_delete');
            $('.event').on('click', '.btn_delete', function () {
                deleteBioSignalEvent(targetEvent);
                insertNewEventList();
            });

            // Add Event To New Event List
            $('.section.new_patient.new .row').on('click', async function () {
                if ($(this).hasClass('on')) return;
                const $this = $(this);
                $('.section.new_patient.new .row.on').removeClass('on');
                $this.addClass('on');
                const targetEvent2 = eventList.filter(
                    (evt) =>
                        String(evt.bioSignalEventId) ===
                        String($(this).data('id'))
                )[0];
                await insertNewEventScreen(targetEvent2);
                $('.event').off('click', '.btn_con');
                $('.event').on('click', '.btn_con', function () {
                    updateBioSignalEvent(targetEvent, 2);
                    insertNewEventList();
                });
                $('.event').off('click', '.btn_delete');
                $('.event').on('click', '.btn_delete', function () {
                    deleteBioSignalEvent(targetEvent2);
                    insertNewEventList();
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
    });
}

//입원환자 모니터링 왼쪽 지난 이벤트 렌더링 및 이벤트 연결 함수
export async function insertPreEventList() {
    let res = await selectBioSignalEvemtSimpleList(2);
    let eventList = res.bioSignalEventSimpleList;
    await renderPreEventList(eventList);
    $('.section.new_patient.new').ready(function () {
        if (!eventList) {
            insertPreEventScreen(null);
        }
        if (eventList) {
            const targetEvent = eventList[0];
            $(
                `.section.new_patient.pre .row[data-id='${targetEvent.bioSignalEventId}']`
            ).toggleClass('on');
            insertPreEventScreen(targetEvent);
            $('.event').off('click', '.btn_con');
            $('.event').off('click', '.btn_delete');
            $('.event').on('click', '.btn_delete', function () {
                deleteBioSignalEvent(targetEvent);
                insertPreEventList();
            });

            // Add Event To Pre Event List
            $('.section.new_patient.pre .row').on('click', async function () {
                if ($(this).hasClass('on')) return;
                const $this = $(this);
                $('.section.new_patient.pre .row.on').removeClass('on');
                $this.addClass('on');
                const targetEvent2 = eventList.filter(
                    (evt) =>
                        String(evt.bioSignalEventId) ===
                        String($(this).data('id'))
                )[0];
                await insertPreEventScreen(targetEvent2);
                $('.event').off('click', '.btn_delete');
                $('.event').on('click', '.btn_delete', function () {
                    deleteBioSignalEvent(targetEvent2);
                    insertPreEventList();
                });
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
