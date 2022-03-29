'use strict';
import { commonRequest } from '../../../../utils/controller/commonRequest.js?v=2022.01.17.11.33';
import { serverController } from '../../../../utils/controller/serverController.js?v=2022.01.17.11.33';
import { CONSTANT } from '../renders/constant.js?v=2022.03.25.12.01';
import { selectSickRoom } from './selectSickRoom.js?v=2022.03.25.12.01';

const { userCode: requester, organizationCode } = CONSTANT.userData;

export function updateSickRoom(_wardCode) {
    let sickRoomCode;
    let wardCode;
    $('.nurse .hospital_room .cont .ward_list .btn_list .btn_modify').on(
        'click',
        function () {
            $('.pop.update_room .overlay').fadeIn();
            sickRoomCode = $(this).data('sickroomcode');
            wardCode = $(this).data('wardcode');
        }
    );

    $('.pop.update_room .overlay .btn_list .btn_check').on(
        'click',
        function () {
            const sickRoom = $(
                '.pop.update_room .overlay .pop_cont .content input'
            ).val();
            const numberPatientRoom = +$(
                '.pop.update_room .overlay .pop_cont .content .selectBox2 .room_label'
            ).data('number');
            const orderNumber =
                $(
                    '.section.right.hospital_room .container .cont .container .ward_list'
                ).length + 1;

            const req = JSON.stringify({
                requester,
                organizationCode,
                sickRoom,
                wardCode,
                sickRoomCode,
                nickname: '',
                deactivate: 0,
                orderNumber,
                numberPatientRoom,
                ...commonRequest(),
            });

            serverController.ajaxAwaitController(
                'API/Manager/UpdateSickRoom',
                'POST',
                req,
                (res) => {
                    if (res.result) {
                        $('div').remove(
                            '.section.right.hospital_room .container .cont .container .ward_list'
                        );
                        selectSickRoom(_wardCode);
                        $(
                            '.pop.update_room .overlay .pop_cont .content input'
                        ).val('');
                        $('.pop.update_room .overlay').fadeOut();
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
        }
    );
}
