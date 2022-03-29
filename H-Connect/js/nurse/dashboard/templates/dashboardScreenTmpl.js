export const parsePatientListToDashboardScreen = (patientList) => {
    let tmpl = `<div class="account">
        <p>H-Connect inpatient monitoring system</p>
    </div>`;
    for (let i = 0; i < patientList.length; i++) {
        if (true) {
            tmpl += `<div class="check_pati">
                <div class="pati_inner">
                    <input type="checkbox" class='inpat_patient' id="inpat_${patientList[i].patientCode}" />
                    <label for="inpat_${patientList[i].patientCode}"
                        >Patient Type-${patientList[i].patientCode}</label
                    >
                </div>
            </div>`;
        }
    }
    return tmpl;
};
