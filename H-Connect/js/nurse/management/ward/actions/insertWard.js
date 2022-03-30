'use strict';
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { selectWard } = await import(
    importVersion('/H-Connect/js/nurse/management/ward/actions/selectWard.js')
);
function insertWard() {
    const _ward_Name = $('.new_ward .content #ward_Name').val();
    const _orderNumber = $('.nurse .ward .cont').length + 1;
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
                $('div').remove('.cont');
                $('.pop.new_ward .overlay').fadeOut();
                selectWard();
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

$('.new_ward .btn_list #ward_Button').on('click', insertWard);

//enter키 누를때 이벤트 발생
$('.new_ward #ward_Name').keydown(function (e) {
    if (e.key === 'Enter') {
        insertWard();
    }
});
