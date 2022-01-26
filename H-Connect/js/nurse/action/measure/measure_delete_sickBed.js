
function delete_sickBed_handle(){
    //삭제버튼 클릭
    $('.measure_status .container .status_list .btn_list .btn_delete').on('click', deleteModal);
}

// 병상 모달 창 띄우고 삭제 이벤트 설정
function deleteModal(){
    $('.pop.delete_measure .overlay').fadeIn();

    $(".pop.delete_measure .overlay .btn_list .btn_cut").attr("data-measurementcode", $(this).data("measurementcode"));
    $(".pop.delete_measure .overlay .btn_list .btn_cut").attr("data-route", $(this).data("route"));
    $(".pop.delete_measure .overlay .btn_list .btn_cut").on("click", deleteSickBed)
}

// 병상 삭제 이벤트 함수
function deleteSickBed(){

    const measurementCode = $(this).data("measurementcode");
    const route = $(this).data("route");

    const req = JSON.stringify({
        ...commonRequest(),
        measurementCode
    });

    serverController.ajaxMeasurementController("API/Measurement/DeleteMeasurementInfo", route, "POST", req, (res) => {
        console.log(res)
        if(res.result){
            $('.pop.delete_measure .overlay').fadeOut();
            location.reload();
        }
    }, (err) => {console.log(err)});
}