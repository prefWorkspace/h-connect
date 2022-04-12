'use strict';

const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { renderEventScreen, renderNewEventScreenBodyTitle } = await import(
    importVersion(
        '/H-Connect/js/doctor/monitoring/renders/renderEventScreen.js'
    )
);
let { selectedEventId } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/common.js')
);

export async function insertNewEventScreen(_bse) {
    if (!_bse) return;
    renderEventScreen(_bse);
    renderNewEventScreenBodyTitle(_bse);
}
