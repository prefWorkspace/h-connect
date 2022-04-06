const { socketGetPatientData, fakeSoketBioSignalSimpleData } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/fakeSocket.js'
    )
);
const { CreateVitalLineD3 } = await import(
    importVersion('/H-Connect/js/utils/module/d3js/d3Module.js')
);

const { UpdateAlarmSettingMeasurement } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/common/actions/vitalInformAPI.js'
    )
);

/* s : ecg vital test */
let vitalSignalLine = null;
const ecgPatientdata = new socketGetPatientData();
ecgPatientdata.update((_data) => {
    const { measurementCode, bioSignalData } = _data || {};
    const { ecgDataList } = bioSignalData;
    if (!vitalSignalLine) {
        vitalSignalLine = new CreateVitalLineD3({
            target: 'vital-ecg-graph',
            data: ecgDataList,
            measurementCode: measurementCode,
            setting: {
                strokeColor: '#00FF19',
                strokeWidth: 1,
                duration: 3000,
            },
        });
    } else {
        vitalSignalLine.chartUpdate(ecgDataList);
    }
});
/* e : ecg vital test */

/* s : bioSignal SimpleData */
const bioSignalSimplData = new fakeSoketBioSignalSimpleData();
bioSignalSimplData.update((_data) => {
    const { bioSignalSimpleData } = _data || {};
    const { hr, spo2, resp, ews, pulse, temp } = bioSignalSimpleData || {};
    simpleDataVal('hr', hr);
    simpleDataVal('sp', spo2);
    simpleDataVal('resp', resp);
    simpleDataVal('ews', ews);
    simpleDataVal('pulse', pulse);
    simpleDataVal('temp', temp);
});

/* e : bioSignal SimpleData */
export const currentVitalInitData = (_data) => {
    currentVitalMinMaxRender(_data);
    currentVitalAlarmRender(_data);
};
const currentVitalAlarmRender = (_data) => {
    console.log(_data?.measurementAlarmSetting);
    const {
        hrAlertAlarm,
        spo2AlertAlarm,
        respAlertAlarm,
        tempAlertAlarm,
        ewsAlertAlarm,
    } = _data?.measurementAlarmSetting || {};
    simpleAlarmSetting('hr', hrAlertAlarm);
    simpleAlarmSetting('sp', spo2AlertAlarm);
    simpleAlarmSetting('resp', respAlertAlarm);
    simpleAlarmSetting('temp', tempAlertAlarm);
    simpleAlarmSetting('ews', ewsAlertAlarm);
};

/* s : bioSignal minMax render */
const currentVitalMinMaxRender = (_data) => {
    const {
        heartRateMin,
        heartRateMax,
        spo2Min,
        respMin,
        respMax,
        tempMin,
        tempMax,
    } = _data?.measurementAlarmSetting || {};

    simpleMinMax('hr', [heartRateMin, heartRateMax]);
    simpleMinMax('sp', [spo2Min, 0]); // 질문필요
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
    const _alarmKey = {
        hr: 'hrAlertAlarm',
        sp: 'spo2AlertAlarm',
        resp: 'respAlertAlarm',
        ews: 'ewsAlertAlarm',
        temp: 'tempAlertAlarm',
    };
    $($alarmInputEl).on('change', (e) => {
        const _targetEl = e.currentTarget;
        const _checkVal = _targetEl.checked ? 0 : 1;
        let _alramObj = {};
        _alramObj[_alarmKey[_target]] = _checkVal;
        UpdateAlarmSettingMeasurement(_alramObj);
    });
}
/* s : simple renderer */
