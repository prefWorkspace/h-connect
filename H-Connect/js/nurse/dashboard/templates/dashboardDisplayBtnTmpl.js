export const parseDashboardDisplayBtnTmpl = (displayList) => {
    let tmpl = `<h2>대시보드 화면</h2>
        <div id="display_btn_list" class="btn_list">`;

    for (let i = 0; i < displayList.length; i++) {
        if (i === 0) {
            tmpl += `<button type="button" class="btn btn_display_el btn_first on" id="${displayList[i].displayCode}">
                ${displayList[i].displayName}
            </button>`;
        } else {
            tmpl += `<button type="button" class="btn btn_display_el" id="${displayList[i].displayCode}">
                ${displayList[i].displayName}
            </button>`;
        }
    }
    tmpl += `<button
            type="button"
            class="btn btn_addView">
            + 화면추가
        </button>
    </div>`;

    return tmpl;
};
