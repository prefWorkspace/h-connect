'use strict';

let res = {
    result: true,
    eventList: [
        {
            eventId: 'event_1',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case1.`,
            date: '21.08.15 07:15:31',
            patientId: 'pat_1',
            patientName: '김평평',
            patientAge: 21,
            patientGender: 1,
            deviceType: 1,
            isConfirm: false,
        },
        {
            eventId: 'event_2',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case2.`,
            date: '21.08.17 04:23:42',
            patientName: '박구구',
            patientId: 'pat_2',
            patientAge: 32,
            patientGender: 1,
            deviceType: 2,
            isConfirm: false,
        },
        {
            eventId: 'event_3',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case3.`,
            date: '21.08.12 11:55:01',
            patientName: '최순순',
            patientId: 'pat_3',
            patientAge: 40,
            patientGender: 2,
            deviceType: 3,
            isConfirm: false,
        },
        {
            eventId: 'event_4',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case4.`,
            date: '21.08.19 12:49:16',
            patientName: '구팔칠',
            patientId: 'pat_4',
            patientAge: 37,
            patientGender: 1,
            deviceType: 2,
            isConfirm: false,
        },
        {
            eventId: 'event_5',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case5.`,
            date: '21.07.29 15:39:36',
            patientName: '육오사',
            patientId: 'pat_5',
            patientAge: 29,
            patientGender: 1,
            deviceType: 3,
            isConfirm: false,
        },
        {
            eventId: 'event_6',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case6.`,
            date: '21.06.21 18:41:22',
            patientName: '삼이일',
            patientId: 'pat_6',
            patientAge: 19,
            patientGender: 2,
            deviceType: 1,
            isConfirm: true,
        },
        {
            eventId: 'event_7',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case7.`,
            date: '22.01.30 14:12:42',
            patientName: '김영희',
            patientId: 'pat_7',
            patientAge: 35,
            patientGender: 2,
            deviceType: 3,
            isConfirm: false,
        },
        {
            eventId: 'event_8',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case8.`,
            date: '22.01.01 23:59:59',
            patientName: '김철수',
            patientId: 'pat_8',
            patientAge: 24,
            patientGender: 1,
            deviceType: 1,
            isConfirm: true,
        },
        {
            eventId: 'event_9',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case9.`,
            date: '21.12.30 00:00:00',
            patientName: '박건웅',
            patientId: 'pat_9',
            patientAge: 29,
            patientGender: 1,
            deviceType: 1,
            isConfirm: false,
        },
        {
            eventId: 'event_10',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case10.`,
            date: '21.12.30 00:00:00',
            patientName: '이칠성',
            patientId: 'pat_10',
            patientAge: 22,
            patientGender: 2,
            deviceType: 3,
            isConfirm: false,
        },
    ],
};

export const getNewEventList = () => {
    return res;
};
