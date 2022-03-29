'use strict';
import { commonRequest } from '../../../../utils/controller/commonRequest.js?v=2022.01.17.11.33';
import { serverController } from '../../../../utils/controller/serverController.js?v=2022.01.17.11.33';
import { selectWard } from './selectWard.js?v=2022.03.25.12.01';
import { CONSTANT } from '../renders/constant.js?v=2022.03.25.12.01';

//수정 api
function updateWardAPI(wardCode, orderNumber, deactivate) {
    const _ward = $('.update_ward .content #ward_Name').val();
    const _req = JSON.stringify({
        wardCode,
        orderNumber,
        deactivate,
        ward: _ward,
        nickName: 'Update',
        requester: CONSTANT.userCode,
        organizationCode: CONSTANT.organizationCode,
        ...commonRequest(),
    });
    serverController.ajaxAwaitController(
        'API/Manager/UpdateWard',
        'POST',
        _req,
        (res) => {
            if (res.result) {
                $('div').remove('.nurse .ward .cont');
                $('.pop.update_ward .overlay').fadeOut();
                selectWard();
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

//병동 수정
export function updateWard() {
    let _wardCode;
    let _orderNumber;
    let _deactivate;
    $('.nurse .ward .cont .ward_list .btn_list .btn_modify')
        .off()
        .on('click', function () {
            $('.pop.update_ward .overlay').fadeIn();
            $('.nurse .hospital_room .title .btn_new_room').attr(
                'disabled',
                false
            );
            _wardCode = $(this).data('wardcode');
            _orderNumber = $(this).data('on');
            _deactivate = $(this).data('deactivate');
        });

    $('.update_ward .btn_list #ward_update_Button').on('click', () =>
        updateWardAPI(_wardCode, _orderNumber, _deactivate)
    );
    //enter키 누를때 이벤트 발생
    $('.update_ward #ward_Name').keydown(function (e) {
        if (e.key === 'Enter') {
            updateWardAPI(_wardCode, _orderNumber, _deactivate);
        }
    });
}
