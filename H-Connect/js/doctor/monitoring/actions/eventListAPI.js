'use strict';

let { selectedEventId, searchKeyword } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/common.js')
);

const { renderNewEventList } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/renders/renderNewEvents.js')
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

const { selectBioSignalEventSimpleList, selectBioSignalEventSimpleDoctorPage } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/monitoring/actions/selectBioSignalEventActions.js'
        )
    );

let newPage = 1;
let prePage = 1;
const bioSignalEventCount = 10;

$.fn.hasScrollBar = function () {
    return (
        (this.prop('scrollHeight') == 0 && this.prop('clientHeight') == 0) ||
        this.prop('scrollHeight') > this.prop('clientHeight')
    );
};

export async function insertNewEventList() {
    let res = await selectBioSignalEventSimpleDoctorPage(
        0,
        newPage,
        bioSignalEventCount
    );
    let eventList = res.bioSignalEventSimpleList;
    console.log(eventList);
    await renderNewEventList(eventList);
    $('.section.new_patient.new').ready(async function () {
        if (!eventList) {
            insertNewEventScreen(null);
        }

        if (eventList) {
            for await (const evt of eventList) {
                insertNewEvent(evt);
            }
            if ($('.section.new_patient.new').hasScrollBar())
                $('.section.new_patient.new').scrollTop(0);

            $('.section.new_patient.new .ecglist .row')
                .first()
                .trigger('click');
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

        addInfiniteScrollNewEvent();
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
                //insertNewEventList();
                const $target = $(
                    `.section.new_patient.new .row[data-id=${event.bioSignalEventId}]`
                );
                if ($target.prev().length) {
                    $target.prev().trigger('click');
                } else {
                    $target.next().trigger('click');
                }

                $target.remove();
                $(`.section.new_patient.new .alarm p`).html(
                    `<span>${
                        $('.section.new_patient.new .row').length
                    } 개의 확인하지 않은 이벤트</span>`
                );
            });
            $('.event').off('click', '.btn_delete');
            $('.event').on('click', '.btn_delete', function () {
                deleteBioSignalEvent(event);
                //insertNewEventList();
                const $target = $(
                    `.section.new_patient.new .row[data-id=${event.bioSignalEventId}]`
                );
                if ($target.prev().length) {
                    $target.prev().trigger('click');
                } else if ($target.next().length) {
                    $target.next().trigger('click');
                } else {
                    insertNewEventScreen(null);
                }

                $target.remove();
                $(`.section.new_patient.new .alarm p`).html(
                    `<span>${
                        $('.section.new_patient.new .row').length
                    } 개의 확인하지 않은 이벤트</span>`
                );
            });
        }
    );
}

//입원환자 모니터링 왼쪽 지난 이벤트 렌더링 및 이벤트 연결 함수
export async function insertPreEventList() {
    let res = await selectBioSignalEventSimpleDoctorPage(
        2,
        prePage,
        bioSignalEventCount
    );
    let eventList = res.bioSignalEventSimpleList;

    $('.section.new_patient.pre').ready(async function () {
        if (!eventList) {
            insertPreEventScreen(null);
        }
        if (eventList) {
            for await (const evt of eventList) {
                insertPreEvent(evt);
            }

            if ($('.section.new_patient.pre').hasScrollBar())
                $('.section.new_patient.pre').scrollTop(0);

            $('.section.new_patient.pre .ecglist .row')
                .first()
                .trigger('click');
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

        addInfiniteScrollPreEvent();

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
                //insertPreEventList();
                const $target = $(
                    `.section.new_patient.pre .row[data-id=${event.bioSignalEventId}]`
                );
                if ($target.prev().length) {
                    $target.prev().trigger('click');
                } else if ($target.next().length) {
                    $target.next().trigger('click');
                } else {
                    insertPreEventScreen(null);
                }

                $target.remove();
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

export async function addInfiniteScrollNewEvent() {
    $('.section.new_patient.new .ecglist')
        .off('scroll')
        .scroll(async function (event) {
            if (
                $('.section.new_patient.new .ecglist').scrollTop() +
                    $('.section.new_patient.new .ecglist').innerHeight() >=
                $('.section.new_patient.new .ecglist').prop('scrollHeight')
            ) {
                newPage += 1;
                let res = await selectBioSignalEventSimpleDoctorPage(
                    0,
                    newPage,
                    bioSignalEventCount
                );
                let addedList = res.bioSignalEventSimpleList;
                for await (const evt of addedList) {
                    insertNewEvent(evt);
                }
                addInfiniteScrollNewEvent();
                $(`.section.new_patient.new .alarm p`).html(
                    `<span>${
                        $('.section.new_patient.new .row').length
                    } 개의 확인하지 않은 이벤트</span>`
                );
            }
        });
}

export async function addInfiniteScrollPreEvent() {
    $('.section.new_patient.pre .ecglist')
        .off('scroll')
        .scroll(async function (event) {
            if (
                $('.section.new_patient.pre .ecglist').scrollTop() +
                    $('.section.new_patient.pre .ecglist').innerHeight() >=
                $('.section.new_patient.pre .ecglist').prop('scrollHeight')
            ) {
                prePage += 1;
                let res = await selectBioSignalEventSimpleDoctorPage(
                    2,
                    prePage,
                    bioSignalEventCount
                );
                let addedList = res.bioSignalEventSimpleList;
                for await (const evt of addedList) {
                    insertPreEvent(evt);
                }
                addInfiniteScrollPreEvent();
            }
        });
}

insertEventList('NEW');
