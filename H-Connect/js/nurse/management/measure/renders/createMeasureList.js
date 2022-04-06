'use strict';
const { measureList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/templates/measurList.js'
    )
);

const { measureListhanlde } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureHandle.js'
    )
);

const { selectMeasurementInfoList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

const { measurementInfoSimpleList } = await selectMeasurementInfoList();

export function createMeasureList(data_List) {
    let data = '';
    for (let i = 0; i < data_List.length; i++) {
        data += measureList(data_List[i]);
    }

    $('.section.measure_status .container .container').html(data);
    measureListhanlde();
    // $(
    //     '.nurse.nurse_measure .wrap_inner .section.measure_status .container .status_list'
    // ).fadeIn();
}

createMeasureList(measurementInfoSimpleList);
