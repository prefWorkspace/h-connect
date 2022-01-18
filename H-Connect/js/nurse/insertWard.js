
// import serverController from "../module/serverController.js";
// import commonRequest from "../module/commonRequest.js";
// import localStorageController from "../module/localStorageController.js";


const ward_Name = document.querySelector(".new_ward .content #ward_Name");
const ward_Insert_Button = document.querySelector(".new_ward .btn_list #ward_Button");

//유저 정보 
const userData = JSON.parse(localStorageController.getLocalS("userData"));

function Insert_New_Ward(){
    
    const req = JSON.stringify({
        requester: userData.userCode,
        organizationCode: userData.organizationCode,
        ward: ward_Name.value,
        orderNumber: 1,
        etc: "",
        ...commonRequest()
    })

    serverController.ajaxAwaitController("API/Manager/InsertWard", "POST", req, (res) => {
        console.log(res);
        if(res.result){
            console.log("데이터 실행 ");
            const data = `
        <div class="cont">
            <div class="ward_list">
                <p>심장병동</p>

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

    $(".nurse_main .wrap_inner .section.left.ward .container").html("<div>aSDFASDFASDF</div>");
    
            
        }
    }, (err) => {console.log(err)});
}


ward_Insert_Button.addEventListener("click", Insert_New_Ward);

