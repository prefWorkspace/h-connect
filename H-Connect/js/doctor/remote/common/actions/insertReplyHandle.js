'use strict';

const { insertConsultReply, updateConsultConfirm } = await import(
    importVersion('/H-Connect/js/doctor/remote/common/actions/remoteAPI.js')
);

// 체크박스 유효성
export async function insertReplyHandle() {
    // section right ask_request
    let isChecked = false;
    const buttonTitle = $('.section .btn_reply').text();
    $('.section .tab-content .green_custom').each((index, value) => {
        const _isChecked = $(value).is(':checked');
        isChecked = isChecked || _isChecked;
    });

    if (buttonTitle === '회신완료') {
        return;
    }

    if (isChecked) {
        $('.section .btn_reply').attr('disabled', false);
        $('.section .btn_reply').addClass('active');
        $('.section .btn_decide').attr('disabled', false);
    }

    if (!isChecked) {
        $('.section .btn_reply').attr('disabled', true);
        $('.section .btn_reply').removeClass('active');
        $('.section .btn_decide').attr('disabled', true);
    }
}

// 회신하기 및 일정 확인 버튼 이벤트
async function checkButtonHandle(_target) {
    let consultId;
    let orderNoForAPI;
    let resultAPI;
    const scheduleInfo = [];
    const isentState = $(_target).data('isentstate');
    const consultChannel =
        isentState === 1 ? 'consultChannel0' : 'consultChannel1';
    const finishedButtonText = '확정완료';

    $(`#${consultChannel} .tab-content .green_custom`).each((index, value) => {
        const _isChecked = $(value).is(':checked');
        const orderNo = $(value).data('caseno');
        consultId = $(value).data('consultid');
        if (_isChecked) {
            orderNoForAPI = orderNo;
            const consultScheduleInfo = { orderNo };
            scheduleInfo.push(consultScheduleInfo);
        }
    });

    if (scheduleInfo.length === 0) {
        return;
    }

    if (isentState === 0) {
        const { result } = await insertConsultReply(consultId, scheduleInfo);
        resultAPI = result;
    }

    if (isentState === 1) {
        const { result } = await updateConsultConfirm(consultId, orderNo);
        resultAPI = result;
    }

    if (resultAPI) {
        $(_target).text(finishedButtonText);
        $(_target).attr('disabled', true);
        // $(`#${consultChannel} .btn_reply`).removeClass('active');
        $(_target).removeClass('active');
        $(`#${consultChannel} .tab-content .green_custom`).each(
            (index, value) => {
                $(value).attr('checked', false);
            }
        );
    } else {
        alert('회신에 실패하였습니다');
    }
}

// 회신하기 버튼 이벤트
$('.section .btn_reply').on('click', async function (e) {
    const { target } = e;
    await checkButtonHandle(target);
    // let consultId;
    // const scheduleInfo = [];
    // $('#consultChannel1 .tab-content .green_custom').each((index, value) => {
    //     const _isChecked = $(value).is(':checked');
    //     const orderNo = $(value).data('caseno');
    //     consultId = $(value).data('consultid');
    //     if (_isChecked) {
    //         const consultScheduleInfo = { orderNo };
    //         scheduleInfo.push(consultScheduleInfo);
    //     }
    // });

    // if (scheduleInfo.length === 0) {
    //     return;
    // }

    // const { result } = await insertConsultReply(consultId, scheduleInfo);

    // if (result) {
    //     $(this).text('회신완료');
    //     $(this).attr('disabled', true);
    //     $('#consultChannel1 .btn_reply').removeClass('active');
    //     $('#consultChannel1 .tab-content .green_custom').each(
    //         (index, value) => {
    //             $(value).attr('checked', false);
    //         }
    //     );
    // } else {
    //     alert('회신에 실패하였습니다');
    // }
});

// 일정 확정 버튼 이벤트
$('.section .btn_decide').on('click', async function (e) {
    const { target } = e;
    await checkButtonHandle(target);
});

// 시간표보기에서 가능 시간 클릭시 리스트 위에 나타내기
$('body').on('click', '.section #metab-2 .inner .num', function () {
    const ORDERNO = $(this).data('orderno');
    $('#metab-1 > div').each((index, value) => {
        if ($(value).data('orderno') === ORDERNO) {
            const clone = $(value).clone();
            $('#metab-2 .select_week').html(clone);
            $('#metab-2 .select_week > div').show();
            $('#metab-2').addClass('on');
            return;
        }
    });
});

// 체크 박스 핸들
$('body').on(
    'click',
    '.section .tab-content .green_custom',
    async () => await insertReplyHandle()
);

// await insertReplyHandle();
