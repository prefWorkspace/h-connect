const { fakeSoketBioSignalSimpleData } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/fakeSocket.js'
    )
);
const {
    UpdateAlarmSettingMeasurement,
    SelectMeasurementInfoDetail,
    SelectAlarmSettingMeasurement,
    SelectBloodPressurePage,
} = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/common/actions/patientMonitoringAPI.js'
    )
);

/* s : bioSignal SimpleData */
// 예상 simple data 소켓 fake data
// const bioSignalSimplData = new fakeSoketBioSignalSimpleData();
// bioSignalSimplData.update((_data) => {
//     const { bioSignalSimpleData } = _data || {};
//     const { hr, spo2, resp, ews, pulse, temp } = bioSignalSimpleData || {};
//     simpleDataVal('hr', hr);
//     simpleDataVal('sp', spo2);
//     simpleDataVal('resp', resp);
//     simpleDataVal('ews', ews);
//     simpleDataVal('pulse', pulse);
//     simpleDataVal('temp', temp);
// });
/* e : bioSignal SimpleData */

export const vitalSimpleDataInit = async () => {
    // 기본 최초 데이터 렌더러 ( renderVital.js 에서 실행됨 )
    const _alarmSettingInfo = await SelectAlarmSettingMeasurement();
    const [_bloodPressureLastData] = await SelectBloodPressurePage(1, 1);

    currentHr(_alarmSettingInfo);
    currentSpo2(_alarmSettingInfo);
    currentResp(_alarmSettingInfo);
    currentTemp(_alarmSettingInfo);
    currentEws(_alarmSettingInfo);
    currentNBPmmHg(_bloodPressureLastData);
    currentPulse();
};

const currentHr = ({ hrAlertAlarm, heartRateMin, heartRateMax }) => {
    simpleAlarmSetting('hr', hrAlertAlarm);
    simpleMinMax('hr', [heartRateMin, heartRateMax]);
};

const currentSpo2 = ({ spo2AlertAlarm, spo2Min }) => {
    simpleAlarmSetting('sp', spo2AlertAlarm);
    simpleMinMax('sp', [spo2Min, '-']);
};

const currentResp = ({ respAlertAlarm, respMin, respMax }) => {
    simpleAlarmSetting('resp', respAlertAlarm);
    simpleMinMax('resp', [respMin, respMax]);
};

const currentTemp = ({ tempAlertAlarm, tempMin, tempMax }) => {
    simpleAlarmSetting('temp', tempAlertAlarm);
    simpleMinMax('temp', [tempMin, tempMax]);
};
const currentEws = ({ ewsAlertAlarm }) => {
    simpleAlarmSetting('ews', ewsAlertAlarm);
};
const currentPulse = () => {
    simpleMinMax('pulse', [0, 0]); // 질문필요
};
const currentNBPmmHg = ({ recordDateTime, diastolic, systolic, pulse }) => {
    const _nbpmmhgValue = `${diastolic}/${systolic} (${pulse})`;
    simpleDataVal('mmhg', _nbpmmhgValue);
    targetDataVal('.mmhg .time .recordDateTime', recordDateTime);
};

/* s : simple renderer */
function simpleDataVal(_target, _value) {
    $(`.${_target} .bell_num .value`).text(_value);
}
function simpleMinMax(_target, [_min, _max]) {
    // min max 값 처리
    const $wrapEl = $(`.${_target} .bell_num .minMax`);
    for (let i = 0, len = $wrapEl?.length; i < len; i++) {
        const _el = $wrapEl[i];
        const [maxEl, minEl] = $(_el).children('p');
        $(maxEl).text(_max);
        $(minEl).text(_min);
    }
}
function targetDataVal(_target, _value) {
    $(`${_target}`).text(_value);
}

function simpleAlarmSetting(_target, _alramState) {
    // 알람 활성화 여부
    const $alarmInputEl = $(`.${_target} .bell_name input`).get(0);
    $alarmInputEl.checked = _alramState === 1 ? false : true;

    // 알람 버튼 클릭 시 알람 on/off 기능
    alarmChangeState({ _target, $alarmInputEl });
}

function alarmChangeState({ _target, $alarmInputEl }) {
    // 해당 input change 가 일어나면 알람 상태 update
    const _alarmKey = {
        hr: 'hrAlertAlarm',
        sp: 'spo2AlertAlarm',
        resp: 'respAlertAlarm',
        ews: 'ewsAlertAlarm',
        temp: 'tempAlertAlarm',
    };
    $($alarmInputEl).on('change', async function () {
        const _checkVal = $(this).is(':checked') ? 0 : 1;
        let _alramObj = {};
        _alramObj[_alarmKey[_target]] = _checkVal;
        UpdateAlarmSettingMeasurement(_alramObj);
    });
}
/* s : simple renderer */
