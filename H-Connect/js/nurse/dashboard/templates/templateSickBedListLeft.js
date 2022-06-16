const { getPatientList } = await import(
    importVersion('/H-Connect/js/nurse/dashboard/actions/getPatientList.js')
);
const { birthdayToAge } = await import(
    importVersion('/H-Connect/js/utils/common/utils.js')
);

export const parseSickBedListLeft = async (sickRoomList, sickBedList) => {
    function findPatientBySickBedCode(_sickBedCode, _patientList) {
        for (let i = 0; i < _patientList.length; i++) {
            if (_patientList[i].sickBedCode === _sickBedCode) {
                return _patientList[i];
            }
        }
        return null;
    }

    let template = dashboardSickRoomList;
    let templateSickRoom = ``;
    let patients = await getPatientList();
    let sickRoomAndSickBed = {};
    sickRoomList.forEach((room) => {
        sickRoomAndSickBed[`${room.sickRoomCode}`] = [];
    });
    sickBedList.forEach((bed) => {
        sickRoomAndSickBed[`${bed.sickRoomCode}`].push(bed);
    });

    let sickBedsTmpls = {};
    sickRoomList.forEach((sickRoom) => {
        let sickBedsTmpl = `<div class="patient_info ${sickRoom.sickRoomCode}">`;
        sickRoomAndSickBed[`${sickRoom.sickRoomCode}`].forEach((sickBed) => {
            if (sickBed.measurementCode) {
                const { patientCode, name, age, birthday, gender } =
                    findPatientBySickBedCode(sickBed.sickBedCode, patients);
                sickBedsTmpl += `<div class="input_wrap">
                    <input
                        type="checkbox"
                        name="sickBed_no"
                        class="green_custom"
                        id="${sickBed.sickBedCode}"
                    />
                    <label for="${sickBed.sickBedCode}"></label>
                    <label for="${sickBed.sickBedCode}">
                        <span>${sickBed.nickname},${name}(${
                    birthday ? birthdayToAge(birthday) : '-'
                }.${gender === 1 ? '남' : '여'}.${patientCode})</span></label>
                </div>`;
            } else {
                sickBedsTmpl += `<div class="input_wrap">
                    <input
                        type="checkbox"
                        name="sickBed_no"
                        class="green_custom"
                        id="${sickBed.sickBedCode}"
                    />
                    <label for="${sickBed.sickBedCode}"></label>
                    <label for="${sickBed.sickBedCode}">
                        <span>${sickBed.nickname}</span></label>
                </div>`;
            }
        });
        sickBedsTmpl += '</div>';
        sickBedsTmpls[`${sickRoom.sickRoomCode}`] = sickBedsTmpl;
    });
    sickRoomList.forEach((sickRoom) => {
        templateSickRoom += `<div class='ward_block ${sickRoom.wardCode}'>
            <div class="ward_count ${sickRoom.sickRoomCode}">
                <div class='input_wrap'>
                    <input
                        type="checkbox"
                        class="green_custom"
                        id="${sickRoom.sickRoomCode}"
                        name="room_no"
                    />
                    <label for="${sickRoom.sickRoomCode}"></label>
                    <label for="${sickRoom.sickRoomCode}">${
            sickRoom.sickRoom
        } 호실</label>
                </div>
            </div>
            ${sickBedsTmpls[sickRoom.sickRoomCode]}
        </div>`;
    });

    return template.replace('{{tmpl}}', templateSickRoom);
};

const dashboardSickRoomList = `
    <div class="select_inner">
        {{tmpl}}
    </div>
`;
