const { selectMeasurementInfoList, recodingEndMeasurementInfo } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

const { sickRoomListSelectHandle, wardListSelectHandle } = await import(
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
console.log(measurementInfoSimpleList);
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

//이벤트
$('.pop.end_measure .btn_list .btn_cut').on('click', recodingEndHandle);

//함수실행=====================
measureListhanlde();
selecBoxWard();
