'use strict';

//간호사단 장치 이름 변환 이름=> 번호
export function device_NameToType(devieName) {
    const name = devieName.replaceAll(' ', '').replaceAll('\n', '');
    console.log(name);
    switch (name) {
        case '심전도패치':
            return 1;
        case '체온패치':
            return 2;
        case '산소포화도측정장치':
            return 3;
    }
}

//간호사단 장치 이름 변환 번호 => 이름
export function device_TypeToName(deviceType) {
    switch (deviceType) {
        case 1:
            return '심전도 패치';
        case 3:
            return '산소포화도 측정장치';
        case 2:
            return '체온 패치';
    }
}
