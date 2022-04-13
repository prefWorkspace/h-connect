'use strict';

const { dateFormat } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/common.js')
);

const { eventBasicInfo } = await import(
    importVersion(
        '/H-Connect/js/doctor/monitoring/templates/templateEventScreen.js'
    )
);

export async function renderNewEventScreen(_bse) {
    renderNewEventScreenTitleHead(_bse);
    renderNewEventScreenBodyTitle(_bse);
}

export async function renderPreEventScreen(_bse) {
    renderPreEventScreenTitleHead(_bse);
    renderPreEventScreenBodyTitle(_bse);
}

export async function renderNewEventScreenTitleHead(_bse) {
    if (!_bse) return;

    const $sectionRhythm = $('.section.rhythm.new_rhythm');
    $sectionRhythm.find('.title.title_head').html(`
        ${await eventBasicInfo(_bse)}
        <button type="button" class="btn_monitor">
            
            <div class="img_container">
                <img
                    src="/H-Connect/img/header/monitoring.svg"
                    alt="모니터 아이콘"
                />
            </div>
            모니터링
        </button>
    `);

    $sectionRhythm
        .find('.title.title_head .btn_monitor')
        .on('click', function () {
            location.href = '/doctor/patient.html';
        });
}

export async function renderPreEventScreenTitleHead(_bse) {
    if (!_bse) return;

    const $sectionRhythm = $('.section.rhythm.pre_rhythm');
    
    $sectionRhythm.find('.title.title_head').html(`
        ${await eventBasicInfo(_bse)}
        <button type="button" class="btn_monitor">
            <div class="img_container">
                <img
                    src="/H-Connect/img/header/monitoring.svg"
                    alt="모니터 아이콘"
                />
            </div>
            모니터링
        </button>
    `);

    $sectionRhythm
        .find('.title.title_head .btn_monitor')
        .on('click', function () {
            location.href = '/doctor/patient.html';
        });
}

async function renderEventScreenBody(_bse) {}

export async function renderNewEventScreenBodyTitle(_bse) {
    const { ymd, hms } = dateFormat(new Date(_bse.eventDateTime));
    const $titleNewSection = $('.event .title_newSection');
    $titleNewSection.html(`
    <div class="left time">
        <div>
            <h2>${ymd}</h2>
            &nbsp;
            <h2>${hms}</h2>
        </div>

        <div>
            <h2>event name</h2>
            &nbsp;
            <h2>${_bse.eventDetail}</h2>
        </div>
    </div>

    <div class="right btn_list">
        <button
            type="button"
            class="btn rd btn_delete"
        >
            delete
        </button>
        <button
            type="button"
            class="btn bl btn_con"
        >
            confirm
        </button>
    </div>
    `);
}

export async function renderPreEventScreenBodyTitle(_bse) {
    const { ymd, hms } = dateFormat(new Date(_bse.eventDateTime));
    const $titleNewSection = $('.event .title_preSection');
    $titleNewSection.html(`
    <div class="left time">
        <div>
            <h2>${ymd}</h2>
            &nbsp;
            <h2>${hms}</h2>
        </div>

        <div>
            <h2>event name</h2>
            &nbsp;
            <h2>${_bse.eventDetail}</h2>
        </div>
    </div>

    <div class="right btn_list">
        <button
            type="button"
            class="btn rd btn_delete"
        >
            delete
        </button>
        <button
            type="button"
            class="btn bl btn_con" disabled
        >
            confirm
        </button>
    </div>
    `);
}
