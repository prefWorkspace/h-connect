'use strict';
import { commonRequest } from '../../../../utils/controller/commonRequest.js';
import { CONSTANT } from '../renders/constant.js';
import { selectWard } from './selectWard.js';
import { serverController } from '../../../../utils/controller/serverController.js';

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