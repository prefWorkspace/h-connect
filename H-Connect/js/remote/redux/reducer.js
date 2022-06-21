const reducer = (state, action) => {
    if (state === undefined) return {
        consultId: '',
        user: {},
        patient: {},
        caseList: [{ caseTitle: 'test' }],
        caseId: 'test-case-id-1123123sadfp',
        attendee: [],
        socket: null,
        chat: null
    };

    switch (action.type) {
        case 'setConsultId':
            state = { ...state, consultId: action.data };
            break;
        case 'setName':
            state = { ...state, name: action.data };
            break;
        case 'setUser':
            state = { ...state, user: action.data };
            break;
        case 'setPatient':
            state = { ...state, patient: action.data };
            break;
        case 'setCaseList':
            state = { ...state, caseList: action.data };
            break;
        case 'setCaseId':
            state = { ...state, caseId: action.data };
            break;
        case 'setSocket':
            state = { ...state, socket: action.data };
            break;
        case 'setChat':
            state = { ...state, chat: action.data };
            break;
        default:
            break;
    }

    return state;
};
