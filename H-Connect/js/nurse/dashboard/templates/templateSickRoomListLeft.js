import { getPatientList } from '../actions/getPatientList.js?v=2022.03.25.12.01';

export const parseSickRoomListLeft = async (sickRoomList, sickBedList) => {
    let template = dashboardSickRoomList;
    let templateSickRoom = ``;
    let patients = await getPatientList();
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
                    <label for="${sickRoom.sickRoomCode}">${sickRoom.sickRoom}</label>
                </div>
            </div>
            {{sickBedTmpl}}
        </div>`;

        let sickBedsBySickRoom = sickBedList.filter(
            (bed) => bed.sickRoomCode === sickRoom.sickRoomCode
        );
        console.log(sickBedsBySickRoom);
        let patientsBySickRoom = patients.filter(
            (patient) => patient.sickRoomCode === sickRoom.sickRoomCode
        );
        console.log(patientsBySickRoom);
    });

    return template.replace('{{tmpl}}', templateSickRoom);
};

const dashboardSickRoomList = `
    <div class="select_inner">
        {{tmpl}}
    </div>
`;
