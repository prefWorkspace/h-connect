const { getPatientList } = await import(importVersion('/H-Connect/js/nurse/dashboard/actions/getPatientList.js'));

export const parseDashboardScreen = async (displayCode, sickBedList) => {
    let tmpl = `<div class="account">
        <p>H-Connect inpatient monitoring system</p>
    </div>`;

    const sickBedListByDisplayCode = sickBedList.filter(
        (sickBed) => sickBed.displayCode === displayCode
    );
    const patientList = await getPatientList();
    sickBedListByDisplayCode.forEach((sickBed) => {
        let HasPatient = false;
        for(let i=0; i<patientList.length; i++){
            if(sickBed.sickBedCode === patientList[i].sickBedCode){
                HasPatient = true;
                tmpl += `
                <div class="check_pati">
                    <div class="pati_inner">
                        <input type="checkbox" class='inpat_sickbed' id="inpat_${sickBed.sickBedCode}" />
                        <label for="inpat_${sickBed.sickBedCode}">
                            Patient Type-${patientList[i].patientCode}
                        </label>
                    </div>
                </div>`
                break;
            }
            
        }
        // 해당 병상이 환자를 갖고 있지 않을때
        if(!HasPatient){
                tmpl += `<div class="check_pati">
                <div class="pati_inner">
                    <input type="checkbox" class='inpat_sickbed' id="inpat_${sickBed.sickBedCode}" />
                    <label for="inpat_${sickBed.sickBedCode}"
                        >${sickBed.sickRoomCode}-${sickBed.nickname}-Empty SickBed</label
                    >
                </div>
            </div>`
        }
    });

    return tmpl;
};
