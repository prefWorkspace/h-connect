export const parseDisplayDeletePop = (displayNumber) => {
    return `
        <div>
            <img src="/H-Connect/img/logo.png" alt="로고" />
        </div>
        <h3>현재 화면에 설정된 내용들이 삭제됩니다.</h3>
        <h2><span>${displayNumber}번 화면</span> 을 삭제합니다.</h2>
        <div class="btn_list">
            <button type="button" class="btn gr btn_no">
                아니요
            </button>
            <button type="button" class="btn rdf btn_cut">
                네, 삭제합니다
            </button>
        </div>
    `
}