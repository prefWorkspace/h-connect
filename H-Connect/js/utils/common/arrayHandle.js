/* html을 문자열로 합쳐주는 함수입니다 */
Array.prototype.htmlFor = function (callback) {
    // 인자값은 총 3개입니다
    // (item, index, arr)
    // item은 배열의 아이템들을 반환합니다.
    // index는 배열의 인덱스를 반환합니다.
    // arr는 배열 전부를 반환합니다.

    // 사용예시
    // [{test:1, test2:"asdf"},{test:1, test2:"asdf"}].htmlFor((item, index, arr)=>{return SickBed_Block(item)})
    let htmlFor = [], idx = 0, value = {};
    while(idx < this.length){
        htmlFor += callback(this[idx], idx, this);
        idx++;
    }
    return htmlFor;
};