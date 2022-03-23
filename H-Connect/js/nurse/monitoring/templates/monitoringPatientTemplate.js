import { history } from '../../../utils/controller/historyController.js';

/* s : 모니터링 블록 */

window._history = history;
export function monitorBlock_have(_data) {
    const {
        measurementCode,
        patientCode,
        name,
        bioSignalECGLastData,
        bioSignalSpO2LastData,
        bioSignalTempLastData,
    } = _data || {};
    /**
     * EWS : emergency warning system => 비상 경고 시스템
     * HR : heartRate => 심박수
     * RESP : respiration => 호흡?
     * SP02 : S(포화도), P(경피), O2(산소) => 산소포화도
     * TEMP : Temperature => 온도
     */
    const { ews, heartRate, resp } = bioSignalECGLastData || {};
    const { spO2 } = bioSignalSpO2LastData || {};
    const { temperature } = bioSignalTempLastData || {};
    /**
     * < patient_monitor에 해당 클래스 추가되었을 시 >
     * active(빨간색) : 환자 이상
     * active yellow(노란색) : 장치 이상
     * active blue(파란색) : 시스템 이상
     */
    return `
    <div class="patient_monitor" onclick="window._history.linkTo('/nurse/patient.html?measurement_code=${measurementCode}')">
        <div class="patient_info">
            <p>
                <span>${patientCode}</span>.
                <span>${name}</span>
            </p>
        </div>
        <div class="vital_moniter">
            <div class="ews">
                <h3>EWS</h3>
                <p>${ews || '-'}</p>
            </div>
            <div class="hr">
                <h3>HR</h3>
                <p>${heartRate || '-'}</p>
            </div>

            <div class="sp">
                <h3>SP02</h3>
                <p>${spO2 || '-'}</p>
            </div>

            <div class="resp">
                <h3>RESP</h3>
                <p>${resp || '-'}</p>
            </div>

            <div class="temp">
                <h3>TEMP</h3>
                <p>${temperature || '-'}</p>
            </div>
        </div>
    </div>
    `;
}
export function monitorBlock_none(_data) {
    const { sickRoomCode, wardCode, sickBedCode } = _data || {};
    return `
    <div class="patient_monitor" onclick="_history.linkTo('/nurse/measure.html?sickRoomCode=${sickRoomCode}&sickBedCode=${sickBedCode}&wardCode=${wardCode}')">
        <div class="empty_bed">
            <p>empty_bed</p>

            <div class="btn_default">
                <img src="/H-Connect/img/icon/btn_add.png" alt="플러스 이미지">
            </div>

            <div class="btn_hover">
                <img src="/H-Connect/img/icon/btn_add_hover.png" alt="플러스 이미지">
            </div>
        </div>
    </div>
    `;
}

/* e : 모니터링 블록 */

/* s : 병실 블록 */

export function monitorRoomBlock(_data) {
    const { sickRoomItem, patientList } = _data || {};
    const {
        sickRoom,
        sickRoomCode,
        sickBedList,
        roomPatientCount, // 병실 환자수
        roomTotalSickBed, // 병동에 총 병상수
        roomSpareBedCount, // 여유 병상 수
        wardCode,
    } = sickRoomItem || {};
    return `
    <section class="all_patient room_view">
        <div class="container">
            <div class="pateint_room">
                <div class="room_num">
                <p><span>${sickRoom}</span>호.</p>

                <button
                    type="button"
                    class="btn_setting"
                    onclick="window._history.linkTo('index.html?wardCode=${wardCode}&sickRoomCode=${sickRoomCode}')"
                >
                    <img
                    src="/H-Connect/img/header/setting.svg"
                    alt="톱니바퀴"
                    />
                </button>
                </div>

                <div class="room_count">
                <p><span>${roomTotalSickBed}</span>인실.</p>
                &nbsp;
                <p><span>${roomPatientCount}</span> monitoring.</p>
                </div>
            </div>

            <div class="monitor_wrap">
                ${sickBedList?.htmlFor((_sickBedItem, _index) => {
                    const findPatient_in_sickBedList = patientList?.find(
                        (_patientItem) => {
                            return (
                                _patientItem?.sickBedCode ===
                                _sickBedItem?.sickBedCode
                            );
                        }
                    );
                    if (findPatient_in_sickBedList) {
                        return monitorBlock_have(findPatient_in_sickBedList);
                    } else {
                        return monitorBlock_none(_sickBedItem);
                    }
                })}
            </div>
            </div>
            </section>  
            `;
}

// ${patientList?.htmlFor((_patient, _index) => {
//     if (_patient?.sickRoomCode === sickRoomCode) {
//         return monitorBlock_have(_patient);
//     } else {
//         return '';
//     }
// })}
// ${Array(roomSpareBedCount > 0 ? roomSpareBedCount : 0)
//     ?.fill('')
//     .htmlFor(() => {
//         return monitorBlock_none();
//     })}

/* e : 병실 블록 */
