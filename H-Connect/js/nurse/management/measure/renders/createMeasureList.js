'use strict';
const { measureList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/templates/measurList.js'
    )
);

export async function createMeasureList(data_List) {
    let data = '';
    let count = 0;
    if (!data_List) {
        data = `<div></div>`;
    } else {
        for (let i = 0; i < data_List.length; i++) {
            data += measureList(data_List[i]);
            count++;
        }
    }
    $('.section.measure_status .container .container').html(data);
    $('.measure_status .search_select p span').text(count);
}
