export const parseDisplayBtn = async (displayList) => {
    let template = ``;
    displayList.forEach((display, index) => {
        if (index === 0) {
            template += `<button type='button' class='btn btn_View btn_first on' data-id='${display.displayCode}'>
                ${display.displayNumber}
            </button>`;
        } else if (index >= 2) {
            template += `<button type='button' class='btn btn_View delete' data-id='${display.displayCode}'>
                ${display.displayNumber}
                <div>
				    <img src="/H-Connect/img/icon/delete.svg" alt="화면삭제버튼 아이콘">
				</div>
            </button>`;
        } else {
            template += `<button type='button' class='btn btn_View' data-id='${display.displayCode}'>
                ${display.displayNumber}
            </button>`;
        }
    });
    template += `<button type="button" class="btn btn_addView">
        + 화면추가
    </button>`;
    return template;
};
