/* s : 모니터링 대상 데이터 가져오기 */

let wardList = [];
let sickRoomList = [];
let sickBedList = [];
//userData
const { userCode: requester, organizationCode } = JSON.parse(localStorageController.getLocalS("userData"));

async function first_get_DashBoard_Ward_Api(){
    const req = JSON.stringify({
        requester,
        organizationCode,
        includeSickRoom : true,
        includeSickBed : true,
        ...commonRequest()
    });
    
    //병동, 병실, 병상 가져오기
    
    await serverController.ajaxAwaitController("API/Manager/SelectWard", "POST", req, (res) => {
        if(res.result){
            wardList = res.wardList;
            sickRoomList = res.wardList[0].sickRoomList;
            // 1. 병동 설렉트 박스 선택 설정
        }
    })
    first_dashboard_view_setting();
}

first_get_DashBoard_Ward_Api();

/* e : 모니터링 대상 데이터 가져오기 */

/* s : 병상 데이터 불러오기 */

async function get_SickRoom_Api(setData){
    const req = JSON.stringify({
        requester,
        organizationCode,
        ...setData,
        ...commonRequest()
    });
    
    //병동, 병실, 병상 가져오기
    
    await serverController.ajaxAwaitController("API/Manager/SelectSickRoom", "POST", req, (res) => {
        if(res.result){
            sickRoomList = res.sickRoomList;
            SickRoom_Block(sickRoomList);
            // 1. 병동 설렉트 박스 선택 설정
        }
    })
}