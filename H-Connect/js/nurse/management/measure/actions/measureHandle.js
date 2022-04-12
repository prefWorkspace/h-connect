const {
    selectMeasurementInfoList,
    insertMeasurementInfo,
    recodingEndMeasurementInfo,
    selectDeviceRegisterUnused,
} = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

const { request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const { device_NameToType } = await import(
    importVersion('/H-Connect/js/utils/controller/deviceNameController.js')
);

const { getMacaddress } = await import(
    importVersion('/H-Connect/js/utils/custom/utils.js')
);

const { newSickBedPopDeviceList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/renders/newSickBedPopDeviceList.js'
    )
);

const {
    sickRoomListSelectHandle,
    wardListSelectHandle,
    newSickBedPop_wardListSelectHandle,
    newSickBedPop_sickroomListSelectHandle,
    newSickBedPop_sickBedListSelectHandle,
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
const { updateDeviceList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/updateMeasureHandle.js'
    )
);

const { measurementInfoSimpleList } = await selectMeasurementInfoList();
await createMeasureList(measurementInfoSimpleList);
let deviceInfoList = [];
let deviceCancel = [];

//측정현황 리스트 클릭 이벤트
export async function measureListhanlde() {
    $('.wrap_inner .measure_status .status_list').on('click', function () {
        $(this).addClass('on').siblings().removeClass('on');
        const sickBedCode = $(this).data('sickbedcode');
        const wardCode = $(this).data('wardcode');
        const sickRoomCode = $(this).data('sickroomcode');

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
        $('.modifi_hospital .hospital_patient .name_label').text(name);
        $('.modifi_hospital .hospital_patient .patient_age').val(birthday);
        $('.modifi_hospital .hospital_patient .patient_gender').val(
            gender === 1 ? '남' : '여'
        );
        $('.modifi_hospital .hospital_patient .patient_mrn').val(patientCode);
        $('.modifi_hospital .hospital_patient .selectBox2 .mward_label').text(
            ward
        );
        $('.modifi_hospital .hospital_patient .selectBox2 .mward_label').attr(
            'data-wardcode',
            wardCode
        );
        $('.modifi_hospital .hospital_patient .selectBox2 .mroom_label').text(
            sickRoom
        );
        $('.modifi_hospital .hospital_patient .selectBox2 .mroom_label').attr(
            'data-sickroomcode',
            sickRoomCode
        );
        $('.modifi_hospital .hospital_patient .selectBox2 .mbed_label').text(
            sickBed + '번 병상'
        );

        $('.modifi_hospital .hospital_patient .selectBox2 .mbed_label').attr(
            'data-sickbedcode',
            sickBedCode
        );

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

        if (!deviceInfoList) {
            return;
        }
        updateDeviceList = [...deviceInfoList];
        let html = '';
        for (let i = 0; i < deviceInfoList.length; i++) {
            html += modifiDeviceList(deviceInfoList[i]);
        }
        $('.modifi_hospital .device_room .btn_add').before(html);
    });

    $('.wrap_inner .measure_status .status_list .btn_end').on(
        'click',
        function () {
            const measureCode = $(this).data('measurementcode');
            const API_ROUTE = $(this).data('route');
            $('.pop.end_measure .overlay').fadeIn();
            $('.pop.end_measure .btn_list .btn_cut').attr(
                'data-measurecode',
                measureCode
            );
            $('.pop.end_measure .btn_list .btn_cut').attr(
                'data-route',
                API_ROUTE
            );
        }
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

//신규 병상 등록 팝업 ==========================

//병상 셀렉트 박스 이벤트
export async function sickbedSelectBoxHandle() {
    $(
        '.pop.new_room_pop .overlay .new_room .selectBox2 .bed_option .bed_list'
    ).on('click', function () {
        const item = $(this).text();
        $(this).addClass('active').siblings().removeClass('active');
        const sickBedCode = $(this).data('sickbedcode');
        $(this).parent().parent().find('.label').text(item);
        $(this)
            .parent()
            .parent()
            .find('.label')
            .attr('data-sickbedcode', sickBedCode);
        $(this).parent().parent().toggleClass('active');
        $('.pop.new_room_pop .new_room .cont p span').text(1);
    });
}

//병실 셀렉트 박스 이벤트
export async function sickRoomSelectBoxHandle(wardCode) {
    $(
        '.pop.new_room_pop .overlay .new_room .selectBox2 .room_option2 .room_list2'
    ).on('click', async function () {
        const item = $(this).find('p').text();
        const sickRoomCode = $(this).data('sickroomcode');
        const spareBed = $(this).data('sparebed');
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().parent().find('.label').text(item);
        $(this)
            .parent()
            .parent()
            .find('.label')
            .attr('data-sickroomcode', sickRoomCode);
        $(this).parent().parent().toggleClass('active');
        $('.pop.new_room_pop .new_room .cont p span').text(spareBed);
        await newSickBedPop_sickBedListSelectHandle(wardCode, sickRoomCode);
        await sickbedSelectBoxHandle();
    });
}

//병동 셀렉트 박스 이벤트
export async function wardSelectBoxHandle() {
    await newSickBedPop_wardListSelectHandle();
    $('.pop.new_room_pop .new_room .selectBox2 .ward_option2 .ward_list2').on(
        'click',
        async function () {
            const item = $(this).find('p').text();
            const wardCode = $(this).data('wardcode');
            const spareBed = $(this).data('sparebed');
            $(this).parent().parent().find('.label').text(item);
            $(this)
                .parent()
                .parent()
                .find('.label')
                .attr('data-wardcode', wardCode);
            $(this).parent().parent().toggleClass('active');
            $('.pop.new_room_pop .new_room .selectBox2 .room_label2').text(
                '병실선택'
            );
            $('.pop.new_room_pop .new_room .selectBox2 .bed_label').text(
                '병상선택'
            );
            $('.pop.new_room_pop .new_room .cont p span').text(spareBed);
            await newSickBedPop_sickroomListSelectHandle(wardCode);
            await sickRoomSelectBoxHandle(wardCode);
        }
    );
}

// 장치 수정
function newSickBedPop_updateDevice() {
    const deviceName = $(this)
        .parent()
        .parent()
        .find('p:nth-of-type(1)')
        .text();
    const serialNumber = $(this)
        .parent()
        .parent()
        .find('p:nth-of-type(2)')
        .text();

    $('.pop.new_room_pop').addClass('active');
    $('.pop.new_room_pop .new_regi .selectBox2 .label').text(deviceName);
    $('.pop.new_room_pop .new_regi .input_box .input_wrap input').val(
        serialNumber
    );

    const updateArr = deviceInfoList.filter(
        (item) => item.serialNumber !== serialNumber
    );
    deviceCancel = deviceInfoList.filter(
        (item) => item.serialNumber === serialNumber
    );
    deviceInfoList = [...updateArr];
}

//장치 삭제
function newSickBedPop_deleteDevice() {
    const serialNumber = $(this).data('serialnumber');
    const updateArr = deviceInfoList.filter(
        (item) => item.serialNumber !== serialNumber
    );
    deviceInfoList = [...updateArr];
    newSickBedPopDeviceList(deviceInfoList);
    $('.pop.new_room_pop .new_room .device_room .btn_list .bl').on(
        'click',
        newSickBedPop_updateDevice
    );
    $('.pop.new_room_pop .new_room .device_room .btn_list .btn_delete').on(
        'click',
        newSickBedPop_deleteDevice
    );
}

//장치 수정 취소
function newSickBedPop_updateCancel() {
    if (deviceCancel.length > 0) {
        deviceInfoList.push(deviceCancel);
    }
    deviceCancel = [];
    $('.pop.new_room_pop').removeClass('active');
}

//장치 추가
export async function insertDevice() {
    let serial_Reg;
    const deviceName = $(
        '.pop.new_room_pop .new_regi .selectBox2 .label'
    ).text();
    const deviceType = device_NameToType(deviceName);
    const serialNumber = $(
        '.pop.new_room_pop .input_box .input_wrap input'
    ).val();

    const { deviceRegisterList } = await selectDeviceRegisterUnused(
        serialNumber
    );

    if (deviceRegisterList) {
        const obj = {
            deviceType,
            serialNumber,
            macAddress: getMacaddress(deviceType, serialNumber),
        };
        $('.pop.new_room_pop .input_box .input_wrap input').val('');
        $('.pop.new_room_pop').removeClass('active');
        deviceInfoList.push(obj);
        newSickBedPopDeviceList(deviceInfoList);
    } else {
        $('.pop.new_room_pop .new_regi .input_wrap span').addClass('active');
    }

    $('.pop.new_room_pop .new_room .device_room .btn_list .bl').on(
        'click',
        newSickBedPop_updateDevice
    );
    $('.pop.new_room_pop .new_room .device_room .btn_list .btn_delete').on(
        'click',
        newSickBedPop_deleteDevice
    );
}

//환자 셀렉트 박스 이벤트, 병동 병실 선택시에만 가능하게 분기처리 해야함
export function patientSelectBoxHandle() {
    const name = $(this).find('span:nth-of-type(1)').text();
    const birthday = $(this).find('span:nth-of-type(2)').text();
    const gender = $(this).find('span:nth-of-type(3)').text();
    const patientCode = $(this).find('span:nth-of-type(4)').text();

    $('#birthday').val(birthday);
    $('#gender').val(gender);
    $('#patient_MRN').val(patientCode);
    $(this).parent().parent().find('.name_label').text(name);
    $(this).parent().parent().removeClass('active');
}

// 신규 병상 등록 이벤트
export async function newMeasurement() {
    const name = $(
        '.pop.new_room_pop .new_room .selectBox2 .name_label'
    ).text();
    const birthday = +$('.pop.new_room_pop .new_room #birthday').val();
    const gender =
        $('.pop.new_room_pop .new_room .patient_info .gender')
            .text()
            .replaceAll(' ', '')
            .replaceAll('\n', '') === '남'
            ? 1
            : 2;
    const patientCode = $('.pop.new_room_pop .new_room #patient_MRN').val();
    const wardCode = $('#ward_code').data('wardcode');
    const sickRoomCode = $('#sickroom_code').data('sickroomcode');
    const sickBedCode = $('#sickbed_code').data('sickbedcode');

    const ward = $('#ward_code').text();
    const sickRoom = $('#sickroom_code').text();
    const sickBed = $('#sickbed_code').text();

    const codeObj = {
        wardCode,
        sickRoomCode,
        sickBedCode,
    };

    const patientData = {
        patientCode,
        name,
        gender,
        birthday: birthday + '-01-01',
        deviceInfoList,
        patientStatus: 3,
        ssn: '000000-9999999', //주민등록번호
        foreigner: 0,
        phoneNumber: '010-0000-0000',
        measurementType: 'BM',
        measurementStatus: 1,
        duration: 24,
        startDateTime: request_Date_Data(),
    };

    const { result } = await insertMeasurementInfo(codeObj, patientData);
    if (result) {
        $('.pop.new_room_pop .overlay').fadeOut();
        $('.pop.arteriotony_regi h3 span:nth-of-type(1)').text(ward + ' ');
        $('.pop.arteriotony_regi h3 span:nth-of-type(2)').text(sickRoom);
        $('.pop.arteriotony_regi h3 span:nth-of-type(3)').text(sickBed);

        $('.pop.arteriotony_regi .overlay').fadeIn();

        const { measurementInfoSimpleList } = await selectMeasurementInfoList();

        await createMeasureList(measurementInfoSimpleList);
    }
}

//이벤트
$('.pop.new_room_pop .new_room .name_list').on('click', patientSelectBoxHandle);
$('.pop.new_room_pop .new_regi .btn_list .check').on('click', insertDevice);
$('.pop.new_room_pop .new_room .btn_list .blf').on('click', newMeasurement);
$('.pop.new_room_pop .new_regi .btn_list .rd').on(
    'click',
    newSickBedPop_updateCancel
);
$('.pop.end_measure .btn_list .btn_cut').on('click', recodingEndHandle);

//함수실행=====================
measureListhanlde();
selecBoxWard();
wardSelectBoxHandle();
