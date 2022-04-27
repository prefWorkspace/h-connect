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

const { selectWardList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

const { Create_newWard } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/ward/renders/insertWardList.js'
    )
);

const { userCode: requester, organizationCode } = CONSTANT.userData;

//수정 api
export async function updateWardAPI(wardCode, orderNumber, deactivate) {
    const _ward = $('.update_ward .content #ward_Name').val();

    if (_ward === '') {
        alert('병동수정에 실패 하였습니다.');
        return;
    }
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
            } else {
                alert('병동수정에 실패 하였습니다.');
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

//삭제 api
export async function deleteWard() {
    let wardCode;
    $('.btn_delete').on('click', function () {
        wardCode = $(this).data('wardcode');
        $('.pop.delete.delete_ward .overlay').fadeIn();
    });

    $('.pop.delete_ward .btn_cut')
        .off()
        .on('click', function () {
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
                    if (res.result) {
                        // $('.nurse .ward .cont .ward_list').hide();
                        $('.pop.delete .overlay').fadeOut();
                        $('div').remove('.nurse .ward .cont');
                        $('div').remove('.hospital_room .container .ward_list');
                        selectWard();
                    } else {
                        alert('병동삭제에 실패 하였습니다.');
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
        });
    $('.pop.delete_ward .btn_no').on('click', function () {
        $('.pop.delete.delete_ward .overlay').fadeOut();
    });
}

//추가 api
export async function insertWard() {
    const _ward_Name = $('.new_ward .content #ward_Name').val();
    const _orderNumber = $('.nurse .ward .cont').length + 1;

    if (_ward_Name === '') {
        alert('병동생성에 실패 하였습니다.');
        return;
    }

    const _req = JSON.stringify({
        ward: _ward_Name,
        _orderNumber,
        etc: '',
        ...commonRequest(),
    });

    serverController.ajaxAwaitController(
        'API/Manager/InsertWard',
        'POST',
        _req,
        (res) => {
            if (res.result) {
                $('div').remove('.left.ward .container .cont');
                $('.pop.new_ward .overlay').fadeOut();
                selectWard();
            } else {
                alert('병동생성에 실패 하였습니다.');
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

//조회 api
export async function selectWard() {
    const { result, wardList } = await selectWardList();
    if (!result) {
        alert('병동조회에 실패 하였습니다.');
        return;
    }
    CONSTANT.wardList = wardList;
    Create_newWard(wardList);
    updateWard(); //병동 수정 이벤트
    deleteWard(); //병동 삭제 이벤트
}

//병동 수정버튼 이벤트 import 오류로 인해 같은 파일에 위치하게 변경
export async function updateWard() {
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
            const ward = $(this).parent().parent().find('#ward').text();
            $('.pop.update_ward #ward_Name').val(ward);
        });
    $('.update_ward .btn_list .btn_cancel').on('click', function () {
        $('.pop.update_ward .overlay').fadeOut();
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

selectWard();
