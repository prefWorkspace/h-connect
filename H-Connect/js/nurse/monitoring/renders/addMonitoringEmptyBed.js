const { selectMeasurementInfoDetail, selectHisPatientList } = await import(
    importVersion('/H-Connect/js/nurse/monitoring/actions/monitoringAPI.js')
);

const { selectWardList, selectSickRoomList, selectSickBedList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

const { selectBoxSickBed, selectBoxSickRoom, selectBoxWard } = await import(
    importVersion(
        '/H-Connect/js/nurse/monitoring/renders/addSickBedSelectBox.js'
    )
);

const { patientHISList } = await import(
    importVersion(
        '/H-Connect/js/nurse/monitoring/templates/selectBoxTemplate.js'
    )
);

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

async function patientRenderForNewSickBedPop() {
    const { result, patientInfo } = await selectHisPatientList();
    let html = '';

    if (result && patientInfo === null) {
        html += errorText();
        $('.pop.new_room_pop .select_name .name_option').html(html);
        return;
    }

    if (result && patientInfo.length === 0) {
        html += errorText();
        $('.pop.new_room_pop .select_name .name_option').html(html);
        return;
    }

    if (result) {
        for (let i = 0; i < patientInfo.length; i++) {
            html += patientHISList(patientInfo[i]);
        }

        $('.pop.new_room_pop .select_name .name_option').html(html);
    }
}

export function addMonitoringEmptyBedClickEvent() {
    // 신규 병상 등록 취소 클릭 이벤트
    $('.pop.new_room_pop .overlay')
        .find('.popup_cancle')
        .off()
        .on('click', onClickNewSickBedCancleBtn);

    // 신규 병상 등록 팝업 노출
    $('body').off().on('click', '.patient_monitor.empty_bed', onClickEmptyBed);
}

function newSickBedPopupViewControll(_visible) {
    // 팝업 컨트롤
    const $newSickBedPopup = $('.pop.new_room_pop .overlay');
    $newSickBedPopup.css('display', _visible);
}

function loopFInd(list, key, value) {
    let res;
    for (let i = 0; i < list.length; i++) {
        if (list[i][key] === value) {
            res = list[i];
        }
    }

    return res;
}

async function onClickEmptyBed(e) {
    // 병상 클릭시
    const _selectEmptyBedEl = $(e.currentTarget);
    const _selectEmptyBedCode = _selectEmptyBedEl.attr('data-sickbedcode');
    const _selectEmptyWardCode = _selectEmptyBedEl.attr('data-wardcode');
    const _selectEmptyRoomCode = _selectEmptyBedEl.attr('data-sickroomcode');
    const path = window.location.pathname;

    newSickBedPopupViewControll('block');

    if (path.indexOf('monitoring_room') !== -1) {
        const { wardList } = await selectWardList();
        const { sickRoomList } = await selectSickRoomList(_selectEmptyWardCode);
        const { sickBedList } = await selectSickBedList(
            _selectEmptyWardCode,
            _selectEmptyRoomCode
        );
        const { ward } = loopFInd(wardList, 'wardCode', _selectEmptyWardCode);
        const { sickRoom } = loopFInd(
            sickRoomList,
            'sickRoomCode',
            _selectEmptyRoomCode
        );
        const { sickBed } = loopFInd(
            sickBedList,
            'sickBedCode',
            _selectEmptyBedCode
        );

        await selectBoxWard();
        await selectBoxSickRoom(_selectEmptyWardCode);
        await selectBoxSickBed(_selectEmptyWardCode, _selectEmptyRoomCode);

        $('.pop.new_room_pop .new_room .selectBox2 .ward_label2').text(ward);
        $('.pop.new_room_pop .new_room .selectBox2 .ward_label2').attr(
            'data-wardcode',
            _selectEmptyWardCode
        );
        $('.pop.new_room_pop .new_room .selectBox2 .room_label2').text(
            sickRoom
        );
        $('.pop.new_room_pop .new_room .selectBox2 .room_label2').attr(
            'data-sickroomcode',
            _selectEmptyRoomCode
        );
        $('.pop.new_room_pop .new_room .selectBox2 .bed_label').text(
            sickBed + '병상'
        );
        $('.pop.new_room_pop .new_room .selectBox2 .bed_label').attr(
            'data-sickbedcode',
            _selectEmptyBedCode
        );
    }
}
function onClickNewSickBedCancleBtn() {
    // 취소 클릭시
    newSickBedPopupViewControll('none');
}

addMonitoringEmptyBedClickEvent();
await patientRenderForNewSickBedPop();
// $('.pop.new_regi_pop .overlay').css('display', 'block');
$('body').on(
    'click',
    '.pop.new_room_pop .select_name .name_option .name_list',
    function () {
        const patientName = $(this).find('span:nth-of-type(1)').text();
        const patientBirthYear = $(this).find('span:nth-of-type(2)').text();
        const patientGender = $(this).find('span:nth-of-type(3)').text();
        const patientCode = $(this).find('span:nth-of-type(4)').text();
        const wardName = $(this).data('wardname');
        const sickRoomName = $(this).data('roomname');
        const sickBedName = $(this).data('bedname');

        $('.pop.new_room_pop #patient_name').text(patientName);
        $('.pop.new_room_pop #patient_birthday').val(patientBirthYear);
        $('.pop.new_room_pop #patient_gender').val(patientGender);
        $('.pop.new_room_pop #patient_MRN').val(patientCode);
        $('.pop.new_room_pop #ward_code').text(wardName);
        $('.pop.new_room_pop #sickroom_code').text(sickRoomName);
        $('.pop.new_room_pop #sickbed_code').text(sickBedName);

        $(this).parent().parent().removeClass('active');
        $('.pop.new_room_pop #spare_Bed').text(1);
    }
);
