$(function () {

        // 팝업창 닫기    
        $('.pop .overlay .pop_cont .btn_list .btn_cancel').on('click', function () {
            $('.pop .overlay').hide();
        });

        $('.pop .pop_cont .btn_list .btn_cancel').on('click', function(){
            $('.pop .overlay').hide();
        })


    //---------------------- 간호사 ----------------------//

    // 로그아웃 팝업
        $('.pc_header .btn_logout').on('click', function () {
            $('.pop.logout').toggle();
        });

        $('.pop.logout .wrap_inner .btn_bye').on('click', function () {
            $('.pop.logout').hide();
            location.href="/index.html";
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
            // $('.selectBox2 .label').on('click', function(){
            //     $('.left_option').slideToggle(200);
            // });
            //장치관리- 장치반납
            // $('.selectBox2 .label').on('click', function(){
            //     $('.right_option').slideToggle(200);
            // });

            //장치관리- 장치리스트
            // $('.select_device .label').on('click', function(){
            //     $('.select_device').toggleClass('on');
            //     $('.device_option').slideToggle(200);
            // });

            

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

        $('.monitoring_patient .cont .resp .bell').on('click', function(){
            $('.pop.resp_set .overlay').show();
        })

        $('.monitoring_patient .cont .ecg .bell').on('click', function(){
            $('.pop.ecg_set .overlay').show();
        })

        $('.monitoring_patient .cont .sp .bell').on('click', function(){
            $('.pop.sp_set .overlay').show();
        })

        $('.monitoring_patient .temp').on('click', function(){
            $('.pop.temp_set .overlay').show();
        })

        $('.monitoring_patient .ews').on('click', function(){
            $('.pop.ews_set .overlay').show();
        })

        $('.monitoring_patient .patient .btn_list .btn_alarm').on('click', function(){
            $('.monitoring_patient .patient .btn_list .btn_alarm_red').show();
            $('.monitoring_patient .patient .btn_list .btn_alarm').hide();
        })

        $('.monitoring_patient .patient .btn_list .btn_alarm_red').on('click', function(){
            $('.monitoring_patient .emergency_list').show();
            $('.monitoring_patient .patient .btn_list .btn_alarm_red').hide();
        })

        $('.monitoring_patient .emergency_list .circum').on('click', function(){
            $('.monitoring_patient .emergency_list').hide();
            $('.monitoring_patient .patient .btn_list .btn_alarm').show();
        })

        // 이벤트 삭제 팝업
        $('.monitoring_patient .table_body .btn_delete').on('click', function(){
            $('.pop.event .overlay').show();
        })

        $('.pop.event .btn_delete').on('click', function(){
            $('.pop.event .overlay').hide();
        })

    // 혈압 수동입력
        $('.arteriotony .arteriotony_input .title .btn_arte_check').on('click', function(){
            $('.pop.arteriotony_regi .overlay').show();
        })

        $('.pop.arteriotony_regi .btn_check').on('click', function(){
            $('.pop.arteriotony_regi .overlay').hide();
        })

        // 담당의에게 메시지 보내기
        $('.nurse .management .management_list .doctor_send').on('click', function(){
            $('.pop.send_doctor .overlay').show();
        })

        // $('.pop.send_doctor .btn_send').on('click', function(){
        //     $('.pop.send_doctor .overlay').hide();
        // })

        $('.pop.send_doctor .btn_exit').on('click', function(){
            $('.pop.send_doctor .overlay').hide();
        })


        $('.pop.send_doctor .overlay .btn_send.on').on('click', function(){
            $('.pop.nurse_view').show();
        })

            // 담당의 메시지 창
            $('.pop.nurse_view .btn_close').on('click', function(){
                $('.pop.nurse_view').hide();
            })

            $('.pop.nurse_view .search_container .sort').on('click', function(){
                $('.pop.chat_sort').toggle();
            })

            $('.pop.nurse_view .btn_fold').on('click', function(){
                $('.pop.nurse_view .chat_container, .pop.nurse_view .chat_window').toggle();
                $('.pop.nurse_view').toggleClass('on');
            })

            $('.pop.nurse_view .btn_full').on('click', function(){
                $('.pop.nurse_view').toggleClass('active');
            })

        // 담당의에게 메시지 보내는 버튼 활성화
        $('#to_doctor').on('keyup', function() {
            var inputVal = $('#to_doctor').val();
            if (!(inputVal === "")) {
              $('.btn_send').addClass('on');
              $('.btn_send').attr('disabled', false);
            } else {
              $('.btn_send').removeClass('on');
              $('.btn_send').attr('disabled', true);
            }
        });

        // 경보해제
        $('.warning .emergency_list .circum').on('click', function(){
            location.href="patient.html";
        })

        // 경보해제 페이지로 이동
        $('.patient_vital .all_patient .patient_moniter.active').on('click', function(){
            location.href="patient_warning.html";
        })

        // 경보해제 페이지 팝업
        $('.patient_vital .all_patient .patient_moniter.active').on('click', function(){
            location.href="patient_warning.html";
        })
    
    // 대시보드
    $('.ward_dashboard .sys_vital.active').on('click', function(){
        $('.pop.monitor .overlay').show();
    })

        // 상황해제 버튼 클릭함
        $('.pop.monitor .btn_clear').on('click', function(){
            $('.pop.monitor .btn_clear').hide();
            $('.pop.monitor .btn_situ').show();
        })

        // 상황해제 버튼 클릭후 팝업 닫히고 active 꺼짐
        $('.pop.monitor .btn_situ').on('click', function(){
            $('.pop.monitor .overlay').hide();
            $('.ward_dashboard .sys_vital').removeClass('active');
        })

        $('.pop.respon').on('click', function(){
            $('.pop.respon').hide();
            $('.pop.monitor .overlay').show();
        })



    //메세지
        $('.nurse_message .btn_message').on('click', function(){
            $('.nurse_message .message_list').hide();
            $('.nurse_message .message_talk').hide();

            $('.nurse_message .select_medi').show();
            $('.nurse_message .send_message').show();
        })

        // 메세지 전송완료 팝업
        $('.message .send_message .btn_list .btn_send').on('click', function(){
            $('.pop.message_send .overlay').show();
        })

        $('.pop.message_send .btn_check').on('click', function(){
            $('.pop.message_send .overlay').hide();

            $('.nurse_message .message_list').show();
            $('.nurse_message .message_talk').show();

            $('.nurse_message .select_medi').hide();
            $('.nurse_message .send_message').hide();
        })

        // 메세지 정렬 팝업
        $('.nurse_message .message_talk .search_container .btn_sort').on('click', function () {
            $('.pop.chat_sort').toggle();
        });

        $('.pop.chat_sort p').on('click', function () {
            $('.pop.chat_sort').hide();
        });






    //---------------------- 응급상황실 ----------------------//
        // 의료진호출
        $('.emergency .patient_status .btn_call').on('click', function(){
            $('.pop.doctor_call .overlay').show();
        })
            // 확인버튼 누름
            $('.pop.doctor_call .btn_doctor_call').on('click', function(){
                $('.pop.doctor_call .overlay').hide();
            })

        // 응급상황 종료
        $('.emergency .patient_status .btn_end').on('click', function(){
            $('.pop.emergency_clear .overlay').show();
        })

        $('.pop.emergency_clear .pop_cont .btn_no').on('click', function(){
            $('.pop.emergency_clear .overlay').hide();
        })

        $('.pop.emergency_clear .pop_cont .btn_list button').on('click', function(){
            $('.pop.emergency_clear .overlay').hide();
        })

        // 환자 바이탈 풀스크린
        $('.emergency .vital .vital_container .btn_vital').on('click', function(){
            $('.pop.full_vital .overlay').show();
        })

        $('.pop.full_vital .btn_close').on('click', function(){
            $('.pop.full_vital .overlay').hide();
        })

        // 응급사진 보기
        $('.emergency .picture .title .btn_picture').on('click', function(){
            $('.pop.full_picture .overlay').show();
        })

        $('.pop.full .btn_close').on('click', function(){
            $('.pop.full_picture .overlay').hide();
        })

    // 메세지
        // 새로운 메세지
        $('.para_message .btn_message').on('click', function(){
            $('.para_message .message_list').hide();
            $('.para_message .message_talk').hide();

            $('.para_message .select_medi').show();
            $('.para_message .send_message').show();
        })

        // 메세지 보내기 창에서 다시 돌아가기(취소버튼 누름)
        $('.para_message .send_message .btn_list .btn_cancel').on('click', function(){
            $('.para_message .select_medi').hide();
            $('.para_message .send_message').hide();

            $('.para_message .message_list').show();
            $('.para_message .message_talk').show();
        })

        // 메세지 보내기 창에서 다시 돌아가기(전송버튼 누름)
        $('.para_message .send_message .btn_list .btn_send').on('click', function(){
            $('.para_message .select_medi').hide();
            $('.para_message .send_message').hide();

            $('.para_message .message_list').show();
            $('.para_message .message_talk').show();
        })
    
    // 구급대원에게 전화
    $('.emergency .patient_status .btn_paramedic').on('click', function(){
        location.href="call_paramedic.html";
    })
    
    $('.para_connect .mic_layer').on('click', function(){
        $('.para_connect .mic_off').show();
    })

    $('.para_connect .mic_off').on('click', function(){
        $('.para_connect .mic_off').hide();
    })

    $('.para_connect .cam_layer').on('click', function(){
        $('.para_connect .cam_off').show();
    })

    $('.para_connect .cam_off').on('click', function(){
        $('.para_connect .cam_off').hide();
    })

    $('.para_connect .refuse_layer').on('click', function(){
        $('.pop.connect .overlay').show();
    })

    $('.pop.connect .btn_delete').on('click', function(){
        $('.pop.connect .overlay').hide();
        location.href="index.html";
    })

    $('.paramedic .header_right .btn_attendee').on('click', function(){
        $('.pop.attendee').toggle();
    })

    $('.paramedic .header_right .btn_doctor_call').on('click', function(){
        $('.pop.doctor_call .overlay').show();
    })

    // 화상창 켜기
    $('.connect .emer_message .btn_video').on('click', function(){
        $('.cam').show();
        $('.connect .data').show();
        $('.connect .no_data').hide();
        $('.connect .emer_message .btn_video').hide();
        $('.connect .emer_message .btn_novideo').show();
    })

    $('.connect .emer_message .btn_novideo').on('click', function(){
        $('.cam').hide();
        $('.connect .data').hide();
        $('.connect .no_data').show();
        $('.connect .emer_message .btn_novideo').hide();
        $('.connect .emer_message .btn_video').show();
    })

    // 화상카메라 켜기
    $('.cam .btn_cam').on('click', function(){
        $('.cam .btn_cam').hide();
        $('.cam .btn_cam_off').show();
        $('.cam .my_cam .cam_parti').hide();
        $('.cam .my_cam .nocam_parti').show();
    })

    $('.cam .btn_cam_off').on('click', function(){
        $('.cam .btn_cam').show();
        $('.cam .btn_cam_off').hide();
        $('.cam .my_cam .cam_parti').show();
        $('.cam .my_cam .nocam_parti').hide();
    })

    $('.connect .emer_message .title .btn_video').on('click', function(){
        $('.connect .patient_view' ).width('1272px');
    })

    $('.connect .emer_message .title .btn_novideo').on('click', function(){
        $('.connect .patient_view').width('1428px');
    })

    $('.connect .btn_doctor_call').on('click', function(){
        $('.pop.conn_call .overlay').show();
    })

    $('.paramedic .header_right .btn_list .btn_end').on('click', function(){
        $('.pop.connect .overlay').show();
    })


    // connect fold full close
    // 환자상태
    $('.several .pati_stat .title .btn_fold').on('click', function(){
        $('.several .patient_status').toggle();
    })

    $('.several .pati_stat .title .btn_full').on('click', function(){
        $('.several .pati_stat').toggleClass('on');
        $('.several .patient_status').show();
    })

    $('.several .pati_stat .title .btn_close').on('click', function(){
        $('.several .pati_stat').hide();
    })

    $('.patient_view .btn_patient').on('click', function(){
        $('.several .pati_stat').show();
    })

    // 바이탈
    $('.several .vital .title .btn_close').on('click', function(){
        $('.several .vital').hide();
    })

    $('.patient_view .btn_vital').on('click', function(){
        $('.several .vital').show();
    })


     // 화상연결
    $('.several .connect_video .title .btn_fold').on('click', function(){
        $('.several .video_view').toggle();
    })

    $('.several .connect_video .title .btn_full').on('click', function(){
        $('.several .connect_video').toggleClass('on');
        $('.several .video_view').show();
    })

    $('.several .connect_video .title .btn_close').on('click', function(){
        $('.several .connect_video').hide();
    })

    $('.patient_view .btn_videocall').on('click', function(){
        $('.several .connect_video').show();
    })

    // 현장사진
    $('.several .scene_picture .title .btn_fold').on('click', function(){
        $('.several .swiper').toggle();
    })

    $('.several .scene_picture .title .btn_full').on('click', function(){
        $('.several .scene_picture').toggleClass('on');
        $('.several .swiper').show();
    })

    $('.several .scene_picture .title .btn_close').on('click', function(){
        $('.several .scene_picture').hide();
    })

    $('.patient_view .btn_picture').on('click', function(){
        $('.several .scene_picture').show();
    })




    // view별로 보기(탭)
        // 환자상태
        $('.connect_tab .btn_patient').on('click', function(){
            $('.connect_tab .vital, .connect_tab .connect_video, .connect_tab .scene_picture').hide();
            $('.connect_tab .pati_stat').show();
            $('.connect_tab .btn_patient').addClass('on');
            $('.connect_tab .btn_vital, .connect_tab .btn_videocall, .connect_tab .btn_picture').removeClass('on');
        })

        // 바이탈 보기
        $('.connect_tab .btn_vital').on('click', function(){
            $('.connect_tab .pati_stat, .connect_tab .connect_video, .connect_tab .scene_picture').hide();
            $('.connect_tab .vital').show();
            $('.connect_tab .btn_vital').addClass('on');
            $('.connect_tab .btn_patient, .connect_tab .btn_videocall, .connect_tab .btn_picture').removeClass('on');
        })

        // 화상연결
        $('.connect_tab .btn_videocall').on('click', function(){
            $('.connect_tab .pati_stat, .connect_tab .vital, .connect_tab .scene_picture').hide();
            $('.connect_tab .connect_video').show();
            $('.connect_tab .btn_videocall').addClass('on');
            $('.connect_tab .btn_patient, .connect_tab .btn_vital, .connect_tab .btn_picture').removeClass('on');
        })

        // 현장사진
        $('.connect_tab .btn_picture').on('click', function(){
            $('.connect_tab .pati_stat, .connect_tab .vital, .connect_tab .connect_video').hide();
            $('.connect_tab .scene_picture').show();
            $('.connect_tab .btn_picture').addClass('on');
            $('.connect_tab .btn_patient, .connect_tab .btn_vital, .connect_tab .btn_videocall').removeClass('on');
        })

    // view별로 보기(스크롤)
    $('.connect_scroll .pati_stat .btn_close').on('click', function(){
        $('.connect_scroll .pati_stat').hide();
    })

    $('.connect_scroll .vital .btn_close').on('click', function(){
        $('.connect_scroll .vital').hide();
    })

    $('.connect_scroll .connect_video .btn_close').on('click', function(){
        $('.connect_scroll .connect_video').hide();
    })

    $('.connect_scroll .scene_picture .btn_close').on('click', function(){
        $('.connect_scroll .scene_picture').hide();
    })


    $('.connect_scroll .btn_patient').on('click', function(){
        $('.connect_scroll .pati_stat').show();
    })

    $('.connect_scroll .btn_vital').on('click', function(){
        $('.connect_scroll .vital').show();
    })

    $('.connect_scroll .btn_videocall').on('click', function(){
        $('.connect_scroll .connect_video').show();
    })

    $('.connect_scroll .btn_picture').on('click', function(){
        $('.connect_scroll .scene_picture').show();
    })



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

$(function(){
    //  간호사 관리페이지 대시보드 아코디언
    $(".ward_count").click(function() {
        $(this).next(".patient_info").stop().slideToggle(300);
        $(this).toggleClass('on').siblings().removeClass('on');
        $(this).next(".patient_info").siblings(".patient_info").slideUp(300); // 1개씩 펼치기
    });

    // $("").on('click',function(){
    //     $(this).next(".con").slideToggle(100);
    //   });

    //  doctor 메인 캘린더 아코디언
    $(".calendar_con").click(function() {
        $(this).next(".calendar_container").stop().slideToggle(300);
        $(this).toggleClass('on').siblings().removeClass('on');
        $(this).next(".calendar_container").siblings(".calendar_container").slideUp(300); // 1개씩 펼치기
    });

    //  doctor 메인 협진내용 아코디언
    $(".case").click(function() {
        $(this).next(".case_cont").stop().slideToggle(300);
        $(this).toggleClass('on').siblings().removeClass('on');
        $(this).next(".case_cont").siblings(".case_cont").slideUp(300); // 1개씩 펼치기
    });
})
