const {
    updateWard_sickroomListSelectHandle,
    updateWard_sickBedListSelectHandle,
    wardListSelectHandle,
    updateWard_wardListSelectHandle,
} = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/renders/selectBoxRender.js'
    )
);

const { measureListhanlde } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureHandle.js'
    )
);

const { request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const {
    selectMeasurementInfoList,
    updateMeasurementInfo,
    deleteMeasurementInfo,
} = await import(
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

//병상 정보 수정 병상 셀렉트 박스
async function updateMeasurement_sickBedSelectBoxHandle() {
    $('.section.modifi_hospital .selectBox2 .mbed_option .bed_list').on(
        'click',
        function () {
            const item = $(this).text();
            $(this).addClass('active').siblings().removeClass('active');
            const sickBedCode = $(this).data('sickbedcode');
            $(this).parent().parent().find('.label').text(item);
            $(this)
                .parent()
                .parent()
                .find('.label')
                .attr('data-sickbedcode', sickBedCode);
            $('.section.modifi_hospital .btn_list .btn_new_hospital').attr(
                'disabled',
                false
            );
            $(this).parent().parent().toggleClass('active');
        }
    );
}

//병상 정보 수정 병실 셀렉트 박스
async function updateMeasurement_sickRoomSelectBoxHandle(wardCode) {
    // await wardListSelectHandle();
    $('.section.modifi_hospital .selectBox2 .mroom_option .room_list2').on(
        'click',
        async function () {
            const item = $(this).find('p').text();
            const sickRoomCode = $(this).data('sickroomcode');
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().parent().find('.label').text(item);
            $(this)
                .parent()
                .parent()
                .find('.label')
                .attr('data-sickroomcode', sickRoomCode);
            $(this).parent().parent().toggleClass('active');
            $('.section.modifi_hospital .btn_list .btn_new_hospital').attr(
                'disabled',
                false
            );
            await updateWard_sickBedListSelectHandle(wardCode, sickRoomCode);
            await updateMeasurement_sickBedSelectBoxHandle();
        }
    );
}

// 병상 정보 수정 병동 셀렉트 박스
async function updateMeasurement_wardSelectBoxHandle() {
    await updateWard_wardListSelectHandle();
    $('.section.modifi_hospital .selectBox2 .optionList .ward_list').on(
        'click',
        async function () {
            const text = $(this).text();
            const wardCode = $(this).data('wardcode');
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().parent().find('.label').text(text);
            $(this)
                .parent()
                .parent()
                .find('.label')
                .attr('data-wardcode', wardCode);
            $('.section.modifi_hospital .btn_list .btn_new_hospital').attr(
                'disabled',
                false
            );
            $(this).parent().parent().removeClass('active');
            await updateWard_sickroomListSelectHandle(wardCode);
            await updateMeasurement_sickRoomSelectBoxHandle(wardCode);
        }
    );
}

//병상 정보 수정 수정 버튼 이벤트
//더 작업 해야함 장치 리스트 넘어오면 그때 한번에 작업
async function updateMeasurementHandle() {
    const name = $('.section.modifi_hospital .selectBox2 .name_label').text();
    const birthday = +$(
        '.section.modifi_hospital .patient_info .patient_age'
    ).val();
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
        birthday: birthday + '-01-01',
        patientStatus: 3,
        ssn: null,
        foreigner: null,
        phoneNumber: null,
        measurementType: 'BM',
        duration: 24,
        startDateTime: request_Date_Data(),
    };

    const aaa = await updateMeasurementInfo(codeObj, patientData, API_ROUTE);
    console.log('aaa===');
    console.log(aaa);
}

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
    }
}

$('.pop.delete_measure .btn_list .btn_cut').on('click', deleteMeasurement);
$('.section.modifi_hospital .btn_list .btn_new_hospital').on(
    'click',
    updateMeasurementHandle
);

await updateMeasurement_wardSelectBoxHandle();
