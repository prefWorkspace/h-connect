const { bioSignalEcgData } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/fakeData.js'
    )
);

export const socketGetPatientData = {
    get: function () {
        return bioSignalEcgData();
    },
    update: function (callBack) {
        const _res = socketGetPatientData.get();
        callBack(_res);
        setInterval(() => {
            if (callBack) {
                callBack(_res);
            }
        }, 3000);
    },
};
