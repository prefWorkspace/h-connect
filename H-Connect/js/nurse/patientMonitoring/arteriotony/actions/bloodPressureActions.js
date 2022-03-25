import {
    insertBloodPressure,
    updateBloodPressure,
    deleteBloodPressure,
} from './bloodPressureAPI.js';

import { request_Date_Data } from '../../../../utils/controller/commonRequest.js';

import { renderPrerecordList } from '../renders/renderPrerecord.js';

async function insertBloodPressureAction() {
    const onClickInsertBloodPressureBtn = async () => {
        // 등록 버튼 클릭 시 혈압 데이터 등록
        const res = await insertBloodPressure({
            systolic: $('#SYS').val(),
            diastolic: $('#DIA').val(),
            pulse: $('#Pulse').val(),
            dateTime: request_Date_Data(),
        });
        if (res.result) {
            // 병상 등록 성공시
            $('#add_popup').css('display', 'block');
            await renderPrerecordList();
        }
    };

    const onClickCancelBloodPressureBtn = () => {
        $('#SYS').val('');
        $('#DIA').val('');
        $('#Pulse').val('');
        $('.btn_list .btn_add').removeClass('modify-mode');
    };

    $('.btn_list .btn_add').off().on('click', onClickInsertBloodPressureBtn);
    $('.btn_list .btn_no').off().on('click', onClickCancelBloodPressureBtn);
}
export async function onClickUpdateBloodPressureBtn(_this) {
    // 수정 버튼 클릭 시 혈압 데이터 수정
    $('.btn_list .btn_add').addClass('modify-mode');
    const _curItemEl = $(_this).parents('.bloodPressure_item');
    const _indexId = _curItemEl.attr("data-indexId");
    const _recordDateTime = _curItemEl.attr("data-recordDateTime");
    const _SYS = _curItemEl.children('.SYS-item');
    const _DIA = _curItemEl.children('.DIA-item').val();
    const _Pulse = _curItemEl.children('.Pulse-item').val();

    // $('#SYS').val()
    // $('#DIA').val(),
    // $('#Pulse').val(),
    // await updateBloodPressure({ indexId: _indexId });
}

export async function onClickDeleteBloodPressureBtn(_this) {
    // 삭제 버튼 클릭 시 혈압 데이터 삭제
    const _indexId = $(_this).attr('data-indexId');
    await deleteBloodPressure({ indexId: _indexId });
}

function actionInit() {
    insertBloodPressureAction();
    window.onClickUpdateBloodPressureBtn = onClickUpdateBloodPressureBtn;
    window.onClickDeleteBloodPressureBtn = onClickDeleteBloodPressureBtn;
}
actionInit();
