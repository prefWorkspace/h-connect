const { CustomD3 } = await import(
    importVersion('/H-Connect/js/lib/d3/custom/customD3.js')
);
export const eventSimpleDataListTmpl = async (_data) => {
    const { bioSignalEventId, eventDateTime, eventDetail } = _data || {};
    return `
    <div class="table_wrap" data-eventid="${bioSignalEventId}">
      <div>
          <div class="date_time">
              <p>
                  ${eventDateTime}
              </p>
          </div>

          <div class="alarm_des">
              <p>${eventDetail || '-'}</p>
          </div>
      </div>

      <div class="event-detail-btn">
          <p class="more">
              자세히
          </p>
          <p class="close">
              닫기
          </p>
          <span></span>
      </div>
    </div>
    <div class="table_content">
    </div>
  `;
};

export const eventSimpleDataDetailTmpl = (_data, _getEventId) => {
    const {
        maxValue,
        minValue,
        value,
        ecgJson,
        ecgJsonInclude,
        confirm,
        measurementCode,
    } = _data || {};

    const disabledCheck = confirm !== 0 ? 'disabled' : ''; // confirm 활성화 여부

    return `
      <div class="cont_inner">
          <div class="ecg">
              <div class="ecg_graph">
                  <p>ECG</p>

                  <div>
                    <div class="chart-wrap" id="event-ecg-chart-${_getEventId}"></div>
                  </div>
              </div>

              <div class="bell">
                  <div class="bell_name">
                      <p>
                          HR. bpm
                      </p>
                  </div>

                  <div class="bell_num">
                      <div>
                          <p>
                              ${maxValue}
                          </p>
                          <p>
                              ${minValue}
                          </p>
                      </div>

                      <p>${value}</p>
                  </div>
              </div>
          </div>

          <div class="btn_list">
              <button type="button" class="btn_confirm ${disabledCheck}" ${disabledCheck}>
                  confirm
              </button>
              <button type="button" class="btn_delete">
                  delete
              </button>
          </div>
      </div>
  `;
};
