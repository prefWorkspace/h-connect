const { selectMeasurementInfoDetail } = await import(
    importVersion('/H-Connect/js/nurse/monitoring/actions/monitoringAPI.js')
);
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
async function onClickEmptyBed(e) {
    // 병상 클릭시
    const _selectEmptyBedEl = $(e.currentTarget);
    const _selectEmptyBedMeasurementCode =
        _selectEmptyBedEl.attr('data-sickbedcode');
    newSickBedPopupViewControll('block');
}
function onClickNewSickBedCancleBtn() {
    // 취소 클릭시
    newSickBedPopupViewControll('none');
}

addMonitoringEmptyBedClickEvent();

// $('.pop.new_regi_pop .overlay').css('display', 'block');
