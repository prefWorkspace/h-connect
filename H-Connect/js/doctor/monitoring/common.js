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
    let year = date.getFullYear() ? String(date.getFullYear()) : '99999';
    let month = date.getMonth() ? date.getMonth() + 1 : '99';
    let day = date.getDate() ? date.getDate() : '99';
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    let ymd = year.slice(2) + '.' + month + '.' + day;
    let hms = hour + ':' + minute + ':' + second;
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