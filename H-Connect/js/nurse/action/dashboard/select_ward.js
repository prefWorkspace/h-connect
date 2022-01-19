/* s : 모니터링 대상 데이터 가져오기 */

//userData
const { userCode: requester, organizationCode } = JSON.parse(localStorageController.getLocalS("userData"));

function getWardData(){
    const req = JSON.stringify({
        requester,
        organizationCode,
        ...commonRequest()
    });

    serverController.ajaxAwaitController("API/Manager/SelectWard", "POST", req, (res) => {
        console.log(res);
        if(res.result){
            const wardList = res.wardList;
            for(let i = 0; i < wardList.length; i++){

            }
        }
    })
}

getWardData();

/* e : 모니터링 대상 데이터 가져오기 */