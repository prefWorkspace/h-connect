const { selectMeasurementInfoList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

const { device_NameToType } = await import(
    importVersion('/H-Connect/js/utils/controller/deviceNameController.js')
);

const { getMacaddress } = await import(
    importVersion('/H-Connect/js/utils/custom/utils.js')
);

const { newSickBed_device } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/templates/deviceList.js'
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

const { measurementInfoSimpleList } = await selectMeasurementInfoList();
await createMeasureList(measurementInfoSimpleList);
const displayCount = measurementInfoSimpleList
    ? measurementInfoSimpleList.length
    : 0;
$('.measure_status .search_select p span').text(displayCount);
const deviceInfoList = [];

//측정현황 리스트 클릭 이벤트
export async function measureListhanlde() {
    $('.wrap_inner .measure_status .status_list').on('click', function () {
        $(this).addClass('on').siblings().removeClass('on');
        const sickBedCode = $(this).data('sickbedcode');
        const measureData = measurementInfoSimpleList.find(
            (item) => item.sickBedCode === sickBedCode
        );
        const {
            name,
            age,
            gender,
            patientCode,
            ward,
            sickRoom,
            sickBed,
            deviceInfoList,
        } = measureData;
        $('.modifi_hospital .hospital_patient .name_label').text(name);
        $('.modifi_hospital .hospital_patient .patient_age').val(age);
        $('.modifi_hospital .hospital_patient .patient_gender').val(
            gender === 1 ? '남' : '여'
        );
        $('.modifi_hospital .hospital_patient .patient_mrn').val(patientCode);
        $('.modifi_hospital .hospital_patient .selectBox2 .mward_label').text(
            ward
        );
        $('.modifi_hospital .hospital_patient .selectBox2 .mroom_label').text(
            sickRoom
        );
        $('.modifi_hospital .hospital_patient .selectBox2 .mbed_label').text(
            sickBed + '번 병상'
        );

        if (!deviceInfoList) {
            return;
        }
        let html = '';
        for (let i = 0; i < deviceInfoList.length; i++) {
            html += modifiDeviceList(deviceInfoList[i]);
        }
        $('.modifi_hospital .device_room .btn_add').before(html);
    });

    $('.wrap_inner .measure_status .status_list .btn_end').on(
        'click',
        function () {
            $('.pop.end_measure .overlay').fadeIn();
            //측정 종료 api 없는 관계로 나중에 작업
        }
    );
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
            const { measurementInfoSimpleList } =
                await selectMeasurementInfoList(wardCode, sickRoomCode);
            const displayCount = measurementInfoSimpleList
                ? measurementInfoSimpleList.length
                : 0;
            $('.measure_status .search_select p span').text(displayCount);
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

    $('.section .selectBox2 .optionList .ward_list').on(
        'click',
        async function () {
            const text = $(this)
                .text()
                .replaceAll(' ', '')
                .replaceAll('\n', '');
            const wardCode = $(this).data('wardcode') || null;
            const { measurementInfoSimpleList } =
                await selectMeasurementInfoList(wardCode);
            const displayCount = measurementInfoSimpleList
                ? measurementInfoSimpleList.length
                : 0;
            $('.measure_status .search_select p span').text(displayCount);
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

//병동 셀렉트 박스 이벤트
export async function sickbedSelectBoxHandle() {
    $(
        '.pop.new_room_pop .overlay .new_room .selectBox2 .bed_option .bed_list'
    ).on('click', function () {
        const item = $(this).text();
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

//병상 셀렉트 박스 이벤트
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

//장치 추가

export function insertDevice() {
    let serial_Reg;
    const deviceName = $(
        '.pop.new_room_pop .new_regi .selectBox2 .label'
    ).text();
    const deviceType = device_NameToType(deviceName);
    const serialNumber = $(
        '.pop.new_room_pop .input_box .input_wrap input'
    ).val();

    deviceName === '심전도 패치'
        ? (serial_Reg = /[A-Z0-9]{6,7}/)
        : (serial_Reg = /[B-Z0-9]{6,7}/);

    if (serial_Reg.test(serialNumber)) {
        const obj = {
            deviceType,
            serialNumber,
            macAddress: getMacaddress(deviceType, serialNumber),
        };
        $('.pop.new_room_pop .input_box .input_wrap input').val('');
        $('.pop.new_room_pop').removeClass('active');
        const html = newSickBed_device(obj);
        $('.pop.new_room_pop .new_room .device_room .btn_add').before(html);
    } else {
        $('.pop.new_room_pop .new_regi .input_wrap span').addClass('active');
    }
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

$('.pop.new_room_pop .new_room .name_list').on('click', patientSelectBoxHandle);
$('.pop.new_room_pop .new_regi .btn_list .check').on('click', insertDevice);

measureListhanlde();
selecBoxWard();
wardSelectBoxHandle();
