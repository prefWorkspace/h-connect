'use strict';
const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

//userData
const userData = JSON.parse(localStorageController.getLocalS('userData'));

export const CONSTANT = {
    wardList: '',
    sickRoomList: '',
    sicBedList: '',
    userData,
};
