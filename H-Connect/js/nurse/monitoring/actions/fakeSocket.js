import { bioSignalData } from './fakeData.js';

export const socketGetPatientData = {
    get: function () {
        return bioSignalData();
    },
    update: function (callBack) {
        setInterval(() => {
            if (callBack) {
                const test = socketGetPatientData.get();
                callBack(test);
            }
        }, 1000);
    },
};
