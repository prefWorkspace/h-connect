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

const { fakeSelectRealTimeAndOpinionAndEmergencyConsultView } = await import(
    importVersion('/H-Connect/js/doctor/hworks/session/mok.js')
);

async function opinionClick(_consultId = null, _unReplyCount = null) {
    const consultId = _consultId || $(this).data('consultid');
    const unReplyCount = String(_unReplyCount) || $(this).data('unreplycount');

    const { result, list } =
        await selectRealTimeAndOpinionAndEmergencyConsultView(consultId);

    if (result) {
        // 데이터 나오면 밑에 else 처리를 이름만 바꿔서 복붙
        let html = '';
        const { caseInfoList, memberInfoList, startDatetime, endDatetime } =
            list[0];
        // fakeSelectRealTimeAndOpinionAndEmergencyConsultView;

        const doctorCount =
            memberInfoList.length > 1
                ? `외 ${memberInfoList.length - 1}명`
                : '';
        $('#opinion_member').text(
            `${memberInfoList[0].doctorName} ${memberInfoList[0].doctorLevelName} ${doctorCount}`
        );

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
    $('.remote_request .list .opinoin_list .row').on('click', () =>
        opinionClick()
    );

    if (queryConsultId !== '' && queryCaseNo !== '') {
        $('.remote_request .list .opinoin_list .row').each(
            async (index, value) => {
                const consultId = $(value).data('consultid');
                const caseNo = $(value).data('caseno') + '';
                const unReplyCount = $(value).data('unreplycount');
                if (consultId === queryConsultId && caseNo === queryCaseNo) {
                    $(value).addClass('on');
                    await opinionClick(consultId, unReplyCount);
                    // const isentState = $(value).data('isentstate');
                    // $(`#isentstate${isentState}`).show();
                }
            }
        );
        return;
    }

    $('.remote_request .list .opinoin_list .row').each(async (index, value) => {
        if (index === 0) {
            const consultId = $(value).data('consultid');
            const unReplyCount = $(value).data('unreplycount');
            $(value).addClass('on');
            await opinionClick(consultId, unReplyCount);
            // $(`#isentstate${isentState}`).show();
            return;
        }
    });
}
