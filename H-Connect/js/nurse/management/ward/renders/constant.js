'use strict';
import { localStorageController } from '../../../../utils/controller/localStorageController.js';

//userData
const userData = JSON.parse(localStorageController.getLocalS('userData'));

export const CONSTANT = {
    wardList: '',
    sickRoomList: '',
    sicBedList: '',
    userData,
};
