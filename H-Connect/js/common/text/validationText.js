export function errorText(_props) {
    const { msg, padding } = _props ?? {};
    const defaultMsg = '조회된 데이타가 없습니다';
    return `<p class="error_text" style='${
        padding ? `padding:${padding}` : ''
    }'>${msg ? msg : defaultMsg}</p>`;
}

export function loadingText(_props) {
    const { msg, padding } = _props ?? {};
    const defaultMsg = '데이타를 불러오는 중입니다';
    return `<p class="loading_text" style='${
        padding ? `padding:${padding}` : ''
    }'>${msg ? msg : defaultMsg}</p>`;
}
