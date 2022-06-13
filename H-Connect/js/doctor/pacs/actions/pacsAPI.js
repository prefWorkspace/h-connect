'use strict';

const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const userData = localStorageController.getLocalS('userData');
const {
    userCode: requester,
    organizationCode,
    id: userId,
} = JSON.parse(userData);

// PACS 목록 LIst
export async function selectPACSList() {
    
    const obj = {
        requester,
        userId,
        organizationCode,
    };

    return serverController.ajaxAwaitController(
        'API/Doctor/SelectHisPacsinfo',
        'POST',
        JSON.stringify(obj),
        (res) => {
            if (res.result) {
            } else {
            }
        },
        (err) => console.log(err)
    );
}
