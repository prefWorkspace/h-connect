'use strict';

const { consultAlarmList } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/mok.js')
);

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const { selectConsultAlarmsList } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/remoteHworks/actions/myRemoteAPI.js'
    )
);

async function init() {
    const aaa = await selectConsultAlarmsList();
    const { result, list } = await selectConsultAlarmsList();
    console.log('aaa==');
    console.log(consultAlarmList);
    if (result && list.length > 0) {
    } else {
        // 더미 데이터
    }
}

await init();
