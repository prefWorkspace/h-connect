const choiceDoctorItemTmpl = () => {
    // 선택 된 의료진 리스트 아이템
    return `
    <div class="mem">
        <p>김협진 교수님</p>
        <button type="button" class="btn_del">
            <img src="/H-Connect/img/icon/delete.svg" alt="의료진삭제버튼아이콘" />
        </button>
    </div>
    `;
};

const doctorListItemTmpl = () => {
    // 선택 될 의사 리스트 아이템
    return `
    <div>
        <div class="input_wrap">
            <input type="checkbox" name="doctor" id="check6"
                class="green_custom">
            <label for="check6"></label>
            <label for="check6">
                <span>김두통 교수님</span>
                <span>일반외과</span>
            </label>
        </div>

        <div class="favorite_container">
            <input type="checkbox" id="favorite6" checked>
            <label for="favorite6"></label>
        </div>
    </div>
  `;
};
