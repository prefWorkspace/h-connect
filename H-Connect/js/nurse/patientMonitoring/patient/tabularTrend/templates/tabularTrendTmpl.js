export const tabularTrendListTmpl = (_data) => {
    const { dateTime, hr, temp, resp, spo2, error } = _data || {};
    return `
      <div class="table_content">
        <div class="date_time">
            <p>
                ${dateTime}
            </p>
        </div>

        <div class="hr">
            <p>${hr}</p>
        </div>

        <div class="temp">
            <p>
                <span>${temp}</span>
            </p>
        </div>

        <div class="ews">
            <p>${resp}</p>
        </div>
        <div class="spo">
            <p>${spo2}</p>
        </div>
        <div class="error">
            <p>${error || '-'}</p>
        </div>
      </div>
  `;
};
