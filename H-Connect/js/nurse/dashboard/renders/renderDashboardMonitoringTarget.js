const dummy_wardList = [
    {
        ward: '심장내과',
        wardCode: 'SEERS_HEART',
        sickRoomList: [
            {
                sickRoomCode: 'SEERS_01_01',
                sickRoom: '101호실',
                nickname: '101호실',
                roomTotalSickBed: 4,
            },
            {
                sickRoomCode: 'SEERS_01_02',
                sickRoom: '102호실',
                nickname: '102호실',
                roomTotalSickBed: 4,
            },
            {
                sickRoomCode: 'SEERS_01_03',
                sickRoom: '103호실',
                nickname: '103호실',
                roomTotalSickBed: 6,
            },
        ],
    },
    {
        ward: '정형외과',
        wardCode: 'SEERS_BONE',
        sickRoomList: [
            {
                sickRoomCode: 'SEERS_02_01',
                sickRoom: '201호실',
                nickname: '201호실',
                roomTotalSickBed: 3,
            },
            {
                sickRoomCode: 'SEERS_02_02',
                sickRoom: '202호실',
                nickname: '202호실',
                roomTotalSickBed: 6,
            },
        ],
    },
    {
        ward: '치과',
        wardCode: 'SEERS_TEETH',
        sickRoomList: [
            {
                sickRoomCode: 'SEERS_03_01',
                sickRoom: '301호실',
                nickname: '301호실',
                roomTotalSickBed: 4,
            },
            {
                sickRoomCode: 'SEERS_03_02',
                sickRoom: '302호실',
                nickname: '302호실',
                roomTotalSickBed: 5,
            },
        ],
    },
];

const dummy_patients = [
    {
        patientCode: 'PATI_1',
        name: '박진형',
        age: 28,
        gender: 1,
        sickRoomCode: 'SEERS_01_01',
        wardCode: 'SEERS_HEART',
    },
    {
        patientCode: 'PATI_2',
        name: '이한식',
        age: 45,
        gender: 1,
        sickRoomCode: 'SEERS_01_01',
        wardCode: 'SEERS_HEART',
    },
    {
        patientCode: 'PATI_3',
        name: '이현영',
        age: 40,
        gender: 2,
        sickRoomCode: 'SEERS_01_02',
        wardCode: 'SEERS_HEART',
    },
    {
        patientCode: 'PATI_4',
        name: '정석원',
        age: 35,
        gender: 1,
        sickRoomCode: 'SEERS_02_02',
        wardCode: 'SEERS_BONE',
    },
];

import {
    parseWardList,
    parsePatientsBySickRoom,
} from '../templates/dashboardWardListTmpl.js';

const $target_select = $('.taget_select');
let selected_ward = 'NONE';
// 모니터링 대상 체크된 환자 배열
let monitoring_patient_array = [];
// 모니터링 대상 렌더
const renderDashboard = async () => {
    try {
        // 병동 선택
        const wardList = parseWardList(dummy_wardList);
        const patientList = parsePatientsBySickRoom(
            dummy_wardList,
            dummy_patients
        );
        $target_select.html(wardList + patientList);

        // 이벤트 바인딩
    } catch (err) {
        console.log(err);
    }
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
                    //병동 바꾸면 체크된 환자 초기화
                    allSickRoomUnchecked();
                    //병실 체크박스 이벤트
                    addEventOnSickRoomCheck(selected_ward);
                    //병상 체크박스 이벤트
                    addEventOnSickBed();
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
        const { sickRoomList } = dummy_wardList.find(findSickRoomByWardCode);
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
        const sickRoomByWard = dummy_wardList
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
        const check_patients_array = dummy_patients
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
    const sickRoomByWard = dummy_wardList
        .filter((ward) => ward.wardCode === wardCode)[0]
        .sickRoomList.map((sickRoom) => sickRoom.sickRoomCode);
    sickRoomByWard.forEach((sickRoomCode) => {
        const _$sickRoom_check = $(`#${sickRoomCode}`);

        _$sickRoom_check.off().on('click', () => {
            //병실 체크박스 체크시 이벤트 부여
            const check_patients_array = dummy_patients
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
function addEventOnSickBed() {
    // const check_patients_array = dummy_patients
    //     .filter((patient) => patient.sickRoomCode === sickRoomCode)
    //     .map((patient) => patient.patientCode);
}

function addEventToAddBtn() {
    function addPatients() {
        monitoring_patient_array.length = 0;
        $.each($(`input[name=patient_no]:checked`), function () {
            monitoring_patient_array.push($(this).attr('id'));
        });
        monitoring_patient_array.sort();
        console.log(monitoring_patient_array);
    }
    $('.btn.bl.btn_add')
        .off()
        .on('click', () => {
            addPatients();
        });
}

function _dashboard_target_monitoring_init() {
    renderDashboard();
    _dashboard_wardSelectBox_select();
    showSickRoom(null);
    showPatients(null);
    addEventToAddBtn();
}

_dashboard_target_monitoring_init();

// function _dashboard_sickRoom_select() {
//     // 병동선택 체크박스 클릭시 아래의 전체 병실 선택됨
//     $('#ward_check')
//         .off()
//         .on('click', () => {
//             if ($('#ward_check').is(':checked')) {
//                 $('input[name=room_no]').prop('checked', true);
//             } else {
//                 $('input[name=room_no]').prop('checked', false);
//             }
//         });

//     $('input[name=room_no]')
//         .off()
//         .on('click', () => {
//             let _room_total = $('input[name=room_no]').length;
//             let _room_checked = $('input[name=room_no]:checked').length;
//             if (_room_total != _room_checked)
//                 $('#ward_check').prop('checked', false);
//             else $('#ward_check').prop('checked', true);
//         });
// }

// export function getPatientsChecked() {
//     let patients = $('input[name=patient_no]:checked');
//     console.log(patients);
// }
// // function _dashboard_sickRoom_checkSelect() {}

// // function _dashboard_addPatients() {}

// // function _dashboard_render() {
// //     _dashboard_wardSelectBox_select();

// //     _dashboard_sickRoom_select();

// //     _dashboard_addPatients();
// // }

// // _dashboard_render();

// renderDashboard();
// attachEvents();
