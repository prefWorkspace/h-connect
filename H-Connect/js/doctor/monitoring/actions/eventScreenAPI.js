'use strict';

const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { renderNewEventScreen, renderPreEventScreen } = await import(
    importVersion(
        '/H-Connect/js/doctor/monitoring/renders/renderEventScreen.js'
    )
);

export async function updateBioSignalEvent(_bse, confirm) {
    const { bioSignalEventId, measurementCode } = _bse;
    const req = JSON.stringify({
        ...commonRequest(),
        measurementCode,
        bioSignalEventId,
        confirm,
    });

    await serverController.ajaxAwaitController(
        'API/BioSignal/UpdateBioSignalEvent',
        'POST',
        req,
        (res) => {
            if (res.result) {
            }
        },
        (err) => {
            alert(`서버 통신에 실패하였습니다 (Error: ${err})`);
        }
    );
}

export async function deleteBioSignalEvent(_bse) {
    const { bioSignalEventId, measurementCode } = _bse;
    const req = JSON.stringify({
        ...commonRequest(),
        measurementCode,
        bioSignalEventId,
    });
    await serverController.ajaxAwaitController(
        'API/BioSignal/DeleteBioSignalEvent',
        'POST',
        req,
        (res) => {
            if (res.result) {
            }
        },
        (err) => {
            alert(`서버 통신에 실패하였습니다 (Error: ${err})`);
        }
    );
}

export async function insertNewEventScreen(_bse) {
    await renderNewEventScreen(_bse);
    let scale = 100;
    $(document).off('click', '#cur_plus');
    $(document).on('click', '#cur_plus', () => {
        scale += 10;
        $('#cur_graphScale').text(`${scale}%`);
        $('#cur_graph').width($('#cur_graph').width() * 1.1);
        const graphMargin =
            String(
                Number($('#cur_graph').css('margin-top').replace('px', '')) - 2
            ) + 'px';
        $('#cur_graph').css('margin-top', graphMargin);
    });
    $(document).off('click', '#cur_minus');
    $(document).on('click', '#cur_minus', () => {
        scale -= 10;
        $('#cur_graphScale').text(`${scale}%`);
        $('#cur_graph').width($('#cur_graph').width() / 1.1);
        const graphMargin =
            String(
                Number($('#cur_graph').css('margin-top').replace('px', '')) + 2
            ) + 'px';
        $('#cur_graph').css('margin-top', graphMargin);
    });
}

export async function insertPreEventScreen(_bse) {
    await renderPreEventScreen(_bse);
}
