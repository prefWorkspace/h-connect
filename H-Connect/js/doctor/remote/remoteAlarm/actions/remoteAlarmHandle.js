'use strict';

const { selectConsultAlarmsList, selectOpinionConsultList } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/remoteHworks/actions/myRemoteAPI.js'
    )
);

const { remoteAlarmRender } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteAlarm/renders/remoteAlarmRender.js'
    )
);

async function init() {
    const { result, list: consultAlarmList } = await selectConsultAlarmsList();
    console.log('consultAlarmList==');
    console.log(consultAlarmList);
    if (result) {
        remoteAlarmRender(consultAlarmList);
        $('#alram_count').text(consultAlarmList.length);
    }
    // else {
    //     remoteAlarmRender(fakeConsultAlarmList);
    //     $('#alram_count').text(fakeConsultAlarmList.length);
    // }
}

await init();
