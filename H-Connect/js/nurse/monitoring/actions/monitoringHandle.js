const { device_NameToType } = await import(
    importVersion('/H-Connect/js/utils/controller/deviceNameController.js')
);

const { getMacaddress } = await import(
    importVersion('/H-Connect/js/utils/custom/utils.js')
);

const { addDeviceList } = await import(
    importVersion('/H-Connect/js/nurse/monitoring/renders/addDeviceList.js')
);

const { request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);

const { selectBoxSickRoom, selectBoxWard, selectBoxSickBed } = await import(
    importVersion(
        '/H-Connect/js/nurse/monitoring/renders/addSickBedSelectBox.js'
    )
);

const deviceInfoList = [];

//병상 추가 팝업창 병동, 병실, 병상 셀렉트 박스 셋팅

//장치 추가
$('.pop.new_room_pop .overlay .new_regi .check').on('click', function () {
    const deviceName = $(
        '.pop.new_room_pop .new_regi .selectBox2 .label'
    ).text();
    const deviceType = device_NameToType(deviceName);
    const serialNumber = $(
        '.pop.new_room_pop .input_box .input_wrap input'
    ).val();

    if (serialNumber) {
        const obj = {
            deviceType,
            serialNumber,
            macAddress: getMacaddress(deviceType, serialNumber),
        };
        deviceInfoList.push(obj);
        $('.pop.new_room_pop .input_box .input_wrap input').val('');
        $('.pop.new_room_pop').removeClass('active');
        addDeviceList(deviceInfoList);
    } else {
        alert('시리얼넘버를 바르게 입력해주세요');
    }
});

//병상 추가
$('.pop.new_room_pop .new_room .btn_list .blf').on('click', function () {
    const name = $('.pop.new_room_pop .new_room #patient_name').val();
    const age = $('.pop.new_room_pop .new_room #patient_age').val();
    const gender =
        $('.pop.new_room_pop .new_room .patient_info .sex_label')
            .text()
            .replaceAll(' ', '')
            .replaceAll('\n', '') === '남자'
            ? 1
            : 2;
    const patientCode = $('.pop.new_room_pop .new_room #patient_MRN').val();
    // const wardCode =

    const codeObj = {
        wardCode: '',
        sickRoomCode: '',
        sickBedCode: '',
    };

    const patientData = {
        patientCode,
        name,
        gender,
        age,
        deviceInfoList,
        patientStatus: 3,
        ssn: '000000-9999999', //주민등록번호
        foreigner: 0,
        phoneNumber: '010-0000-0000',
        measurementType: 'BM',
        measurementStatus: 2,
        duration: 24,
        startDateTime: request_Date_Data(),
    };
});

//병상 추가 셀렉트 박스 이벤트
export function selectBoxHandle() {
    $('.pop.new_room_pop .overlay .new_room .selectBox2 .optionList li').on(
        'click',
        function () {
            const item = $(this).find('p').text();
            $(this).parent().parent().find('.label').text(item);
            $(this)
                .parent()
                .parent()
                .find('.label')
                .attr('data-wardcode', $(this).data('wardcode'));
            $(this).parent().parent().toggleClass('active');
        }
    );
}

selectBoxWard();
