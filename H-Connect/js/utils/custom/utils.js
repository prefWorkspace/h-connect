'use strict';

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
                ECG: '08:D5:C0:5',
                TEMPERATURE: '08:D5:C0:6',
                SPO2: '00:1C:05:FF:3A:CC',
                TAG: '08:D5:C0:1'
            }
        }
    }
};

function decimalToHexadecimal(value, notation = 16) {
    let number = `000${value.toString(notation)}`.slice(-5);
    return `${number.slice(0, 1).toUpperCase()}:${number
        .slice(1, 3)
        .toUpperCase()}:${number.slice(-2).toUpperCase()}`;
}

function getMacaddress(type = CUSTOM.DEVICE.TYPE.CODE.ECG, value) {
    if (type == CUSTOM.DEVICE.TYPE.CODE.ECG) {
        return `${CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.ECG}${decimalToHexadecimal(
            value
        )}`;
    } else if (type == CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE) {
        return `${
            CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.TEMPERATURE
        }${decimalToHexadecimal(value)}`;
    } else if (type == CUSTOM.DEVICE.TYPE.CODE.TAG) {
        return `${CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.TAG}${decimalToHexadecimal(
            value
        )}`;
    }
    return CUSTOM.DEVICE.TYPE.PREFIX_ADDRESS.SPO2;
}

/**
 * Gets computed translate values
 * @param {HTMLElement} element
 * @returns {Object}
 */
function getTranslateValues(element) {
    const style = window.getComputedStyle(element);
    const matrix = style['transform'] || style.webkitTransform || style.mozTransform;

    // No transform property. Simply return 0 values.
    if (matrix === 'none' || typeof matrix === 'undefined') {
        return {
            x: 0,
            y: 0,
            z: 0
        };
    }

    // Can either be 2d or 3d transform
    const matrixType = matrix.includes('3d') ? '3d' : '2d';
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');

    // 2d matrices have 6 values
    // Last 2 values are X and Y.
    // 2d matrices does not have Z value.
    if (matrixType === '2d') {
        return {
            x: matrixValues[4],
            y: matrixValues[5],
            z: 0
        };
    }

    // 3d matrices have 16 values
    // The 13th, 14th, and 15th values are X, Y, and Z
    if (matrixType === '3d') {
        return {
            x: matrixValues[12],
            y: matrixValues[13],
            z: matrixValues[14]
        };
    }
}
