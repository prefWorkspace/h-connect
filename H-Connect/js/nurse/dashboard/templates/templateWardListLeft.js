export const parseWardListLeft = async (wardList) => {
    let template = dashboardWardListTmpl;
    let templateWardOptionList = ``;
    wardList.forEach((ward) => {
        templateWardOptionList += `<li 
            class='optionItem ward_list'
            data-ward="${ward.ward}" data-wardcode="${ward.wardCode}">
                ${ward.ward}
            </li>`;
    });
    template = template.replace('{{selectWard}}', wardList[0]?.ward);
    return template.replace(`{{wardList}}`, templateWardOptionList);
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
            <button class="label ward_label">{{selectWard}}</button>

            <ul class="optionList ward_option">{{wardList}}</ul>
        </div>
    </div>
`;
