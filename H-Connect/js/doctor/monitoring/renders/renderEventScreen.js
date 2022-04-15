'use strict';

const { dateFormat } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/common.js')
);

const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

const {
    eventPatientInfo,
    monitoringButton,
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

export async function selectBioSignalEvent(_bse) {
    const { bioSignalEventId, measurementCode } = _bse;
    const req = JSON.stringify({
        ...commonRequest(),
        bioSignalEventId,
        measurementCode,
    });

    let result = {};

    await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBioSignalEvent',
        'POST',
        req,
        (res) => {
            if (res.result) {
                result = res.bioSignalEvent;
            }
        },
        (err) => {
            alert(`서버 통신에 실패하였습니다 (Error: ${err})`);
        }
    );

    return result;
}

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

export async function renderNewEventScreenBodyTitle(_bse) {
    const { ymd, hms } = dateFormat(new Date(_bse?.eventDateTime));
    const $titleNewSection = $('.event .title_newSection');
    const _bseDetail = await selectBioSignalEvent(_bse);
    $titleNewSection.html(`
    <div class="left time">
        ${await titleDate(ymd, hms)}
        ${await eventBasicInfo('New Example Name', _bse?.eventDetail)}
    </div>
    ${await screenRightBtnList(false)}
    `);
    $('.new_rhythm .event_inner').html(`${await newScreenBody(_bseDetail)}`);
}

export async function renderPreEventScreenBodyTitle(_bse) {
    const { ymd, hms } = dateFormat(new Date(_bse?.eventDateTime));
    const $titleNewSection = $('.event .title_preSection');
    const _bseDetail = await selectBioSignalEvent(_bse);
    $titleNewSection.html(`
    <div class="left time">
        ${await titleDate(ymd, hms)}
        ${await eventBasicInfo('Previous Example Name', _bse?.eventDetail)}
    </div>
    ${await screenRightBtnList(true)}
    `);
    $('.pre_rhythm .event_inner').html(`${await preScreenBody(_bseDetail)}`);
}
