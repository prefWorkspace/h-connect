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
    },
    {
        patientCode: 'PATI_2',
        name: '이한식',
        age: 45,
        gender: 1,
        sickRoomCode: 'SEERS_01_01',
    },
    {
        patientCode: 'PATI_3',
        name: '이현영',
        age: 40,
        gender: 2,
        sickRoomCode: 'SEERS_01_02',
    },
    {
        patientCode: 'PATI_4',
        name: '정석원',
        age: 35,
        gender: 1,
        sickRoomCode: 'SEERS_02_02',
    },
];

import {
    parseWardList,
    parsePatientsBySickRoom,
} from '../templates/dashboardWardListTmpl.js';

const $target_select = $('.taget_select');
let selected_ward = 'NONE';

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
    };

    _$ward_option_list_el.each(function () {
        $(this)
            .off()
            .on('click', () => {
                _wardSelect($(this));
                selected_ward = $(this).attr('name');
                showSickRoom(selected_ward);
                showPatients(selected_ward);
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

function addEventToAddBtn() {
    function addPatients() {
        let patient_Array = [];
        $.each($(`input[name=patient_no]:checked`), function () {
            patient_Array.push($(this).attr('id'));
        });
        patient_Array.sort();
        console.log(patient_Array);
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
// const renderDashboard = async () => {
//     try {
//         const wardList = dummy_wardList;
//         const wardList_el = parseWardList(wardList);
//         const sickRoomList = parseSickRoom(
//             wardList[0].sickRoomList,
//             dummy_patients
//         );
//         $target_select.html(wardList_el + sickRoomList);
//     } catch (err) {
//         console.log(err);
//     }
// };

// const attachEvents = async () => {
//     try {
//         const _$ward_selectBox_el = $(
//             '.nurse.dashboard .taget_select .select_ward'
//         );
//         const _$ward_selectBox_selected_el = $(
//             '.nurse.dashboard .taget_select .select_ward .ward_label'
//         );

//         const _$ward_option_list_el = $(
//             '.nurse.dashboard .taget_select .select_ward .ward_option .ward_list'
//         );
//         _dashboard_wardSelectBox_select(
//             _$ward_selectBox_el,
//             _$ward_selectBox_selected_el,
//             _$ward_option_list_el
//         );
//         _dashboard_sickRoom_select();
//     } catch (err) {
//         console.log(err);
//     }
// };
// function _dashboard_wardSelectBox_select(
//     selectBox_el,
//     selectBox_select,
//     option_list_el
// ) {
//     const _wardSelect = (item) => {
//         selectBox_el.removeClass('active');
//         selectBox_select.html(item.text());
//     };

//     option_list_el.each(function () {
//         $(this)
//             .off()
//             .on('click', () => _wardSelect($(this)));
//     });

//     selectBox_select.on('click', () => {
//         if (selectBox_el.hasClass('active')) {
//             selectBox_el.removeClass('active');
//         } else {
//             selectBox_el.addClass('active');
//         }
//     });
// }

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
