'use strict';
const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const { selectWardList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

//userData
const userData = JSON.parse(localStorageController.getLocalS('userData'));

export const CONSTANT = {
    wardList: '',
    sickRoomList: '',
    sicBedList: '',
    userData,
};
const { wardList } = await selectWardList();
