
function selectSickRoom(wardCode){

    const req = JSON.stringify({
        wardCode,
        includeSickBed: true,
        ...commonRequest()
    })
    
    serverController.ajaxAwaitController("API/Manager/SelectSickRoom", "POST", req, (res) => {
        if(res.result){
            const sickRoomList = res.sickRoomList;
            
            $("div").remove(".section.right.hospital_room .container .cont .container .ward_list");

            Create_newSickRoom(sickRoomList)
            deleteSickRoomHandle(wardCode);
            updateSickRoomHandle(wardCode);
        }
    }, (err) => {console.log(err)})
}