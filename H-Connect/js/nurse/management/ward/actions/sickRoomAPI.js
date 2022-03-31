'use strict';

const { CONSTANT } = await import(
    importVersion('/H-Connect/js/nurse/management/ward/renders/constant.js')
);

const { insertRoomList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/ward/renders/insertRoomList.js'
    )
);

const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);

const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const { selectSickRoomList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

const { userCode: requester, organizationCode } = CONSTANT.userData;

//병실 생성 api
export async function insertSickRoom() {
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

//병실 수정 api
export async function updateSickRoom(_wardCode) {
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
            console.log(numberPatientRoom);
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

//병실 삭제 api
export async function deleteSickRoom(_wardCode) {
    let sickRoomCode;
    $('.nurse .hospital_room .cont .ward_list .btn_list .btn_delete').on(
        'click',
        function () {
            $('.pop.delete_room .overlay').fadeIn();
            sickRoomCode = $(this).data('sickroomcode');
        }
    );

    $('.pop.delete_room .overlay .btn_list .btn_cut').on('click', function () {
        const req = JSON.stringify({
            requester,
            organizationCode,
            _wardCode,
            sickRoomCode,
            ...commonRequest(),
        });

        serverController.ajaxAwaitController(
            'API/Manager/DeleteSickRoom',
            'POST',
            req,
            (res) => {
                if (res.result) {
                    $('div').remove(
                        '.section.right.hospital_room .container .cont .container .ward_list'
                    );
                    selectSickRoom(_wardCode);
                    $('.pop.delete_room .overlay').fadeOut();
                }
            },
            (err) => {
                console.log(err);
            }
        );
    });
}

//병실 조회 api
export async function selectSickRoom(_wardCode) {
    const { sickRoomList } = await selectSickRoomList(_wardCode);
    $('div').remove(
        '.section.right.hospital_room .container .cont .container .ward_list'
    );

    insertRoomList(sickRoomList);
    deleteSickRoom(_wardCode);
    updateSickRoom(_wardCode);
}
