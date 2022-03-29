const { request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
// import { onClickDeleteBloodPressureBtn } from '../actions/bloodPressureActions';
// export const parsePrerecordTmpl = ({
//     records,
//     currentPage,
//     totalCount,
//     onModify,
// }) => {
//     if (!records) {
//         throw new Error('records is required');
//     }
//     const recordList = records
//         .map((record) => parseRecord({ record, onModify }))
//         .join('');
//     const pagenation = parsePagenation({ currentPage, totalCount });
//     return `
//     <div class="record_table">
//     <div class="table_title">
//         <p>날짜</p>
//         <p>수축기혈압</p>
//         <p>이완기혈압</p>
//         <p>맥박</p>
//     </div>

//     <div class="table_body">
//        ${recordList}
//     </div>
//       ${pagenation}
//     </div>`;
// };

export const parseRecord = (_data) => {
    const { recordDateTime, systolic, diastolic, pulse, indexId } = _data || {};
    return `
    <div class="bloodPressure_item" data-indexId=${indexId} data-recordDateTime='${request_Date_Data(
        recordDateTime
    )}'>
      <div class="text_box">
          <p>
              <span>${recordDateTime.getFullYear()}</span>.
              <span>${(recordDateTime.getMonth() + 1)
                  .toString()
                  .padStart(2, '0')}</span>.
              <span>${recordDateTime
                  .getDate()
                  .toString()
                  .padStart(2, '0')}</span>
          </p>
          <p>
              <span>${recordDateTime
                  .getHours()
                  .toString()
                  .padStart(2, '0')}</span>:
              <span>${recordDateTime
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')}</span>:
              <span>${recordDateTime
                  .getSeconds()
                  .toString()
                  .padStart(2, '0')}</span>
          </p>
    
          <p>
              SYS : 
              <span class="SYS-item">${systolic}</span>
          </p>
    
          <p>
              DIA : 
              <span class="DIA-item">${diastolic}</span>
          </p>
    
          <p>
              Pulse : 
              <span class="Pulse-item">${pulse}</span>
          </p>
      </div>
    
      <div class="btn_list">
          <button data-indexId=${indexId} type="button" class="btn bl btn_modify"
          onclick=window.onClickUpdateBloodPressureBtn(this)>수정</button>
          <button data-indexId=${indexId} type="button" class="btn rd btn_delete" onclick=window.onClickDeleteBloodPressureBtn(this)>삭제</button>
      </div>
    </div>
    `;
};

export const parsePaginationBlock = ({ page, records, totalCount }) => {
    // console.log(page, records, totalCount);
    const totalPageCount = Math.ceil(totalCount / 10);
    const totalTurnCount = Math.ceil(totalPageCount / 10);
    // console.log(totalPageCount, totalTurnCount);

    const returnPageList = () => {
        const min = page < 6 ? 1 : page - 5;
        const max = page < 6 ? 10 : page > totalPageCount - 4 ? 1 : page + 4;
        // console.log(min, max);
        let pageArr = [];
        for (let i = min; i <= max; i++) {
            pageArr.push(i);
        }
        return pageArr;
    };
    // console.log(returnPageList());
    return `
    <ul>
        <li><a href=""><<</a></li>
        <li><a href=""><</a></li>

        ${returnPageList().htmlFor((item, index) => {
            return parsePageNumber({ number: item, isActive: item === page });
        })}
        <li>${totalPageCount > 10 ? ' ... ' + totalPageCount : ''}</li>

        <li><a href="">></a></li>
        <li><a href="">>></a></li>
    </ul>
    `;
};
const parsePageNumber = ({ number, isActive }) => {
    return `
    <li class="${isActive ? 'active' : ''}">
        <a href="#" onclick='event.preventDefault(); window.onClickPaginationNumBtn(${number});'>${number}</a>
    </li>
    `;
};

// const parsePagenation = ({ currentPage, totalCount }) => {
//     const pageCount = Math.ceil(totalCount / 10);
//     const pageNumberList = [];
//     for (let i = 1; i <= pageCount; i++) {
//         pageNumberList.push(
//             parsePageNumber({ number: i, isActive: i === currentPage })
//         );
//     }
//     return `
//     <div class="table_page">
//         <ul>
//             <li><a href=""><<</a></li>
//             <li><a href=""><</a></li>
//             ${pageNumberList.join('')}
//             <li><a href="">></a></li>
//             <li><a href="">>></a></li>
//         </ul>
//     </div>
//     `;
// };

// const parsePageNumber = ({ number, isActive }) => {
//     return `<li class="${isActive ? 'isActive' : ''}">
//         <a href="">${number}</a>
//     </li>`;
// };
