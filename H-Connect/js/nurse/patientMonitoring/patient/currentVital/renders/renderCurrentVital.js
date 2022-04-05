const { socketGetPatientData, fakeSoketBioSignalSimpleData } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/fakeSocket.js'
    )
);
const { CreateVitalLineD3 } = await import(
    importVersion('/H-Connect/js/utils/module/d3js/d3Module.js')
);

// const { SelectAlarmSettingMeasurement } = await import(
//     importVersion(
//         '/H-Connect/js/nurse/patientMonitoring/common/actions/patientMonitoringAPI.js'
//     )
// );

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
const $currentVitalWrapEl = $('#tab-1');
const bioSignalSimplData = new fakeSoketBioSignalSimpleData();
bioSignalSimplData.update((_data) => {
    const { bioSignalSimpleData } = _data || {};
    const { hr, spo2, resp, ews, pulse, temp } = bioSignalSimpleData || {};
    simpleHRVal(hr);
    simpleSPO2Val(spo2);
    simpleRESPVal(resp);
    simpleEWSVal(ews);
    simplePulseVal(pulse);
    simpleTempVal(temp);
});

/* e : bioSignal SimpleData */
export const currentVitalInitData = (_data) => {
    currentVitalMinMaxRender(_data);
    currentVitalAlarmRender(_data);
};
const currentVitalAlarmRender = (_data) => {};

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

    simpleHRMinMax(heartRateMin, heartRateMax);
    // simpleSPO2MinMax(spo2Min, );
    simpleRESPMinMax(respMin, respMax);
    // simplePulseMinMax();
    simpleTempMinMax(tempMin, tempMax);
};
/* e : bioSignal minMax render */

/* s : simple renderer */
function simpleHRVal(_value) {
    $('#tab-1 .ecg .value').text(_value);
}
function simpleHRMinMax(_min, _max) {
    const $wrapEl = $('#tab-1 .ecg .minMax').find('p');
    $wrapEl.eq(0).text(_max);
    $wrapEl.eq(1).text(_min);
}

function simpleMinMax(_target, [_min, _max]) {
    const $wrapEl = $(`#tab-1 .${_target} .minMax`).find('p');
    $wrapEl.eq(0).text(_max);
    $wrapEl.eq(1).text(_min);
}
function simpleHRAlarmInit() {}

function simpleSPO2Val(_value) {
    $('#tab-1 .sp .value').text(_value);
}
function simpleSPO2MinMax(_min, _max) {
    const $wrapEl = $('#tab-1 .sp .minMax').find('p');
    $wrapEl.eq(0).text(_max);
    $wrapEl.eq(1).text(_min);
}

function simpleRESPVal(_value) {
    $('#tab-1 .resp .value').text(_value);
}
function simpleRESPMinMax(_min, _max) {
    const $wrapEl = $(`#tab-1 .${_target} .minMax`).find('p');
    $wrapEl.eq(0).text(_max);
    $wrapEl.eq(1).text(_min);
}

function simpleEWSVal(_value) {
    $('#tab-1 .ews .value').text(_value);
}
function simplePulseVal(_value) {
    $('#tab-1 .pulse .value').text(_value);
}
function simplePulseMinMax(_min, _max) {
    const $wrapEl = $('#tab-1 .pulse .minMax').find('p');
    $wrapEl.eq(0).text(_max);
    $wrapEl.eq(1).text(_min);
}

function simpleTempVal(_value) {
    $('#tab-1 .temp .value').text(_value);
}
function simpleTempMinMax(_min, _max) {
    const $wrapEl = $('#tab-1 .temp .minMax').find('p');
    $wrapEl.eq(0).text(_max);
    $wrapEl.eq(1).text(_min);
}
/* s : simple renderer */
