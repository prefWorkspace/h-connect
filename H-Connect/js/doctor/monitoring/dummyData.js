'use strict';

let res = {
    result: true,
    eventList: [
        {
            bioSignalEventId: 'event_1',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case1.`,
            eventDateTime: '2021-08-15 07:15:31',
            patientCode: 'pat_1',
            name: '김평평',
            age: 21,
            gender: 1,
            deviceType: 1,
            isConfirm: false,
        },
        {
            bioSignalEventId: 'event_2',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case2.`,
            eventDateTime: '2021-08-17 04:23:42',
            name: '박구구',
            patientCode: 'pat_2',
            age: 32,
            gender: 1,
            deviceType: 2,
            isConfirm: false,
        },
        {
            bioSignalEventId: 'event_3',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case3.`,
            eventDateTime: '2021-08-12 11:55:01',
            name: '최순순',
            patientCode: 'pat_3',
            age: 40,
            gender: 2,
            deviceType: 3,
            isConfirm: false,
        },
        {
            bioSignalEventId: 'event_4',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case4.`,
            eventDateTime: '2021-08-19 12:49:16',
            name: '구팔칠',
            patientCode: 'pat_4',
            age: 37,
            gender: 1,
            deviceType: 2,
            isConfirm: false,
        },
        {
            bioSignalEventId: 'event_5',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case5.`,
            eventDateTime: '2021-07-29 15:39:36',
            name: '육오사',
            patientCode: 'pat_5',
            age: 29,
            gender: 1,
            deviceType: 3,
            isConfirm: false,
        },
        {
            bioSignalEventId: 'event_6',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case6.`,
            eventDateTime: '2021-06-21 18:41:22',
            name: '삼이일',
            patientCode: 'pat_6',
            age: 19,
            gender: 2,
            deviceType: 1,
            isConfirm: true,
        },
        {
            bioSignalEventId: 'event_7',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case7.`,
            eventDateTime: '2022-01-30 14:12:42',
            name: '김영희',
            patientCode: 'pat_7',
            age: 35,
            gender: 2,
            deviceType: 3,
            isConfirm: false,
        },
        {
            bioSignalEventId: 'event_8',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case8.`,
            eventDateTime: '2022-01-01 23:59:59',
            name: '김철수',
            patientCode: 'pat_8',
            age: 24,
            gender: 1,
            deviceType: 1,
            isConfirm: true,
        },
        {
            bioSignalEventId: 'event_9',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case9.`,
            eventDateTime: '2021-12-30 00:00:00',
            name: '박건웅',
            patientCode: 'pat_9',
            age: 29,
            gender: 1,
            deviceType: 1,
            isConfirm: false,
        },
        {
            bioSignalEventId: 'event_10',
            eventDesc: `Lorem ipsum : dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur case10.`,
            eventDateTime: '2021-12-30 00:00:00',
            name: '이칠성',
            patientCode: 'pat_10',
            age: 22,
            gender: 2,
            deviceType: 3,
            isConfirm: false,
        },
    ],
};

export const getEventList = () => {
    return new Promise((resolve, reject) => {
        if (res.result) {
            resolve(res.eventList);
        }
        reject(new Error('Request is Failed'));
    });
};

export const updateEvent = (target) => {
    res.eventList.forEach((evt) => {
        if (evt.bioSignalEventId === target.bioSignalEventId) {
            evt = {
                ...evt,
                target,
            };
            return false;
        }
    });
};
