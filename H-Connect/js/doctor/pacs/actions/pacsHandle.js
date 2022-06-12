'use strict';

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const { selectPACSList } = await import(
    importVersion(
        '/H-Connect/js/doctor/pacs/actions/pacsAPI.js'
    )
);

const { pacsListRender } = await import(
    importVersion(
        '/H-Connect/js/doctor/pacs/renders/pacsListRender.js'
    )
);

// PACS 목록 페이지 init 함수
async function init() {
    // PACS 목록 조회
    const { result: pacsResult, pacs: pacsList } = await selectPACSList();

    if (!pacsResult) {
        return;
    }
    // PACS 목록 렌더링
    pacsListRender(pacsList);
}

await init();
