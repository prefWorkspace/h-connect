// Device Type function
export function devType(deviceType) {
    switch (deviceType) {
        case 1:
            return 'ECG';
        case 2:
            return 'TEMP';
        case 3:
            return 'SPO2';
        default:
            return 'UNKNOWNTYPE';
    }
}

export let selectedEventId = null;

export let searchKeyword = null;

export function dateFormat(date) {
    let ymd = moment(date).format('YY.MM.DD');
    let hms = moment(date).format('HH:mm:ss');
    return {
        ymd,
        hms,
    };
}

export function eventTypeConstant(eventType) {
    switch (eventType) {
        case 0:
            return 'NONE';
        case 1:
            return '부정맥';
        case 2:
            return 'ST';
        case 3:
            return 'ECG';
        case 4:
            return 'SPO2';
        case 5:
            return 'RESP';
        case 6:
            return 'TEMP';
        case 10:
            return 'MANUAL';
        default:
            return 'UNKNOWN';
    }
}
