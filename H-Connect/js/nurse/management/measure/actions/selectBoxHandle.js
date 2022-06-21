'use strict';
const {
    updateWard_sickroomListSelectHandle,
    updateWard_sickBedListSelectHandle,
    updateWard_wardListSelectHandle,
} = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/renders/selectBoxRender.js'
    )
);

//병상 정보 수정 병상 셀렉트 박스
export async function updateMeasurement_sickBedSelectBoxHandle() {
    $('.section.modifi_hospital .selectBox2 .mbed_option .bed_list').on(
        'click',
        function () {
            const item = $(this).text();
            $(this).addClass('active').siblings().removeClass('active');
            const sickBedCode = $(this).data('sickbedcode');
            $(this).parent().parent().find('.label').text(item);
            $(this)
                .parent()
                .parent()
                .find('.label')
                .attr('data-sickbedcode', sickBedCode);
            $('.section.modifi_hospital .btn_list .btn_new_hospital').attr(
                'disabled',
                false
            );
            $(this).parent().parent().toggleClass('active');
        }
    );
}

//병상 정보 수정 병실 셀렉트 박스
export async function updateMeasurement_sickRoomSelectBoxHandle(wardCode) {
    // await wardListSelectHandle();
    $('.section.modifi_hospital .selectBox2 .mroom_option .room_list2').on(
        'click',
        async function () {
            const item = $(this).find('p').text();
            const sickRoomCode = $(this).data('sickroomcode');
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().parent().find('.label').text(item);
            $(this)
                .parent()
                .parent()
                .find('.label')
                .attr('data-sickroomcode', sickRoomCode);
            $(this).parent().parent().toggleClass('active');
            $('.section.modifi_hospital .btn_list .btn_new_hospital').attr(
                'disabled',
                false
            );
            $('.modifi_hospital .selectBox2 .mbed_label').text('병상선택');
            await updateWard_sickBedListSelectHandle(wardCode, sickRoomCode);
            await updateMeasurement_sickBedSelectBoxHandle();
        }
    );
}

// 병상 정보 수정 병동 셀렉트 박스
export async function updateMeasurement_wardSelectBoxHandle() {
    await updateWard_wardListSelectHandle();
    $('.section.modifi_hospital .selectBox2 .optionList .ward_list').on(
        'click',
        async function () {
            const text = $(this).text();
            const wardCode = $(this).data('wardcode');
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().parent().find('.label').text(text);
            $(this)
                .parent()
                .parent()
                .find('.label')
                .attr('data-wardcode', wardCode);
            $('.section.modifi_hospital .btn_list .btn_new_hospital').attr(
                'disabled',
                false
            );
            $(this).parent().parent().removeClass('active');
            $('.modifi_hospital .selectBox2 .mroom_label').text('병실선택');
            $('.modifi_hospital .selectBox2 .mbed_label').text('병상선택');
            await updateWard_sickroomListSelectHandle(wardCode);
            await updateMeasurement_sickRoomSelectBoxHandle(wardCode);
        }
    );
}
