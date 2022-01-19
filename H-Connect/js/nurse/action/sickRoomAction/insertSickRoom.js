

 function insertSickRoomHandle(){
    const $roomName = $(".pop.new_room .overlay .pop_cont .content input").val();
    const $posern = $(".pop.new_room .overlay .pop_cont .content .selectBox2 .room_label").text().slice(0,1);
    const wardCode = $(this).attr("data-wardcode");    
    
    const orderNumber = $(".section.right.hospital_room .container .cont .container .ward_list").length + 1;

    const req = JSON.stringify({
        requester,
        organizationCode,
        wardCode,
        sickRoom: $roomName,
        orderNumber,
        etc: $posern,
        ...commonRequest(),
    })
    
    console.log(req);
    serverController.ajaxAwaitController("API/Manager/InsertSickRoom", "POST", req, (res)  => {
        console.log(res)
        if(res.result){
            $("div").remove(".section.right.hospital_room .container .cont .container .ward_list");
            selectSickRoom(wardCode);
        }
    }, (err) => {console.log(err)})
}

$(".pop.new_room .overlay .pop_cont .btn_list .btn_check").on("click",insertSickRoomHandle)