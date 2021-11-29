$(function () {

    //---------------------- 간호사 ----------------------//

    // 로그아웃 팝업
        $('.pc_header .btn_logout').on('click', function () {
            $('.pop.logout').toggle();
        });

        $('.pop.logout .wrap_inner .btn_bye').on('click', function () {
            $('.pop.logout').hide();
            location.href="../index.html";
        });

    // 환자검색
        $('.pc_header .search_container').on('click', function(){
            $('.pop.search_patient').toggle();
            $('.pc_header .search_container .btn_search').toggleClass('on');
        })

        $('#wrap_content').on('click', function(){
            $('.pop.search_patient').hide();
            $('.pc_header .search_container .btn_search').removeClass('on');
        })


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
            $('.nurse .ward .cont .ward_list').toggleClass('on');
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


    //장치등록
        $('.nurse .new_device .title .btn_new_device').on('click', function () {
            $('.pop.regi_device .overlay').show();
        });
        $('.pop .overlay .pop_cont .btn_list .btn_cancel').on('click', function () {
            $('.pop.regi_device .overlay').hide();
        });

        // 장치삭제
        $('.nurse .new_device .item_row .btn_delete').on('click', function () {
            $('.pop.delete .overlay').show();
        });
            // 아니요
        $('.pop.delete .pop_cont .btn_list .btn_no').on('click', function(){
            $('.pop.delete .overlay').hide();
        });
            // 네 삭제합니다.
        $('.pop.delete .pop_cont .btn_list .btn_cut').on('click', function(){
            // $('.nurse .new_device .item_row').hide();
            $('.pop.delete .overlay').hide();
        });

   //장치반납
        $('.nurse .return_device .title .btn_use_device').on('click', function () {
            $('.pop.re_device .overlay').show();
        });
        $('.pop .overlay .pop_cont .btn_list .btn_cancel').on('click', function () {
            $('.pop.re_device .overlay').hide();
        });

        // 장치반납 취소
        $('.nurse .return_device .item_row .btn_cancel').on('click', function () {
            $('.pop.delete .overlay').show();
        });
            // 아니요
        $('.pop.delete .pop_cont .btn_list .btn_no').on('click', function(){
            $('.pop.delete .overlay').hide();
        });
            // 네 삭제합니다.
        $('.pop.delete .pop_cont .btn_list .btn_cut').on('click', function(){
            // $('.nurse .new_device .item_row').hide();
            $('.pop.delete .overlay').hide();
        });


        // 셀렉트
            //장치관리- 장치추가
            $('.selectBox2 .label').on('click', function(){
                $('.left_option').slideToggle(200);
            });
            //장치관리- 장치반납
            $('.selectBox2 .label').on('click', function(){
                $('.right_option').slideToggle(200);
            });

            //장치관리- 장치리스트
            $('.select_device .label').on('click', function(){
                $('.select_device').toggleClass('on');
                $('.device_option').slideToggle(200);
            });

            

    //측정관리
        // 환자검색
        $('.nurse .measure_status .search_container').on('click', function(){
            $('.pop.measure_patient').toggle();
            $('.pc_header .search_container .btn_search').toggleClass('on');
        });

        $('#wrap_content').on('click', function(){
             $('.pop.search_patient').hide();
             $('.pc_header .search_container .btn_search').removeClass('on');
        });

        // 환자선택하면 배경색이 바뀜
        $('nurse .measure_status .cont .container .status_list').on('click', function(){
            // $('.measure_status .cont .container> :nth-child(1)').toggleClass('on');
        });

        // 측정 수정
        $('.nurse .measure_status .cont .container .status_list .btn_list .btn_modify').on('click', function(){
            $('.modifi_hospital').toggle();
            $('.new_hospital').toggle();
        })
        $('.modifi_hospital .title .btn_new_hospital').on('click', function(){
            $('.modifi_hospital').hide();
            $('.new_hospital').show();
        })

        // 측정현황 생체신호 리스트 삭제 팝업
        $('.nurse .measure_status .cont .container .status_list .btn_list .btn_delete').on('click', function(){
            $('.pop.delete_measure .overlay').show();
        })

        // 병상정보 수정 디바이스 리스트 삭제
        $('.modifi_hospital .device_room> div .btn_list .btn_delete').on('click', function(){
            $('.pop.delete_new_measure .overlay').show();
        })

        // 신규병상 등록 생체신호 리스트 삭제 팝업
        $('.new_hospital .device_room> div .btn_list .btn_delete').on('click', function(){
            $('.pop.delete_new_measure .overlay').show();
        })

        // 장치추가
        $('.new_hospital .device_room .btn_add').on('click', function(){
            $('.pop.regi_device .overlay').show();
        })

    //모니터링
        $('.patient_vital .all_patient .patient_moniter .empty_bed').on('click', function(){
            location.href="index.html";
        })

        $('.patient_vital .all_patient .patient_moniter').on('click', function(){
            location.href="patient.html";
        })

        // 혈압 수동입력
        $('.arteriotony .arteriotony_input .title .btn_arte_check').on('click', function(){
            $('.pop.arteriotony_regi .overlay').show();
        })

        $('.pop.arteriotony_regi .btn_check').on('click', function(){
            $('.pop.arteriotony_regi .overlay').hide();
        })

    // 담당의에게 메시지 보내기
        





});

// 모니터링 탭메뉴
$(document).ready(function(){
  
    $('ul.tabs li').click(function(){
      var tab_id = $(this).attr('data-tab');
  
      $('ul.tabs li').removeClass('current');
      $('.tab-content').removeClass('current');
  
      $(this).addClass('current');
      $("#"+tab_id).addClass('current');
    })
  
  })
