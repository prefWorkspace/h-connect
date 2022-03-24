import { renderPatientInfo } from './renders/renderPatientInfo.js';
import { renderPrerecordList } from './renders/renderPrerecord.js';
import { renderAriteriotonyInputForm } from './renders/renderAriteriotonyInputForm.js';

const init = () => {
    renderPatientInfo();
    renderPrerecordList();
    renderAriteriotonyInputForm();
};
init();
