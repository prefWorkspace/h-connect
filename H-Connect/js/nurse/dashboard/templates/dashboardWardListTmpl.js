export const parseWardList = (wardList) => {
    let tmpl = dashboardWardListTmpl;
    let tmplWardOptionList = ``;
    for (let i = 0; i < wardList.length; i++) {
        tmplWardOptionList += `<li class="optionItem ward_list" name='${wardList[i]['wardCode']}'>${wardList[i]['ward']}</li>`;
    }
    tmpl = tmpl.replace(`{{wardList}}`, tmplWardOptionList);
    return tmpl;
};

export const parsePatientsBySickRoom = (wardList, patientList) => {
    const _wardList = wardList;
    let tmpl = ``;
    _wardList.forEach((_ward) => {
        const { ward, wardCode, sickRoomList } = _ward;

        sickRoomList.forEach((sickRoom) => {
            let sickRoomTmpl = `
            <div class='ward_block ${wardCode}'>
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
            `;
            let patientsBySickRoom = patientList.filter(
                (patient) => patient['sickRoomCode'] == sickRoom.sickRoomCode
            );

            let patientTmpl = `<div class="patient_info ${sickRoom.sickRoomCode}">`;
            patientsBySickRoom.forEach((patient) => {
                const { patientCode, name, age, gender } = patient;
                patientTmpl += `<div class="input_wrap">
                    <input
                        type="checkbox"
                        name="patient_no"
                        class="green_custom"
                        id="${patientCode}"
                    />
                    <label for="${patientCode}"></label>
                    <label for="${patientCode}">
                        <span>${name}(${age}.${
                    gender === 1 ? '남' : '여'
                }.${patientCode})</span></label>
                </div>`;
            });
            patientTmpl += `</div>`;

            tmpl += sickRoomTmpl + patientTmpl + `</div>`;
        });
    });

    return dashboardPatienListTmpl.replace(`{{tmpl}}`, tmpl);
};

const dashboardWardListTmpl = `
    <div class="select_head">
        <div class="input_wrap">
            <input
                type="checkbox"
                class="green_custom"
                id="ward_check"
                class="green_custom"
            />
            <label for="ward_check"></label>
            <label for="ward_check">병동선택</label>
        </div>

        <div class="selectBox2 select_ward">
            <button class="label ward_label"></button>

            <ul class="optionList ward_option">{{wardList}}</ul>
        </div>
    </div>
`;

const dashboardPatienListTmpl = `
<!-- 호실별 대상 체크 -->
    <div class="select_inner">
        {{tmpl}}
    </div>
`;
