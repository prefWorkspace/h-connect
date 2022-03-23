'use strict';
import { serverController } from '../../../../utils/controller/serverController.js';
import { commonRequest } from '../../../../utils/controller/commonRequest.js';
import { select_device_list } from '../renders/select_device_list.js';

//신규 장치 등록 장치 조회 첫화면
export function select_device(deviceType = 0, search = null) {
    const req = JSON.stringify({
        ...commonRequest(),
        search,
        deviceType,
        pageNumber: 1,
        count: 1000,
    });

    serverController.ajaxAwaitController(
        'API/Device/SelectDeviceRegisterPage',
        'POST',
        req,
        (res) => {
            console.log(res);
            if (res.result) {
                select_device_list(res.deviceRegisterList); //신규장치 등록 모든 리스트 조회후 UI표현

                // 장치 카운트
                const { ECG_COUNT, SpO2_COUNT, TEMP_COUNT } = countingDevice(
                    res.deviceRegisterList
                );

                //카운트 대입
                if (deviceType === 0) {
                    $('#ecg_count').text(ECG_COUNT);
                    $('#spo2_count').text(SpO2_COUNT);
                    $('#temp_count').text(TEMP_COUNT);
                }
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

//셀렉트 박스 옵션 선택 했을 경우
$('.section.new_device .device_list .select_device .device_optionItem').on(
    'click',
    function () {
        $('.section.new_device .device_list .search_container input').val('');
        const deviceType = $(this).data('type');
        select_device(deviceType);
    }
);

//장치 카운팅 함수
export function countingDevice(deviceRegisterList) {
    let ECG_COUNT = 0;
    let TEMP_COUNT = 0;
    let SpO2_COUNT = 0;

    for (let i = 0; i < deviceRegisterList?.length; i++) {
        switch (deviceRegisterList[i].deviceType) {
            case 1:
                ECG_COUNT++;
                break;
            case 2:
                TEMP_COUNT++;
                break;
            case 3:
                SpO2_COUNT++;
                break;
        }
    }

    return {
        ECG_COUNT,
        TEMP_COUNT,
        SpO2_COUNT,
    };
}

select_device(0, null);
