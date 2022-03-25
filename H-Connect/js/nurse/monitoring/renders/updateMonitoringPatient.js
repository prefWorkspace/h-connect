import { socketGetPatientData } from '../actions/fakeSocket.js';
function getPatientEls() {
    // 환자 리스트 dom 반환
    return (
        Array.prototype.slice.call(
            $('.nurse.patient_vital .all_patient .patient_monitor')
        ) || []
    );
}
function patientListInfo() {
    // 화면에 있는 환자 정보 불러오기
    return getPatientEls()?.map((_el) => {
        const _measurementcode = $(_el).attr('data-measurementcode');
        const _sickbedcode = $(_el).attr('data-sickbedcode');
        return { measurementcode: _measurementcode, sickbedcode: _sickbedcode };
    });
}

function updateBioSimpleData(_el, _bioSignalSimpleData) {
    // 환자 bioSignalsimpledata dom 에 업데이트
    const { ews, hr, spo2, resp, temp } = _bioSignalSimpleData || {};
    _el.find('.ews').find('p').text(ews);
    _el.find('.hr').find('p').text(hr);
    _el.find('.sp').find('p').text(spo2);
    _el.find('.resp').find('p').text(resp);
    _el.find('.temp').find('p').text(temp);
}

export async function updateMonitoringPatientItem() {
    let _patientList = patientListInfo();
    socketGetPatientData.update((_data) => {
        const { bioSignalSimpleData, measurementCode } = _data || {};

        const getMeasurementIndex = _patientList.findIndex((_item) => {
            return _item.measurementcode === measurementCode;
        });
        if (getMeasurementIndex !== -1) {
            const selectPateintEl = $(getPatientEls()).eq(getMeasurementIndex);
            updateBioSimpleData(selectPateintEl, bioSignalSimpleData);
        }
    });
}
