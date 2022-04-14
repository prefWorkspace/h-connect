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

// let { selectedEventId } = await import(
//     importVersion('/H-Connect/js/doctor/monitoring/common.js')
// );

export async function updateBioSignalEvent(_bse, confirm) {
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
                console.log('successfully delete');
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

export async function insertNewEventScreen(_bse) {
    await renderNewEventScreen(_bse);
}

export async function insertPreEventScreen(_bse) {
    await renderPreEventScreen(_bse);
}
