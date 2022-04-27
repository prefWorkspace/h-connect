'use strict';

const { createDevice } = await import(
    importVersion('/H-Connect/js/nurse/management/device/actions/deviceAPI.js')
);

const { select_device } = await import(
    importVersion('/H-Connect/js/nurse/management/device/actions/deviceAPI.js')
);

const { delete_devive } = await import(
    importVersion('/H-Connect/js/nurse/management/device/actions/deviceAPI.js')
);

const { select_device_unused } = await import(
    importVersion('/H-Connect/js/nurse/management/device/actions/deviceAPI.js')
);

const { cancel_device_unused } = await import(
    importVersion('/H-Connect/js/nurse/management/device/actions/deviceAPI.js')
);

//장치 등록 이벤트=====================================================
$('.pop.regi_device .overlay .btn_list .btn_check').on('click', createDevice);

// $('.pop.re_device .overlay .btn_check').on('click');

//장치 삭제 이벤트====================================================
$('.pop.delete_regi .overlay .btn_list .btn_cut').on('click', delete_devive);

//장치 취소 이벤트====================================================
$('.pop.delete_return .overlay .btn_list .btn_cut').on(
    'click',
    cancel_device_unused
);

//셀렉트 박스 옵션 선택 했을 경우=======================================
$('.section.new_device .device_list .select_device .device_optionItem').on(
    'click',
    function () {
        $('.section.new_device .device_list .search_container input').val('');
        const deviceType = $(this).data('type');
        const deviceName = $(this).text();
        select_device(deviceType);
        $(this).parent().parent().find('.label').text(deviceName);
        $(this).parent().parent().removeClass('active');
    }
);

//셀렉트 박스 옵션 선택 했을 경우
$('.section.return_device .device_list .select_return .return_list').on(
    'click',
    function () {
        $('.section.return_device .device_list .search_container input').val(
            ''
        );
        const deviceType = $(this).data('type');
        const deviceName = $(this).text();
        select_device_unused(deviceType, null);
        $(this).parent().parent().find('.label').text(deviceName);
        $(this).parent().parent().removeClass('active');
    }
);

// 추가 장치 요청
$('.section.new_device .btn_list .btn_add_device')
    .off()
    .on('click', function () {
        $('.pop.add_device .overlay').fadeIn();
    });
