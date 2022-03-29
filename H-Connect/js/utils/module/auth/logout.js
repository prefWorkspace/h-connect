'use strict';
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { sessionController } = await import(
    importVersion('/H-Connect/js/utils/controller/sessionController.js')
);
const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

$('#header .pop.logout .btn_bye').on('click', function () {
    const req = JSON.stringify({
        requester,
        ...commonRequest(),
    });

    serverController.ajaxAwaitController(
        'API/Account/LogoutHIS',
        'POST',
        req,
        (res) => {
            if (res.result) {
                $('.pop.logout').fadeOut();
                sessionController.removeSession('accesToken');
                localStorageController.removeLocalS('userData');
                location.href = '/index.html';
            }
        }
    );
});
