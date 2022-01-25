

function Create_newWard(wardList){
    //sickRoomList 이걸로 map 돌려서 환자 총 수 체크 
    const data = `
                <div class="cont">
                    <div class="ward_list" data-wardcode=${wardList.wardCode}>
                        <p>${wardList.ward}</p>
                        <div class="ward_count">
                            <p>
                                <span>${wardList.wardPatientCount}</span> 명의 환자 입원 중
                            </p>
                            <p>
                                <span>${wardList.wardDeviceCount}</span> 개의 장치 운영 중
                            </p>
                        </div>
                        <div class="btn_list">
                            <button type="button" class="btn btn_modify bl" data-wardcode=${wardList.wardCode} data-oN=${wardList.orderNumber} data-deactivate=${wardList.deactivate} >수정</button>
                            <button type="button" class="btn btn_delete rd" data-wardcode=${wardList.wardCode}>삭제</button>
                        </div>
                        <div>
                            <img src="/H-Connect/img/right_arrow.svg" alt="오른쪽 화살표 아이콘">
                        </div>
                    </div>
                </div>
            `;
    $(".nurse_main .wrap_inner .section.left.ward .container .title").after(data);
    $('.nurse .ward .cont').fadeIn();
}
