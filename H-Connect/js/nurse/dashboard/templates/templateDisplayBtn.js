export function parseDisplayBtn(displayList) {
    let template = ``;
    displayList.forEach((display, index) => {
        if (index === 0) {
            template += `<button type='button' class='btn btn_View btn_first on' data-id='${display.displayCode}'>
                ${display.displayName}
            </button>`;
        } else {
            template += `<button type='button' class='btn btn_View' data-id='${display.displayCode}'>
                ${display.displayName}
            </button>`;
        }
    });
    template += `<button type="button" class="btn btn_addView">
        + 화면추가
    </button>`;
    return template;
}
