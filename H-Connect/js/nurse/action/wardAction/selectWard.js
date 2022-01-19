
//userData
const { userCode: requester, organizationCode } = JSON.parse(localStorageController.getLocalS("userData"));

//병동 클릭시 배경색 변경 active
function clickActive(){
    $('.nurse .ward .cont .ward_list').on('click', function(){
        $('.nurse .ward .cont .ward_list').removeClass('on');
        $(this).addClass('on');
        $('.nurse .hospital_room .title .btn_new_room').attr("disabled", false);
    });
}

function getWardData(){

    const req = JSON.stringify({
        requester,
        organizationCode,
        ...commonRequest()
    });

    serverController.ajaxAwaitController("API/Manager/SelectWard", "POST", req, (res) => {
        console.log(res);
        if(res.result){
            const wardList = [...res.wardList];
            for(let i = 0; i < wardList.length; i++){
                const title = wardList[i].ward;
                Create_newWard(title, wardList[i].wardCode, wardList[i].orderNumber, wardList[i].deactivate);
            }
            updateWard();
            deleteWard();
            clickActive();
        }
    })
}
getWardData();
