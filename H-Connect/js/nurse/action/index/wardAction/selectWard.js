"use strict";

//userData
const { userCode: requester, organizationCode } = JSON.parse(localStorageController.getLocalS("userData"));

//병동 클릭시 배경색 변경 active
function _wardclickActive(){
    $('.nurse .ward .cont .ward_list').on('click', function(){
        $('.nurse .ward .cont .ward_list').removeClass('on');
        $(this).addClass('on');
        $('.nurse .hospital_room .title .btn_new_room').attr("disabled", false);
        selectSickRoom($(this).data("wardcode"));
        $(".pop.new_room .overlay .pop_cont .btn_list button.btn_check").attr('data-wardcode', $(this).data("wardcode"));
    });
}

//병동 조회
function selectWard(){
    const _req = JSON.stringify({
        includeSickRoom: true,
        includeSickBed: true,
        ...commonRequest()
    });

    serverController.ajaxAwaitController("API/Manager/SelectWard", "POST", _req, (res) => {
        console.log(res)
        if(res.result){
            const wardList = [...res.wardList];
            for(let i = 0; i < wardList.length; i++){
                Create_newWard(wardList[i]);
            }
            updateWard(); //병동 수정 이벤트
            deleteWard(); //병동 삭제 이벤트
            _wardclickActive(); //병동 클릭시 css 이벤트 
        }else{
            session_renew(res);
        }
    })
}

selectWard();
