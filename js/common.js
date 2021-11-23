$(function () {

    //---------------------- 간호사 ------------------------------- //

    // 로그아웃 팝업
    $('.pc_header .btn_logout').on('click', function () {
        $('.pop.logout').toggle();
    });

    $('.pop.logout .wrap_inner .btn_bye').on('click', function () {
        $('.pop.logout').hide();
        location.href="../index.html";
    });


    // --------- 간호사 관리 --------- //
    // 병동관리
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
            $('.nurse .hospital_room .title .btn_new_room').attr("disabled", false);
        });


        // 병동관리 리스트 누르면 색 변함
        $('.nurse .ward .cont .ward_list').on('click', function(){
            $('.nurse .ward .cont .ward_list').addClass('on');
            $('.nurse .hospital_room .title .btn_new_room').attr("disabled", false);
        });

        // 병동삭제
        $('.nurse .ward .cont .ward_list .btn_list .btn_delete').on('click', function () {
            $('.pop.delete_ward .overlay').show();
        });
            // 아니요
        $('.pop.delete_ward .pop_cont .btn_list .btn_no').on('click', function(){
            $('.pop.delete_ward .overlay').hide();
        });
            // 네 삭제합니다.
        $('.pop.delete_ward .pop_cont .btn_list .btn_cut').on('click', function(){
            $('.nurse .ward .cont .ward_list').hide();
            $('.pop.delete_ward .overlay').hide();
        });



    
    // 병실관리
        // 병실관리 팝업 열고 닫기
        $('.nurse .hospital_room .title .btn_new_room').on('click', function () {
            $('.pop.new_room .overlay').show();
        });
        $('.pop .overlay .pop_cont .btn_list .btn_cancel').on('click', function () {
            $('.pop.new_room .overlay').hide();
        });
            //병실관리 확인 누르면 리스트 나오게
        $('.pop.new_room .overlay .pop_cont .btn_list .btn_check').on('click', function(){
            $('.nurse .ward .cont, .nurse .hospital_room .cont').show();
        });
            //병실관리 수정
        $('.nurse .hospital_room .cont .ward_list .btn_list .btn_modify').on('click', function(){
            $('.pop.new_room .overlay').show();
        });

        // 병실삭제
        $('.nurse .hospital_room .cont .ward_list .btn_list .btn_delete').on('click', function () {
            $('.pop.delete_room .overlay').show();
        });
            // 아니요
        $('.pop.delete_room .pop_cont .btn_list .btn_no').on('click', function(){
            $('.pop.delete_room .overlay').hide();
        });
            // 네 삭제합니다.
        $('.pop.delete_room .pop_cont .btn_list .btn_cut').on('click', function(){
            $('.nurse .hospital_room .cont .ward_list').hide();
            $('.pop.delete_room .overlay').hide();
        });

    


});
