'use strict';
import { CONSTANT_MEASURE } from './constant.js';
import { sickRoomSelectBox } from '../templates/sickRoomSelectBox.js';

export function sickRoomSelectBoxList() {
    const sickRoomList = [...CONSTANT_MEASURE.sickRoomList];
    console.log('sickRoomList===');
    console.log(CONSTANT_MEASURE.sickRoomList);
}
