
//userData
const { userCode: requester, organizationCode } = JSON.parse(localStorageController.getLocalS("userData"));

//병동 클릭시 배경색 변경 active
function clickActive(){
    $('.nurse .ward .cont .ward_list').on('click', function(){
        $('.nurse .ward .cont .ward_list').removeClass('on');
        $(this).addClass('on');
        $('.nurse .hospital_room .title .btn_new_room').attr("disabled", false);
        selectSickRoom($(this).data("wardcode"));
        $(".pop.new_room .overlay .pop_cont .btn_list button.btn_check").attr('data-wardcode', $(this).data("wardcode"));
    });
}

function getWardData(){
    const req = JSON.stringify({
        requester,
        organizationCode,
        includeSickRoom: true,
        includeSickBed: true,
        ...commonRequest()
    });
    

    serverController.ajaxAwaitController("API/Manager/SelectWard", "POST", req, (res) => {
        
        console.log(res);
        if(res.result){
            const wardList = [...res.wardList];
            for(let i = 0; i < wardList.length; i++){
                const title = wardList[i].ward;
                Create_newWard(title, wardList[i].wardCode, wardList[i].orderNumber, wardList[i].deactivate, wardList[i].sickRoomList);
            }
            updateWard(); //병동 수정 이벤트
            deleteWard(); //병동 삭제 이벤트
            clickActive(); //병동 클릭시 css 이벤트 
            Create_ward_list_measure(wardList); //측정 관리 측정 현황 셀렉트 박스
            measure_selectBox_handle(wardList); //측정현황 셀렉트 박스 이벤트 
            Create_ward_list_measure_Bed(wardList); //측정관리 신규 병상등록 병동 셀렉트 박스 
            new_SickBed_selectBox_handle(wardList); //측정관리 신규병상 등록 셀렉트 박스 이벤트
        }else{
            session_renew(res);
        }
    })
}
getWardData();
 