const reducer = (state, action) => {
    if (state === undefined) return {
        accessKey: '',
        grantType: 'Bearer',
        consultId: '',
        user: {},
        patient: {
            id: '',
            name: '',
            condition: '',
            gender: '',
            ward: '',
            wardRoom: ''
        },
        caseList: [],
        currentCase: null,
        roomId: '',
        chatId: '',
        attendee: [],
        socket: null,
        chat: null,
        message: null
    };

    switch (action.type) {
        case 'setAccessKey':
            state = { ...state, accessKey: action.data };
            break;
        case 'setGrantType':
            state = { ...state, grantType: action.data };
            break;
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
        case 'setCurrentCase':
            state = { ...state, currentCase: action.data };
            break;
        case 'setRoomId':
            state = { ...state, roomId: action.data };
            break;
        case 'setChatId':
            state = { ...state, chatId: action.data };
            break;
        case 'setAttendee':
            state = { ...state, attendee: action.data };
            break;
        case 'setSocket':
            state = { ...state, socket: action.data };
            break;
        case 'setChat':
            state = { ...state, chat: action.data };
            break;
        case 'setMessage':
            state = { ...state, message: action.data };
            break;
        default:
            break;
    }

    return state;
};
