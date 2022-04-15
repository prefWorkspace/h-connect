'use strict';
const { wardList } = await import(
    importVersion('/H-Connect/js/nurse/management/ward/templates/wardList.js')
);

const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);

const { selectSickRoom } = await import(
    importVersion('/H-Connect/js/nurse/management/ward/actions/sickRoomAPI.js')
);

const params = 'wardCode';
const wardCode = history.getParams(params);

//병동 클릭시 배경색 변경 active
function _wardclickActive() {
    if (wardCode) {
        $('.nurse .ward .cont .ward_list').each((index, value) => {
            const $wardCode = $(value).data('wardcode');
            if ($wardCode === wardCode) {
                $(value).addClass('on');
                selectSickRoom(wardCode);
                $('.nurse .hospital_room .title .btn_new_room').attr(
                    'disabled',
                    false
                );
            }
        });
    }
    $('.nurse .ward .cont .ward_list').on('click', function () {
        const wardcode = $(this).data('wardcode');
        $('.nurse .ward .cont .ward_list').removeClass('on');
        $(this).addClass('on');
        $('.nurse .hospital_room .title .btn_new_room').attr('disabled', false);
        selectSickRoom(wardcode);
        $('.pop.new_room .overlay .pop_cont .btn_list button.btn_check').attr(
            'data-wardcode',
            wardcode
        );
    });
}

export function Create_newWard(_wardList) {
    //sickRoomList 이걸로 map 돌려서 환자 총 수 체크
    let data = '';
    if (!_wardList) {
        data += `<p style="text-align: center; color: #444444">조회된 데이터가 없습니다.</p>`;
    } else {
        for (let i = 0; i < _wardList.length; i++) {
            data += wardList(_wardList[i]);
        }
    }

    $('.nurse_main .wrap_inner .section.left.ward .container .title').after(
        data
    );
    _wardclickActive();
    $('.nurse .ward .cont').fadeIn();
}
