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
            date: '21.08.17 04:23:42',
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
    ],
};

export const getNewEventList = () => {
    return res;
};
