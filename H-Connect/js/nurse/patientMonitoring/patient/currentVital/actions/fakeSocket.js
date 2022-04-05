const { bioSignalData, bioSignalSimpleData } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/fakeData.js'
    )
);
export class socketGetPatientData {
    constructor() {
        this.toggle = true;
    }
    get() {
        return bioSignalData();
    }
    update(callBack) {
        callBack(bioSignalData());
        this.toggle = !this.toggle;
        setInterval(() => {
            if (callBack) {
                if (this.toggle) {
                    callBack(bioSignalData());
                } else {
                    let tmpData = bioSignalData();
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

export class fakeSoketBioSignalSimpleData {
    get() {
        return bioSignalSimpleData();
    }
    update(callBack) {
        callBack(this.get());
        setInterval(() => {
            if (callBack) {
                callBack(this.get());
            }
        }, 1500);
    }
}
