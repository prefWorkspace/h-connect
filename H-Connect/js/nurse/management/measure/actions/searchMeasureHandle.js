'use strict';

const { selectMeasurementInfoList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

const { createMeasureList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/renders/createMeasureList.js'
    )
);

async function searchPatient() {
    const search = $('.section.measure_status .search_container input').val();
    const { result, measurementInfoSimpleList, totalCount } =
        await selectMeasurementInfoList(null, null, null, search);
    if (result) {
        const { ward, wardCode, sickRoom, sickRoomCode } =
            measurementInfoSimpleList || {};
        await createMeasureList(measurementInfoSimpleList);
        $('.section.measure_status .selectBox2 .ward_label').text(ward);
        $('.section.measure_status .selectBox2 .ward_label').attr(
            'data-wardcode',
            wardCode
        );
        $('.section.measure_status .selectBox2 .room_label').text(sickRoom);
        $('.section.measure_status .selectBox2 .room_label').attr(
            'data-sickroomcode',
            sickRoomCode
        );
        $('.section.measure_status .search_select p span').text(totalCount);
    }
}

$('.section.measure_status .search_container .btn_search').on(
    'click',
    searchPatient
);
$('.section.measure_status .search_container input').on(
    'keypress',
    function (e) {
        if (e.code === 'Enter') {
            searchPatient();
        }
    }
);
