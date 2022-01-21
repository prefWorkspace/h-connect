
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
        
        if(res.result){
            console.log(res);
            const wardList = [...res.wardList];
            for(let i = 0; i < wardList.length; i++){
                const title = wardList[i].ward;
                Create_newWard(title, wardList[i].wardCode, wardList[i].orderNumber, wardList[i].deactivate, wardList[i].sickRoomList);
            }
            updateWard();
            deleteWard();
            clickActive();
            Create_ward_list_measure(wardList);
            measure_selectBox_handle(wardList);
            Create_ward_list_measure_Bed(wardList);
            new_SickBed_selectBox_handle(wardList);
        }
    })
}
getWardData();
