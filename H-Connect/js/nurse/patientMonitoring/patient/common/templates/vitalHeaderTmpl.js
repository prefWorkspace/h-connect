export async function vitalHeaderTmpl({ name, age, gender, patientCode }) {
    $('.monitoring_patient .vital_chart .title .pati_info .name').text(name);
    $('.monitoring_patient .vital_chart .title .pati_info .age').text(age);
    $('.monitoring_patient .vital_chart .title .pati_info .gender').text(
        gender === 1 ? '남' : '여'
    );
    $('.monitoring_patient .vital_chart .title .pati_info .p_id').text(
        patientCode
    );
    $('.monitoring_patient .vital_chart .title .pati_info .p_type').text(name);

    $('.monitoring_patient .vital_chart .title .pati_info').animate(
        { opacity: '1' },
        60
    );
}
