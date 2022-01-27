// dom
const $HEADER_SEARCH_INPUT_EL = $('.search_container input');
const $HEADER_SEARCH_BUTTON_EL = $('.search_container button.btn_search');

const $HEADER_SEARCH_PATIENT_LIST_WRAP = $('.search_patient .wrap_inner');
let $HEADER_SEARCH_PATIENT_LIST_ELS = null;

/* s: 환자검색 리스트블록 */
function _searchPatientBlock(data){
    const {measurementCode, name, birthday, gender, patientCode, ward, sickRoom, sickBed} = data || {};
    return `
    <p class="patient_list" onclick='history.push("/nurse/patient.html?measurement_code=${measurementCode}")'>
        <span>${name}</span>
        (<span>${ageCalc(birthday)}</span>.
        <span>${gender === 1 ? '남자' : '여자'}</span>).
        <span>${patientCode}</span>
        ${
            ward ?
            `
            .<span>${ward}</span>
            ` : ``
        }
        ${
            sickRoom ? 
            `
            .<span>1302</span>호실.
            ` : ``
        }
        ${
            sickBed ?
            `
            <span>1</span>병상
            ` : ``
        }
    </p>
    `;
}
/* e: 환자검색 리스트블록 */


/* s: 환자검색 리스트 렌더 */
function _insertSearchPatientList(patient_list){
    if(patient_list && $HEADER_SEARCH_PATIENT_LIST_WRAP){
        let _html = "";
        for(let i = 0 , len = patient_list.length; i < len; i++){
            _html+=_searchPatientBlock(patient_list[i]);
        }
        $HEADER_SEARCH_PATIENT_LIST_WRAP.html(_html);
        
        // 렌더가 끝나면 검색기능 실행
        _input_patient_find(patient_list);
    }
}
/* e: 환자검색 리스트 렌더 */


/* s: 환자검색 기능 */
function _input_patient_find(patient_list){

    /* 환자 정보(이름, 코드) 가공 */
    const tempPatList = patient_list;
    let patientList = [];
    for(let i = 0, len = tempPatList.length; i < len; i++){
        patientList[i] = {name:tempPatList[i].name, patientCode:tempPatList[i].patientCode};
    }
    $HEADER_SEARCH_PATIENT_LIST_ELS = $('.search_patient .wrap_inner .patient_list');

    /* 검색 input 검색 이벤트 */
    $HEADER_SEARCH_INPUT_EL.off().on('input', (e)=>{
        // input에 타이핑을 하면 환자 이름, 코드를 찾아 해당 리스트만 display block 시켜줍니다.
        const _inputTest = new RegExp(e.currentTarget.value);

        patientList.filter((item, index)=>{
            const {name, patientCode} = item || {};
            const _p_listEl = $HEADER_SEARCH_PATIENT_LIST_ELS[index];

            if(!(_inputTest.test(name) || _inputTest.test(patientCode))){
                if(_p_listEl.style.display !== "none")
                _p_listEl.style.display = "none";

            }else{
                if(_p_listEl.style.display !== "block")
                _p_listEl.style.display = "block";

            }
        });
    })

    /* 리스트 영역 컨트롤 이벤트 */
    $('.pc_header .search_container').on('click', function(){
        $('.pop.search_patient').fadeToggle();
        $('.pc_header .search_container .btn_search').toggleClass('on');
    })

    $('#wrap_content').on('click', function(){
        $('.pop.search_patient').fadeOut();
        $('.pc_header .search_container .btn_search').removeClass('on');
    })
}
/* e: 환자검색 기능 */