import { serverController } from '../../../../utils/controller/serverController.js';
import { commonRequest } from '../../../../utils/controller/commonRequest.js';
import { history } from '../../../../utils/controller/historyController.js';

$('.btn_list .btn_add').off().on('click', insertBloodPressure);

const getBloodPressureInputData = () => {
    return {
        systolic: $('#SYS').val(),
        diastolic: $('#DIA').val(),
        pulse: $('#Pulse').val(),
    };
};

async function insertBloodPressure() {
    const res = await serverController.ajaxAwaitController(
        'API/BioSignal/InsertBloodPressure',
        'POST',
        JSON.stringify({
            ...commonRequest(),
            measurementCode: history.getParams('measurement_code'),
            ...getBloodPressureInputData(),
            dateTime: '2021-11-17 11:03:24',
        })
    );
    console.log(res);
    // if (!res.measurementInfo) {
    // }
}
