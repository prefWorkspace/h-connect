'use strict';

const { dateFormat } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/common.js')
);

const {
    eventPatientInfo,
    monitoringButton,
    titleDate,
    eventBasicInfo,
    screenRightBtnList,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/monitoring/templates/templateEventScreen.js'
    )
);

export async function renderNewEventScreen(_bse) {
    $('.event .title_preSection').html('');
    renderNewEventScreenTitleHead(_bse);
    renderNewEventScreenBodyTitle(_bse);
}

export async function renderPreEventScreen(_bse) {
    $('.event .title_newSection').html('');
    renderPreEventScreenTitleHead(_bse);
    renderPreEventScreenBodyTitle(_bse);
}

export async function renderNewEventScreenTitleHead(_bse) {
    if (!_bse) return;

    const $sectionRhythm = $('.section.rhythm.new_rhythm');
    $sectionRhythm.find('.title.title_head').html(`
        ${await eventPatientInfo(_bse)}
        ${await monitoringButton()}
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
        ${await eventPatientInfo(_bse)}
        ${await monitoringButton()}
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
        ${await titleDate(ymd, hms)}
        ${await eventBasicInfo('New Example Name', _bse.eventDetail)}
    </div>
    ${await screenRightBtnList(false)}
    `);
}

export async function renderPreEventScreenBodyTitle(_bse) {
    const { ymd, hms } = dateFormat(new Date(_bse.eventDateTime));
    const $titleNewSection = $('.event .title_preSection');
    $titleNewSection.html(`
    <div class="left time">
        ${await titleDate(ymd, hms)}
        ${await eventBasicInfo('Previous Example Name', _bse.eventDetail)}
    </div>
    ${await screenRightBtnList(true)}
    `);
}
