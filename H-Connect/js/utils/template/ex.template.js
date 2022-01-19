console.log('template load');
function template(index){
    return `
    <div class="patient_monitor">
        <!-- 환자가 있을경우 patient_info , vital_moniter 보이게 해주세요 -->
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

        <!-- 환자가 없을 경우 empty_bed를 보이게 해주세요 -->
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
    `;
}


function renderTemplate(){
    const date1 = new Date().getTime();
    const $patientWrapEl = $('.all_patient');
    let html = '';
    for(let i = 0; i < 10; i++){
        html += template();
    }
    $patientWrapEl.html(html);
    const date2 = new Date().getTime();
    console.log(date2, date1, date2 - date1);
}

renderTemplate();