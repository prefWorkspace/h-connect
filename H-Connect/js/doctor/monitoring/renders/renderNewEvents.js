'use strict';

const { eventListItem } = await import(
    importVersion('/H-Connect/js/doctor/monitoring/templates/templateEvent.js')
);

export async function renderNewEventList(_eventList) {
    let eventList = _eventList;
    const count = eventList ? eventList.length : 0;
    $('#noCheck_count').text(count);
}
