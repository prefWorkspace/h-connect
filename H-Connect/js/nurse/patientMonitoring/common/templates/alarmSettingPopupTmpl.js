function ECGAlarmPopupTmpl() {
    return `
      <div class="pop setting_menu ecg_set">
        <div class="overlay">
            <div class="pop_cont">
                <div class="title">
                    <h2>ECG Setting menu</h2>
                </div>

                <div class="content">
                    <div class="alarm">
                        <p>Alarm</p>

                        <div class="container">
                            <input
                                type="radio"
                                name="ecg_alarm"
                                id="ecg_off"
                                class="alarm_off"
                            />
                            <label for="ecg_off" class="btn_resp_alarm"
                                >Off</label
                            >

                            <input
                                type="radio"
                                name="ecg_alarm"
                                id="ecg_on"
                                class="alarm_on"
                                checked
                            />
                            <label for="ecg_on" class="btn_resp_alarm"
                                >On</label
                            >
                        </div>
                    </div>

                    <div class="input_num hr">
                        <p>HR</p>

                        <div class="container">
                            <div class="num_wrap">
                                <input type="number" />

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
                                <input type="number" />

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
                                <input type="number" />

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
                                <input type="number" />

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

                        <div class="toggle_container">
                            <input
                                type="radio"
                                name="st_alarm"
                                id="st_off"
                                class="alarm_off"
                                checked
                            />
                            <label for="st_off" class="btn_resp_alarm"
                                >Off</label
                            >

                            <input
                                type="radio"
                                name="st_alarm"
                                id="st_on"
                                class="alarm_on"
                            />
                            <label for="st_on" class="btn_resp_alarm"
                                >On</label
                            >
                        </div>

                        <div class="input_num">
                            <div class="container">
                                <div class="num_wrap">
                                    <input type="number" />

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
                                    <input type="number" />

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
                    <button type="button" class="btn rd btn_cancel">
                        취소
                    </button>
                    <button type="button" class="btn blf btn_check">
                        확인
                    </button>
                </div>
            </div>
        </div>
    </div>
  `;
}

function SPO2AlarmPopupTmpl() {
    return `
    <div class="pop setting_menu sp_set">
        <div class="overlay">
            <div class="pop_cont">
                <div class="title">
                    <h2>SpO2 Setting menu</h2>
                </div>

                <div class="content">
                    <div class="alarm">
                        <p>Alarm</p>

                        <div class="container">
                            <input
                                type="radio"
                                name="sp_alarm"
                                id="sp_off"
                                class="alarm_off"
                            />
                            <label for="sp_off" class="btn_resp_alarm"
                                >Off</label
                            >

                            <input
                                type="radio"
                                name="sp_alarm"
                                id="sp_on"
                                class="alarm_on"
                                checked
                            />
                            <label for="sp_on" class="btn_resp_alarm"
                                >On</label
                            >
                        </div>
                    </div>

                    <div class="input_num spo2">
                        <p>SpO2</p>

                        <div class="container">
                            <div class="num_wrap">
                                <input type="number" />

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
                                <input type="number" />

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

                <div class="btn_list">
                    <button type="button" class="btn rd btn_cancel">
                        취소
                    </button>
                    <button type="button" class="btn blf btn_check">
                        확인
                    </button>
                </div>
            </div>
        </div>
    </div>
  `;
}

function tempAlarmPopupTmpl() {
    return `
      <div class="pop setting_menu temp_set">
        <div class="overlay">
            <div class="pop_cont">
                <div class="title">
                    <h2>Temp Setting menu</h2>
                </div>

                <div class="content">
                    <div class="alarm">
                        <p>Alarm</p>

                        <div class="container">
                            <input
                                type="radio"
                                name="temp_alarm"
                                id="temp_off"
                                class="alarm_off"
                            />
                            <label for="temp_off" class="btn_resp_alarm"
                                >Off</label
                            >

                            <input
                                type="radio"
                                name="temp_alarm"
                                id="temp_on"
                                class="alarm_on"
                                checked
                            />
                            <label for="temp_on" class="btn_resp_alarm"
                                >On</label
                            >
                        </div>
                    </div>

                    <div class="input_num resp">
                        <p>RESP</p>

                        <div class="container">
                            <div class="num_wrap">
                                <input type="number" />

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
                                <input type="number" />

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

                    <div class="sweep UNIT">
                        <p>UNIT</p>

                        <div class="container">
                            <div class="input_wrap">
                                <input
                                    type="radio"
                                    name="UNIT"
                                    id="unit_first"
                                    class="radio_custom"
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
                                    checked
                                />
                                <label for="unit_second"></label>
                                <label for="unit_second">°C</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="btn_list">
                    <button type="button" class="btn rd btn_cancel">
                        취소
                    </button>
                    <button type="button" class="btn blf btn_check">
                        확인
                    </button>
                </div>
            </div>
        </div>
    </div>
  `;
}
