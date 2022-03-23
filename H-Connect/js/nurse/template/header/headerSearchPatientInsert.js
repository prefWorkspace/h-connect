import { history } from "../../../utils/controller/historyController.js";
import {serverController} from '../../../utils/controller/serverController.js';
window._history = history;
/* s: 환자검색 리스트블록 */
export function _searchPatientBlock(_data){
    const {measurementCode, name, birthday, gender, patientCode, ward, sickRoom, sickBed} = _data || {};
    return `
    <p class="patient_list" onclick='window._history.linkTo("/nurse/patient.html?measurement_code=${measurementCode}")'>
        <span>${name}</span>
        (<span>${AGE_CALC(birthday)}</span>.
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
export function _header_searchPatientList_insert(_patient_list){

    const _$header_searchPatientList_wrap = $('.search_patient .wrap_inner');
    if(_patient_list && _$header_searchPatientList_wrap){
        let _html = "";
        for(let i = 0 , len = _patient_list.length; i < len; i++){
            _html+=_searchPatientBlock(_patient_list[i]);
        }
        _$header_searchPatientList_wrap.html(_html);
        
        // 렌더가 끝나면 검색기능 실행
        _header_findPatient_handle(_patient_list);
    }
}
/* e: 환자검색 리스트 렌더 */


/* s: 환자검색 기능 */
export function _header_findPatient_handle(_patient_list){

    /* 환자 정보(이름, 코드) 가공 */
    const _tempPatientList = _patient_list;
    let _patientList = [];
    for(let i = 0, len = _tempPatientList.length; i < len; i++){
        _patientList[i] = {name:_tempPatientList[i].name, patientCode:_tempPatientList[i].patientCode};
    }
    // jquery dom
    let _$header_searchPatientList_els = $('.search_patient .wrap_inner .patient_list');
    const _$header_searchInput_el = $('.search_container input');;

    /* 검색 input 검색 이벤트 */
    _$header_searchInput_el.off().on('input', (e)=>{
        // input에 타이핑을 하면 환자 이름, 코드를 찾아 해당 리스트만 display block 시켜줍니다.
        const _inputTest = new RegExp(e.currentTarget.value);

        _patientList.filter((item, index)=>{
            const {name, patientCode} = item || {};
            const _p_listEl = _$header_searchPatientList_els[index];

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
    $('.pc_header .search_container').off().on('click', function(){
        $('.pop.search_patient').fadeToggle();
        $('.pc_header .search_container .btn_search').toggleClass('on');
    })

    $('#wrap_content').off().on('click', function(){
        $('.pop.search_patient').fadeOut();
        $('.pc_header .search_container .btn_search').removeClass('on');
    })
}
/* e: 환자검색 기능 */