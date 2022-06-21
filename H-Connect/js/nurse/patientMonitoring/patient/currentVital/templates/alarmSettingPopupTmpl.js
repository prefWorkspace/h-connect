const { SelectAlarmSettingMeasurement, SelectArrhythmiaSettingInfo } =
    await import(
        importVersion(
            '/H-Connect/js/nurse/patientMonitoring/common/actions/patientMonitoringAPI.js'
        )
    );
export async function ecgAlarmPopupTmpl(_data, _classKey) {
    const {
        hrAlertAlarm,
        heartRateMin,
        heartRateMax,
        stAlertAlarm,
        stMin,
        stMax,
    } = _data || {};
    const { extremeTachycardia, extremeBradycardia } =
        await SelectArrhythmiaSettingInfo();
    return `
      <div class="pop setting_menu ecg_set">
        <div class="overlay">
            <div class="pop_cont">
                <div class="title">
                    <h2>ECG Setting menu</h2>
                </div>

                <div class="content">
                    <div class="alarm hr onOff">
                        <p>Alarm</p>

                        <div class="container">
                            <input
                                type="radio"
                                name="ecg_alarm"
                                id="ecg_off"
                                class="alarm_off"
                                data-key="hrAlertAlarm"
                                data-value="0"
                                ${hrAlertAlarm === 0 ? 'checked' : ''}
                            />
                            <label for="ecg_off" class="btn_resp_alarm"
                                >Off</label
                            >

                            <input
                                type="radio"
                                name="ecg_alarm"
                                id="ecg_on"
                                class="alarm_on"
                                data-value="1"
                                ${hrAlertAlarm === 1 ? 'checked' : ''}
                            />
                            <label for="ecg_on" class="btn_resp_alarm"
                                >On</label
                            >
                        </div>
                    </div>

                    <div class="input_num hr minMax">
                        <p>HR</p>

                        <div class="container">
                            <div class="num_wrap">
                                <input placeholder="max" type="number" data-key="heartRateMax" value="${heartRateMax}"/>

                                <div class="num_control">
                                    <button type="button" class="up">
                                        <img
                                            src="/H-Connect/img/icon/black_up.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>

                                    <button type="button" class="down">
                                        <img
                                            src="/H-Connect/img/icon/black_down.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>
                                </div>
                            </div>

                            <div class="num_wrap">
                                <input placeholder="min" type="number" data-key="heartRateMin" value="${heartRateMin}"/>

                                <div class="num_control">
                                    <button type="button" class="up">
                                        <img
                                            src="/H-Connect/img/icon/black_up.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>

                                    <button type="button" class="down">
                                        <img
                                            src="/H-Connect/img/icon/black_down.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="input_num exta">
                        <p>Extreme Tachy</p>

                        <div class="container">
                            <div class="num_wrap">
                                <input type="number" data-key="extremeTachycardia" value="${extremeTachycardia}"/>

                                <div class="num_control">
                                    <button type="button" class="up">
                                        <img
                                            src="/H-Connect/img/icon/black_up.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>

                                    <button type="button" class="down">
                                        <img
                                            src="/H-Connect/img/icon/black_down.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="input_num exbr">
                        <p>Extreme Brady</p>

                        <div class="container">
                            <div class="num_wrap">
                                <input type="number" data-key="extremeBradycardia" value="${extremeBradycardia}"/>

                                <div class="num_control">
                                    <button type="button" class="up">
                                        <img
                                            src="/H-Connect/img/icon/black_up.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>

                                    <button type="button" class="down">
                                        <img
                                            src="/H-Connect/img/icon/black_down.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="st_set">
                        <p>ST Setting</p>

                        <div class="toggle_container st onOff">
                            <input
                                type="radio"
                                name="st_alarm"
                                id="st_off"
                                class="alarm_off"
                                data-key="stAlertAlarm"
                                data-value="0"
                                ${stAlertAlarm === 0 ? 'checked' : ''}
                            />
                            <label for="st_off" class="btn_resp_alarm"
                                >Off</label
                            >

                            <input
                                type="radio"
                                name="st_alarm"
                                id="st_on"
                                class="alarm_on"
                                data-key="stAlertAlarm"
                                data-value="1"
                                ${stAlertAlarm === 1 ? 'checked' : ''}
                            />
                            <label for="st_on" class="btn_resp_alarm"
                                >On</label
                            >
                        </div>

                        <div class="input_num st minMax">
                            <div class="container">
                                <div class="num_wrap">
                                    <input type="number" data-key="stMax" value="${stMax}"/>

                                    <div class="num_control">
                                        <button type="button" class="up">
                                            <img
                                                src="/H-Connect/img/icon/black_up.svg"
                                                alt="검은색 삼각형"
                                            />
                                        </button>

                                        <button type="button" class="down">
                                            <img
                                                src="/H-Connect/img/icon/black_down.svg"
                                                alt="검은색 삼각형"
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div class="num_wrap">
                                    <input type="number" data-key="stMin" value="${stMin}"/>

                                    <div class="num_control">
                                        <button type="button" class="up">
                                            <img
                                                src="/H-Connect/img/icon/black_up.svg"
                                                alt="검은색 삼각형"
                                            />
                                        </button>

                                        <button type="button" class="down">
                                            <img
                                                src="/H-Connect/img/icon/black_down.svg"
                                                alt="검은색 삼각형"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="btn_list">
                    <button type="button" class="btn rd btn_cancel" onclick="window.onClickAlarmPopupCancelBtn(this)">
                        취소
                    </button>
                    <button type="button" class="btn blf btn_check" onclick="window.onClickAlarmPopupSubmitBtn(this, '${_classKey}')">
                        확인
                    </button>
                </div>
            </div>
        </div>
    </div>
  `;
}

export async function spo2AlarmPopupTmpl(_data, _classKey) {
    const { spo2AlertAlarm, spo2Min, spo2Max } = _data || {};
    return `
    <div class="pop setting_menu sp_set">
        <div class="overlay">
            <div class="pop_cont">
                <div class="title">
                    <h2>SpO2 Setting menu</h2>
                </div>

                <div class="content">
                    <div class="alarm spo2 onOff">
                        <p>Alarm</p>

                        <div class="container">
                            <input
                                type="radio"
                                name="sp_alarm"
                                id="sp_off"
                                class="alarm_off"
                                data-key="spo2AlertAlarm"
                                data-value="0"
                                ${spo2AlertAlarm === 0 ? 'checked' : ''}
                            />
                            <label for="sp_off" class="btn_resp_alarm"
                                >Off</label
                            >

                            <input
                                type="radio"
                                name="sp_alarm"
                                id="sp_on"
                                class="alarm_on"
                                data-value="1"
                                ${spo2AlertAlarm === 1 ? 'checked' : ''}
                            />
                            <label for="sp_on" class="btn_resp_alarm"
                                >On</label
                            >
                        </div>
                    </div>

                    <div class="input_num spo2 minMax">
                        <p>SpO2</p>

                        <div class="container">
                            <div class="num_wrap">
                                <input placeholder="min" type="number" data-key="spo2Min" value="${spo2Min}"/>

                                <div class="num_control">
                                    <button type="button" class="up">
                                        <img
                                            src="/H-Connect/img/icon/black_up.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>

                                    <button type="button" class="down">
                                        <img
                                            src="/H-Connect/img/icon/black_down.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>
                                </div>
                            </div>

                            <!-- INFO : spo2Max 의 max 값은 임시 주석처리
                             <div class="num_wrap">
                                <input placeholder="max" type="number" data-key="spo2Max" value="${spo2Max}"/>

                                <div class="num_control">
                                    <button type="button" class="up">
                                        <img
                                            src="/H-Connect/img/icon/black_up.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>

                                    <button type="button" class="down">
                                        <img
                                            src="/H-Connect/img/icon/black_down.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>

                <div class="btn_list">
                    <button type="button" class="btn rd btn_cancel" onclick="window.onClickAlarmPopupCancelBtn(this)">
                        취소
                    </button>
                    <button type="button" class="btn blf btn_check" onclick="window.onClickAlarmPopupSubmitBtn(this, '${_classKey}')">
                        확인
                    </button>
                </div>
            </div>
        </div>
    </div>
  `;
}

export async function respAlarmPopupTmpl(_data, _classKey) {
    const { respAlertAlarm, respMin, respMax } = _data || {};
    return `
    <div class="pop setting_menu resp_set">
        <div class="overlay">
            <div class="pop_cont">
                <div class="title">
                    <h2>RESP Setting menu</h2>
                </div>

                <div class="content">
                    <div class="alarm resp onOff">
                        <p>Alarm</p>

                        <div class="container">
                            <input
                                type="radio"
                                name="resp_alarm"
                                id="btn_off"
                                class="alarm_off"
                                data-key="respAlertAlarm"
                                data-value="0"
                                ${respAlertAlarm === 0 ? 'checked' : ''}
                            />
                            <label for="btn_off" class="btn_resp_alarm"
                                >Off</label
                            >

                            <input
                                type="radio"
                                name="resp_alarm"
                                id="btn_on"
                                class="alarm_on"
                                data-value="1"
                                ${respAlertAlarm === 1 ? 'checked' : ''}
                            />
                            <label for="btn_on" class="btn_resp_alarm"
                                >On</label
                            >
                        </div>
                    </div>

                    <div class="input_num resp minMax">
                        <p>RESP</p>

                        <div class="container">
                            <div class="num_wrap">
                                <input placeholder="max" type="number" data-key="respMax" value="${respMax}"/>

                                <div class="num_control">
                                    <button type="button" class="up">
                                        <img
                                            src="/H-Connect/img/icon/black_up.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>

                                    <button type="button" class="down">
                                        <img
                                            src="/H-Connect/img/icon/black_down.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>
                                </div>
                            </div>

                            <div class="num_wrap">
                                <input placeholder="min" type="number" data-key="respMin" value="${respMin}"/>

                                <div class="num_control">
                                    <button type="button" class="up">
                                        <img
                                            src="/H-Connect/img/icon/black_up.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>

                                    <button type="button" class="down">
                                        <img
                                            src="/H-Connect/img/icon/black_down.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- INFO : resp 에서 다음 해당하는 input은 우선 사용안하기로 함 주석처리 
                    <div class="sweep">
                        <p>Sweep Speed</p>

                        <div class="container">
                            <div>
                                <div class="input_wrap">
                                    <input
                                        type="radio"
                                        name="sweep"
                                        id="first"
                                        class="radio_custom"
                                        checked
                                    />
                                    <label for="first"></label>
                                    <label for="first">6.25 mm/s</label>
                                </div>

                                <div class="input_wrap">
                                    <input
                                        type="radio"
                                        name="sweep"
                                        id="second"
                                        class="radio_custom"
                                    />
                                    <label for="second"></label>
                                    <label for="second">12.5 mm/s</label>
                                </div>
                            </div>

                            <div>
                                <div class="input_wrap">
                                    <input
                                        type="radio"
                                        name="sweep"
                                        id="third"
                                        class="radio_custom"
                                    />
                                    <label for="third"></label>
                                    <label for="third">25.0 mm/s</label>
                                </div>

                                <div class="input_wrap">
                                    <input
                                        type="radio"
                                        name="sweep"
                                        id="fourth"
                                        class="radio_custom"
                                    />
                                    <label for="fourth"></label>
                                    <label for="fourth">50.0 mm/s</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="apnea">
                        <p>Apnea Alarm</p>

                        <div class="container">
                            <div>
                                <div class="input_wrap">
                                    <input
                                        type="radio"
                                        name="apnea"
                                        id="ap_first"
                                        class="radio_custom"
                                        checked
                                    />
                                    <label for="ap_first"></label>
                                    <label for="ap_first">off</label>
                                </div>

                                <div class="input_wrap">
                                    <input
                                        type="radio"
                                        name="apnea"
                                        id="ap_second"
                                        class="radio_custom"
                                    />
                                    <label for="ap_second"></label>
                                    <label for="ap_second">10s</label>
                                </div>

                                <div class="input_wrap">
                                    <input
                                        type="radio"
                                        name="apnea"
                                        id="ap_third"
                                        class="radio_custom"
                                    />
                                    <label for="ap_third"></label>
                                    <label for="ap_third">15s</label>
                                </div>

                                <div class="input_wrap">
                                    <input
                                        type="radio"
                                        name="apnea"
                                        id="ap_fourth"
                                        class="radio_custom"
                                    />
                                    <label for="ap_fourth"></label>
                                    <label for="ap_fourth">20s</label>
                                </div>
                            </div>

                            <div>
                                <div class="input_wrap">
                                    <input
                                        type="radio"
                                        name="apnea"
                                        id="ap_fifth"
                                        class="radio_custom"
                                    />
                                    <label for="ap_fifth"></label>
                                    <label for="ap_fifth">25s</label>
                                </div>

                                <div class="input_wrap">
                                    <input
                                        type="radio"
                                        name="apnea"
                                        id="ap_sixth"
                                        class="radio_custom"
                                    />
                                    <label for="ap_sixth"></label>
                                    <label for="ap_sixth">30s</label>
                                </div>

                                <div class="input_wrap">
                                    <input
                                        type="radio"
                                        name="apnea"
                                        id="ap_seventh"
                                        class="radio_custom"
                                    />
                                    <label for="ap_seventh"></label>
                                    <label for="ap_seventh">35s</label>
                                </div>

                                <div class="input_wrap">
                                    <input
                                        type="radio"
                                        name="apnea"
                                        id="ap_eighth"
                                        class="radio_custom"
                                    />
                                    <label for="ap_eighth"></label>
                                    <label for="ap_eighth">40s</label>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>

                <div class="btn_list">
                    <button type="button" class="btn rd btn_cancel" onclick="window.onClickAlarmPopupCancelBtn(this)">
                        취소
                    </button>
                    <button type="button" class="btn blf btn_check" onclick="window.onClickAlarmPopupSubmitBtn(this, '${_classKey}')">
                        확인
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

export async function tempAlarmPopupTmpl(_data, _classKey) {
    const { tempAlertAlarm, tempMin, tempMax, tempUnit } = _data || {};
    // 화씨 F | 2
    // 섭씨 C | 1 : default
    return `
      <div class="pop setting_menu temp_set">
        <div class="overlay">
            <div class="pop_cont">
                <div class="title">
                    <h2>Temp Setting menu</h2>
                </div>

                <div class="content">
                    <div class="alarm temp onOff">
                        <p>Alarm</p>

                        <div class="container">
                            <input
                                type="radio"
                                name="temp_alarm"
                                id="temp_off"
                                class="alarm_off"
                                data-key="tempAlertAlarm"
                                data-value="0"
                                ${tempAlertAlarm === 0 ? 'checked' : ''}
                            />
                            <label for="temp_off" class="btn_resp_alarm"
                                >Off</label
                            >

                            <input
                                type="radio"
                                name="temp_alarm"
                                id="temp_on"
                                class="alarm_on"
                                data-value="1"
                                ${tempAlertAlarm === 1 ? 'checked' : ''}
                            />
                            <label for="temp_on" class="btn_resp_alarm"
                                >On</label
                            >
                        </div>
                    </div>

                    <div class="input_num temp minMax">
                        <p>Temp</p>

                        <div class="container">
                            <div class="num_wrap">
                                <input placeholder="max" type="number" data-key="tempMax" value="${tempMax}" />

                                <div class="num_control">
                                    <button type="button" class="up">
                                        <img
                                            src="/H-Connect/img/icon/black_up.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>

                                    <button type="button" class="down">
                                        <img
                                            src="/H-Connect/img/icon/black_down.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>
                                </div>
                            </div>

                            <div class="num_wrap">
                                <input placeholder="min" type="number" data-key="tempMin" value="${tempMin}"/>

                                <div class="num_control">
                                    <button type="button" class="up">
                                        <img
                                            src="/H-Connect/img/icon/black_up.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>

                                    <button type="button" class="down">
                                        <img
                                            src="/H-Connect/img/icon/black_down.svg"
                                            alt="검은색 삼각형"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="sweep UNIT onOff">
                        <p>UNIT</p>

                        <div class="container">
                            <div class="input_wrap">
                                <input
                                    type="radio"
                                    name="UNIT"
                                    id="unit_first"
                                    class="radio_custom"
                                    data-key="tempUnit"
                                    data-value="2"
                                    ${tempUnit === 2 ? 'checked' : ''}
                                />
                                <label for="unit_first"></label>
                                <label for="unit_first">°F</label>
                            </div>

                            <div class="input_wrap">
                                <input
                                    type="radio"
                                    name="UNIT"
                                    id="unit_second"
                                    class="radio_custom"
                                    data-key="tempUnit"
                                    data-value="1"
                                    ${tempUnit === 1 ? 'checked' : ''}
                                />
                                <label for="unit_second"></label>
                                <label for="unit_second">°C</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="btn_list">
                    <button type="button" class="btn rd btn_cancel" onclick="window.onClickAlarmPopupCancelBtn(this)">
                        취소
                    </button>
                    <button type="button" class="btn blf btn_check" onclick="window.onClickAlarmPopupSubmitBtn(this, '${_classKey}')">
                        확인
                    </button>
                </div>
            </div>
        </div>
    </div>
  `;
}

export async function ewsAlarmPopupTmpl(_data, _classKey) {
    const { ewsAlertAlarm } = _data || {};
    return `
    <div class="pop setting_menu ews_set">
            <div class="overlay">
                <div class="pop_cont">
                    <div class="title">
                        <h2>EWS Setting menu</h2>
                    </div>

                    <div class="content">
                        <div class="alarm ews onOff">
                            <p>Alarm</p>

                            <div class="container">
                                <input
                                    type="radio"
                                    name="alarm"
                                    id="ews_off"
                                    class="alarm_off"
                                    data-key="ewsAlertAlarm"
                                    data-value="0"
                                    ${ewsAlertAlarm === 0 ? 'checked' : ''}
                                />
                                <label for="ews_off" class="btn_resp_alarm"
                                    >Off</label
                                >

                                <input
                                    type="radio"
                                    name="alarm"
                                    id="ews_on"
                                    class="alarm_on"
                                    data-value="1"
                                    ${ewsAlertAlarm === 1 ? 'checked' : ''}
                                />
                                <label for="ews_on" class="btn_resp_alarm"
                                    >On</label
                                >
                            </div>
                        </div>
                    </div>

                    <div class="btn_list">
                        <button type="button" class="btn rd btn_cancel" onclick="window.onClickAlarmPopupCancelBtn(this)">
                            취소
                        </button>
                        <button type="button" class="btn blf btn_check" onclick="window.onClickAlarmPopupSubmitBtn(this, '${_classKey}')">
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
