
function delete_sickBed_handle(){
    //삭제버튼 클릭
    $('.measure_status .container .status_list .btn_list .btn_delete').on('click', deleteModal);
}

// 병상 모달 창 띄우고 삭제 이벤트 설정
function deleteModal(){
    const codeObj = {
        wardCode: $(this).data("wardcode"),
        sickRoomCode: $(this).data("sickroomcode"),
        sickBedCode: $(this).data("sickbedcode")
    }
    $('.pop.delete_measure .overlay').fadeIn();
    $(".pop.delete_measure .overlay .btn_list .btn_cut").on("click", () => deleteSickBed(codeObj) )
}

// 병상 삭제 이벤트 함수
function deleteSickBed(codeObj){

    const req = JSON.stringify({
        ...codeObj,
        ...commonRequest()
    });
    
    serverController.ajaxAwaitController("API/Manager/DeleteSickBed", "POST", req, (res) => {
        if(res.result){
            $('.pop.delete_measure .overlay').fadeOut();
            location.reload();
        }else{
            session_renew(SESSION_CLOSED)
        }
    }, (err) => {console.log(err)});
}