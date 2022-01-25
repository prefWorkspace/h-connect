const $search_patientListEl = $('.search_patient .wrap_inner');

function Search_Patient_Block(data){
    console.log(data);
    const {name, gender, patientCode, ward, sickRoom, sickBed} = data || {};
    
    const genderView = gender === 1 ? '남자' : gender === 2 ? '여자' : '';
    return `
    <p>
        <span>${name}</span>
        (<span>74</span>.<span>${genderView}</span>).
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
function ageCalc(birth){
    const todayD = new Date();
    const birthD = new Date(birth);
    let age = 
}
function insert_search_patient_list(patient_list){
    let html = "";
    for(let i = 0 , len = patient_list.length; i < len; i++){
        html+=Search_Patient_Block(patient_list[i]);
    }
    $search_patientListEl.html(html);
}