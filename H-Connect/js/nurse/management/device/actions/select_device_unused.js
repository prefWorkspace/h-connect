'use strict';

const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { countingDevice } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/device/actions/select_device.js'
    )
);
const { select_device_unused_list } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/device/renders/select_device_unused_list.js'
    )
);
export function select_device_unused(deviceType = 0, search = null) {
    const req = JSON.stringify({
        ...commonRequest(),
        search,
        deviceType,
        pageNumber: 1,
        count: 1000,
    });

    serverController.ajaxAwaitController(
        'API/Device/SelectDeviceRegisterUnusedPage',
        'POST',
        req,
        (res) => {
            if (res.result) {
                select_device_unused_list(res.deviceRegisterList); //반납완료 리스트 뿌리기
                const { ECG_COUNT, SpO2_COUNT, TEMP_COUNT } = countingDevice(
                    res.deviceRegisterList
                ); // 장치 카운트

                //카운트 대입
                if (deviceType === 0) {
                    $('#unused_ecg_count').text(ECG_COUNT);
                    $('#unused_spo2_count').text(SpO2_COUNT);
                    $('#unused_temp_count').text(TEMP_COUNT);
                }
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

//셀렉트 박스 옵션 선택 했을 경우
$('.section.return_device .device_list .select_return .return_list').on(
    'click',
    function () {
        $('.section.return_device .device_list .search_container input').val(
            ''
        );
        const deviceType = $(this).data('type');
        select_device_unused(deviceType, null);
    }
);

select_device_unused(0, null);
