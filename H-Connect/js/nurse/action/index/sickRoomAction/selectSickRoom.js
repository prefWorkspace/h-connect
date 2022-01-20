
function selectSickRoom(wardCode){

    const req = JSON.stringify({
        requester,
        organizationCode,
        wardCode,
        includeSickBed: false,
        ...commonRequest()
    })
    
    serverController.ajaxAwaitController("API/Manager/SelectSickRoom", "POST", req, (res) => {
        if(res.result){
            const sickRoomList = res.sickRoomList;
            $("div").remove(".section.right.hospital_room .container .cont .container .ward_list");
            for(let i = 0; i < sickRoomList?.length; i++){
                Create_newSickRoom(sickRoomList[i].sickRoom, sickRoomList[i].sickRoomCode, sickRoomList[i].sickBedList, sickRoomList[i].etc)
            }
            deleteSickRoomHandle(wardCode);
            updateSickRoomHandle(wardCode);
        }
    }, (err) => {console.log(err)})
}