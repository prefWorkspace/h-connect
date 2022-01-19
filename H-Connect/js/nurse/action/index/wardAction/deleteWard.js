

function deleteWard(){
    let wardCode;
    $('.btn_delete').on('click', function () {
        wardCode = $(this).data("wardcode");
        $('.pop.delete.delete_ward .overlay').fadeIn();
    });

    $('.pop.delete_ward .btn_cut').on('click', function(){
        const req = JSON.stringify({
            requester,
            organizationCode,
            wardCode,
            ...commonRequest()
        })
        console.log(req);
        serverController.ajaxAwaitController("API/Manager/DeleteWard", "POST", req, (res) => {
            console.log(res);
            if(res.result){
                $('.nurse .ward .cont .ward_list').hide();
                $('.pop.delete .overlay').hide();
                // location.reload();
                $("div").remove(".nurse .ward .cont");
                getWardData();
            }
        }, (err) => {console.log(err)})
    });
}

