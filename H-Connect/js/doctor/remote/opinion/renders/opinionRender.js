'use strict';

const { errorText } = await import(
    importVersion('/H-Connect/js/common/errorText/errorText.js')
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

async function opinionClick() {
    const consultId = $(this).data('consultid');
    const { result, list } =
        await selectRealTimeAndOpinionAndEmergencyConsultView(consultId);

    if (result && list.length > 0) {
        // 데이터 나오면 밑에 else 처리를 이름만 바꿔서 복붙
    } else {
        let html = '';
        const { caseInfoList, memberInfoList, startDatetime, endDatetime } =
            fakeSelectRealTimeAndOpinionAndEmergencyConsultView;
        const doctorCount =
            memberInfoList.length > 1
                ? `외 ${memberInfoList.length - 1}명`
                : '';
        $('#opinion_member').text(
            `${memberInfoList[0].doctorName} ${memberInfoList[0].doctorLevelName} ${doctorCount}`
        );

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
    const query = getParams('consultId');

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
    $('.remote_request .list .opinoin_list .row').on('click', opinionClick);

    if (query !== '') {
        $('.remote_request .list .opinoin_list .row').each(
            async (index, value) => {
                const consultId = $(value).data('consultid');
                if (consultId === query) {
                    $(value).addClass('on');
                    await opinionClick(consultId);
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
            $(value).addClass('on');
            await opinionClick(consultId);
            // $(`#isentstate${isentState}`).show();
            return;
        }
    });
}
