'use strict';
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

const { createMeasureList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/renders/createMeasureList.js'
    )
);

const {
    newSickBedPop_wardListSelectHandle,
    newSickBedPop_sickroomListSelectHandle,
    newSickBedPop_sickBedListSelectHandle,
} = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/renders/selectBoxRender.js'
    )
);

const {
    selectMeasurementInfoList,
    insertMeasurementInfo,
    selectDeviceRegisterUnused,
} = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

let deviceCancel = [];
let deviceInfoList = [];

//신규 병상 등록 팝업 ==========================
//병상 셀렉트 박스 이벤트
async function sickbedSelectBoxHandle() {
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
async function sickRoomSelectBoxHandle(wardCode) {
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
async function wardSelectBoxHandle() {
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

$('.pop.new_room_pop .new_room .name_list').on('click', patientSelectBoxHandle);
$('.pop.new_room_pop .new_regi .btn_list .check').on('click', insertDevice);
$('.pop.new_room_pop .new_room .btn_list .blf').on('click', newMeasurement);
$('.pop.new_room_pop .new_regi .btn_list .rd').on(
    'click',
    newSickBedPop_updateCancel
);

await wardSelectBoxHandle();
