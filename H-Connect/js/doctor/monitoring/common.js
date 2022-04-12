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
