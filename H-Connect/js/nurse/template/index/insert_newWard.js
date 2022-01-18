

function create_newWard(title = "병동"){
    const data = `
                <div class="cont">
                    <div class="ward_list">
                        <p>${title}</p>
                        <div class="ward_count">
                            <p>
                                <span>0</span> 명의 환자 입원 중
                            </p>
                            <p>
                                <span>0</span> 개의 장치 운영 중
                            </p>
                        </div>
                        <div class="btn_list">
                            <button type="button" class="btn btn_modify bl">수정</button>
                            <button type="button" class="btn btn_delete rd">삭제</button>
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