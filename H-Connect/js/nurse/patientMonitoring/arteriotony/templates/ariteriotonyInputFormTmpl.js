export const parseAriteriotonyInputForm = ({ systolic, diastolic, pulse }) => {
    return `
    <div class="title">
        <h2>혈압 수동입력</h2>
    </div>
    <form class="form_arter">
        <div class="arter_title">
            <h2>혈압 입력</h2>
        </div>
        <div class="arter_input">
            <div>
                <h2>수축기 혈압 (SYS)</h2>
                <input type="text" value=${systolic}>
            </div>

            <div>
                <h2>이완기 혈압 (DIA)</h2>
                <input type="text" value=${diastolic}>
            </div>
        </div>
        <div class="pulse">
            <div class="arter_title">
                <h2>맥박 입력</h2>
            </div>

            <div>
                <h2>맥박 (Pulse)</h2>
                <input type="text" value=${pulse}>
            </div>
        </div>

        <div class="btn_list">
            <button type="button" class="btn rd btn_no">취소</button>
            <button type="button" class="btn blf btn_add">등록</button>
        </div>
    </form>
    `;
};
