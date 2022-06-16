const { request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);
const {
    selectBloodPressurePage,
    insertBloodPressure,
    updateBloodPressure,
    deleteBloodPressure,
} = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/arteriotony/actions/bloodPressureAPI.js'
    )
);
const { renderArteriotonyList } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/arteriotony/renders/renderArteriotonyList.js'
    )
);

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

function checkValidateArteriotonyValue() {
    // 모두 입력했는지 체크
    if ($('#SYS').val() === '') {
        alert('수축기 혈압을 입력해주세요.');
        return false;
    } else if ($('#DIA').val() === '') {
        alert('이완기 혈압을 입력해주세요.');
        return false;
    } else if ($('#Pulse').val() === '') {
        alert('맥박을 입력해주세요.');
        return false;
    } else {
        return true;
    }
}

async function initBloodPressureAction() {
    const onClickInsertBloodPressureBtn = async () => {
        // 등록 버튼 클릭 시 혈압 데이터 등록
        if (!checkValidateArteriotonyValue()) {
            return;
        }
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
                $('#add_popup h3').text('혈압 수동입력이 등록되었습니다.');
                $('#add_popup h1').text('등록 되었습니다.');
                $('#add_popup').fadeIn();
                await renderArteriotonyList();
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
                $('#add_popup h3').text('혈압 수동입력이 수정되었습니다.');
                $('#add_popup h1').text('수정 되었습니다.');
                $('#add_popup').fadeIn();
                await renderArteriotonyList();
                resetBloodPressue();
            }
        }

        $('#add_popup .btn_check')
            .off()
            .on('click', function () {
                $('#add_popup').fadeOut();
            });
    };

    const onClickCancelBloodPressureBtn = () => {
        resetBloodPressue();
        $('.table_body .bloodPressure_item').each(function () {
            $(this).removeClass('active');
        });
        $('.btn_list .btn_add').removeClass('modify-mode');
    };

    $('.btn_list .btn_add').off().on('click', onClickInsertBloodPressureBtn);
    $('.btn_list .btn_no').off().on('click', onClickCancelBloodPressureBtn);
}

export async function onClickUpdateBloodPressureBtn(_this) {
    // active class 부여
    $('.table_body .bloodPressure_item').each(function () {
        $(this).removeClass('active');
    });
    $(_this).closest('.bloodPressure_item').addClass('active');
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
    await renderArteriotonyList();
}

function actionInit() {
    initBloodPressureAction();
    window.onClickUpdateBloodPressureBtn = onClickUpdateBloodPressureBtn;
    window.onClickDeleteBloodPressureBtn = onClickDeleteBloodPressureBtn;
}

actionInit();
