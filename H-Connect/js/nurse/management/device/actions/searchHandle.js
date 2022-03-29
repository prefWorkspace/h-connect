'use strict';
const { select_device } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/device/actions/select_device.js'
    )
);
const { select_device_unused } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/device/actions/select_device_unused.js'
    )
);

//enter 키 누름 감지 함수
function pressEnter(e, callback) {
    if (e.key === 'Enter') {
        callback();
    }
}

//입력 없을시 에러 핸들
function searchError(value) {
    if (value === '' || value === null || value === undefined || value) {
        alert('입력하신 내용이 없습니다');
        return true;
    }
}

//장치 검색 기능 이벤트
function search_Handel() {
    const search = $(
        '.section.new_device .device_list .search_container input'
    ).val();
    if (searchError(search)) {
        return;
    }
    select_device(8, search);
}

//search 검색 기능
$('.section.new_device .device_list .search_container button').on(
    'click',
    search_Handel
);

//search 검색 기능 Enter키 눌러도 검색 가능
$('.section.new_device .device_list .search_container input').on(
    'keypress',
    (e) => pressEnter(e, search_Handel)
);

//사용한 장치 검색 기능 이벤트
function search_unused_Handel() {
    const search = $(
        '.section.return_device .device_list .search_container input'
    ).val();
    if (searchError(search)) {
        return;
    }
    select_device_unused(8, search);
}

$('.section.return_device .device_list .search_container button').on(
    'click',
    search_unused_Handel
);

$('.section.return_device .device_list .search_container input').on(
    'keypress',
    (e) => pressEnter(e, search_unused_Handel)
);
