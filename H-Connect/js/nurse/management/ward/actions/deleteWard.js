'use strict';
import { commonRequest } from '../../../../utils/controller/commonRequest.js?v=2022.01.17.11.33';
import { CONSTANT } from '../renders/constant.js?v=2022.03.25.12.01';
import { selectWard } from './selectWard.js?v=2022.03.25.12.01';
import { serverController } from '../../../../utils/controller/serverController.js?v=2022.01.17.11.33';

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
