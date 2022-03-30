'use strict';
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

const { CONSTANT } = await import(
    importVersion('/H-Connect/js/nurse/management/ward/renders/constant.js')
);
const { selectWard } = await import(
    importVersion('/H-Connect/js/nurse/management/ward/actions/selectWard.js')
);
const { userCode: requester, organizationCode } = CONSTANT.userData;

export function deleteWard() {
    let wardCode;
    $('.btn_delete').on('click', function () {
        wardCode = $(this).data('wardcode');
        $('.pop.delete.delete_ward .overlay').fadeIn();
    });

    $('.pop.delete_ward .btn_cut').on('click', function () {
        const req = JSON.stringify({
            requester,
            organizationCode,
            wardCode,
            ...commonRequest(),
        });

        serverController.ajaxAwaitController(
            'API/Manager/DeleteWard',
            'POST',
            req,
            (res) => {
                console.log(res);
                if (res.result) {
                    $('.nurse .ward .cont .ward_list').hide();
                    $('.pop.delete .overlay').fadeOut();
                    // location.reload();
                    $('div').remove('.nurse .ward .cont');
                    selectWard();
                }
            },
            (err) => {
                console.log(err);
            }
        );
    });
}
