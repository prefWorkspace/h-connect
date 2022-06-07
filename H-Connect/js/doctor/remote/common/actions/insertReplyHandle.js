'use strict';

const { insertConsultReply, updateConsultConfirm } = await import(
    importVersion('/H-Connect/js/doctor/remote/common/actions/remoteAPI.js')
);

// 체크박스 유효성
export async function insertReplyHandle(e) {
    let isChecked = false;
    const $thisCaseNumber = $(e.target).data('caseno');
    const $isentState = $(e.target).data('isentstate');
    const classTitle =
        $isentState === 1
            ? `.section.me_request .tab-content .green_custom`
            : `.section.ask_request .tab-content .green_custom`;
    const buttonTitle = $('.section .btn_reply').text();

    $(classTitle).each((index, value) => {
        if ($isentState === 1) {
            if (
                $(value).data('caseno') === $thisCaseNumber &&
                $(value).is(':checked')
            ) {
                isChecked = isChecked || $(value).is(':checked');
                $(value).prop('checked', true);
            } else {
                isChecked = isChecked || $(value).is(':checked');
                $(value).prop('checked', false);
            }
        }

        if ($isentState === 0) {
            isChecked = isChecked || $(value).is(':checked');
        }
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
        const { result } = await updateConsultConfirm(consultId, orderNoForAPI);
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
});

// 일정 확정 버튼 이벤트
$('.section .btn_decide').on('click', async function (e) {
    const { target } = e;
    await checkButtonHandle(target);
});

// 시간표보기에서 가능 시간 클릭시 리스트 위에 나타내기
$('body').on('click', '.section #metab-2 .inner .num', function () {
    const ORDERNO = $(this).data('orderno');
    if (!ORDERNO) return;

    $(`#metab-2 .select_week > div`).hide();
    $(`#metab-2 .select_week div[data-orderno=${ORDERNO}]`).show();
});

// 체크 박스 핸들
$('body').on(
    'click',
    '.section .tab-content .green_custom',
    async (e) => await insertReplyHandle(e)
);
