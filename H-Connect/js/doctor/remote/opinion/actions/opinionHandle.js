'use strict';

const { selectOpinionConsultList } = await import(
    importVersion(
        '/H-Connect/js/doctor/hworks/remoteHworks/actions/myRemoteAPI.js'
    )
);

const { opinionRender } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/opinion/renders/opinionRender.js'
    )
);

const { fakeOpinionConsultList } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/mok.js')
);

async function init() {
    const { opinionConsultList, result } = await selectOpinionConsultList();

    $('#total_count').text(opinionConsultList.length);

    if (result && opinionConsultList.length > 0) {
        opinionRender(opinionConsultList);
    } else {
        opinionRender(fakeOpinionConsultList);
    }
}

await init();
