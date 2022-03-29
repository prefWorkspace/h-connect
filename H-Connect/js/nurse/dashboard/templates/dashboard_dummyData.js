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

export const getWardList = () => {
    return dummy_wardList;
};
