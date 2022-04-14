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

export const eventSimpleDataDetailTmpl = (_data) => {
    const { maxValue, minValue, value, ecgJson, ecgJsonInclude, confirm } =
        _data || {};
    console.log('_data: ', _data);
    return `
      <div class="cont_inner">
          <div class="ecg">
              <div class="ecg_graph">
                  <p>ECG</p>

                  <div>
                      <div class="img_container">
                          <img src="/H-Connect/img/graph/ECG.png"
                              alt="ecg그래프" />
                      </div>
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
              <button type="button" class="btn_confirm ${
                  confirm !== 0 ? 'disabled' : ''
              }">
                  confirm
              </button>
              <button type="button" class="btn_delete">
                  delete
              </button>
          </div>
      </div>
  `;
};
