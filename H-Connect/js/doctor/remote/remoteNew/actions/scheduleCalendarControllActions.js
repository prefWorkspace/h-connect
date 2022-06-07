/* 시간표 보기 > 2주 보기 / 4주 보기 */
$('.doctor .btn_two').on('click', function () {
    $('.doctor .two').show();
    $('.doctor .four').hide();
    $(this).addClass('on');
    $('.doctor .btn_four').removeClass('on');
});

$('.doctor .btn_four').on('click', function () {
    $('.doctor .four').css('display', 'flex');
    $(this).addClass('on');
    $('.doctor .btn_two').removeClass('on');
});

/* 달력보기 / 시간표 보기 */
$('.attendee > .title .btn_list button').on('click', function () {
    $(this).addClass('on');
    $('.attendee> .title .btn_list button').not(this).removeClass('on');
});
$('.attendee .title .btn_list .btn_week').on('click', function () {
    $('.attendee .cal_container').hide();
    $('.attendee .weekly').show();
    $('.attendee .choice_staff').addClass('on');
});
$('.attendee .title .btn_list .btn_cal').on('click', function () {
    $('.attendee .cal_container').show();
    $('.attendee .weekly').hide();
    $('.attendee .choice_staff').removeClass('on');
});
