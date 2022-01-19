/*
    s: 
*/
function MonitorBlock_Have(index){
    /**
    * < patient_monitor >
    * active(빨간색) : 환자 이상
    * active yellow(노란색) : 장치 이상
    * active blue(파란색) : 시스템 이상
    */
    return `
    <div class="patient_monitor">
        <div class="patient_info">
            <p>
                <span>Patient ID</span>.
                <span>Patient type</span>
            </p>
        </div>
        <div class="vital_moniter">
            <div class="ews">
                <h3>EWS</h3>
                <p>3</p>
            </div>
            <div class="hr">
                <h3>HR</h3>
                <p>108</p>
            </div>

            <div class="sp">
                <h3>SP02</h3>
                <p>98</p>
            </div>

            <div class="resp">
                <h3>RESP</h3>
                <p>27</p>
            </div>

            <div class="temp">
                <h3>TEMP</h3>
                <p>36.5</p>
            </div>
        </div>
    </div>
    `;
}
function MonitorBlock_None(index){
    return `
    <div class="patient_monitor">
        <div class="empty_bed" style="display: none;">
            <p>empty_bed</p>

            <div class="btn_default">
                <img src="/H-Connect/img/icon/btn_add.png" alt="플러스 이미지">
            </div>

            <div class="btn_hover">
                <img src="/H-Connect/img/icon/btn_add_hover.png" alt="플러스 이미지">
            </div>
        </div>
    </div>
    `
}