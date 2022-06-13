'use strict';

// PACS 목록 헤더
export function pacsListHeaderTemplates() {
    return `
        <div class="title">
            <h2>PACS</h2>
            <p>study list</p>
        </div>
    `;
}

function detailBtn(){
    return `
        <div>
            <img
                src="/H-Connect/img/right_arrow.svg"
                alt="오른쪽 화살표"
            />
        </div>
    `;
}
// PACS 목록 데이터 (SelectHisPacsinfo)
export function pacsListContentTemplates(_data) {
    const { ordName, ordCode, execDate, readYn, pacsYn, ekgYn, imgCnt } = _data;

    return `
        <div 
            class="row"
            onclick="location.href='pacs_img.html?pacsId=${ordCode}'">

            <p>${ordName}</p>
            <p>${ordCode}</p>
            <p class="time">${moment(execDate).format('YY.MM.DD')}</p>
            <p>${readYn}</p>
            <p>${pacsYn}</p>
            <p>${ekgYn}</p>

            <div class="images">
                <p>${imgCnt} images</p>
                ${
                    imgCnt > 0 
                    ? (detailBtn()) 
                    : ("")
                }
            </div>
        </div>
    `;
}
