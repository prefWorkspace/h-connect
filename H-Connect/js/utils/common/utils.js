/* s: 생년월일으로 '만' 나이를 계산합니다. */
export function birthdayToAge(_birth) {
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

export const dateFormat = (_date) => {
    const rDate = new Date(_date);

    const year = rDate.getFullYear().toString();
    const month = (rDate.getMonth() + 1).toString();
    const day = rDate.getDate().toString();

    const hour = rDate.getHours().toString();
    const min = rDate.getMinutes().toString();
    const seconds = rDate.getSeconds().toString();

    return `${year.padStart(2, '0')}-${month.padStart(2, '0')}-${day.padStart(
        2,
        '0'
    )} ${hour.padStart(2, '0')}:${min.padStart(2, '0')}:${seconds.padStart(
        2,
        '0'
    )}`;
};

export const numToDay = (num) => {
    const NUM = Number(num);

    switch (NUM) {
        case 0:
            return '일';
        case 1:
            return '월';
        case 2:
            return '화';
        case 3:
            return '수';
        case 4:
            return '목';
        case 5:
            return '금';
        case 6:
            return '토';
    }
};
