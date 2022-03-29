const { bioSignalData } = await import(
    importVersion('/H-Connect/js/nurse/monitoring/actions/fakeData.js')
);

export const socketGetPatientData = {
    get: function () {
        return bioSignalData();
    },
    update: function (callBack) {
        setInterval(() => {
            if (callBack) {
                const test = socketGetPatientData.get();
                // console.log(test);
                callBack(test);
            }
        }, 1000);
    },
};
