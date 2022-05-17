export const choiceDoctorItemTmpl = (_data) => {
    const { userId, userName, departmentCode, departmentName } = _data ?? {};
    // 선택 된 의료진 리스트 아이템
    return `
    <div class="mem" data-user-id='${userId}' data-user-name='${userName}' data-department-code='${departmentCode}' data-department-name='${departmentName}'>
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
    <div class='doctor-list-item' data-user-id='${userId}' data-user-name='${userName}' data-jikchek='${jikchek}' data-department-code='${departmentCode}' data-department-name='${departmentName}'>
        <div class="input_wrap">
            <input type="checkbox" name="doctor" id="${'check-doctor' + userId}"
                class="check-${userId} green_custom">
            <label for="${'check-doctor' + userId}"></label>
            <label for="${'check-doctor' + userId}">
                <span>${userName} ${jikchek ?? ''}</span>
                <span>${departmentName}</span>
            </label>
        </div>

        <div class="favorite_container">
            <input class='favorite-${userId}' type="checkbox" id="${
        'favorite-doctor-' + userId
    }">
            <label for="${'favorite-doctor-' + userId}"></label>
        </div>
    </div>
  `;
};

export function searchDoctorBlock(_data) {
    //     departmentCode: "0001"
    // departmentName: "심장외과"
    // jikchek: "주치의"
    // userId: "ryan.cha"
    // userName: "ryan"
    const { departmentCode, departmentName, userId, userName, jikchek } =
        _data ?? {};
    return `
    <p class='search-doctor-list-item'  data-department-code='${departmentCode}' data-department-name='${departmentName}' data-user-id='${userId}' data-user-name='${userName}'>
        <span>${userName} ${jikchek ?? ''}</span>
        <span>(${departmentName})</span>
    </p>
    `;
}
