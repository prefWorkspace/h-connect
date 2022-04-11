'use strict';

const {
    renderNewEventList,
    addEventToNewEventList,
    renderAndAddEventNewEventList,
} = await import(
    importVersion('/H-Connect/js/doctor/monitoring/renders/renderNewEvents.js')
);

const {
    renderPreEventList,
    addEventToPreEventList,
    renderAndAddEventPreEventList,
} = await import(
    importVersion('/H-Connect/js/doctor/monitoring/renders/renderPreEvents.js')
);

let selectedId = null;

function renderMonitoring() {
    renderAndAddEventNewEventList({ selectedId });
    renderAndAddEventPreEventList({ selectedId });
}

renderMonitoring();