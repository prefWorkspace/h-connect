'use strict';

const { insertConsultReply } = await import(
    importVersion('/H-Connect/js/doctor/remote/common/actions/remoteAPI.js')
);

export async function insertReplyHandle() {
    // section right ask_request
    let isChecked = false;
    const buttonTitle = $('.section.ask_request .btn_reply').text();
    $('.section.ask_request #tab-1 .green_custom').each((index, value) => {
        const _isChecked = $(value).is(':checked');
        isChecked = isChecked || _isChecked;
    });

    if (buttonTitle === '회신완료') {
        return;
    }

    if (isChecked) {
        $('.section.ask_request .btn_reply').attr('disabled', false);
        $('.section.ask_request .btn_reply').addClass('active');
    }

    if (!isChecked) {
        $('.section.ask_request .btn_reply').attr('disabled', true);
        $('.section.ask_request .btn_reply').removeClass('active');
    }
}

$('.section.ask_request .btn_reply').on('click', async function () {
    let consultId;
    const scheduleInfo = [];
    $('#consultChannel1 #tab-1 .green_custom').each((index, value) => {
        const _isChecked = $(value).is(':checked');
        const orderNo = $(value).data('caseno');
        consultId = $(value).data('consultid');
        if (_isChecked) {
            const consultScheduleInfo = { orderNo };
            scheduleInfo.push(consultScheduleInfo);
        }
    });

    const { result } = await insertConsultReply(consultId, scheduleInfo);

    if (result) {
        $(this).text('회신완료');
        $(this).attr('disabled', true);
        $('#consultChannel1 .btn_reply').removeClass('active');
        $('#consultChannel1 #tab-1 .green_custom').each((index, value) => {
            $(value).attr('checked', false);
        });
    } else {
        alert('회신에 실패하였습니다');
    }
});

$('body').on('click', '.section.me_request #metab-2 .inner .num', function () {
    const ORDERNO = $(this).data('orderno');
    const list = $('#metab-1 > div');
    const dateTimeList = [...list];
    const clickedTime = dateTimeList.find(
        (item) => $(item).data('orderno') === ORDERNO
    );
    $('#metab-2 .select_week').html(clickedTime);
    $('#metab-2 .select_week > div').show();
    $('#metab-2').addClass('on');
});

$('body').on(
    'click',
    '.section.ask_request #tab-1 .green_custom',
    async () => await insertReplyHandle()
);

await insertReplyHandle();
