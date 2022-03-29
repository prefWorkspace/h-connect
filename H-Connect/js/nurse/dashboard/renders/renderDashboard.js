// API
import { getWardList } from '../actions/getWardList.js';
import { getPatientList } from '../actions/getPatientList.js';
import { getDisplayList } from '../actions/getDisplayList.js';

// Template
import {
    parseWardList,
    parsePatientsBySickRoom,
} from '../templates/dashboardWardListTmpl.js';
import { parsePatientListToDashboardScreen } from '../templates/dashboardScreenTmpl.js';

//API 저장 변수 (병동, 환자)
const wardList_api = await getWardList();
const patientList_api = await getPatientList();
const dispiaylist_api = await getDisplayList(1, 10);

// 대시보드 화면 번호
let displayNumber = 1;
// 대시보드 출력 대상 수
let displayPatientsNumber = 20;

const $target_select = $('.taget_select');
const $display_inpat = $('.inpat');


let selected_ward = 'NONE';
// 모니터링 대상 체크된 환자 배열
let monitoring_patient_array = [];
// 대시보드 병상 환자 목록 배열
let patients_by_dashboard_screen = [];
// 모니터링 대상 렌더
const renderDashboard = async () => {
    try {
        // 병동, 병상 선택
        const wardList = parseWardList(wardList_api);
        // 모니터링 대상 환자 리스트
        const patientList = parsePatientsBySickRoom(
            wardList_api,
            patientList_api
        );
        // 모니터링 대상 DOM 연결
        $target_select.html(wardList + patientList);
        // 대시보드 화면 환자 리스트
        const displayPatient = parsePatientListToDashboardScreen(
            patients_by_dashboard_screen
        );
        // 대시보드 화면 DOM 연결
        $display_inpat.html(displayPatient);
        // 이벤트 바인딩
    } catch (err) {
        console.log(err);
    }
};

const renderDashboardScreen = (addedList) => {
    let patientsIdList = patients_by_dashboard_screen.map(
        (patient) => patient.patientCode
    );
    addedList.forEach((patient) => {
        if (!patientsIdList.includes(patient)) patientsIdList.push(patient);
    });
    const displayPatient = parsePatientListToDashboardScreen(
        getPatientsInfoByIds(patientsIdList)
    );
    patients_by_dashboard_screen = getPatientsInfoByIds(patientsIdList);
    // 대시보드 화면 DOM 연결
    $display_inpat.html(displayPatient);
};

//병동선택 콤보박스 펼치고 선택
function _dashboard_wardSelectBox_select() {
    const _$ward_selectBox_el = $(
        '.nurse.dashboard .taget_select .select_ward'
    );
    const _$ward_selectBox_selected_el = $(
        '.nurse.dashboard .taget_select .select_ward .ward_label'
    );
    const _$ward_option_list_el = $(
        '.nurse.dashboard .taget_select .select_ward .ward_option .ward_list'
    );

    const _wardSelect = (item) => {
        _$ward_selectBox_el.removeClass('active');
        _$ward_selectBox_selected_el.html(item.text());
        return item.attr('name');
    };

    //병동 선택했을 때
    _$ward_option_list_el.each(function () {
        $(this)
            .off()
            .on('click', () => {
                const _change_ward = _wardSelect($(this));
                if (_change_ward != selected_ward) {
                    selected_ward = $(this).attr('name');
                    //병동의 병실 출력
                    showSickRoom(selected_ward);
                    //병실의 병상 출력
                    showPatients(selected_ward);
                    //병동 체크박스 이벤트 부여
                    addEventOnWardCheck(selected_ward);
                    //병동 선택되어
                    isWardChecked();
                    //모니터랑 대상 병실 병상 체크 해제
                    $(`input[name=patient_no]`).prop('checked', false);
                    // 병동 변경시 펼쳐진 병실병상 리스트 접기
                    $('.ward_count.on').trigger('click');
                    //병동 바꾸면 체크된 환자 초기화
                    allSickRoomUnchecked();
                    //병실 체크박스 이벤트
                    addEventOnSickRoomCheck(selected_ward);
                    //병상 체크박스 이벤트
                    addEventOnSickBed(selected_ward);
                }
            });
    });

    _$ward_selectBox_selected_el.on('click', () => {
        if (_$ward_selectBox_el.hasClass('active')) {
            _$ward_selectBox_el.removeClass('active');
        } else {
            _$ward_selectBox_el.addClass('active');
        }
    });
}

function showSickRoom(wardCode) {
    $('.ward_block').css('display', 'none');
    if (wardCode) $(`.ward_block.${wardCode}`).css('display', 'block');
}

function showPatients(wardCode) {
    function findSickRoomByWardCode(ele) {
        if (ele.wardCode === wardCode) return true;
    }

    if (wardCode) {
        const { sickRoomList } = wardList_api.find(findSickRoomByWardCode);
        sickRoomList.forEach((sickRoom) => {
            $(`.ward_count.${sickRoom.sickRoomCode}`)
                .off()
                .on('click', () => {
                    if (
                        $(`.patient_info.${sickRoom.sickRoomCode}`).css(
                            'display'
                        ) == 'block'
                    ) {
                        $(`.patient_info.${sickRoom.sickRoomCode}`).css(
                            'display',
                            'none'
                        );
                        $(
                            `.ward_count.${sickRoom.sickRoomCode}.on`
                        ).removeClass('on');
                    } else {
                        $(`.patient_info.${sickRoom.sickRoomCode}`).css(
                            'display',
                            'block'
                        );
                        $(`.ward_count.${sickRoom.sickRoomCode}`).addClass(
                            'on'
                        );
                    }
                });
        });
    }
}

//병동 바꿀 시 병동 선택되어 있으면 선택 해제
function isWardChecked() {
    const _$ward_check = $('#ward_check');
    if (_$ward_check.prop('checked')) {
        _$ward_check.prop('checked', false);
    }
}

//병실 선택 해제
function allSickRoomUnchecked() {
    const _$sickRoom_check = $('input[name=room_no]');
    if (_$sickRoom_check.prop('checked')) {
        _$sickRoom_check.prop('checked', false);
    }
}

//병동 체크박스에 이벤트 부여
function addEventOnWardCheck(wardCode) {
    const _$ward_check = $('#ward_check');
    _$ward_check.off().on('click', () => {
        //병실 체크
        const sickRoomByWard = wardList_api
            .filter((ward) => ward.wardCode === wardCode)[0]
            .sickRoomList.map((sickRoom) => sickRoom.sickRoomCode);
        sickRoomByWard.forEach((sickRoomCode) => {
            if (_$ward_check.prop('checked')) {
                $(`#${sickRoomCode}`).prop('checked', true);
            } else {
                $(`#${sickRoomCode}`).prop('checked', false);
            }
        });
        //병상 체크
        const check_patients_array = patientList_api
            .filter((patient) => patient.wardCode === wardCode)
            .map((patient) => patient.patientCode);
        check_patients_array.forEach((patient_code) => {
            if (_$ward_check.prop('checked')) {
                $(`#${patient_code}`).prop('checked', true);
            } else {
                $(`#${patient_code}`).prop('checked', false);
            }
        });
    });
}

//병실 체크박스 이벤트 부여
function addEventOnSickRoomCheck(wardCode) {
    const sickRoomByWard = wardList_api
        .filter((ward) => ward.wardCode === wardCode)[0]
        .sickRoomList.map((sickRoom) => sickRoom.sickRoomCode);
    //다 체크되면 병동선택 체크하는 함수
    function checkWardByCheckRoom(roomLength) {
        let checkedLen = 0;
        sickRoomByWard.forEach((sickRoomCode) => {
            if ($(`#${sickRoomCode}`).prop('checked')) checkedLen += 1;
        });

        if (roomLength === checkedLen) {
            $('#ward_check').prop('checked', true);
        } else {
            $('#ward_check').prop('checked', false);
        }
    }
    sickRoomByWard.forEach((sickRoomCode) => {
        const _$sickRoom_check = $(`#${sickRoomCode}`);

        _$sickRoom_check.off().on('click', () => {
            //병실 체크박스 체크시 이벤트 부여
            checkWardByCheckRoom(sickRoomByWard.length);
            const check_patients_array = patientList_api
                .filter((patient) => patient.sickRoomCode === sickRoomCode)
                .map((patient) => patient.patientCode);
            check_patients_array.forEach((patientCode) => {
                if (_$sickRoom_check.prop('checked')) {
                    $(`#${patientCode}`).prop('checked', true);
                } else {
                    $(`#${patientCode}`).prop('checked', false);
                }
            });
        });
    });
}

//병상 체크박스 이벤트부여
function addEventOnSickBed(wardCode) {
    //병상에 따른 병실 체크박스 제어
    const sickRoomByWard = wardList_api
        .filter((ward) => ward.wardCode === wardCode)[0]
        .sickRoomList.map((sickRoom) => sickRoom.sickRoomCode);
    let patients_by_sickRoom_many = {};
    sickRoomByWard.forEach((sickRoomCode) => {
        if (!patients_by_sickRoom_many[sickRoomCode]) {
            patients_by_sickRoom_many[sickRoomCode] = 0;
        }
    });
    const check_patients_array = patientList_api
        .filter((patient) => patient.wardCode === wardCode)
        .map((patient) => {
            patients_by_sickRoom_many[patient.sickRoomCode] += 1;
            return {
                sickRoomCode: patient.sickRoomCode,
                patientCode: patient.patientCode,
            };
        });
    check_patients_array.forEach((patient) => {
        $(`#${patient.patientCode}`)
            .off()
            .on('click', () => {
                const sickRoomCode_of_patient = check_patients_array.filter(
                    (pat) => pat.patientCode === patient.patientCode
                )[0].sickRoomCode;
                let check_sickBed = 0;
                const patients_by_sickRoom = check_patients_array
                    .filter(
                        (pat) => pat['sickRoomCode'] === sickRoomCode_of_patient
                    )
                    .map((p) => p['patientCode']);
                patients_by_sickRoom.forEach((pat) => {
                    if ($(`#${pat}`).prop('checked')) check_sickBed += 1;
                });
                if (
                    check_sickBed ===
                    patients_by_sickRoom_many[sickRoomCode_of_patient]
                ) {
                    $(`#${sickRoomCode_of_patient}`).prop('checked', true);
                } else {
                    $(`#${sickRoomCode_of_patient}`).prop('checked', false);
                }

                let check_sickBed_by_ward = 0;
                check_patients_array.forEach((pat) => {
                    if ($(`#${pat.patientCode}`).prop('checked'))
                        check_sickBed_by_ward += 1;
                });
                if (check_patients_array.length == check_sickBed_by_ward) {
                } else {
                    $(`#ward_check`).prop('checked', false);
                }
            });
    });
}

//병상 추가 버튼 이벤트
function addEventToAddBtn() {
    function addPatients() {
        monitoring_patient_array.length = 0;
        $.each($(`input[name=patient_no]:checked`), function () {
            monitoring_patient_array.push($(this).attr('id'));
        });
        monitoring_patient_array.sort();
    }
    $('.btn.bl.btn_add')
        .off()
        .on('click', () => {
            if ($(`input[name=patient_no]:checked`).length) {
                addPatients();
                renderDashboardScreen(monitoring_patient_array);
                addEventsToDashboardSickbeds();
                deleteBtnUpdate();
            }
        });
}

// 병상 추가 버튼 갱신
function addBtnUpdate() {
    if ($(`input[name=patient_no]:checked`).length) {
        $(`.btn.bl.btn_add`).attr('disabled', false);
    } else {
        $(`.btn.bl.btn_add`).attr('disabled', true);
    }
}

// 병상 제거 버튼 이벤트
function addEventToDeleveBtn() {
    function deletePatients() {
        let patients = patients_by_dashboard_screen.map(
            (patient) => patient.patientCode
        );
        $.each($(`.inpat_patient:checked`), function () {
            const checkedId = $(this).attr('id').replace('inpat_', '');
            if (patients.includes(checkedId))
                patients.splice([patients.indexOf(checkedId)], 1);
        });
        patients_by_dashboard_screen = patients;
        return patients;
    }

    $('.btn.rd.btn_delete')
        .off()
        .on('click', () => {
            if ($(`.inpat_patient:checked`).length) {
                renderDashboardScreen(deletePatients());
                addEventsToDashboardSickbeds();
                deleteBtnUpdate();
            }
        });
}

// 병상 제거 버튼 업데이트
function deleteBtnUpdate() {
    if ($(`.inpat_patient:checked`).length) {
        $('.btn_delete').attr('disabled', false);
    } else {
        $('.btn_delete').attr('disabled', true);
    }
}

//대시보드 병상 버튼 이벤트 부여
function addEventsToDashboardSickbeds() {
    $('.inpat_patient')
        .off()
        .on('click', () => {
            if ($(`.inpat_patient:checked`).length) {
                $('.btn_delete').attr('disabled', false);
            } else {
                $('.btn_delete').attr('disabled', true);
            }
        });
}

// 환자의 id array로 환자의 정보를 불러옴
const getPatientsInfoByIds = (patientIds) => {
    let patientsInfo = [];
    for (let i = 0; i < patientList_api.length; i++) {
        for (let j = 0; j < patientIds.length; j++) {
            if (patientList_api[i].patientCode === patientIds[j])
                patientsInfo.push(patientList_api[i]);
        }
    }
    return patientsInfo;
};

function _dashboard_target_monitoring_init() {
    renderDashboard();
    _dashboard_wardSelectBox_select();
    showSickRoom(null);
    showPatients(null);
    addEventToAddBtn();
    //addBtnUpdate();
    addEventToDeleveBtn();
    deleteBtnUpdate();
    console.log(dispiaylist_api);
}

_dashboard_target_monitoring_init();
