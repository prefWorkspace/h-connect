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

const { session_renew } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

//병동 병실 병상 조회하는 함수
const { userCode: requester, organizationCode: organization } = JSON.parse(
    localStorageController.getLocalS('userData')
);

export async function insertDisplay(displayNumber, displayName = '') {
    const req = JSON.stringify({
        requester,
        organization,
        displayNumber,
        displayName,
        ...commonRequest(),
    });

    return await serverController.ajaxAwaitController(
        'API/Manager/InsertDisplay',
        'POST',
        req,
        (res) => {
            if (res.result) {
                console.log("생성!")
            } else {
                session_renew(res);
            }
        }
    );
}

export async function selectDisplay(pageNumber, count){
    const req = JSON.stringify({
        requester,
        organization,
        pageNumber,
        count,
        ...commonRequest(),
    });

    return await serverController.ajaxAwaitController(
        'API/Manager/SelectDisplay',
        'POST',
        req,
        (res) => {
            if (res.result) {
            } else {
                session_renew(res);
            }
        }
    );
};

export async function selectDisplaycodeList(pageNumber, count){
    const req = JSON.stringify({
        requester,
        organization,
        pageNumber,
        count,
        ...commonRequest(),
    });

    let result = [];
    await serverController.ajaxAwaitController(
        'API/Manager/SelectDisplay',
        'POST',
        req,
        (res) => {
            if (res.result) {
                res.displayInfoList.forEach(display => result.push(display.displayCode))
            } else {
                session_renew(res);
            }
        }
    );
    return result;
};

export const selectDisplayDetail = async (displayCode) => {
    const req = JSON.stringify({
        requester,
        organization,
        displayCode,
        ...commonRequest(),
    });

    return await serverController.ajaxAwaitController(
        'API/Manager/SelectDisplayDetail',
        'POST',
        req,
        (res) => {
            if (res.result) {
            } else {
                session_renew(res);
            }
        }
    );
}
export const updateDisplayName = async (displayCode, displayName) => {
    const req = JSON.stringify({
        requester,
        organization,
        displayCode,
        displayName,
        ...commonRequest(),
    });

    return await serverController.ajaxAwaitController(
        'API/Manager/UpdateDisplay',
        'POST',
        req,
        (res) => {
            if (res.result) {
            } else {
                session_renew(res);
            }
        }
    );
};

export const deleteDisplay = async (displayCode) => {
    const req = JSON.stringify({
        requester,
        organization,
        displayCode,
        ...commonRequest(),
    });

    return await serverController.ajaxAwaitController(
        'API/Manager/DeleteDisplay',
        'POST',
        req,
        (res) => {
            if (res.result) {
            } else {
                session_renew(res);
            }
        }
    );
};
