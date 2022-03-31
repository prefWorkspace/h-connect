'use strict';

const { insertWard } = await import(
    importVersion('/H-Connect/js/nurse/management/ward/actions/wardAPI.js')
);

//병동 생성 버튼 이벤트
$('.section.left.ward .btn_new_ward').on('click', function () {
    $('.pop.new_ward .overlay').fadeIn();
});

$('.pop.new_ward .overlay .btn_cancel').on('click', function () {
    $('.pop.new_ward .overlay').fadeOut();
});

$('.new_ward .btn_list #ward_Button').on('click', insertWard);

//enter키 누를때 이벤트 발생
$('.new_ward #ward_Name').keydown(function (e) {
    if (e.key === 'Enter') {
        insertWard();
    }
});
