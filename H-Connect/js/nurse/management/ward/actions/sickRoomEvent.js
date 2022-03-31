'use strict';
const { insertSickRoom } = await import(
    importVersion('/H-Connect/js/nurse/management/ward/actions/sickRoomAPI.js')
);

//병실 생성 이벤트
//common.js 에 있던 모달창 명령
// $('.nurse .hospital_room .title .btn_new_room').on('click', function () {
//     $('.pop.new_room .overlay').fadeIn();
// });
$('.section.right .btn_new_room').on('click', function () {
    $('.pop.new_room .overlay').fadeIn();
});

$('.pop.new_room .overlay .btn_cancel').on('click', function () {
    $('.pop.new_room .overlay').fadeOut();
});

$('.pop.new_room .overlay .pop_cont .btn_list .btn_check').on(
    'click',
    insertSickRoom
);

//병실 수정 이벤트
$('.pop.update_room .overlay .btn_cancel').on('click', function () {
    $('.pop.update_room .overlay').fadeOut();
});

//병실 삭제 이벤트
$('.pop.delete_room .overlay .btn_no').on('click', function () {
    $('.pop.delete_room .overlay').fadeOut();
});
