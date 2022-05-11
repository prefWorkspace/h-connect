'use strict';

const { dateFormat } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/common.js')
);

const { selectBioSignalEvent } = await import(
    importVersion(
        '/H-Connect/js/doctor/monitoring/actions/selectBioSignalEventActions.js'
    )
);

const {
    eventPatientInfo,
    titleDate,
    eventBasicInfo,
    screenRightBtnList,
    newScreenBody,
    preScreenBody,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/monitoring/templates/templateEventScreen.js'
    )
);

export async function renderNewEventScreen(_bse) {
    $('.event .title_preSection').html('');
    $('.pre_rhythm .event_inner').html('');
    renderNewEventScreenTitleHead(_bse);
    renderNewEventScreenBodyTitle(_bse);
}

export async function renderPreEventScreen(_bse) {
    $('.event .title_newSection').html('');
    $('.new_rhythm .event_inner').html('');
    renderPreEventScreenTitleHead(_bse);
    renderPreEventScreenBodyTitle(_bse);
}

export async function renderNewEventScreenTitleHead(_bse) {
    const $sectionRhythm = $('.section.rhythm.new_rhythm');
    $sectionRhythm.find('.title.title_head > div:nth-of-type(1)').html(`
        ${await eventPatientInfo(_bse)}
    `);

    $sectionRhythm
        .find('.title.title_head .btn_monitor')
        .on('click', function () {
            location.href = '/doctor/patient.html';
        });
}

export async function renderPreEventScreenTitleHead(_bse) {
    const $sectionRhythm = $('.section.rhythm.pre_rhythm');
    $sectionRhythm.find('.title.title_head > div:nth-of-type(1)').html(`
        ${await eventPatientInfo(_bse)}
    `);

    $sectionRhythm
        .find('.title.title_head .btn_monitor')
        .on('click', function () {
            location.href = '/doctor/patient.html';
        });
}

export async function renderNewEventScreenBodyTitle(_bse) {
    const { ymd, hms } = dateFormat(new Date(_bse?.eventDateTime));
    const $titleNewSection = $('.event .title_newSection');
    const _bseDetail = await selectBioSignalEvent(_bse ? _bse : null);
    $titleNewSection.html(`
    <div class="left time">
        ${await titleDate(ymd, hms)}
        ${await eventBasicInfo('New Event Name : ', _bse?.eventDetail)}
    </div>
    ${await screenRightBtnList(false)}
    `);
    $('.new_rhythm .event_inner').html(`${await newScreenBody(_bseDetail)}`);
}

export async function renderPreEventScreenBodyTitle(_bse) {
    const { ymd, hms } = dateFormat(new Date(_bse?.eventDateTime));
    const $titleNewSection = $('.event .title_preSection');
    const _bseDetail = await selectBioSignalEvent(_bse ? _bse : null);
    console.log(_bseDetail);
    $titleNewSection.html(`
    <div class="left time">
        ${await titleDate(ymd, hms)}
        ${await eventBasicInfo('Previous Event Name : ', _bse?.eventDetail)}
    </div>
    ${await screenRightBtnList(true)}
    `);
    $('.pre_rhythm .event_inner').html(`${await preScreenBody(_bseDetail)}`);
}
