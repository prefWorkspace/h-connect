import { parsePrerecordTmpl } from '../templates/prerecordTmpl.js';
import { getPrerecordByPage } from '../actions/getPrerecordByPage.js';
import { renderAriteriotonyInputForm } from './renderAriteriotonyInputForm.js';

const $PRERECORD_CONTAINER = document.querySelector('.pre_record');

export const renderPrerecordList = async (page = 1) => {
    const { totalCount, records } = await getPrerecordByPage(page);
    const el = parsePrerecordTmpl({
        records,
        totalCount,
        currentPage: page,
        onModify: modifyHandler,
    });
    $PRERECORD_CONTAINER.innerHTML = el;
};

const modifyHandler = (record) => {
    renderAriteriotonyInputForm(record);
};
