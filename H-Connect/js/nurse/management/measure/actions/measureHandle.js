const { selectMeasurementInfoList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

const { measurementInfoSimpleList } = await selectMeasurementInfoList();

export function measureListhanlde() {
    $('.wrap_inner .measure_status .status_list').on('click', function () {
        $(this).addClass('on').siblings().removeClass('on');
        const sickBedCode = $(this).data('sickbedcode');
        const measureData = measurementInfoSimpleList.find(
            (item) => item.sickBedCode === sickBedCode
        );
        const { name, age, gender, patientCode, ward, sickRoom, sickBed } =
            measureData;
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
    });

    $('.wrap_inner .measure_status .status_list .btn_end').on(
        'click',
        function () {
            $('.pop.end_measure .overlay').fadeIn();
        }
    );
}
