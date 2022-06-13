'use strict';

const { measureListhanlde } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureHandle.js'
    )
);

const { updateMeasurement_wardSelectBoxHandle } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/selectBoxHandle.js'
    )
);

const { request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const { selectMeasurementInfoList, updateMeasurementInfo } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

const { createMeasureList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/renders/createMeasureList.js'
    )
);

// 병상 정보 수정 부분 =======================================
export let updateDeviceList = [];

//병상 정보 수정 수정 버튼 이벤트
async function updateMeasurementHandle() {
    const name = $('.section.modifi_hospital .selectBox2 .name_label').text();
    const birthday = $(
        '.section.modifi_hospital .patient_info .patient_age'
    ).attr('data-birthday');

    const gender =
        $('.section.modifi_hospital .patient_info .patient_gender')
            .text()
            .replaceAll(' ', '')
            .replaceAll('\n', '') === '남'
            ? 1
            : 2;
    const patientCode = $(
        '.section.modifi_hospital .patient_info .patient_mrn'
    ).val();
    const wardCode = $(
        '.section.modifi_hospital .patient_room .mward_label'
    ).attr('data-wardcode');
    const sickRoomCode = $(
        '.section.modifi_hospital .patient_room .mroom_label'
    ).attr('data-sickroomcode');
    const sickBedCode = $(
        '.section.modifi_hospital .patient_room .mbed_label'
    ).attr('data-sickbedcode');
    const measurementCode = $(this).attr('data-measurementcode');
    const API_ROUTE = $(this).attr('data-apiroute');

    if (!measurementCode) {
        alert('환자를 선택해주세요.');
        return;
    }
    if (!wardCode) {
        alert('병동을 선택해주세요.');
        return;
    }
    if (!sickRoomCode) {
        alert('병실을 선택해주세요.');
        return;
    }
    if (!sickBedCode) {
        alert('병상을 선택해주세요.');
        return;
    }

    const codeObj = {
        wardCode,
        sickRoomCode,
        sickBedCode,
        measurementCode,
    };

    const patientData = {
        patientCode,
        name,
        gender,
        birthday,
        patientStatus: 3,
        ssn: null,
        foreigner: null,
        phoneNumber: null,
        measurementType: 'BM',
        duration: 24,
        startDateTime: request_Date_Data(),
    };

    const { result } = await updateMeasurementInfo(
        codeObj,
        patientData,
        API_ROUTE
    );

    if (result) {
        const { measurementInfoSimpleList } = await selectMeasurementInfoList();
        await createMeasureList(measurementInfoSimpleList);
        // await measureListhanlde();
        $(`.section.measure_status .status_list`).each((_, value) => {
            if ($(value).data('measurementcode') === measurementCode) {
                $(value).addClass('on');
            }
        });
        $('.section.modifi_hospital .btn_list .btn_new_hospital').attr(
            'disabled',
            true
        );
    }
}

$('.section.modifi_hospital .btn_list .btn_new_hospital').on(
    'click',
    updateMeasurementHandle
);

await updateMeasurement_wardSelectBoxHandle();
