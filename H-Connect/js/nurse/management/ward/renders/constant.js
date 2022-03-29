'use strict';
import { localStorageController } from '../../../../utils/controller/localStorageController.js?v=2022.01.17.11.33';

//userData
const userData = JSON.parse(localStorageController.getLocalS('userData'));

export const CONSTANT = {
    wardList: '',
    sickRoomList: '',
    sicBedList: '',
    userData,
};
