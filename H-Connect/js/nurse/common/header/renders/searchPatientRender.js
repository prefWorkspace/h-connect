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

//
let searchMode = false;

/* s: 환자검색 리스트 렌더 */
export async function headerSearchPatientListRender() {
    const searchValue = $searchInputEl.val();
    const _patientList = await selectMeasurementInfoList(searchValue);
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

    $searchInputEl.on('input', (e) => {
        const _target = e.currentTarget;
        if (_target.value.length <= 0) {
            $('.search_patient .wrap_inner').html('');
            $('.pop.search_patient').fadeOut();
            searchMode = false;
        }
    });
}
function onSearchMode() {
    $searchInputEl.on('click', () => {
        if (searchMode) {
            $('.pop.search_patient').fadeIn();
        }
    });
}

function addEventSearchPatient() {
    onSearchStart();
    onSearchMode();
}
addEventSearchPatient();
