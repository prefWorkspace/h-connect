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

// SelectHisExinfo1
export async function selectHisExinfo1() {
    
    const obj = {
        requester,
        userId,
        organizationCode,
    };

    return serverController.ajaxAwaitController(
        'API/Doctor/SelectHisExinfo1',
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

// SelectHisExinfo2
export async function selectHisExinfo2() {
    
    const obj = {
        requester,
        userId,
        organizationCode,
    };

    return serverController.ajaxAwaitController(
        'API/Doctor/SelectHisExinfo2',
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

// SelectHisExinfo3
export async function selectHisExinfo3() {
    
    const obj = {
        requester,
        userId,
        organizationCode,
    };

    return serverController.ajaxAwaitController(
        'API/Doctor/SelectHisExinfo3',
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

// SelectHisExinfo5
export async function selectHisExinfo5() {
    
    const obj = {
        requester,
        userId,
        organizationCode,
    };

    return serverController.ajaxAwaitController(
        'API/Doctor/SelectHisExinfo5',
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

function logging(result, list, no){
    console.log('selectHisExinfo'+no+' result : ' + result);
    console.log('selectHisExinfo'+no+' list : ');
    console.log(list);
}
// selectHisExinfos 1~5 테스트
async function init() {
    const { result: result1, exinfoList: list1 } = await selectHisExinfo1();
    logging(result1, list1, 1);
    const { result: result2, exinfoList: list2 } = await selectHisExinfo2();
    logging(result2, list2, 2);
    const { result: result3, exinfoList: list3 } = await selectHisExinfo3();
    logging(result3, list3, 3);
    const { result: result5, exinfoList: list5 } = await selectHisExinfo5();
    logging(result5, list5, 5);
}

await init();
