export const choiceDoctorItemTmpl = (_data) => {
    const { jikchek, userId, userName } = _data ?? {};
    // 선택 된 의료진 리스트 아이템
    return `
    <div class="mem" data-user-id='${userId}' data-user-name='${userName}' data-jikchek='${jikchek}'>
        <p>${userName} 교수님</p>
        <button type="button" class="btn_del">
            <img src="/H-Connect/img/icon/delete.svg" alt="의료진삭제버튼아이콘" />
        </button>
    </div>
    `;
};

export const doctorListItemTmpl = (_data) => {
    // 선택 될 의사 리스트 아이템
    const { userId, userName, jikchek, departmentCode, departmentName } =
        _data ?? {};
    return `
    <div class='doctor-list-item' data-user-id='${userId}' data-user-name='${userName}' data-jikchek='${jikchek}' data-departmentCode='${departmentCode}' data-departmentName='${departmentName}'>
        <div class="input_wrap">
            <input type="checkbox" name="doctor" id="${'check' + userId}"
                class="green_custom">
            <label for="${'check' + userId}"></label>
            <label for="${'check' + userId}">
                <span>${userName} 교수님</span>
                <span>${jikchek}</span>
            </label>
        </div>

        <div class="favorite_container">
            <input type="checkbox" id="${'tofavorite' + userId}">
            <label for="${'tofavorite' + userId}"></label>
        </div>
    </div>
  `;
};
