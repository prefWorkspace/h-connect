// 헤더 어카운트 정보 클릭시 팝업 띄움
$('.pc_header .btn_logout')
    .off()
    .on('click', function () {
        $('.pop.logout').fadeToggle();
    });
