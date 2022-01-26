// dom
const $header_search_inputEl = $('.search_container input');
const $header_search_buttonEl = $('.search_container button.btn_search');

const $header_search_patientListWrap = $('.search_patient .wrap_inner');
let $header_search_patientListEls = null;

/* s: 환자검색 리스트블록 */
function Search_Patient_Block(data){
    const {measurementCode, name, birthday, gender, patientCode, ward, sickRoom, sickBed} = data || {};
    
    const genderView = gender === 1 ? '남자' : gender === 2 ? '여자' : '';
    return `
    <p class="patient_list" onclick='history.push("/nurse/patient.html?patient_code=${measurementCode}")'>
        <span>${name}</span>
        (<span>${ageCalc(birthday)}</span>.<span>${genderView}</span>).
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
function insert_search_patient_list(patient_list){
    if(patient_list && $header_search_patientListWrap){
        let html = "";
        for(let i = 0 , len = patient_list.length; i < len; i++){
            html+=Search_Patient_Block(patient_list[i]);
        }
        $header_search_patientListWrap.html(html);
        
        // 렌더가 끝나면 검색기능 실행
        input_patient_find(patient_list);
    }
}
/* e: 환자검색 리스트 렌더 */


/* s: 환자검색 기능 */
function input_patient_find(patient_list){

    /* 환자 정보(이름, 코드) 가공 */
    const tempPatList = patient_list;
    let patientList = [];
    for(let i = 0, len = tempPatList.length; i < len; i++){
        patientList[i] = {name:tempPatList[i].name, patientCode:tempPatList[i].patientCode};
    }
    $header_search_patientListEls = $('.search_patient .wrap_inner .patient_list');


    /* 검색 input 검색 이벤트 */
    $header_search_inputEl.off().on('input', (e)=>{
        // input에 타이핑을 하면 환자 이름, 코드를 찾아 해당 리스트만 display block 시켜줍니다.
        const inputTest = new RegExp(e.currentTarget.value);

        patientList.filter((item, index)=>{
            const {name, patientCode} = item || {};
            const p_listEl = $header_search_patientListEls[index];

            if(!(inputTest.test(name) || inputTest.test(patientCode))){
                if(p_listEl.style.display !== "none")
                p_listEl.style.display = "none";

            }else{
                if(p_listEl.style.display !== "block")
                p_listEl.style.display = "block";

            }
        });
    })
}
/* e: 환자검색 기능 */