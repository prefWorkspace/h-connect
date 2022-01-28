/* s: html을 문자열로 합쳐주는 함수*/
Array.prototype.htmlFor = function (_callback) {
    /** 인자값은 총 3개입니다
    * (item, index, arr)
    * @param item : 배열의 아이템들을 반환합니다.
    * @param index : 배열의 인덱스를 반환합니다.
    * @param arr : 배열 전부를 반환합니다. 
    * 해당 파라미터는 순번입니다.
    * */

    // 사용예시
    // [{test:1, test2:"asdf"},{test:1, test2:"asdf"}].htmlFor((item, index, arr)=>{return SickBed_Block(item)})
    let _htmlFor = [], _idx = 0, value = {};
    while(_idx < this.length){
        _htmlFor += _callback(this[_idx], _idx, this);
        _idx++;
    }
    return _htmlFor;
};
/* e: html을 문자열로 합쳐주는 함수*/