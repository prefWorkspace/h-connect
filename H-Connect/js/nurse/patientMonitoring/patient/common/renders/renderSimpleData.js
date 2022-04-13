const { fakeSoketBioSignalSimpleData } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/fakeSocket.js'
    )
);
const { UpdateAlarmSettingMeasurement, SelectMeasurementInfoDetail } =
    await import(
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

export const vitalSimpleDataInit = (_data) => {
    // simple data 공통 렌더링
    currentVitalMinMaxRender(_data);
    currentVitalAlarmRender(_data);
};
const currentVitalAlarmRender = (_data) => {
    // 알람 켜져있는지 아닌지 렌더링
    const {
        hrAlertAlarm,
        spo2AlertAlarm,
        respAlertAlarm,
        tempAlertAlarm,
        ewsAlertAlarm,
    } = _data || {};
    simpleAlarmSetting('hr', hrAlertAlarm);
    simpleAlarmSetting('sp', spo2AlertAlarm);
    simpleAlarmSetting('resp', respAlertAlarm);
    simpleAlarmSetting('temp', tempAlertAlarm);
    simpleAlarmSetting('ews', ewsAlertAlarm);
};

/* s : bioSignal minMax render */
const currentVitalMinMaxRender = (_data) => {
    // 바이탈 min max 값 렌더링
    const {
        heartRateMin,
        heartRateMax,
        spo2Min,
        respMin,
        respMax,
        tempMin,
        tempMax,
    } = _data || {};
    simpleMinMax('hr', [heartRateMin, heartRateMax]);
    simpleMinMax('sp', [spo2Min, '-']); // 질문필요
    simpleMinMax('resp', [respMin, respMax]);
    simpleMinMax('pulse', [0, 0]); // 질문필요
    simpleMinMax('temp', [tempMin, tempMax]);
};
/* e : bioSignal minMax render */

/* s : simple renderer */
function simpleDataVal(_target, _value) {
    $(`#tab-1 .${_target} .bell_num .value`).text(_value);
}
function simpleMinMax(_target, [_min, _max]) {
    // min max 값 처리
    const $wrapEl = $(`#tab-1 .${_target} .bell_num .minMax`).find('p');
    $wrapEl.eq(0).text(_max);
    $wrapEl.eq(1).text(_min);
}

function simpleAlarmSetting(_target, _alramState) {
    // 알람 활성화 여부
    const $alarmInputEl = $(`#tab-1 .${_target} .bell_name input`).get(0);
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
    $($alarmInputEl).on('change', async (e) => {
        const _targetEl = e.currentTarget;
        const _checkVal = _targetEl.checked ? 0 : 1;
        let _alramObj = {};
        // console.log(_alarmKey[_target]);
        _alramObj[_alarmKey[_target]] = _checkVal;
        UpdateAlarmSettingMeasurement(_alramObj);
    });
}
/* s : simple renderer */
