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

let { selectedEventId } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/common.js')
);

export async function updateBioSignalEvent(_bseId, confirm) {
    const req = JSON.stringify({
        ...commonRequest(),
        bioSignalEventId: _bseId,
        confirm,
    });

    await serverController.ajaxAwaitController(
        'API/BioSignal/UpdateBioSignalEvent',
        'POST',
        req,
        (res) => {
            if (res.result) {
                console.log('successfully update');
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

export async function deleteBioSignalEvent(_bseId) {
    const req = JSON.stringify({
        ...commonRequest(),
        bioSignalEventId: _bseId,
    });

    await serverController.ajaxAwaitController(
        'API/BioSignal/DeleteBioSignalEvent',
        'POST',
        req,
        (res) => {
            if (res.result) {
                console.log('successfully delete');
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

export async function insertNewEventScreen(_bse) {
    if (!_bse) return;
    await renderNewEventScreen(_bse);
}

export async function insertPreEventScreen(_bse) {
    if (!_bse) return;
    await renderPreEventScreen(_bse);
}
