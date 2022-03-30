'use strict';
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { selectSickRoom } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/ward/actions/selectSickRoom.js'
    )
);
//병실 생성
function insertSickRoom() {
    const sickRoom = $('.pop.new_room .overlay .pop_cont .content input').val();
    const numberPatientRoom = $(
        '.pop.new_room .overlay .pop_cont .content .selectBox2 .room_label'
    )
        .text()
        .slice(0, 1);
    const wardCode = $(this).attr('data-wardcode');

    const orderNumber =
        $('.section.right.hospital_room .container .cont .container .ward_list')
            .length + 1;

    const req = JSON.stringify({
        wardCode,
        sickRoom,
        numberPatientRoom,
        orderNumber,
        ...commonRequest(),
    });

    serverController.ajaxAwaitController(
        'API/Manager/InsertSickRoom',
        'POST',
        req,
        (res) => {
            console.log(res);
            if (res.result) {
                $('div').remove(
                    '.section.right.hospital_room .container .cont .container .ward_list'
                );
                selectSickRoom(wardCode);
                $(
                    '.pop.new_room .overlay .pop_cont .content .selectBox2 .room_label'
                ).text('');
                $('.pop.new_room .overlay').fadeOut();
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

$('.pop.new_room .overlay .pop_cont .btn_list .btn_check').on(
    'click',
    insertSickRoom
);
