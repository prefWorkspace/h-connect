const { SelectGlobalSetting } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/common/actions/patientMonitoringAPI.js'
    )
);
const trendSecondRadioItem = ({ _item, _index, bioSignalsTrendSecond }) => {
    const { title, value } = _item || {};
    const isCheck = value === bioSignalsTrendSecond;
    return `
  <div class="input_wrap">
    <input
        type="radio"
        name="interval"
        id="interval_time_${_index}"
        class="radio_custom"
        data-globalsecond="${value}"
        ${isCheck ? 'checked' : ''}
    />
    <label for="interval_time_${_index}"></label>
    <label for="interval_time_${_index}"
        >${title}</label
    >
  </div>
  `;
};

export const globalSettingPopupTmpl = async () => {
    const { globalVariableSetting } = await SelectGlobalSetting();
    const { bioSignalsTrendSecond } = globalVariableSetting || {};
    const settingSeconds = [
        { title: '15s', value: 15 },
        { title: '1m', value: 1 * 60 },
        { title: '3m', value: 3 * 60 },
        { title: '10m', value: 10 * 60 },
        { title: '15m', value: 15 * 60 },
        { title: '30m', value: 30 * 60 },
        { title: '60m', value: 60 * 60 },
        { title: '90m', value: 90 * 60 },
        { title: '120m', value: 120 * 60 },
    ];
    return `
      <div class="pop setting_menu interval_set">
        <div class="overlay">
            <div class="pop_cont">
                <div class="title">
                    <h2>Interval Setting menu</h2>
                </div>

                <div class="content">
                    <div>
                        <p>Interval Setting</p>

                        <div class="container">
                            <div>
                                ${settingSeconds.htmlFor((_item, _index) => {
                                    if (_index <= 3) {
                                        return trendSecondRadioItem({
                                            _item,
                                            _index,
                                            bioSignalsTrendSecond,
                                        });
                                    } else {
                                        return '';
                                    }
                                })}
                            </div>

                            <div>
                              ${settingSeconds.htmlFor((_item, _index) => {
                                  if (_index > 3) {
                                      return trendSecondRadioItem({
                                          _item,
                                          _index,
                                          bioSignalsTrendSecond,
                                      });
                                  } else {
                                      return '';
                                  }
                              })}
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
};
