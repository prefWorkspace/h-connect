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
const { renderPrerecordList } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/arteriotony/renders/renderPrerecord.js'
    )
);

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
async function onClickPageControllBtn(_type, _pageInform) {
    const { page, totalCount, totalPageCount } = _pageInform || {};
    let _page = page;
    if (_type === 'first') {
        // << 클릭시
        if (_page === 1) return;
        _page = 1;
    } else if (_type === 'prev') {
        // < 클릭시
        if (_page - 1 <= 0) return;
        _page -= 1;
    } else if (_type === 'next') {
        // > 클릭시
        if (_page >= totalPageCount) return;
        _page += 1;
    } else if (_type === 'end') {
        // >> 클릭시
        if (_page === totalPageCount) return;
        _page = totalPageCount;
    }
    window.history.pushState(
        '',
        '',
        `arteriotony.html?measurement_code=${historyMeasurementCode}&page=${_page}`
    );
    await renderPrerecordList();
}

async function oncheckHistoryPage() {
    // 윈도우 history 변경시 페이지 새로 불러오기
    await renderPrerecordList();
}

function actionInit() {
    initBloodPressureAction();
    window.onClickUpdateBloodPressureBtn = onClickUpdateBloodPressureBtn;
    window.onClickDeleteBloodPressureBtn = onClickDeleteBloodPressureBtn;
    window.onClickPaginationNumBtn = onClickPaginationNumBtn;
    window.onClickPageControllBtn = onClickPageControllBtn;
    history.onPopState(oncheckHistoryPage);
}
actionInit();
