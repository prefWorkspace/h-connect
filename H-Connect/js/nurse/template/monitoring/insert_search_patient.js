const $search_inputEl = $('.search_container input');
const $search_buttonEl = $('.search_container button.btn_search');

const $search_patientListWrap = $('.search_patient .wrap_inner');
let $search_patientListEls = null;

/* 환자검색 리스트블록 */
function Search_Patient_Block(data){
    console.log(data);
    const {name, birthday, gender, patientCode, ward, sickRoom, sickBed} = data || {};
    
    const genderView = gender === 1 ? '남자' : gender === 2 ? '여자' : '';
    return `
    <p class="patient_list">
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

/* 환자검색 리스트 appeding */
function insert_search_patient_list(patient_list){
    if(patient_list){
        let html = "";
        for(let i = 0 , len = patient_list.length; i < len; i++){
            html+=Search_Patient_Block(patient_list[i]);
        }
        $search_patientListWrap.html(html);
        
        input_patient_find(patient_list);
    }
}

// 환자검색 기능
function input_patient_find(patient_list){
    const tempPatList = patient_list;
    let patientList = [];
    for(let i = 0, len = PatientList.length; i < len; i++){
        // patientList[i] = {name:tempPatList[i].name, patientCode:tempPatList[i].patientCode};
    }
    $search_patientListEls = $('.search_patient .wrap_inner .patient_list');


    $search_inputEl.off().on('input', function(e){
        const inputVal = e.currentTarget.value;
        let searchArr = [];
        for(let i = 0, len = patientList.length; i < len; i++){
            // PatientList
            // searchArr
        }
    })
}