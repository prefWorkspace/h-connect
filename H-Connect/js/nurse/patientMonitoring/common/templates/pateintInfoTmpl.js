import { history } from '../../../../utils/controller/historyController.js';
window._history = history;
const historyMeasurementCode = history.getParams('measurement_code');
export const parsePatientInfo = (_data) => {
    const { name, age, gender, patientCode, sickBed, sickRoom } = _data || {};
    return `
   <div class="btn_list">
       <button type="button" class="btn_alarm" disabled="">
           경보해제
       </button>

       <!-- 경보해제시 빨간 버튼 -->
       <button type="button" class="btn_alarm_red">
           경보해제
       </button>

       <!-- 경보해제 버튼 누르면 나오는 버튼 -->
       <div class="emergency_list">
           <button type="button" class="response">
               대응중
           </button>

           <button type="button" class="circum">
               상황해제<br>
               <span>환자 대응을 마치고 상황을 종료합니다.</span>
           </button>
       </div>
   </div>
   

   <div class="container">
       <div class="title" style="opacity: 1;">
           <div>
               <h2>
                   <span class="name">${name}</span>
                   (<span class="age">${age}</span>.
                   <span class="gender">${gender}</span>)
               </h2>
           </div>
           
           <p>
               <span class="p_id">${patientCode}</span> - 
               <span class="p_type">${name}</span>
           </p>

           <p>
               <span class="ward"></span>병동.
               <span class="sickRoom">${sickRoom}</span>호.
               <span class="sickBed">${sickBed}</span>병상
           </p>
       </div>

       <div class="container">
           <div class="management_list">
               <div class="list ${
                   history.getLink().pathname === '/nurse/patient.html'
                       ? 'on'
                       : 'off'
               } link_to_patient" onclick="window._history.linkTo('/nurse/patient.html?measurement_code=${historyMeasurementCode}')">
                   <p>모니터링</p>
               </div>

               <div class="list ${
                   history.getLink().pathname === '/nurse/arteriotony.html'
                       ? 'on'
                       : 'off'
               } link_to_arteriotony" onclick="window._history.linkTo('/nurse/arteriotony.html?measurement_code=${historyMeasurementCode}')">
                   <p>혈압 수동입력</p>
               </div>

               <div class="list off doctor_send">
                   <p>담당의에게 메세지 보내기</p>

                   <div>
                       <img src="/H-Connect/img/icon/share.png" alt="공유 아이콘">
                   </div>
               </div>
           </div>
       </div>
   </div>`;
};
