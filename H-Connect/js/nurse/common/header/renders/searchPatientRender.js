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

/* s: 환자검색 리스트 렌더 */
export async function headerSearchPatientListRender() {
    const _patientList = await selectMeasurementInfoList();
    if (_patientList) {
        let _html = '';
        for (let i = 0, len = _patientList.length; i < len; i++) {
            _html += searchPatientBlock(_patientList[i]);
        }
        $('.search_patient .wrap_inner').html(_html);

        // 렌더가 끝나면 검색기능 실행
        headerFindPatientHandle(_patientList);
    }
}
headerSearchPatientListRender();
/* e: 환자검색 리스트 렌더 */

/* s: 환자검색 기능 */
export function headerFindPatientHandle(_patient_list) {
    /* 환자 정보(이름, 코드) 가공 */
    const _tempPatientList = _patient_list;
    let _patientList = [];
    for (let i = 0, len = _tempPatientList.length; i < len; i++) {
        _patientList[i] = {
            name: _tempPatientList[i].name,
            patientCode: _tempPatientList[i].patientCode,
        };
    }
    // jquery dom
    let _$header_searchPatientList_els = $(
        '.search_patient .wrap_inner .patient_list'
    );
    const _$header_searchInput_el = $('.search_container input');

    /* 검색 input 검색 이벤트 */
    _$header_searchInput_el.off().on('input', (e) => {
        // input에 타이핑을 하면 환자 이름, 코드를 찾아 해당 리스트만 display block 시켜줍니다.
        const _inputTest = new RegExp(e.currentTarget.value);

        _patientList.filter((item, index) => {
            const { name, patientCode } = item || {};
            const _p_listEl = _$header_searchPatientList_els[index];

            if (!(_inputTest.test(name) || _inputTest.test(patientCode))) {
                if (_p_listEl.style.display !== 'none')
                    _p_listEl.style.display = 'none';
            } else {
                if (_p_listEl.style.display !== 'block')
                    _p_listEl.style.display = 'block';
            }
        });
    });

    /* 리스트 영역 컨트롤 이벤트 */
    $('.pc_header .search_container')
        .off()
        .on('click', function () {
            $('.pop.search_patient').fadeToggle();
            $('.pc_header .search_container .btn_search').toggleClass('on');
        });

    $('#wrap_content')
        .off()
        .on('click', function () {
            $('.pop.search_patient').fadeOut();
            $('.pc_header .search_container .btn_search').removeClass('on');
        });
}
/* e: 환자검색 기능 */
