/* s: 생년월일으로 '만' 나이를 계산합니다. */
function AGE_CALC(_birth){
    const _todayD = new Date();
    const _birthD = new Date(_birth);
    let _age = _todayD.getFullYear() - _birthD.getFullYear();
    const _m = _todayD.getMonth() - _birthD.getMonth();
    if (_m < 0 || (_m === 0 && _todayD.getDate() < _birthD.getDate())) {
        _age--;
    }
    return _age;
}
/* e: 생년월일으로 '만' 나이를 계산합니다. */