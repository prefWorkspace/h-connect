const { selectMeasurementInfoList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

const { selectSickRoomList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

const { modifiDeviceList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/templates/deviceList.js'
    )
);

const { measurementInfoSimpleList } = await selectMeasurementInfoList();

//측정현황 리스트 클릭 이벤트
export function measureListhanlde() {
    $('.wrap_inner .measure_status .status_list').on('click', function () {
        $(this).addClass('on').siblings().removeClass('on');
        const sickBedCode = $(this).data('sickbedcode');
        const measureData = measurementInfoSimpleList.find(
            (item) => item.sickBedCode === sickBedCode
        );
        const {
            name,
            age,
            gender,
            patientCode,
            ward,
            sickRoom,
            sickBed,
            deviceInfoList,
        } = measureData;
        $('.modifi_hospital .hospital_patient .name_label').text(name);
        $('.modifi_hospital .hospital_patient .patient_age').val(age);
        $('.modifi_hospital .hospital_patient .patient_gender').val(
            gender === 1 ? '남' : '여'
        );
        $('.modifi_hospital .hospital_patient .patient_mrn').val(patientCode);
        $('.modifi_hospital .hospital_patient .selectBox2 .mward_label').text(
            ward
        );
        $('.modifi_hospital .hospital_patient .selectBox2 .mroom_label').text(
            sickRoom
        );
        $('.modifi_hospital .hospital_patient .selectBox2 .mbed_label').text(
            sickBed + '번 병상'
        );

        if (!deviceInfoList) {
            return;
        }
        let html = '';
        for (let i = 0; i < deviceInfoList.length; i++) {
            html += modifiDeviceList(deviceInfoList[i]);
        }
        $('.modifi_hospital .device_room .btn_add').before(html);
    });

    $('.wrap_inner .measure_status .status_list .btn_end').on(
        'click',
        function () {
            $('.pop.end_measure .overlay').fadeIn();
            //측정 종료 api 없는 관계로 나중에 작업
        }
    );
}

//측정현황 셀렉트 박스 이벤트 =====

//병실 선택 셀렉트 박스
export function selectBoxSickRoom() {}

//병동 선택 셀렉트 박스
export function selecBoxWard() {
    $('.section .selectBox2 .optionList .optionItem').on('click', function () {
        const text = $(this).text().replaceAll(' ', '').replaceAll('\n', '');
        const wardCode = $(this).data('wardcode');

        $(this).parent().parent().find('.label').text(text);
        $(this)
            .parent()
            .parent()
            .find('.label')
            .attr('data-wardcode', wardCode);
        $(this).parent().parent().removeClass('active');
    });
}
