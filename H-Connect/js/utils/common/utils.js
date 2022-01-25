/* s: 생년월일으로 '만' 나이를 계산합니다. */
function ageCalc(birth){
    const todayD = new Date();
    const birthD = new Date(birth);
    let age = todayD.getFullYear() - birthD.getFullYear();
    const m = todayD.getMonth() - birthD.getMonth();
    if (m < 0 || (m === 0 && todayD.getDate() < birthD.getDate())) {
        age--;
    }
    return age;
}
/* e: 생년월일으로 '만' 나이를 계산합니다. */