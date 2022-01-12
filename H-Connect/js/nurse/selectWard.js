import serverController from "../module/serverController.js";
import commonRequest from "../module/commonRequest.js";
import localStorageController from "../module/localStorage.js";


//userData
const { userCode: requester, organizationCode } = JSON.parse(localStorageController.getLocalS("userData"));

function getWardData(){

    const req = JSON.stringify({
        requester,
        organizationCode,
        ...commonRequest()
    });

    serverController.connectFetchController("API/Manager/SelectWard", "POST", req, (res) => {
        console.log(res);
        if(res.result){
            console.log("통신 성공");
            const wardList = [...res.wardList];
        }
    })
}

// getWardData();