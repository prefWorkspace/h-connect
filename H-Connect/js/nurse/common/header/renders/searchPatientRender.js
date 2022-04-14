const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);
const { selectMeasurementInfoList } = await import(
    importVersion(
        '/H-Connect/js/nurse/common/header/actions/searchPatientAPI.js'
    )
);
const { searchPatientBlock } = await import(
    importVersion(
        '/H-Connect/js/nurse/common/header/templates/searchPatientTmpl.js'
    )
);
window._history = history;

// jquery dom
const $searchBtnEl = $('.search_container .btn_search');
const $searchInputEl = $('.header_inner .search_container input');

// 검색모드 관리
let searchMode = false;

/* s: 환자검색 리스트 렌더 */
export async function headerSearchPatientListRender() {
    const _searchValue = $searchInputEl.val();
    const _patientList = await selectMeasurementInfoList(_searchValue);
    if (_patientList && _patientList.length > 0) {
        // 환자 정보 검색 성공
        let _html = '';
        for (let i = 0, len = _patientList.length; i < len; i++) {
            _html += searchPatientBlock(_patientList[i]);
        }
        $('.search_patient .wrap_inner').html(_html);

        $('.pop.search_patient').fadeIn();

        searchMode = true;
    } else {
        // 환자 정보 검색 실패
        searchMode = false;
    }
}
/* e: 환자검색 리스트 렌더 */
function onSearchStart() {
    /* s: 환자 검색 기능 */
    $searchBtnEl.off().on('click', headerSearchPatientListRender);
    $(document).on(
        'keypress',
        '.header_inner .search_container input',
        function (e) {
            if (e.key === 'Enter') {
                headerSearchPatientListRender();
            }
        }
    );
    /* e: 환자 검색 기능 */

    $searchInputEl.on('input', function () {
        // input의 길이가 0이되면 검색모드 종료
        if ($(this).val().length <= 0) {
            $('.search_patient .wrap_inner').html('');
            $('.pop.search_patient').fadeOut();
            searchMode = false;
        }
    });
}
function onSearchMode() {
    $searchInputEl.on('click', function () {
        // 검색모드 시 환자리스트 영역 다시 보이기
        if (searchMode) {
            $('.pop.search_patient').fadeIn();
        }
    });
}

function addEventSearchPatient() {
    // 이벤트 및 렌더 추가
    onSearchStart();
    onSearchMode();
}
addEventSearchPatient();
