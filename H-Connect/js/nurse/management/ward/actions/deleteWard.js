'use strict';
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
import { CONSTANT } from '../renders/constant.js?v=2022.03.25.12.01';
import { selectWard } from './selectWard.js?v=2022.03.25.12.01';
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
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
