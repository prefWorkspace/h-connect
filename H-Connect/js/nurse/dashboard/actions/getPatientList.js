import { serverController } from '../../../utils/controller/serverController.js?v=2022.01.17.11.33';

import { commonRequest } from '../../../utils/controller/commonRequest.js?v=2022.01.17.11.33';
import { getWardList } from './getwardList.js?v=2022.03.25.12.01';

export async function getPatientList() {
    let result = {};
    let patients_in_hospital = [];
    const wardList = await getWardList();
    await serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoList',
        'POST',
        JSON.stringify({
            ...commonRequest(),
        }),
        (res) => {
            if (res.result) {
                result = res.measurementInfoSimpleList;
                for (let i = 0; i < result.length; i++) {
                    if (result[i].patientCode)
                        patients_in_hospital.push(result[i]);
                }
            }
        }
    );
    return patients_in_hospital;
}
