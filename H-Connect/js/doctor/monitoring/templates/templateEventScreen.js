'use strict';

export async function eventBasicInfo(_bse) {
    if (!_bse) return;
    
    const { name, age, gender, patientCode } = _bse;
    return `
        <div>
            <h2>${name} (${age}. ${gender & 1 ? '남' : '여'})</h2>
            <p>${patientCode}</p>
        </div>
    `
}