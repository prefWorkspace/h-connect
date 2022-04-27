'use strict';

const { selectHisDoctor, selectHusDoctorMedList } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/arteriotony/actions/bloodPressureAPI.js'
    )
);

const { sendDoctorListRender } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/arteriotony/renders/sendDoctorListRender.js'
    )
);

async function selectDoctor() {
    const { doctorInfoList, result } = await selectHisDoctor();
    console.log(doctorInfoList);
    if (result) {
        await sendDoctorListRender(doctorInfoList);
    }
}

// await selectDoctor();
// const aa = await selectHusDoctorMedList();
