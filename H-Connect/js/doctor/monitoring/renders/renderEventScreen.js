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

const { CustomD3 } = await import(
    importVersion('/H-Connect/js/lib/d3/custom/customD3.js')
);

const { errorText, loadingText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
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
    $('.new_rhythm .event_inner').html(loadingText());
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

    /* s: ecg 라인 그리기 */
    if (_bseDetail.ecgJson && _bseDetail.ecgJson.length) {
        // 384 데이터 한 화면 기준으로 가로폭 불러오기
        const initialWidth = 1100 * Math.floor(_bseDetail.ecgJson.length / 384);
        // d3 커스텀 모듈 생성
        const ecgEventLine = new CustomD3();
        ecgEventLine.init({
            wrap: `#event-ecg-chart-${_bseDetail.bioSignalEventId} > div`,
            id: _bseDetail.bioSignalEventId,
            width: initialWidth,
            height: 24,
            settings: {
                strokeColor: '#000000',
            },
        });
        // 라인 그리기
        ecgEventLine.simpleLineDraw({
            dataList: _bseDetail.ecgJson,
        });
    } else {
        // 데이터 없을때 처리
        $(`#event-ecg-chart-${_bseDetail.bioSignalEventId}`).html(errorText());
    }
    /* e: ecg 라인 그리기 */
}

export async function renderPreEventScreenBodyTitle(_bse) {
    $('.pre_rhythm .event_inner').html(loadingText());
    const { ymd, hms } = dateFormat(new Date(_bse?.eventDateTime));
    const $titleNewSection = $('.event .title_preSection');
    const _bseDetail = await selectBioSignalEvent(_bse ? _bse : null);
    $titleNewSection.html(`
    <div class="left time">
        ${await titleDate(ymd, hms)}
        ${await eventBasicInfo('Previous Event Name : ', _bse?.eventDetail)}
    </div>
    ${await screenRightBtnList(true)}
    `);
    $('.pre_rhythm .event_inner').html(`${await preScreenBody(_bseDetail)}`);

    /* s: ecg 라인 그리기 */

    if (_bseDetail.ecgJson && _bseDetail.ecgJson.length) {
        $('.img_container.right').each((index) => {
            // 384 데이터 한 화면 기준으로 가로폭 불러오기
            const initialWidth =
                1100 * Math.floor(_bseDetail.ecgJson.length / 384);
            // d3 커스텀 모듈 생성
            const ecgEventLine = new CustomD3();
            ecgEventLine.init({
                wrap: `#event-ecg-chart-${index === 0 ? 'one' : 'two'}-${
                    _bseDetail.bioSignalEventId
                }`,
                id: _bseDetail.bioSignalEventId,
                width: initialWidth,
                height: 24,
                settings: {
                    strokeColor: '#000000',
                },
            });
            // 라인 그리기
            ecgEventLine.simpleLineDraw({
                dataList: _bseDetail.ecgJson,
            });
        });
    } else {
        $('.img_container.right').each((index) => {
            $(
                `#event-ecg-chart-${index === 0 ? 'one' : 'two'}-${
                    _bseDetail.bioSignalEventId
                }`
            ).html(errorText());
        });
        // 데이터 없을때 처리
    }
    /* e: ecg 라인 그리기 */
}
