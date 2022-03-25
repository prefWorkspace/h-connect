import { parseAriteriotonyInputForm } from '../templates/ariteriotonyInputFormTmpl.js';
export const renderAriteriotonyInputForm = (record) => {
    const tmpl = parseAriteriotonyInputForm(record);
    $('.manual_input').html(tmpl);
};
