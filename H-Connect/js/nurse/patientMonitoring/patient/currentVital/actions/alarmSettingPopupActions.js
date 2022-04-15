const {
    SelectAlarmSettingMeasurement,
    UpdateAlarmSettingMeasurement,
    UpdateArrhythmiaSettingInfo,
} = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/common/actions/patientMonitoringAPI.js'
    )
);
const { vitalSimpleDataInit } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/common/renders/renderSimpleData.js'
    )
);

const {
    ecgAlarmPopupTmpl,
    spo2AlarmPopupTmpl,
    respAlarmPopupTmpl,
    tempAlarmPopupTmpl,
    ewsAlarmPopupTmpl,
} = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/templates/alarmSettingPopupTmpl.js'
    )
);
// 각 팝업 타입별 실행 함수를 지정합니다.
const $alarmPopupWrapEl = $('.alarm_popup_wrap');
const PopupObj = {
    ecg: {
        classKey: 'ecg',
        templates: ecgAlarmPopupTmpl,
        submitFunc: ecgSettingMenuSubmit,
    },
    spo2: {
        classKey: 'sp',
        templates: spo2AlarmPopupTmpl,
        submitFunc: spo2SettingMenuSubmit,
    },
    resp: {
        classKey: 'resp',
        templates: respAlarmPopupTmpl,
        submitFunc: respSettingMenuSubmit,
    },
    temp: {
        classKey: 'temp',
        templates: tempAlarmPopupTmpl,
        submitFunc: tempSettingMenuSubmit,
    },
    ews: {
        classKey: 'ews',
        templates: ewsAlarmPopupTmpl,
        submitFunc: ewsSettingMenuSubmit,
    },
};

/* s : 팝업 창 띄우기 이벤트 추가 */
async function addEventForClickToPopupView() {
    for (const [objKey, objValue] of Object.entries(PopupObj)) {
        $(`.cont .${objValue.classKey}  .bell_num`).on(
            'click',
            async function () {
                const _getAlarmSettingInformData =
                    await SelectAlarmSettingMeasurement();
                $alarmPopupWrapEl.html(
                    await objValue.templates(
                        _getAlarmSettingInformData,
                        objValue.classKey
                    )
                );
                const $popupOverlayEl = $(
                    `.pop.setting_menu.${objValue.classKey}_set .overlay`
                );
                $popupOverlayEl.fadeIn();
            }
        );
    }
}
/* e : 팝업 창 띄우기 이벤트 추가 */

function findObjWithClassKey(_classKey) {
    // classKey 로 PopupObj 에서 해당하는 객체를 찾아 반환
    for (const [objKey, objValue] of Object.entries(PopupObj)) {
        if (_classKey === objValue.classKey) {
            return objValue;
            break;
        }
    }
}
function objAssignWithArray(_objs) {
    // object 파라미터 합치는 세팅 진행
    let resultObj = {};
    for (let i = 0, len = _objs?.length; i < len; i++) {
        Object.assign(resultObj, _objs[i]);
    }
    return resultObj;
}
/* s : 파라미터 키값 가져오기 */
function getTupleInputMinMax(_wrapEl, _targetKey) {
    // 2개 타입의 min max 값을 받아옵니다.
    // minMax 클래스가 포함된 기준으로 값을 찾습니다.
    // 찾을 때 필요한 값 : data-key, class minMax
    const $getAlarmInputEl = _wrapEl.find(
        `.content ${_targetKey}.minMax input`
    );
    const [getMinEl, getMaxEl] = $getAlarmInputEl;
    let resultObj = {};
    resultObj[`${getMinEl?.getAttribute('data-key')}`] = parseFloat(
        getMinEl?.value,
        10
    );
    resultObj[`${getMaxEl?.getAttribute('data-key')}`] = parseFloat(
        getMaxEl?.value,
        10
    );
    return resultObj;
}
function getTupleRadioValue(_wrapEl, _targetKey) {
    // 2개 타입의 라디오 버튼의 값을 받아옵니다.
    // onOff 클래스가 포함된 기준으로 값을 찾습니다.
    // 찾을 때 필요한 값 : data-key, data-value, class onOff
    const [firstInputEl, secondInputEl] = _wrapEl.find(
        `.content ${_targetKey}.onOff input`
    );
    const _returnValue = firstInputEl.checked
        ? firstInputEl.dataset.value
        : secondInputEl.checked
        ? secondInputEl.dataset.value
        : null;

    let resultObj = {};
    // temp의 UNIT 값의 경우 간혹 default값이 안들어가 있는 경우가 있어 NAN일 경우 빈 Object를 반환하도록 설계
    !isNaN(parseFloat(_returnValue, 10))
        ? (resultObj[`${firstInputEl.getAttribute('data-key')}`] = parseFloat(
              _returnValue,
              10
          ))
        : null;
    return resultObj;
}
function getTargetInputVal(_wrapEl, _targetKey) {
    // 1개의 input값만 받아와야 하는경우
    // 찾을 때 필요한 값 : data-key
    const [getTargetInputEl] = _wrapEl.find(`.content ${_targetKey} input`);
    let resultObj = {};
    resultObj[`${getTargetInputEl.getAttribute('data-key')}`] = parseFloat(
        getTargetInputEl.value,
        10
    );
    return resultObj;
}
/* e : 파라미터 키값 가져오기 */

/* s : 알림 확인, 취소 버튼 클릭 시 실행 함수 */
function onClickAlarmPopupCancelBtn(_cancelBtnEl) {
    /* 알람 취소 버튼 클릭시 실행 함수 */
    const $popupOverlayEl = $(_cancelBtnEl).closest('.overlay');
    $popupOverlayEl.fadeOut(() => {
        $alarmPopupWrapEl.html('');
    });
}
async function onClickAlarmPopupSubmitBtn(_submitBtnEl, _classKey) {
    /* 알람 확인 버튼 클릭시 실행 함수 */
    const $popupOverlayEl = $(_submitBtnEl).closest('.overlay');
    const $settingMenuEl = $(`.pop.setting_menu.${_classKey}_set`);

    const { submitFunc } = findObjWithClassKey(_classKey) || {};
    const updateSuccess = await submitFunc($settingMenuEl, _classKey);
    if (updateSuccess) {
        // 업데이트 성공시 화면 재 렌더링 및 팝업창 닫기
        $popupOverlayEl.fadeOut(async () => {
            $alarmPopupWrapEl.html('');
            const _alarmSettingInfo = await SelectAlarmSettingMeasurement();
            vitalSimpleDataInit(_alarmSettingInfo);
        });
    }
}
/* e : 알림 확인, 취소 버튼 클릭 시 실행 함수 */

/* s : 화살표 버튼 클릭 시 조정 */
function addOnClickAlarmPopupInputArrowBtn() {
    $('body').on('click', '.alarm_popup_wrap .num_control button', function () {
        const $findClosetInputEl = $(this).closest('.num_wrap').find('input');
        let valueOfTargetInput = $findClosetInputEl.val();
        if ($(this).hasClass('up')) {
            $findClosetInputEl.val(++valueOfTargetInput);
        } else {
            $findClosetInputEl.val(--valueOfTargetInput);
        }
    });
}
/* e : 화살표 버튼 클릭 시 조정 */

// 각 알람 타입 별 등록 함수
/* hr.bpm popup submit */
async function ecgSettingMenuSubmit(_wrapEl, _classKey) {
    const ownPrams = objAssignWithArray([
        getTupleRadioValue(_wrapEl, '.hr'),
        getTupleInputMinMax(_wrapEl, '.hr'),
        getTupleRadioValue(_wrapEl, '.st'),
        getTupleInputMinMax(_wrapEl, 'st'),
    ]);

    const ExtremeParams = objAssignWithArray([
        getTargetInputVal(_wrapEl, '.exta'),
        getTargetInputVal(_wrapEl, '.exbr'),
    ]);
    const updateOwnSuccess = await UpdateAlarmSettingMeasurement(ownPrams);
    const updateExtremeSuccess = await UpdateArrhythmiaSettingInfo(
        ExtremeParams
    );
    return (updateOwnSuccess && updateExtremeSuccess) || null;
}

/* spo2 popup submit */
async function spo2SettingMenuSubmit(_wrapEl, _classKey) {
    const ownPrams = objAssignWithArray([
        getTupleRadioValue(_wrapEl, '.spo2'),
        getTargetInputVal(_wrapEl, '.spo2.minMax'),
    ]);
    const updateOwnSuccess = await UpdateAlarmSettingMeasurement(ownPrams);

    return updateOwnSuccess || null;
}

/* resp popup submit */
async function respSettingMenuSubmit(_wrapEl, _classKey) {
    const ownPrams = objAssignWithArray([
        getTupleRadioValue(_wrapEl, '.resp'),
        getTupleInputMinMax(_wrapEl, '.resp'),
    ]);
    // console.log(ownPrams);
    // const updateOwnSuccess = await UpdateAlarmSettingMeasurement(ownPrams);
}

/* temp popup submit */
async function tempSettingMenuSubmit(_wrapEl, _classKey) {
    const ownPrams = objAssignWithArray([
        getTupleRadioValue(_wrapEl, '.temp'),
        getTupleInputMinMax(_wrapEl, '.temp'),
        getTupleRadioValue(_wrapEl, '.UNIT'),
    ]);
    const updateOwnSuccess = await UpdateAlarmSettingMeasurement(ownPrams);
    return updateOwnSuccess;
}

/* ews popup submit */
async function ewsSettingMenuSubmit(_wrapEl, _classKey) {
    const ownPrams = objAssignWithArray([getTupleRadioValue(_wrapEl, '.ews')]);
    const updateOwnSuccess = await UpdateAlarmSettingMeasurement(ownPrams);
    return updateOwnSuccess;
}

/* 알람 이벤트 등록 */
function addAlarmPopupEventInit() {
    addOnClickAlarmPopupInputArrowBtn();
    addEventForClickToPopupView();
    window.onClickAlarmPopupCancelBtn = onClickAlarmPopupCancelBtn;
    window.onClickAlarmPopupSubmitBtn = onClickAlarmPopupSubmitBtn;
}
addAlarmPopupEventInit();
