import {
    selectBloodPressurePage,
    insertBloodPressure,
    updateBloodPressure,
    deleteBloodPressure,
} from './bloodPressureAPI.js';

import { request_Date_Data } from '../../../../utils/controller/commonRequest.js?v=2022.01.17.11.33';

import { renderPrerecordList } from '../renders/renderPrerecord.js';

import { history } from '../../../../utils/controller/historyController.js?v=2022.01.26.12.45';

const historyMeasurementCode = history.getParams('measurement_code');
const historyPage = history.getParams('page');

function getBloodPressureDomIndexedInfo(_target) {
    const curItemEl = $(_target).parents('.bloodPressure_item');
    const indexId = curItemEl.attr('data-indexId');
    const recordDateTime = curItemEl.attr('data-recordDateTime');
    const SYS = curItemEl.find('.SYS-item').text();
    const DIA = curItemEl.find('.DIA-item').text();
    const Pulse = curItemEl.find('.Pulse-item').text();

    return {
        curItemEl,
        indexId,
        recordDateTime,
        SYS,
        DIA,
        Pulse,
    };
}
let tmpUpdateData = {};

function resetBloodPressue() {
    $('#SYS').val('');
    $('#DIA').val('');
    $('#Pulse').val('');
    tmpUpdateData = {};
}

async function initBloodPressureAction() {
    const onClickInsertBloodPressureBtn = async () => {
        // 등록 버튼 클릭 시 혈압 데이터 등록

        if (!$('.btn_list .btn_add').hasClass('modify-mode')) {
            // 기본 등록
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
                resetBloodPressue();
            }
        } else {
            // 수정 등록
            const res = await updateBloodPressure({
                indexId: parseInt(tmpUpdateData.indexId, 10),
                systolic: $('#SYS').val(),
                diastolic: $('#DIA').val(),
                pulse: $('#Pulse').val(),
                dateTime: tmpUpdateData.recordDateTime,
            });
            if (res.result) {
                // 병상 수정 성공시
                $('#add_popup').css('display', 'block');
                await renderPrerecordList();
                resetBloodPressue();
            }
        }
    };

    const onClickCancelBloodPressureBtn = () => {
        resetBloodPressue();
        $('.btn_list .btn_add').removeClass('modify-mode');
    };

    $('.btn_list .btn_add').off().on('click', onClickInsertBloodPressureBtn);
    $('.btn_list .btn_no').off().on('click', onClickCancelBloodPressureBtn);
}
export async function onClickUpdateBloodPressureBtn(_this) {
    // 수정 버튼 클릭 시 혈압 데이터 수정
    $('.btn_list .btn_add').addClass('modify-mode');
    const { indexId, SYS, DIA, Pulse, recordDateTime } =
        getBloodPressureDomIndexedInfo(_this);
    $('#SYS').val(SYS);
    $('#DIA').val(DIA);
    $('#Pulse').val(Pulse);
    tmpUpdateData = { indexId, recordDateTime };
}

export async function onClickDeleteBloodPressureBtn(_this) {
    // 삭제 버튼 클릭 시 혈압 데이터 삭제
    const { indexId } = getBloodPressureDomIndexedInfo(_this);
    await deleteBloodPressure({ indexId: indexId });
    await renderPrerecordList();
}

async function onClickPaginationNumBtn(_number) {
    window.history.pushState(
        '',
        '',
        `arteriotony.html?measurement_code=${historyMeasurementCode}&page=${_number}`
    );
    await renderPrerecordList();
}

function actionInit() {
    initBloodPressureAction();
    window.onClickUpdateBloodPressureBtn = onClickUpdateBloodPressureBtn;
    window.onClickDeleteBloodPressureBtn = onClickDeleteBloodPressureBtn;
    window.onClickPaginationNumBtn = onClickPaginationNumBtn;
}
actionInit();
