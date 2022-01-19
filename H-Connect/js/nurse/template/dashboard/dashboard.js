/** ----------------------------------------------------------------
 * s : 대시보드 모니터링 대상 블록  
 * 
 * html 플로우는 병동(Ward) > 병실(SickRoom) > 병상(SickBed) 순입니다.
------------------------------------------------------------------ */


//value

//dom
const $ward_selectBoxEl = $('.nurse.dashboard .taget_select .select_ward'); // 병동 설렉트박스 선택된 element
const $ward_selectBox_selectedEl = $('.nurse.dashboard .taget_select .select_ward .ward_label'); // 병동 설렉트박스 선택된 element

const $sickRoomWrapEl = $('.nurse.dashboard .taget_select .select_inner'); // 병실wrap
//append
function Ward_Select_ListBox(ward_list){
    /**
     * 병동 설렉트박스 리스트 생성.
     */
    if(ward_list !== null && ward_list.length > 0){
        
        const $ward_selectBox_listWrap = $('.nurse.dashboard .taget_select .select_ward .ward_option');

        let html = '';
        for(let i = 0; i < ward_list.length; i++){
            const {ward} = ward_list[i];
            html+=`<li class="optionItem ward_list">${ward}</li>`;
        }

        $ward_selectBox_listWrap.html(html);
    }
}

function SickRoom_Block(room_list){
    /**
    * < sickRoom_block >
    * 병실 블록 생성입니다.
    */
   console.log(room_list);
    if(room_list !== null && room_list.length > 0){
        let html = '';
        for(let i = 0; i < room_list.length; i++){
            const {sickRoom, sickRoomCode} = room_list[i];
            html+= `
            <div class="sickRoom_block" style="cursor:pointer;">
                <div class="ward_count">
                    <div class="input_wrap">
                        <input type="checkbox" class="green_custom" id="${sickRoomCode}">
                        <label for="${sickRoomCode}"></label>
                        <label for="${sickRoomCode}">${sickRoom}</label>
                    </div>
                </div>
                <div class="patient_info">
                
                    <div class="input_wrap">
                        <input type="checkbox" name="patient_no" class="green_custom" id="${'afasd'}" onclick="checkSelectAll(this)">
                        <label for="${'afasd'}"></label>
                        <label for="${'afasd'}"><span>김환자(63.남.patient no)</span></label>
                    </div>
    
                    <div class="input_wrap">
                        <input type="checkbox" name="patient_no" class="green_custom" id="patient_2" onclick="checkSelectAll(this)">
                        <label for="patient_2"></label>
                        <label for="patient_2"><span>김환자(63.남.patient no)</span></label>
                    </div>
    
                    <div class="input_wrap">
                        <input type="checkbox" name="patient_no" class="green_custom" id="patient_3" onclick="checkSelectAll(this)">
                        <label for="patient_3"></label>
                        <label for="patient_3"><span>김환자(63.남.patient no)</span></label>
                    </div>
    
                    <div class="input_wrap">
                        <input type="checkbox" name="patient_no" class="green_custom" id="patient_4" onclick="checkSelectAll(this)">
                        <label for="patient_4"></label>
                        <label for="patient_4"><span>김환자(63.남.patient no)</span></label>
                    </div>
                </div>
            </div>
            `;
        }
        $sickRoomWrapEl.html(html);

        const $sickRoom_wardListEls = $('.nurse.dashboard .taget_select .select_inner .sickRoom_block');
        $sickRoom_wardListEls.children('.ward_count').off().on('click', function(){
            $(this).next().toggle();
        });
        $sickRoom_wardListEls.children('.ward_count .input_wrap input').off().on('change', function(){
            console.log('cc');
        })
    }
}

function SickBed_Block(){
    /**
    * 병상 블록 HTML 템플릿 입니다.
    */
    return `
    <div class="input_wrap">
        <input type="checkbox" name="patient_no" class="green_custom" id="patient_1" onclick="checkSelectAll(this)">
        <label for="patient_1"></label>
        <label for="patient_1"><span>김환자(63.남.patient no)</span></label>
    </div>
    `
}

//setting and events
function ward_Selected_Setting(selected){
    $ward_selectBox_selectedEl.text(selected);
}
function first_ward_addEvent(){
    $ward_selectBoxEl.off().on('click', function(){
        // 설렉트 박스 리스트 열고 닫기 이벤트 부여
        $ward_selectBoxEl.toggleClass('active');
    });
    const $ward_selectBox_listEls = $('.nurse.dashboard .ward_option .ward_list'); // 병동 설렉트박스 선택된 element
    $ward_selectBox_listEls.off().on('click', function(){
        // 설렉트 박스 선택 이벤트
        const selectedWard = wardList[$(this).index()];
        ward_Selected_Setting(selectedWard.ward);
        get_SickRoom_Api({
            wardCode : selectedWard.wardCode,
            includeSickBed : true
        });
    });
}

/** ----------------------------------------------------------------
 * e : 대시보드 모니터링 대상 블록  
------------------------------------------------------------------ */
function first_dashboard_view_setting(){

    ward_Selected_Setting(wardList[0].ward);

    Ward_Select_ListBox(wardList);

    SickRoom_Block(sickRoomList);

    first_ward_addEvent();
}