const { doctorItem } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/arteriotony/templates/sendDoctorList.js'
    )
);

export async function sendDoctorListRender(doctorList) {
    let html = '';
    if (!doctorList) {
        return;
    }

    for (let i = 0; i < doctorList.length; i++) {
        html += doctorItem(doctorList[i]);
    }

    $('.pop.send_doctor .doctor_search .doctor_list').html(html);
}
