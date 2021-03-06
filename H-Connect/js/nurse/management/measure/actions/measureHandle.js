const {
    selectMeasurementInfoList,
    recodingEndMeasurementInfo,
    updateMeasurement_updateDeviceInfo,
    updateMeasurement_deleteDeviceInfo,
    updateMeasurement_insertDevice,
} = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

const {
    sickRoomListSelectHandle,
    wardListSelectHandle,
    updateWard_sickroomListSelectHandle,
    updateWard_sickBedListSelectHandle,
} = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/renders/selectBoxRender.js'
    )
);

const { createMeasureList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/renders/createMeasureList.js'
    )
);

//수정 데이터 장치 담는 배열
let { updateDeviceList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/updateMeasureHandle.js'
    )
);

const { device_NameToType } = await import(
    importVersion('/H-Connect/js/utils/controller/deviceNameController.js')
);

const { getMacaddress } = await import(
    importVersion('/H-Connect/js/utils/custom/utils.js')
);

//병상 수정 디바이스 리스트
const { modifiDeviceList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/templates/measurList.js'
    )
);

//측정 리스트 가져와서 렌더링
const { measurementInfoSimpleList } = await selectMeasurementInfoList();
await createMeasureList(measurementInfoSimpleList);

//측정 종료 버튼 클릭시, 측정 종료 버튼 모달창 띄우기
function recodingEndPopOpen() {
    const measureCode = $(this).data('measurementcode');
    const API_ROUTE = $(this).data('route');
    $('.pop.end_measure .overlay').fadeIn();
    $('.pop.end_measure .btn_list .btn_cut').attr(
        'data-measurecode',
        measureCode
    );
    $('.pop.end_measure .btn_list .btn_cut').attr('data-route', API_ROUTE);
}

// 병상 정보수정 장치 수정 제거 모달창 이벤트
async function updateSickBed_updateDevice() {
    //병상 정보 수정 "장치수정 버튼"
    $('.section.modifi_hospital .device_room .device_Item .bl').on(
        'click',
        function () {
            $('.pop.update_device .overlay').fadeIn();
            const serialNumber = $(this)
                .parent()
                .parent()
                .find('p:nth-of-type(2)')
                .text();
            const deviceName = $(this)
                .parent()
                .parent()
                .find('p:nth-of-type(1)')
                .text();
            const deviceInfoId = $(this).data('deviceinfoid');
            const measurementCode = $(this).data('measurementcode');

            $('.pop.update_device .content .selectBox2 .left_label').text(
                deviceName
            );
            $('.pop.update_device .content input').val(serialNumber);

            $('.pop.update_device .btn_list .btn_check').attr(
                'data-deviceinfoId',
                deviceInfoId
            );

            $('.pop.update_device .btn_list .btn_check').attr(
                'data-measurementcode',
                measurementCode
            );
        }
    );

    //병상 정보 수정 "장치삭제 버튼"
    $('.section.modifi_hospital .device_room .device_Item .btn_delete').on(
        'click',
        function () {
            $('.pop.delete_device .overlay').fadeIn();
            const serialNumber = $(this)
                .parent()
                .parent()
                .find('p:nth-of-type(2)')
                .text();
            const deviceName = $(this)
                .parent()
                .parent()
                .find('p:nth-of-type(1)')
                .text();

            const measurementCode = $(this).data('measurementcode');
            const deviceInfoId = $(this).data('deviceinfoid');

            $('.pop.delete_device .btn_list .btn_cut').attr(
                'data-measurementcode',
                measurementCode
            );
            $('.pop.delete_device .btn_list .btn_cut').attr(
                'data-deviceinfoid',
                deviceInfoId
            );
            $('.pop.delete_device h3').text(
                `${deviceName} (${serialNumber})을 삭제합니다.`
            );
        }
    );
}

//장치 수정 로직
// updateDeviceList 이 배열로 updateMeasurement_updateDeviceInfo API 연동 하면됨
async function updateDevicePop() {
    const deviceName = $(
        '.pop.update_device .content .selectBox2 .left_label'
    ).text();
    const deviceType = device_NameToType(
        deviceName.replaceAll(' ', '').replaceAll('\n', '')
    );
    const serialNumber = $('.pop.update_device .content input').val();
    const deviceInfoId = +$(this).attr('data-deviceinfoid');
    const measurementCode = $(this).attr('data-measurementcode');
    // let updateItem = {};
    // updateDeviceList.forEach((value, index) => {
    //     if (value.deviceInfoId == deviceInfoId) {
    //         updateItem = { ...value, serialNumber, deviceType };
    //     }
    // });

    // const newArr = updateDeviceList.filter(
    //     (item) => item.deviceInfoId != deviceInfoId
    // );

    // updateDeviceList = [...newArr, updateItem];

    const deviceInfo = {
        measurementCode,
        deviceInfoId,
        serialNumber,
        deviceType,
        macAddress: getMacaddress(deviceType, serialNumber),
    };

    const { result } = await updateMeasurement_updateDeviceInfo(deviceInfo);
    if (result) {
        $(
            `.section.modifi_hospital .device_room #${deviceInfoId} p:nth-of-type(1)`
        ).text(deviceName);

        $(
            `.section.modifi_hospital .device_room #${deviceInfoId} p:nth-of-type(2)`
        ).text(serialNumber);

        $('.pop.update_device .overlay').fadeOut();
    }
}

//병상 정보 변경에서 장치 삭제
async function deleteDevicePop() {
    const measurementCode = $(this).attr('data-measurementcode');
    const deviceInfoIdList = [];
    const deviceId = +$(this).attr('data-deviceinfoid');
    deviceInfoIdList.push(deviceId);

    const { result } = await updateMeasurement_deleteDeviceInfo(
        deviceInfoIdList,
        measurementCode
    );
    if (result) {
        $('.pop.delete_device .overlay').fadeOut();
    }
}

//병상 정보 수정에서 장치 추가
async function updateSickBed_insertDevice() {
    //여기부터작업
    //xxx
}

//측정현황 리스트 클릭 이벤트
export async function measureListhanlde() {
    $('.wrap_inner .measure_status .status_list').on(
        'click',
        async function () {
            $(this).addClass('on').siblings().removeClass('on');
            const sickBedCode = $(this).data('sickbedcode');
            const wardCode = $(this).data('wardcode');
            const sickRoomCode = $(this).data('sickroomcode');
            let html = '';

            //클릭한 측정정보 찾기
            const measureData = measurementInfoSimpleList.find(
                (item) => item.sickBedCode === sickBedCode
            );

            const {
                name,
                birthday,
                gender,
                patientCode,
                ward,
                sickRoom,
                sickBed,
                deviceInfoList,
                apiRoute,
                measurementCode,
            } = measureData;

            //병상정보 수정 섹션에 병실, 병상 셀렉트 박스 렌더링
            await updateWard_sickroomListSelectHandle(wardCode);
            await updateWard_sickBedListSelectHandle(wardCode, sickRoomCode);

            //병상정보 수정 섹션에 데이터 바인딩
            $('.modifi_hospital .hospital_patient .name_label').text(name);
            $('.modifi_hospital .hospital_patient .patient_age').val(birthday);
            $('.modifi_hospital .hospital_patient .patient_gender').val(
                gender === 1 ? '남' : '여'
            );
            $('.modifi_hospital .hospital_patient .patient_mrn').val(
                patientCode
            );
            $(
                '.modifi_hospital .hospital_patient .selectBox2 .mward_label'
            ).text(ward);
            $(
                '.modifi_hospital .hospital_patient .selectBox2 .mward_label'
            ).attr('data-wardcode', wardCode);
            $(
                '.modifi_hospital .hospital_patient .selectBox2 .mroom_label'
            ).text(sickRoom);
            $(
                '.modifi_hospital .hospital_patient .selectBox2 .mroom_label'
            ).attr('data-sickroomcode', sickRoomCode);
            $(
                '.modifi_hospital .hospital_patient .selectBox2 .mbed_label'
            ).text(sickBed + '번 병상');

            $(
                '.modifi_hospital .hospital_patient .selectBox2 .mbed_label'
            ).attr('data-sickbedcode', sickBedCode);

            $('.section.modifi_hospital .btn_list .btn_new_hospital').attr(
                'data-apiroute',
                apiRoute
            );

            $('.section.modifi_hospital .btn_list .btn_delete').attr(
                'disabled',
                false
            );

            $('.section.modifi_hospital .btn_list .btn_delete').attr(
                'data-measurementcode',
                measurementCode
            );

            $('.section.modifi_hospital .btn_list .btn_delete').attr(
                'data-apiroute',
                apiRoute
            );

            //이전 측정정보의 장치 리스트 삭제
            $('div').remove('.modifi_hospital .device_room .device_Item');

            //해당 병동 active
            $('.section.modifi_hospital .selectBox2 .ward_list').each(
                (_, value) => {
                    if ($(value).data('wardcode') === wardCode) {
                        $(value).addClass('active');
                    }
                }
            );

            //해당 병실 active
            $('.section.modifi_hospital .selectBox2 .room_list2').each(
                (_, value) => {
                    if ($(value).data('sickroomcode') === sickRoomCode) {
                        $(value).addClass('active');
                    }
                }
            );

            //해당 병상 active
            $('.section.modifi_hospital .selectBox2 .bed_list').each(
                (_, value) => {
                    if ($(value).data('sickbedcode') === sickBedCode) {
                        $(value).addClass('active');
                    }
                }
            );

            //장치 리스트 없는 병상은 여기까지
            if (!deviceInfoList) {
                return;
            }

            updateDeviceList = [...deviceInfoList];

            // 장치 리스트 탬플릿 만들기
            for (let i = 0; i < deviceInfoList.length; i++) {
                html += modifiDeviceList(deviceInfoList[i]);
            }

            $('.modifi_hospital .device_room .btn_add').before(html);
            await updateSickBed_updateDevice();
        }
    );

    $('.wrap_inner .measure_status .status_list .btn_end').on(
        'click',
        recodingEndPopOpen
    );
}

//측정 종료
export async function recodingEndHandle() {
    const measureCode = $(this).attr('data-measurecode');
    const API_ROUTE = $(this).attr('data-route');
    const { result } = await recodingEndMeasurementInfo(measureCode, API_ROUTE);

    if (result) {
        const { measurementInfoSimpleList } = await selectMeasurementInfoList();
        await createMeasureList(measurementInfoSimpleList);
    }
    $('.pop.end_measure .overlay').fadeOut();
}

//측정현황 셀렉트 박스 이벤트 ==========
//병실 선택 셀렉트 박스
export async function selectBoxSickRoom() {
    $('.section .selectBox2 .optionList .room_list').on(
        'click',
        async function () {
            const text = $(this)
                .text()
                .replaceAll(' ', '')
                .replaceAll('\n', '');
            const sickRoomCode = $(this).data('sickroomcode');
            const wardCode = $('.measure_status .selectBox2 .ward_label').data(
                'wardcode'
            );

            $(this).addClass('active').siblings().removeClass('active');
            const { measurementInfoSimpleList } =
                await selectMeasurementInfoList(wardCode, sickRoomCode);
            $(this).parent().parent().find('.label').text(text);
            $(this)
                .parent()
                .parent()
                .find('.label')
                .attr('data-wardcode', sickRoomCode);
            $(this).parent().parent().removeClass('active');
            await createMeasureList(measurementInfoSimpleList); //측정현황 리스트 뿌리기
            measureListhanlde(); //측정 현황 클릭이벤트
        }
    );
}

//병동 선택 셀렉트 박스
export async function selecBoxWard() {
    await wardListSelectHandle();

    $('.section.measure_status .selectBox2 .optionList .ward_list').on(
        'click',
        async function () {
            const text = $(this)
                .text()
                .replaceAll(' ', '')
                .replaceAll('\n', '');
            const wardCode = $(this).data('wardcode') || null;
            $(this).addClass('active').siblings().removeClass('active');
            const { measurementInfoSimpleList } =
                await selectMeasurementInfoList(wardCode);
            $('.section .selectBox2 .room_label').text('병실선택');
            $(this).parent().parent().find('.label').text(text);
            $(this)
                .parent()
                .parent()
                .find('.label')
                .attr('data-wardcode', wardCode);
            $(this).parent().parent().removeClass('active');
            await sickRoomListSelectHandle(wardCode); //병실 셀렉트 박스 교체
            selectBoxSickRoom(); //병실 셀렉트 박스 이벤트
            await createMeasureList(measurementInfoSimpleList); //측정 현황 리스트 뿌리기
            measureListhanlde(); //측정 현황 리스트 이벤트
        }
    );
}

//이벤트
$('.pop.end_measure .btn_list .btn_cut').on('click', recodingEndHandle);
$('.pop.update_device .btn_list .btn_check').on('click', updateDevicePop);
$('.pop.delete_device .btn_list .btn_cut').on('click', deleteDevicePop);

//함수실행=====================
measureListhanlde();
selecBoxWard();
