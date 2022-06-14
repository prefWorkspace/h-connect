'use strict';

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);

const { iMadeOpinionTemplate, opinionTemplate } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/opinion/templates/opinionTemplate.js'
    )
);

const { opinionCaseInfoDetailTEmplate } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/opinion/templates/opinionDetailTemplate.js'
    )
);

const { selectRealTimeAndOpinionAndEmergencyConsultView } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/actions/hWorksAPI.js')
);

function startButtonHandle(_endDateTime, _unReplyCount) {
    const rightNow = new Date();
    const endDateTime = new Date(_endDateTime);

    if (rightNow.getTime() > endDateTime.getTime()) {
        $('.find_request .btn_colla').text('마감');
        $('.find_request .btn_colla').attr('disabled', true);
        return;
    }

    if (_unReplyCount === 0) {
        $('.find_request .btn_colla').text('시작하기');
        $('.find_request .btn_colla').attr('disabled', false);
        return;
    }

    if (_unReplyCount > 0) {
        $('.find_request .btn_colla').text('확인하기');
        $('.find_request .btn_colla').attr('disabled', false);
        return;
    }
}

async function opinionClick(
    value = undefined,
    _unReplyCount = null,
    _endDateTime = null
) {
    const consultId = $(value).data('consultid');
    const unReplyCount = _unReplyCount ?? $(this).data('unreplycount');
    const endDateTime = _endDateTime ?? $(this).data('enddatetime');
    const isentState = $(value).data('isentstate');

    const { result, list } =
        await selectRealTimeAndOpinionAndEmergencyConsultView(consultId);
    if (result) {
        let html = '';
        const { caseInfoList, memberInfoList, startDatetime, endDatetime } =
            list[0];

        startButtonHandle(endDateTime, unReplyCount);

        const doctorCount =
            memberInfoList.length > 1
                ? `외 ${memberInfoList.length - 1}명`
                : '';
        const memberTitle =
            isentState === 1
                ? '내가 보냄'
                : `${memberInfoList[0].doctorName} ${memberInfoList[0].doctorLevelName} ${doctorCount}`;

        $('#opinion_member').text(memberTitle);

        $('#noCheck_unReplyCount').text(unReplyCount);

        $('#startTime').text(moment(startDatetime).format('YY.MM.DD  HH:mm'));
        $('#endTime').text(moment(endDatetime).format('YY.MM.DD  HH:mm'));

        for (let i = 0; i < caseInfoList.length; i++) {
            html += opinionCaseInfoDetailTEmplate(caseInfoList[i]);
        }

        $('.find_request .collabor_wrap .cont_list').html(html);
    }
}

export function opinionRender(_list) {
    let html = '';
    const { getParams } = history;
    const queryConsultId = getParams('consultId');
    const queryCaseNo = getParams('caseNo');

    if (!_list || _list.length === 0) {
        html = errorText();
        $('.remote_request .list .opinoin_list').html(html);
        return;
    }

    for (let i = 0; i < _list.length; i++) {
        const { isentState } = _list[i];

        if (isentState === 1) {
            html += iMadeOpinionTemplate(_list[i]);
        } else {
            html += opinionTemplate(_list[i]);
        }
    }

    $('.remote_request .list .opinoin_list').html(html);
    $('.remote_request .list .opinoin_list .row').on('click', function () {
        const target = this;
        opinionClick(target);
    });

    if (queryConsultId !== '' && queryCaseNo !== '') {
        $('.remote_request .list .opinoin_list .row').each(
            async (index, value) => {
                const consultId = $(value).data('consultid');
                const caseNo = $(value).data('caseno') + '';
                const unReplyCount = $(value).data('unreplycount');
                const endDateTime = $(value).data('enddatetime');
                if (consultId === queryConsultId && caseNo === queryCaseNo) {
                    $(value).addClass('on');
                    await opinionClick(value, unReplyCount, endDateTime);
                }
            }
        );
        return;
    }

    $('.remote_request .list .opinoin_list .row').each(async (index, value) => {
        if (index === 0) {
            const unReplyCount = $(value).data('unreplycount');
            const endDateTime = $(value).data('enddatetime');
            $(value).addClass('on');
            await opinionClick(value, unReplyCount, endDateTime);
            return;
        }
    });
}
