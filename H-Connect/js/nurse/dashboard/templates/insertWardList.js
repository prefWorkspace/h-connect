/** ----------------------------------------------------------------
 * html 플로우는 병동(Ward) > 병실(SickRoom) > 병상(SickBed) 순입니다.
------------------------------------------------------------------ */
//jquery dom
const $ward_selectBox_el = $('.nurse.dashboard .taget_select .select_ward');
const $ward_selectBox_selected_el = $(
    '.nurse.dashboard .taget_select .select_ward .ward_label'
);

const $ward_option_el = $(
    '.nurse.dashboard .taget_select .select_ward .ward_option'
);

const $ward_option_list_el = $(
    '.nurse.dashboard .taget_select .select_ward .ward_option .ward_list'
);

const $sickRoomWrap_el = $('.nurse.dashboard .taget_select .select_inner');

/* 병동 설렉트박스 리스트 생성. */
function _dashboard_wardSelectBoxList_insert(_ward_list) {
    if (_ward_list && _ward_list.length > 0) {
        const _$ward_selectBox_listWrap = $(
            '.nurse.dashboard .taget_select .select_ward .ward_option'
        );

        let _html = '';
        for (let i = 0; i < _ward_list.length; i++) {
            const { ward } = _ward_list[i];
            _html += `<li class="optionItem ward_list">${ward}</li>`;
        }

        _$ward_selectBox_listWrap.html(_html);
    }
}

function _dashboard_sickRoom_insert(_ward) {
    /* 병실 블록 생성입니다. */
    if (_ward) {
        const { sickRoomList } = _ward || {};
        if (sickRoomList) {
            let _html = '';
            for (let i = 0; i < sickRoomList.length; i++) {
                const { sickRoom, sickRoomCode } = sickRoomList[i];
                _html += `
                <div class="sickRoom_block" style="cursor:pointer;">
                    <div class="ward_count">
                        <div class="input_wrap">
                            <input type="checkbox" class="green_custom" id="${sickRoomCode}">
                            <label for="${sickRoomCode}"></label>
                            <label for="${sickRoomCode}">${sickRoom}</label>
                        </div>
                    </div>
                    <div class="patient_info">
                        ${sickRoomList[i]?.patientList?.htmlFor((_item) => {
                            return _sickBed_Block(_item);
                        })}
                    </div>
                </div>
                `;
            }
            $sickRoomWrap_el.html(_html);

            const _$sickRoom_wardListEls = $(
                '.nurse.dashboard .taget_select .select_inner .sickRoom_block'
            );
            _$sickRoom_wardListEls
                .find('.ward_count')
                .off()
                .on('click', function () {
                    $(this).next().toggle();
                });
            _$sickRoom_wardListEls
                .find('.ward_count .input_wrap input')
                .off()
                .on('change', function () {
                    const _inputPatientEl = $(this)
                        .closest('.sickRoom_block')
                        .find('.patient_info input');
                    _inputPatientEl.attr(
                        'checked',
                        !_inputPatientEl.attr('checked')
                    );
                });
        }
    }
}

function _sickBed_Block(data) {
    const { name, birthday, gender, patientCode } = data || {};
    /* 병상 블록 HTML 템플릿 입니다. */
    return `
    <div class="input_wrap">
        <input type="checkbox" name="patient_no" class="green_custom" id="patient_1">
        <label for="patient_1"></label>
        <label for="patient_1"><span>${name}(${AGE_CALC(birthday)}.${
        gender === 1 ? '남' : '여'
    }.${patientCode})</span></label>
    </div>
    `;
}

// //setting and events
function _dashboard_firstWard_addEvent() {
    $ward_selectBox_el.off().on('click', function () {
        // 설렉트 박스 리스트 열고 닫기 이벤트 부여
        $ward_selectBox_el.toggleClass('active');
    });
    $ward_option_list_el.off().on('click', function () {
        // 설렉트 박스 선택 이벤트
        const _selectedWard = INFO.wardList[$(this).index()];
        $ward_selectBox_selected_el.text(_selectedWard.ward);

        _dashboard_sickRoom_insert(_selectedWard);
    });
}

/* 모니터링 대상 목록 초기 세팅 */
function _dashboard_firstView_init() {
    $ward_selectBox_selected_el.text(INFO.wardList[0].ward);

    _dashboard_wardSelectBoxList_insert(INFO.wardList);

    _dashboard_sickRoom_insert(INFO.wardList[0]);

    _dashboard_firstWard_addEvent();
}

_dashboard_firstView_init();
