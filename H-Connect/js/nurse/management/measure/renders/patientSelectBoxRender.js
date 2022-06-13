'use strict';

const { patientList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/templates/measurList.js'
    )
);

const { selectMeasurementInfoList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

//측정 리스트 가져와서 렌더링
const { measurementInfoSimpleList } = await selectMeasurementInfoList();

export function patientSelectBox() {
    let html = '';

    if (!measurementInfoSimpleList || measurementInfoSimpleList.length === 0) {
        html += errorText();
        $('.selectBox_name .name_option').html(html);
        return;
    }

    for (let i = 0; i < measurementInfoSimpleList.length; i++) {
        html += patientList(measurementInfoSimpleList[i]);
    }
    $('.modifi_hospital .select_name .name_option').html(html);
}

patientSelectBox();
