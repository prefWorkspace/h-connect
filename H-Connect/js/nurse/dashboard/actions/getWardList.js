const INFO = {
    wardList:[]
};
/* s : 모니터링 대상 데이터 가져오기 */
async function _getWardList(){
    //병동, 병실, 병상 가져오기
    await serverController.ajaxAwaitController("API/Manager/SelectWard", "POST",
    JSON.stringify({
        ...commonRequest(),
        includeSickRoom : true,
    }), (res) => {
        if(res.result){
            INFO.wardList = res.wardList;
        }
    })
}
/* e : 모니터링 대상 데이터 가져오기 */

/* s : 환자 정보 불러오고 해당 병상을 찾아 데이터 만들어주기 */
async function _getPatientList(){
    await serverController.ajaxAwaitController("API/Measurement/SelectMeasurementInfoList", "POST",
    JSON.stringify({
        ...commonRequest(),
    }),
    (res) => {
        if(res.result){
            const _patientList = res.measurementInfoSimpleList;
            const _wardList = INFO.wardList;
            for(let i = 0, len = _wardList.length; i < len; i++){
                const _sickRoomList = _wardList[i].sickRoomList;
                for(let t = 0, len = _sickRoomList.length; t < len; t++){
                    const _sickRoomCode = _sickRoomList[t].sickRoomCode;
                    _sickRoomList[t].patientList = [];
                    const _filterPatient = _patientList.filter((item)=>{
                        return item.sickRoomCode === _sickRoomCode
                    });
                    _sickRoomList[t].patientList = _filterPatient;
                }
            }
        }
    })
}
/* e : 환자 정보 불러오고 해당 병상을 찾아 데이터 만들어주기 */

async function dashboard_patientList_init(){
    await _getWardList();
    await _getPatientList();
    _dashboard_firstView_init();
}
dashboard_patientList_init();