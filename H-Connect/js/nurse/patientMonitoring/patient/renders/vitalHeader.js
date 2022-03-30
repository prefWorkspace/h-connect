const { selectMeasurementInfoDetail } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/actions/vitalInformAPI.js'
    )
);
// (async () => {
//     console.log('test');
//     await import(
//         importVersion(
//             '/H-Connect/js/nurse/patientMonitoring/patient/actions/vitalInformAPI.js'
//         )
//     );
//     console.log(selectMeasurementInfoDetail);
// })();
// async function loadModule() {
//     // console.log('load');
//
//     // console.log(selectMeasurementInfoDetail);
// }
// await loadModule();
// export function _patient_patientVital_insert(_patient) {
//     /* 환자 측정 상세정보 vital 화면 정보 세팅 */

//     _vitalHeaderInform(_patient);
// }

export async function vitalHeaderRender() {
    const { name, age, gender, patientCode } =
        await selectMeasurementInfoDetail();
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
vitalHeaderRender();
