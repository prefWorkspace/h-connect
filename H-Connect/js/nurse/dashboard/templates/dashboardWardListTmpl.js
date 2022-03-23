export const parseWardList = (wardList) => {
    let tmpl = dashboardWardListTmpl;
    tmpl = tmpl.replace(`{{firstWardName}}`, wardList[0]['ward']);
    let tmplWardOptionList = ``;
    for (let i = 0; i < wardList.length; i++) {
        tmplWardOptionList += `<li class="optionItem ward_list">${wardList[i]['ward']}</li>`;
    }
    tmpl = tmpl.replace(`{{wardList}}`, tmplWardOptionList);
    return tmpl;
};

export const parseSickRoom = (sickRoomList, patientList) => {
    let templ = ``;
    for (let i = 0; i < sickRoomList.length; i++) {
        let tmpl = `<div class="ward_block">`;
        let sickRoomTmpl = `<div class="ward_count">
        <div class="input_wrap">
            <input
                type="checkbox"
                class="green_custom"
                id="${sickRoomList[i].sickRoomCode}"
                name="room_no"
            />
            <label for="${sickRoomList[i].sickRoomCode}"></label>
            <label for="${sickRoomList[i].sickRoomCode}">${sickRoomList[i].sickRoom}</label>
        </div>
    </div>`;
        let patientsBySickRoom = patientList.filter(
            (patient) => patient['sickRoomCode'] == sickRoomList[i].sickRoomCode
        );
        let patientTmpl = `<div class="patient_info">`;
        for (let j = 0; j < patientsBySickRoom.length; j++) {
            const { patientCode, name, age, gender } = patientsBySickRoom[j];
            patientTmpl += `<div class="input_wrap">
                <input
                    type="checkbox"
                    name="patient_no"
                    class="green_custom"
                    id="${patientCode}"
                />
                <label for="${patientCode}"></label>
                <label for="${patientCode}"
                    ><span
                        >${name}(${age}.${
                gender === 1 ? '남' : '여'
            }.${patientCode})</span
                    ></label
                >
            </div>`;
        }
        patientTmpl += `</div>`;
        templ += tmpl + sickRoomTmpl + patientTmpl + `</div>`;
    }

    return dashboardPatienListTmpl.replace(`{{tmpl}}`, templ);
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
            <button class="label ward_label">{{firstWardName}}</button>

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
