'use strict';

const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { renderNewEventScreen, renderPreEventScreen } = await import(
    importVersion(
        '/H-Connect/js/doctor/monitoring/renders/renderEventScreen.js'
    )
);

export async function updateBioSignalEvent(_bse, confirm) {
    const { bioSignalEventId, measurementCode } = _bse;
    const req = JSON.stringify({
        ...commonRequest(),
        measurementCode,
        bioSignalEventId,
        confirm,
    });

    await serverController.ajaxAwaitController(
        'API/BioSignal/UpdateBioSignalEvent',
        'POST',
        req,
        (res) => {
            if (res.result) {
            }
        },
        (err) => {
            alert(`서버 통신에 실패하였습니다 (Error: ${err})`)
        }
    );
}

export async function deleteBioSignalEvent(_bse) {
    const { bioSignalEventId, measurementCode } = _bse;
    const req = JSON.stringify({
        ...commonRequest(),
        measurementCode,
        bioSignalEventId,
    });
    await serverController.ajaxAwaitController(
        'API/BioSignal/DeleteBioSignalEvent',
        'POST',
        req,
        (res) => {
            if (res.result) {
            }
        },
        (err) => {
            alert(`서버 통신에 실패하였습니다 (Error: ${err})`)
        }
    );
}

export async function insertNewEventScreen(_bse) {
    await renderNewEventScreen(_bse);
}

export async function insertPreEventScreen(_bse) {
    await renderPreEventScreen(_bse);
}
