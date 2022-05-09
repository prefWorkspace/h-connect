'use strict';

const { selectConsultAlarmsList, selectOpinionConsultList } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/remoteHworks/actions/myRemoteAPI.js'
    )
);

async function countInit() {
    const { result: consultResult, list: consultAlarmList } =
        await selectConsultAlarmsList();
    const { result: opinionResult, opinionConsultList } =
        await selectOpinionConsultList();

    if (consultResult) {
        $('#remote_count').text(consultAlarmList.length);
    }

    if (opinionResult) {
        $('#opinion_count').text(opinionConsultList.length);
    }
}

await countInit();
