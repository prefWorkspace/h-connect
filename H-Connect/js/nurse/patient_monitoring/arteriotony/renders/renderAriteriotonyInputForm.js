import { parseAriteriotonyInputForm } from '../templates/ariteriotonyInputFormTmpl.js';
const $INPUT_FORM_CONTAINER = document.querySelector('.manual_input');
export const renderAriteriotonyInputForm = (record) => {
    const tmpl = parseAriteriotonyInputForm(record);
    $INPUT_FORM_CONTAINER.innerHTML = tmpl;
};
