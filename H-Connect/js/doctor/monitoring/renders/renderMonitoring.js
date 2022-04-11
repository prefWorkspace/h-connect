'use strict';

const {
    renderNewEventList,
    addEventToNewEventList,
    renderAndAddEventNewEventList,
} = await import(
    importVersion('/H-Connect/js/doctor/monitoring/renders/renderNewEvents.js')
);

let selectedId = null;

function renderMonitoring() {
    renderAndAddEventNewEventList({ selectedId })
}

renderMonitoring();