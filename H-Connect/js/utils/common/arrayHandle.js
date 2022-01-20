/* html을 문자열로 합쳐주는 함수입니다 */
Array.prototype.htmlFor = function (html) {
    let htmlFor = [], idx = 0;
    while(idx < this.length){
        htmlFor += html;
        idx++;
    }
    return htmlFor;
};