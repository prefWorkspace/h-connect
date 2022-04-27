'use strict';

export async function eventPatientInfo(_bse) {
    if (!_bse) {
        return `
            <div>
                <h2>NULL (null. null)</h2>
                <p>null</p>
            </div>
        `;
    }

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

export async function newScreenBody(_bse) {
    return `
        <div class="event_graph">
            <div class="graph">
                <p>rhythm title</p>

                <div class="graph_wrap">
                    <div class="img_container left">
                        <img
                            src="/H-Connect/img/graph/blue.svg"
                            alt="파란색 아이콘"
                        />
                    </div>

                    <div class="graph_scroll">
                        <div
                            class="img_container right"
                        >
                            <img
                                src="/H-Connect/img/graph/black.svg"
                                alt="검은색 그래프"
                                id="cur_graph"
                                />
                        </div>
                    </div>
                </div>
            </div>

            <div class="size">
                <button
                    type="button"
                    class="plus"
                    id="cur_plus"
                data-max="${_bse.maxValue}"></button>

                <label id="cur_graphScale">100%</label>

                <button
                    type="button"
                    class="minus"
                    id="cur_minus"
                data-min="${_bse.minValue}"></button>
            </div>
        </div>

        <div class="info">
            <h2>${_bse.arrhythmiaType}</h2>

            <p>
                ${_bse.arrhythmiaDescription}
            </p>
        </div>
    `;
}

export async function preScreenBody(_bse) {
    return `
    <div class="event_graph">
        <div class="graph">
            <p>rhythm title</p>

            <div class="graph_wrap">
                <div class="img_container left">
                    <img
                        src="/H-Connect/img/graph/blue.svg"
                        alt="파란색 아이콘"
                    />
                </div>

                <div class="graph_scroll">
                    <div
                        class="img_container right"
                    >
                        <img
                            src="/H-Connect/img/graph/black.svg"
                            alt="검은색 그래프"
                            id="cur_graph"
                            />
                    </div>
                </div>
            </div>
        </div>

        <div class="size">
            <button
                type="button"
                class="plus"
                id="cur_plus"
            data-max="${_bse.maxValue}"></button>

            <label id="cur_graphScale">100%</label>

            <button
                type="button"
                class="minus"
                id="cur_minus"
            data-min="${_bse.minValue}"></button>
        </div>
    </div>

    <div class="event_graph">
            <div class="graph">
                <p>rhythm title</p>

                <div class="graph_wrap">
                    <div class="img_container left">
                        <img
                            src="/H-Connect/img/graph/blue.svg"
                            alt="파란색 아이콘"
                        />
                    </div>

                    <div class="graph_scroll">
                        <div
                            class="img_container right"
                        >
                            <img
                                src="/H-Connect/img/graph/black.svg"
                                alt="검은색 그래프"
                                id="pre_graph"
                                />
                        </div>
                    </div>
                </div>
            </div>

            <div class="size">
                <button
                    type="button"
                    class="plus"
                    id="pre_plus"
                data-max="${_bse.maxValue}"></button>

                <label id="pre_graphScale">100%</label>

                <button
                    type="button"
                    class="minus"
                    id="pre_minus"
                data-min="${_bse.minValue}"></button>
            </div>
        </div>
        
    <div class="info">
        <h2>${_bse.arrhythmiaType}</h2>

        <p>
            ${_bse.arrhythmiaDescription}
        </p>
    </div>
    `;
}
