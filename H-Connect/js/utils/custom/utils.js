"use strict";

let CUSTOM = {
    DEVICE: {
        TYPE: {
            CODE: {
                ECG: 1,
                TEMPERATURE: 2,
                SPO2: 3,
                HEARTRATE: 4,
                TAG: 8,
                DEVICE_STATUS: 9
            },
            PREFIX_ADDRESS: {
                ECG: "08:D5:C0:5",
                TEMPERATURE: "08:D5:C0:6",
                SPO2: "00:1C:05:FF:3A:CC",
                TAG: "08:D5:C0:1"
            }
        }
    }
}

function decimalToHexadecimal(value, notation = 16) {
    let number = (`000${value.toString(notation)}`).slice(-5);
    return `${number.slice(0,1).toUpperCase()}:${number.slice(1,3).toUpperCase()}:${number.slice(-2).toUpperCase()}`;
}

function getMacaddress(type = CUSTOM.DEVICE.TYPE.CODE.ECG, value) {
    if(type == CUSTOM.DEVICE.TYPE.CODE.ECG) {
        return `${CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.ECG}${decimalToHexadecimal(value)}`;
    }
    else if(type == CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE) {
        return `${CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.TEMPERATURE}${decimalToHexadecimal(value)}`;
    }
    else if(type == CUSTOM.DEVICE.TYPE.CODE.TAG) {
        return `${CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.TAG}${decimalToHexadecimal(value)}`;
    }
    return CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.SPO2
}

