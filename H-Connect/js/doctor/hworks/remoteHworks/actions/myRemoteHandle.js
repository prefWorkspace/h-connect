'use strict';

const { fakeConsultAlarmList, fakeOpinionConsultList } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/mok.js')
);

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const { selectConsultAlarmsList, selectOpinionConsultList } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/remoteHworks/actions/myRemoteAPI.js'
    )
);

const { remoteAlarmRender } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/remoteHworks/renders/myRemoteRender.js'
    )
);

const { noCheckConsultReder } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/remoteHworks/renders/noCheckConsultRender.js'
    )
);

// 원격협진 알림 페이지 init 함수
async function init() {
    //협진 일정요청 알림 목록
    const { result: alarmResult, list } = await selectConsultAlarmsList();

    //확인하지 않은 소견 목록
    const { result: opinionResult, opinionConsultList } =
        await selectOpinionConsultList();

    //협진 일정요청 알림 목록 렌더링 호출
    if (alarmResult && list.length > 0) {
        $('#alarm_count').text(list.length);
        remoteAlarmRender(list);
    } else {
        // 더미 데이터
        $('#alarm_count').text(fakeConsultAlarmList.length);
        remoteAlarmRender(fakeConsultAlarmList);
    }

    //확인하지 않은 소견 목록 렌더링 호출
    if (opinionResult && opinionConsultList.length > 0) {
        $('#opinion_count').text(opinionConsultList.length);
        noCheckConsultReder(opinionConsultList);
    } else {
        // 더미 데이터
        $('#opinion_count').text(fakeOpinionConsultList.length);
        noCheckConsultReder(fakeOpinionConsultList);
    }
}

await init();
