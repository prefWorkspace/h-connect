$('.pc_header .btn_logout')
    .off()
    .on('click', function () {
        $('.pop.logout').fadeToggle();
    });
