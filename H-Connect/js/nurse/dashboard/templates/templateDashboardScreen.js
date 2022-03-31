const { getPatientList } = await import(
    importVersion('/H-Connect/js/nurse/dashboard/actions/getPatientList.js')
);

export const parseDashboardScreen = async (displayCode, displayName, sickBedList) => {
    let tmpl = `<div class="account">
        <p>${displayName}</p>
        <div class="delete">병동이름설정<img src="/H-Connect/img/icon/btn_next_green.svg" alt=""></div>
    </div>`;

    const patientList = await getPatientList();
    sickBedList.forEach((sickBed) => {
        if (sickBed.measurementCode) {
            for (let i = 0; i < patientList.length; i++) {
                if (sickBed.sickBedCode === patientList[i].sickBedCode) {
                    tmpl += `
                <div class="check_pati">
                    <div class="pati_inner">
                        <input type="checkbox" class='inpat_sickbed' id="inpat_${sickBed.sickBedCode}" data-diplaycode="${displayCode}"/>
                        <label for="inpat_${sickBed.sickBedCode}">
                             ${sickBed.sickRoom}/${sickBed.sickBed}/${patientList[i].name}/${patientList[i].patientCode}
                        </label>
                    </div>
                </div>`;
                    break;
                }
            }
        } else {
            tmpl += `<div class="check_pati">
                <div class="pati_inner">
                    <input type="checkbox" class='inpat_sickbed' id="inpat_${sickBed.sickBedCode}" data-diplaycode="${displayCode}"/>
                    <label for="inpat_${sickBed.sickBedCode}"
                        >${sickBed.sickRoom}/${sickBed.sickBed}</label
                    >
                </div>
            </div>`;
        }
    });

    return tmpl;
};
