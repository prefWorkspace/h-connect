'use strict';
import { localStorageController } from '../../../../utils/controller/localStorageController.js';

const userData = JSON.parse(localStorageController.getLocalS('userData'));

export const CONSTANT_MEASURE = {
    wardList: '',
    sickRoomList: '',
    sicBedList: '',
    userData,
};
