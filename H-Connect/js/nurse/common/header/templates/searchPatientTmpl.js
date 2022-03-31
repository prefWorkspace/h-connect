/* s: 환자검색 리스트블록 */
export function searchPatientBlock(_data) {
    const {
        measurementCode,
        name,
        age,
        gender,
        patientCode,
        ward,
        sickRoom,
        sickBed,
    } = _data || {};
    return `
  <p class="patient_list" onclick='window._history.linkTo("/nurse/patient.html?measurement_code=${measurementCode}")'>
      <span>${name}</span>
      (<span>${age}</span>.
      <span>${gender === 1 ? '남자' : '여자'}</span>).
      <span>${patientCode}</span>
      ${
          ward
              ? `
          .<span>${ward}</span>
          `
              : ``
      }
      ${
          sickRoom
              ? `
          .<span>1302</span>호실.
          `
              : ``
      }
      ${
          sickBed
              ? `
          <span>1</span>병상
          `
              : ``
      }
  </p>
  `;
}
/* e: 환자검색 리스트블록 */
