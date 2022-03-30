'use strict';

export const sessionController = {
    setSession: (key, value) => {
        let setValue = '';

        if (typeof key !== 'string') return;

        if (typeof value === 'string' || typeof value === 'number') {
            setValue = value.toString();
        } else {
            setValue = JSON.stringify(value);
        }
        sessionStorage.setItem(key, setValue);
    },
    getSession: (key) => {
        if (typeof key !== 'string') return;

        let result;
        if (sessionStorage.getItem(key) !== null) {
            result = sessionStorage.getItem(key);
            return result;
        } else {
            return null;
        }
    },
    removeSession: (key) => {
        if (typeof key !== 'string') return;

        sessionStorage.removeItem(key);
    },
};
