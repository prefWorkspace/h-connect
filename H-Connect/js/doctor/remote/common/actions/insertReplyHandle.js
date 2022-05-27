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
        console.log('isChecked===');
        console.log(isChecked);

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
        const caseNo = $(value).data('caseno');
        consultId = $(value).data('consultid');
        if (_isChecked) {
            const consultScheduleInfo = { caseNo };
            scheduleInfo.push(consultScheduleInfo);
        }
    });
    console.log('scheduleInfo===');
    console.log(scheduleInfo);

    const { result } = await insertConsultReply(consultId, scheduleInfo);
    console.log('result===');
    console.log(result);

    if (result) {
        $(this).text('회신완료');
        $(this).attr('disabled', true);
    } else {
        alert('회신에 실패하였습니다');
    }
});

await insertReplyHandle();
