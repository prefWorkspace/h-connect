/*
    s : 모니터링 블록
*/
function MonitorBlock_Have(data){
    const {patientCode, name, bioSignalECGLastData, bioSignalSpO2LastData, bioSignalTempLastData} = data || {};
    /**
     * EWS : emergency warning system => 비상 경고 시스템
     * HR : heartRate => 심박수
     * RESP : respiration => 호흡?
     * SP02 : S(포화도), P(경피), O2(산소) => 산소포화도 
     * TEMP : Temperature => 온도
     */
    const {ews, heartRate, resp} = bioSignalECGLastData || {};
    
    const {spO2} = bioSignalSpO2LastData || {};
    const {temperature} = bioSignalTempLastData || {};
    /**
    * < patient_monitor에 해당 클래스 추가되었을 시 >
    * active(빨간색) : 환자 이상
    * active yellow(노란색) : 장치 이상
    * active blue(파란색) : 시스템 이상
    */
    return `
    <div class="patient_monitor">
        <div class="patient_info">
            <p>
                <span>${patientCode}</span>.
                <span>${name}</span>
            </p>
        </div>
        <div class="vital_moniter">
            <div class="ews">
                <h3>EWS</h3>
                <p>${ews ? ews : "-"}</p>
            </div>
            <div class="hr">
                <h3>HR</h3>
                <p>${heartRate ? heartRate : "-"}</p>
            </div>

            <div class="sp">
                <h3>SP02</h3>
                <p>${spO2 ? spO2 : "-"}</p>
            </div>

            <div class="resp">
                <h3>RESP</h3>
                <p>${resp ? resp : "-"}</p>
            </div>

            <div class="temp">
                <h3>TEMP</h3>
                <p>${temperature ? temperature : "-"}</p>
            </div>
        </div>
    </div>
    `;
}
function MonitorBlock_None(index){
    return `
    <div class="patient_monitor">
        <div class="empty_bed">
            <p>empty_bed</p>

            <div class="btn_default">
                <img src="/H-Connect/img/icon/btn_add.png" alt="플러스 이미지">
            </div>

            <div class="btn_hover">
                <img src="/H-Connect/img/icon/btn_add_hover.png" alt="플러스 이미지">
            </div>
        </div>
    </div>
    `;
}
function first_insert_monitoring(patient_list){
    let html = '';
    const sickBedLen = 50;
    const patientLen = patient_list ? patient_list.length : 0;
    for(let i = 0; i < sickBedLen; i++){
        if(i < patientLen){
            html+=MonitorBlock_Have(patient_list[i]);
        }else{
            html+=MonitorBlock_None();
        }
    }
    $all_patientEl.html(html);
}
/*
    e : 모니터링 블록
*/