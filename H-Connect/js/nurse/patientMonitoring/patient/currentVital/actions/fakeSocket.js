const { bioSignalEcgData } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/fakeData.js'
    )
);
export class socketGetPatientData {
    constructor() {
        this.toggle = true;
    }
    get() {
        return bioSignalEcgData();
    }
    update(callBack) {
        callBack(bioSignalEcgData());
        this.toggle = !this.toggle;
        setInterval(() => {
            if (callBack) {
                if (this.toggle) {
                    callBack(bioSignalEcgData());
                } else {
                    let tmpData = bioSignalEcgData();
                    let reverseData =
                        tmpData.bioSignalData.ecgDataList.reverse();
                    let returnData = [];
                    for (let i = 0, len = reverseData.length; i < len; i++) {
                        const { value } = reverseData[i];
                        returnData.push({ seconds: i, value: value });
                    }
                    tmpData.bioSignalData.ecgDataList = returnData;
                    callBack(tmpData);
                }
                this.toggle = !this.toggle;
            }
        }, 3000);
    }
}
