const { request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

export const arteriotonyListItemTmpl = (_data) => {
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
