'use strict';

const { selectScheduleCount } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/actions/hWorksAPI.js')
);

async function init() {
    const {
        list: { sessionCount },
    } = await selectScheduleCount();

    if (sessionCount === 0) {
        $('.status .status_label').addClass('no');
        $('#remote_going').text('진행중인 원격협진이 없습니다.');
    } else {
        $('.status .status_label').removeClass('no');
        $('#remote_going').text('원격협진이 진행중입니다.');
    }
}

await init();
