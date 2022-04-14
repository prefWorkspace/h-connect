'use strict';

export async function eventPatientInfo(_bse) {
    if (!_bse) return;

    const { name, age, gender, patientCode } = _bse;
    return `
        <div>
            <h2>${name} (${age}. ${gender & 1 ? '남' : '여'})</h2>
            <p>${patientCode}</p>
        </div>
    `;
}

export async function monitoringButton() {
    return `
    <button type="button" class="btn_monitor">
                
        <div class="img_container">
            <img
                src="/H-Connect/img/header/monitoring.svg"
                alt="모니터 아이콘"
            />
        </div>
        모니터링
    </button>
    `;
}

export async function titleDate(_ymd, _hms) {
    return `
        <div>
            <h2>${_ymd}</h2>
            &nbsp;
            <h2>${_hms}</h2>
        </div>
    `;
}

export async function eventBasicInfo(_evtName, _evtDetail) {
    return `
    <div>
        <h2>${_evtName}</h2>
        &nbsp;
        <h2>${_evtDetail}</h2>
    </div>
    `;
}

export async function screenRightBtnList(_type) {
    return `
    <div class="right btn_list">
        <button
            type="button"
            class="btn rd btn_delete"
        >
            delete
        </button>
        <button
            type="button"
            class="btn bl btn_con" ${_type ? 'disabled' : ''}
        >
            confirm
        </button>
    </div>
    `;
}
