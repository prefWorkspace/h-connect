'use strict';

const { selectMeasurementInfoList, deleteMeasurementInfo } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

const { createMeasureList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/renders/createMeasureList.js'
    )
);

const { initialUpdateInputForm } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureHandle.js'
    )
);

//병상 정보 수정 삭제 버튼 이벤트
async function deleteMeasurement() {
    const measureMentCode = $(this).attr('data-measurementcode');
    const API_ROUTE = $(this).attr('data-apiroute');
    const { result } = await deleteMeasurementInfo(measureMentCode, API_ROUTE);

    if (result) {
        await initialUpdateInputForm();
    }
}

$('.pop.delete_measure .btn_list .btn_cut').on('click', deleteMeasurement);
