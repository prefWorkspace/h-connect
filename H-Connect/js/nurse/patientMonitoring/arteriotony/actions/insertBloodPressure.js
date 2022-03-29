import { serverController } from '../../../../utils/controller/serverController.js?v=2022.01.17.11.33';
import { commonRequest } from '../../../../utils/controller/commonRequest.js?v=2022.01.17.11.33';
import { history } from '../../../../utils/controller/historyController.js?v=2022.01.26.12.45';

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
