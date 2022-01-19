/* s : 대시보드 모니터링 대상 블록  */

function WardBlock(index){
    /**
    * < ward_container >
    * 
    */
    return `
    <div class="ward_container">
        <div class="ward_count">
            <div class="input_wrap">
                <input type="checkbox" class="green_custom" id="ward_1301" onclick="selectAll(this)">
                <label for="ward_1301"></label>
                <label for="ward_1301">1301호실</label>
            </div>
        </div>

        <div class="patient_info">
            <div class="input_wrap">
                <input type="checkbox" name="patient_no" class="green_custom" id="patient_1" onclick="checkSelectAll(this)">
                <label for="patient_1"></label>
                <label for="patient_1"><span>김환자(63.남.patient no)</span></label>
            </div>

            <div class="input_wrap">
                <input type="checkbox" name="patient_no" class="green_custom" id="patient_2" onclick="checkSelectAll(this)">
                <label for="patient_2"></label>
                <label for="patient_2"><span>김환자(63.남.patient no)</span></label>
            </div>

            <div class="input_wrap">
                <input type="checkbox" name="patient_no" class="green_custom" id="patient_3" onclick="checkSelectAll(this)">
                <label for="patient_3"></label>
                <label for="patient_3"><span>김환자(63.남.patient no)</span></label>
            </div>

            <div class="input_wrap">
                <input type="checkbox" name="patient_no" class="green_custom" id="patient_4" onclick="checkSelectAll(this)">
                <label for="patient_4"></label>
                <label for="patient_4"><span>김환자(63.남.patient no)</span></label>
            </div>
        </div>
    </div>
    `;
}

/* e : 대시보드 모니터링 대상 블록  */