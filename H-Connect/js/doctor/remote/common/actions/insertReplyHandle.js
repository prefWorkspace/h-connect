'use strict';

const { insertConsultReply } = await import(
    importVersion('/H-Connect/js/doctor/remote/common/actions/remoteAPI.js')
);

export async function insertReplyHandle() {
    $('body').on('click', '#consultChannel1 #tab-1 .green_custom', function () {
        let isChecked = false;
        const buttonTitle = $('#consultChannel1 .btn_reply').text();
        $('#consultChannel1 #tab-1 .green_custom').each((index, value) => {
            const _isChecked = $(value).is(':checked');
            isChecked = isChecked || _isChecked;
        });

        if (buttonTitle === '회신완료') {
            return;
        }

        if (isChecked) {
            $('#consultChannel1 .btn_reply').attr('disabled', false);
            $('#consultChannel1 .btn_reply').addClass('active');
        }

        if (!isChecked) {
            $('#consultChannel1 .btn_reply').attr('disabled', true);
            $('#consultChannel1 .btn_reply').removeClass('active');
        }
    });
}

$('#consultChannel1 .btn_reply').on('click', async function () {
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

await insertReplyHandle();
