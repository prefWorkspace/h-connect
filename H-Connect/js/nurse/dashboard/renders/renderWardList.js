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
    },
];

const dummy_patients = [
    {
        patientCode: 'PATI_1',
        name: '김한식',
        age: 50,
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
        name: '이한녀',
        age: 40,
        gender: 2,
        sickRoomCode: 'SEERS_01_02',
    },
];
import {
    parseWardList,
    parseSickRoom,
} from '../templates/dashboardWardListTmpl.js';

const $target_select = $('.taget_select');

export const renderDashboard = async () => {
    try {
        const wardList = dummy_wardList;
        const wardList_el = parseWardList(wardList);
        const sickRoomList = parseSickRoom(
            wardList[0].sickRoomList,
            dummy_patients
        );
        $target_select.html(wardList_el + sickRoomList);
    } catch (err) {
        console.log(err);
    }
};

// function _dashboard_wardSelectBox_select() {
//     const _wardSelect = (item) => {
//         $ward_selectBox_el.removeClass('active');
//         $ward_selectBox_selected_el.html(item.text());
//     };

//     $ward_option_list_el.each(function () {
//         $(this)
//             .off()
//             .on('click', () => _wardSelect($(this)));
//     });

//     $ward_selectBox_selected_el.on('click', () => {
//         if ($ward_selectBox_el.hasClass('active')) {
//             $ward_selectBox_el.removeClass('active');
//         } else {
//             $ward_selectBox_el.addClass('active');
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

// function _dashboard_sickRoom_checkSelect() {}

// function _dashboard_addPatients() {}

// function _dashboard_render() {
//     _dashboard_wardSelectBox_select();

//     _dashboard_sickRoom_select();

//     _dashboard_addPatients();
// }

// _dashboard_render();

renderDashboard();
