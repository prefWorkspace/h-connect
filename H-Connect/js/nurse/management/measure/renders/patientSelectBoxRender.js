'use strict';

const { patientList, patientHISList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/templates/measurList.js'
    )
);

const { selectMeasurementInfoList, selectHisPatientList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

//측정 리스트 가져와서 렌더링

export async function patientSelectBox() {
    let html = '';
    const { result, measurementInfoSimpleList } =
        await selectMeasurementInfoList();

    if (
        !result ||
        !measurementInfoSimpleList ||
        measurementInfoSimpleList.length === 0
    ) {
        html += errorText();
        $('.modifi_hospital .select_name .name_option').html(html);
        return;
    }

    for (let i = 0; i < measurementInfoSimpleList.length; i++) {
        html += patientList(measurementInfoSimpleList[i]);
    }
    $('.modifi_hospital .select_name .name_option').html(html);
}

export async function patientSelectBoxForNewMeasurement() {
    let html = '';
    const { result, patientInfo } = await selectHisPatientList();
    console.log(patientInfo);

    if (!result || patientInfo === null || patientInfo.length === 0) {
        html += errorText({ textAlign: 'center' });
        $('.new_room_pop .select_name .name_option').html(html);
        return;
    }

    for (let i = 0; i < patientInfo.length; i++) {
        html += patientHISList(patientInfo[i]);
    }
    $('.new_room_pop .select_name .name_option').html(html);
}

await patientSelectBoxForNewMeasurement();
await patientSelectBox();
