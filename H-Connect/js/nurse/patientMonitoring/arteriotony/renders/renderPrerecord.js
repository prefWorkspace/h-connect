import { selectBloodPressurePage } from '../actions/bloodPressureAPI.js';

import {
    parseRecord,
    parsePaginationBlock,
} from '../templates/prerecordTmpl.js';
import { getPrerecordByPage } from '../actions/getPrerecordByPage.js';

export const renderPrerecordList = async () => {
    const { page, records, totalCount } = await selectBloodPressurePage(1);
    renderPrerecordPagination({ page, records, totalCount });
    let _html = '';
    if (totalCount && records) {
        _html = records?.htmlFor((_item) => {
            return parseRecord(_item);
        });
    }
    $('.pre_record .table_body').html(_html);
};
export const renderPrerecordPagination = async (_listData) => {
    $('.pre_record .table_page').html(parsePaginationBlock(_listData));
};
renderPrerecordList();
