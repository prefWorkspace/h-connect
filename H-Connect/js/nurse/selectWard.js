 
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
            const wardList = [...res.wardList];
            for(let i = 0; i < wardList.length; i++){
                const title = wardList[i].ward;
                Create_newWard(title, wardList[i].wardCode, wardList[i].orderNumber);
            }
            aaa();
        }
    })
}

getWardData();

console.log(timestamp());