

function updateSickRoomHandle(wardCode){
    let sickRoomCode;
    $('.nurse .hospital_room .cont .ward_list .btn_list .btn_modify').on('click', function () {
        $('.pop.update_room .overlay').fadeIn();
        sickRoomCode = $(this).data("sickroomcode");
    });

    $('.pop.update_room .overlay .btn_list .btn_check').on("click", function(){
        const $roomName = $(".pop.update_room .overlay .pop_cont .content input").val();   
        const $person = $(".pop.update_room .overlay .pop_cont .content .selectBox2 .room_label").text().slice(0,1);
        const orderNumber = $(".section.right.hospital_room .container .cont .container .ward_list").length + 1;

        const req = JSON.stringify({
            sickRoom: $roomName,
            nickname: "",
            orderNumber,
            numberPatientRoom: $person,
            ...commonRequest()
        })
        
        serverController.ajaxAwaitController("API/Manager/UpdateSickRoom", "POST", req, (res) => {
            if(res.result){
                $("div").remove(".section.right.hospital_room .container .cont .container .ward_list");
                selectSickRoom(wardCode);
                $(".pop.update_room .overlay .pop_cont .content input").val("");
            }
        }, (err) => {console.log(err)})

    })
}
