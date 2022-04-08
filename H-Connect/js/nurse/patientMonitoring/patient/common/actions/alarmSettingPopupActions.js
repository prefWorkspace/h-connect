// $('.cont .resp .bell_num').on('click', function () {
// $('.pop.resp_set .overlay').fadeIn();
// });

// $(' .cont .ecg .bell_num').on('click', function () {
//   $('.pop.ecg_set .overlay').fadeIn();
// });

// $('.cont .sp .bell_num').on('click', function () {
//   $('.pop.sp_set .overlay').fadeIn();
// });

// $('.temp .bell_num').on('click', function () {
//   $('.pop.temp_set .overlay').fadeIn();
// });

// $('.ews .bell_num').on('click', function () {
//   $('.pop.ews_set .overlay').fadeIn();
// });
const { SelectAlarmSettingMeasurement, UpdateAlarmSettingMeasurement } =
    await import(
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
        '/H-Connect/js/nurse/patientMonitoring/patient/common/templates/alarmSettingPopupTmpl.js'
    )
);
const $alarmPopupWrapEl = $('.alarm_popup_wrap');
const PopupObj = {
    ecg: {
        classKey: 'ecg',
        templates: ecgAlarmPopupTmpl,
        paramsKeys: [getAlarmOnOff, getAlarmMinMax],
    },
    spo2: {
        classKey: 'sp',
        templates: spo2AlarmPopupTmpl,
    },
    resp: {
        classKey: 'resp',
        templates: respAlarmPopupTmpl,
    },
    temp: {
        classKey: 'temp',
        templates: tempAlarmPopupTmpl,
    },
    ews: {
        classKey: 'ews',
        templates: ewsAlarmPopupTmpl,
        paramsKeys: [getAlarmOnOff],
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
function findObjWithClassKey(_classKey) {
    // classKey 로 PopupObj 에서 해당하는 객체를 찾아 반환
    for (const [objKey, objValue] of Object.entries(PopupObj)) {
        if (_classKey === objValue.classKey) {
            return objValue;
            break;
        }
    }
}
function settingObjParams(_wrapEl, _classKey, _paramsKeys) {
    // object 파라미터 합치는 세팅 진행
    let resultObj = {};
    for (let i = 0, len = _paramsKeys?.length; i < len; i++) {
        Object.assign(resultObj, _paramsKeys[i](_wrapEl, _classKey));
    }
    return resultObj;
}

function getAlarmMinMax(_wrapEl, _classKey) {
    const $getAlarmInputEl = _wrapEl.find(`.content .input_num.minMax input`);
    const [getMinEl, getMaxEl] = $getAlarmInputEl;
    let resultObj = {};
    resultObj[`${getMinEl.getAttribute('data-key')}`] = parseInt(
        getMinEl.value,
        10
    );
    resultObj[`${getMaxEl.getAttribute('data-key')}`] = parseInt(
        getMaxEl.value,
        10
    );
    return resultObj;
}
function getAlarmOnOff(_wrapEl, _classKey) {
    const [getAlarmOffEl] = _wrapEl.find('.content .alarm input');
    const _isOnOff = getAlarmOffEl.checked ? 0 : 1;

    let resultObj = {};
    resultObj[`${getAlarmOffEl.getAttribute('data-key')}`] = _isOnOff;
    return resultObj;
}

/* e : 팝업 창 띄우기 이벤트 추가 */

function onClickAlarmPopupCancelBtn(e) {
    /* 알람 취소 버튼 클릭시 실행 함수 */
    const $popupOverlayEl = $(e).closest('.overlay');
    $popupOverlayEl.fadeOut(() => {
        $alarmPopupWrapEl.html('');
    });
}
async function onClickAlarmPopupSubmitBtn(e, _classKey) {
    /* 알람 확인 버튼 클릭시 실행 함수 */
    const $popupOverlayEl = $(e).closest('.overlay');
    const $settingMenuEl = $(`.pop.setting_menu.${_classKey}_set`);
    const { paramsKeys } = findObjWithClassKey(_classKey) || {};
    const alarmSetting = settingObjParams(
        $settingMenuEl,
        _classKey,
        paramsKeys
    );
    // 알람 변경 정보 업데이트
    const updateFetchSuccess = await UpdateAlarmSettingMeasurement(
        alarmSetting
    );
    if (updateFetchSuccess) {
        // 업데이트 성공시 화면 재 렌더링 및 팝업창 닫기
        $popupOverlayEl.fadeOut(async () => {
            $alarmPopupWrapEl.html('');
            const _alarmSettingInfo = await SelectAlarmSettingMeasurement();
            vitalSimpleDataInit(_alarmSettingInfo);
        });
    }
}

function addAlarmPopupEventInit() {
    addEventForClickToPopupView();
    window.onClickAlarmPopupCancelBtn = onClickAlarmPopupCancelBtn;
    window.onClickAlarmPopupSubmitBtn = onClickAlarmPopupSubmitBtn;
}
addAlarmPopupEventInit();
