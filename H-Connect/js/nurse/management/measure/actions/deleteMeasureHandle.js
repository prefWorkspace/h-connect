'use strict';

const { selectMeasurementInfoList, deleteMeasurementInfo } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

const { createMeasureList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/renders/createMeasureList.js'
    )
);

const { measureListhanlde } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureHandle.js'
    )
);

//병상 정보 수정 삭제 버튼 이벤트
async function deleteMeasurement() {
    const measureMentCode = $(this).attr('data-measurementcode');
    const API_ROUTE = $(this).attr('data-apiroute');
    const { result } = await deleteMeasurementInfo(measureMentCode, API_ROUTE);

    if (result) {
        const { measurementInfoSimpleList } = await selectMeasurementInfoList();
        await createMeasureList(measurementInfoSimpleList);
        await measureListhanlde();
        $('.pop.delete_measure .overlay').fadeOut();

        $('.modifi_hospital .hospital_patient .name_label').text(
            '환자를 선택해 주세요.'
        );
        $('.modifi_hospital .hospital_patient .patient_age').val('생년월일');
        $('.modifi_hospital .hospital_patient .patient_gender').val('성별');
        $('.modifi_hospital .hospital_patient .selectBox2 .mward_label').text(
            '병동선택'
        );
        $('.modifi_hospital .hospital_patient .selectBox2 .mroom_label').text(
            '병실선택'
        );
        $('.modifi_hospital .hospital_patient .selectBox2 .mbed_label').text(
            '병상선택'
        );
        $('.section,modifi_hospital .selectBox2 .optionItem').removeClass(
            'active'
        );
        $('.section.modifi_hospital .btn_list .btn_delete').attr(
            'disabled',
            true
        );
        $('div').remove('.modifi_hospital .device_room .device_Item');
    }
}

$('.pop.delete_measure .btn_list .btn_cut').on('click', deleteMeasurement);
