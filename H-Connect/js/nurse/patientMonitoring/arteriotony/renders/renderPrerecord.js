import { selectBloodPressurePage } from '../actions/bloodPressureAPI.js';

import { parseRecord } from '../templates/prerecordTmpl.js';
import { getPrerecordByPage } from '../actions/getPrerecordByPage.js';
// import { renderAriteriotonyInputForm } from './renderAriteriotonyInputForm.js';

export const renderPrerecordList = async () => {
    const { page, records, totalCount } = await selectBloodPressurePage(1);
    let _html = '';
    if (totalCount && records) {
        _html = records?.htmlFor((_item) => {
            return parseRecord(_item);
        });
    }
    $('.pre_record .table_body').html(_html);
};
renderPrerecordList();

const modifyHandler = (record) => {
    // renderAriteriotonyInputForm(record);
};
