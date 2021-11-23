$(function () {

    // 로그아웃 팝업
    $('.pc_header .btn_logout').on('click', function () {
        $('.pop.logout').show();
    });

    $('.pop.logout .wrap_inner .btn_bye').on('click', function () {
        $('.pop.logout').hide();
    });


    // 병동생성 팝업 열고 닫기
    $('.nurse .ward .title .btn_new_ward').on('click', function () {
        $('.pop.new_ward .overlay').show();
    });

    $('.pop .overlay .pop_cont .btn_list .btn_cancel').on('click', function () {
        $('.pop.new_ward .overlay').hide();
    });

    // 병동생성 팝업에서 확인 누르면 나오게
    $('.pop .overlay .pop_cont .btn_list .btn_check').on('click', function () {
        $('.pop .overlay').hide();
        $('.nurse .ward .cont').show();
    });

    // 병동관리 리스트 수정버튼 누르면 나오는 팝업
    $('.nurse .ward .cont .ward_list .btn_list .btn_modify').on('click', function () {
        $('.pop.new_ward .overlay').show();
    });
    


});