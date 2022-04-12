'use strict';

const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { device_NameToType } = await import(
    importVersion('/H-Connect/js/utils/controller/deviceNameController.js')
);

const { select_device_unused_list } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/device/renders/select_device_unused_list.js'
    )
);
const { select_device_list } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/device/renders/select_device_list.js'
    )
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

//장치 등록 API
export async function createDevice() {
    const device_name = $('#device_name').text();
    const serialNumber = $('#device_serial').val();

    const req = JSON.stringify({
        ...commonRequest(),
        serialNumber,
        deviceType: device_NameToType(device_name),
    });
    const reg = /^[A-Z0-9]{6,7}$/;
    if (!reg.test(serialNumber)) {
        $('.pop.regi_device small').addClass('active');
        return;
    }

    serverController.ajaxAwaitController(
        'API/Device/InsertDeviceRegister',
        'POST',
        req,
        (res) => {
            console.log('res==');
            console.log(res);
            if (res.result) {
                select_device_unused(0, null);
                select_device(0, null);
                $('.pop.regi_device .overlay').fadeOut();
            } else {
                $('.pop.regi_device .content small').show();
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

//장치 삭제 API
export async function delete_devive() {
    const serialNumber = $(this).data('serialnumber');

    const req = JSON.stringify({
        ...commonRequest(),
        serialNumber,
    });

    serverController.ajaxAwaitController(
        'API/Device/DeleteDeviceRegister',
        'POST',
        req,
        (res) => {
            console.log(res);
            if (res.result) {
                select_device_unused(0, null);
                select_device(0, null);
                $('.pop.delete_regi .overlay').fadeOut();
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

//반납 취소 API
export async function cancel_device_unused() {
    const serialNumber = $(this).data('serialnumber');
    const deviceType = $(this).data('type');

    const req = JSON.stringify({
        ...commonRequest(),
        serialNumber,
        deviceType,
    });

    serverController.ajaxAwaitController(
        'API/Device/InsertDeviceRegister',
        'POST',
        req,
        (res) => {
            if (res.result) {
                select_device_unused(0, null);
                select_device(0, null);
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

//반납한 장치 등록 장치 조회 첫화면
export async function select_device_unused(deviceType = 0, search = null) {
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

//신규 장치 등록 장치 조회 첫화면
export async function select_device(deviceType = 0, search = null) {
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
                const { ECG_COUNT, TEMP_COUNT, SpO2_COUNT } = countingDevice(
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

select_device_unused(0, null);
select_device(0, null);
