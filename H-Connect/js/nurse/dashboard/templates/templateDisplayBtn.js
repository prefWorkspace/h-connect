export const parseDisplayBtn = async (displayList, selectedDisplayCode) => {
    let template = `<div class="btn_ViewlistScroll">`;
    displayList.forEach(async (display, index) => {
        if (index === 0) {
            template += `<button type='button' class='btn btn_View btn_first ${display.displayCode === selectedDisplayCode ? 'on' : ''}' data-id='${display.displayCode}'>
                ${display.displayNumber}번 화면
            </button>`;
        } else if (index >= 2) {
            template += `<button type='button' class='btn btn_View delete ${display.displayCode === selectedDisplayCode ? 'on' : ''}' data-id='${display.displayCode}'>
                ${display.displayNumber}번 화면
                <div class="display_delete" data-dpid="${display.displayCode}">
				    <img src="/H-Connect/img/icon/delete.svg" alt="화면삭제버튼 아이콘">
				</div>
            </button>`;
        } else {
            template += `<button type='button' class='btn btn_View ${display.displayCode === selectedDisplayCode ? 'on' : ''}' data-id='${display.displayCode}'>
                ${display.displayNumber}번 화면
            </button>`;
        }
    });
    template += `</div><button type="button" class="btn btn_addView">
        + 화면추가
    </button>`;
    return template;
};
