'use strict';

const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

// SelectBioSignalEventSimpleList
export async function selectBioSignalEventSimpleList(confirm) {
    const req = JSON.stringify({
        confirm,
        order: 'DESC',
        ...commonRequest(),
    });

    let result = {};

    await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBioSignalEventSimpleList',
        'POST',
        req,
        (res) => {
            result = res;
        },
        (err) => {
            alert(`서버 통신에 실패하였습니다 (Error: ${err})`);
        }
    );

    return result;
}

// SelectBioSignalEventSimplePage
export async function selectBioSignalEventSimplePage(confirm, pageNumber, count) {
    const req = JSON.stringify({
        ...commonRequest(),
        // confirm
        pageNumber,
        count,
        order: 'DESC',
    });

    let result = {};
    console.log(req);
    await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBioSignalEventSimplePage',
        'POST',
        req,
        (res) => {
            if (res.result) {
                result = res;
            }
        },
        (err) => {
            alert('서버 통신에 실패하였습니다');
        }
    );
}

// SelectBioSignalEvent
export async function selectBioSignalEvent(_bse) {
    const { bioSignalEventId, measurementCode } = _bse;
    const req = JSON.stringify({
        ...commonRequest(),
        bioSignalEventId,
        measurementCode,
    });

    let result = {};

    await serverController.ajaxAwaitController(
        'API/BioSignal/SelectBioSignalEvent',
        'POST',
        req,
        (res) => {
            if (res.result) {
                result = res.bioSignalEvent;
            }
        },
        (err) => {
            alert(`서버 통신에 실패하였습니다 (Error: ${err})`);
        }
    );

    return result;
}
