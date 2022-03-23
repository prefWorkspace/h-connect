export const parsePrerecordTmpl = ({
    records,
    currentPage,
    totalCount,
    onModify,
}) => {
    if (!records) {
        throw new Error('records is required');
    }
    const recordList = records
        .map((record) => parseRecord({ record, onModify }))
        .join('');
    const pagenation = parsePagenation({ currentPage, totalCount });
    return `
    <div class="record_table">
    <div class="table_title">
        <p>날짜</p>
        <p>수축기혈압</p>
        <p>이완기혈압</p>
        <p>맥박</p>
    </div>
    
    <div class="table_body">
       ${recordList}
    </div>
      ${pagenation}
    </div>`;
};

const parseRecord = ({ record, onModify }) => {
    return `
    <div>
      <div class="text_box">
          <p>
              <span>${record.recordDateTime.getFullYear()}</span>.
              <span>${record.recordDateTime.getMonth() + 1}</span>.
              <span>${record.recordDateTime.getDate()}</span>
          </p>
          <p>
              <span>${record.recordDateTime.getHours()}</span>:
              <span>${record.recordDateTime.getMinutes()}</span>:
              <span>${record.recordDateTime.getSeconds()}</span>
          </p>
    
          <p>
              SYS : 
              <span>${record.systolic}</span>
          </p>
    
          <p>
              DIA : 
              <span>${record.diastolic}</span>
          </p>
    
          <p>
              Pulse : 
              <span>${record.pulse}</span>
          </p>
      </div>
    
      <div class="btn_list">
          <button type="button" class="btn bl btn_modify" onclick=${() => {
              onModify(record);
          }}>수정</button>
          <button type="button" class="btn rd btn_delete">삭제</button>
      </div>
    </div>
    `;
};

const parsePagenation = ({ currentPage, totalCount }) => {
    const pageCount = Math.ceil(totalCount / 10);
    const pageNumberList = [];
    for (let i = 1; i <= pageCount; i++) {
        pageNumberList.push(
            parsePageNumber({ number: i, isActive: i === currentPage })
        );
    }
    return `<div class="table_page">
    <ul>
        <li><a href=""><<</a></li>
        <li><a href=""><</a></li>
        ${pageNumberList.join('')}
        <li><a href="">></a></li>
        <li><a href="">>></a></li>
    </ul>
</div>`;
};

const parsePageNumber = ({ number, isActive }) => {
    return `<li class="${isActive ? 'isActive' : ''}">
        <a href="">${number}</a>
    </li>`;
};
