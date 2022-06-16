'use strict';

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const userData = localStorageController.getLocalS('userData');

// 로그인 정보에서 가져온 이름으로 렌더링
if (userData) {
    const { name: userName } = JSON.parse(userData);
    $('.pc_header .btn_logout').text(userName);
    $('.pc_header .logout .wrap_inner > div h3').text(userName);
}

// 헤더 어카운트 정보 클릭시 팝업 띄움
$('.pc_header .btn_logout')
    .off()
    .on('click', function () {
        $('.pop.logout').fadeToggle();
    });
