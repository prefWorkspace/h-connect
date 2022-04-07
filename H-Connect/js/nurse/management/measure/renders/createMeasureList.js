'use strict';
const { measureList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/templates/measurList.js'
    )
);

export async function createMeasureList(data_List) {
    let data = '';
    if (!data_List) {
        data = `<div></div>`;
    } else {
        for (let i = 0; i < data_List.length; i++) {
            data += measureList(data_List[i]);
        }
    }
    $('.section.measure_status .container .container').html(data);
}
