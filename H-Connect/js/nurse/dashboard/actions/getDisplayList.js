const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

export async function getDisplayList(page, count) {
    let result = {};
    await serverController.ajaxAwaitController(
        'API/Manager/SelectDisplay',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            pageNumber: page,
            count: count,
        }),
        (res) => {
            if (res.result) {
                result = res.displayInfoList;
            }
        }
    );
    return result;
}
