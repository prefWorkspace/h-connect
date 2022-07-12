const reducer = (state, action) => {
    if (state === undefined) return {
        complete: false,
        viewType: 'default',
        transforms: {
            monitoring: 'translate(0px, 0px)',
            pacs: 'translate(0px, 0px)',
            lab: 'translate(0px, 0px)',
            emr: 'translate(0px, 0px)',
            ocs: 'translate(0px, 0px)'
        },
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
            wardRoom: '',
            measurementCode: ''
        },
        caseList: [],
        currentCase: null,
        roomId: '',
        chatId: '',
        attendee: [],
        socket: null,
        chat: null,
        message: null,
        headers: {
            socket: null,
            chat: null
        }
    };

    switch (action.type) {
        case 'setComplete':
            state = { ...state, complete: action.data };
            break;
        case 'setState':
            state = { ...action.data, socket: state.socket, chat: state.chat, message: state.message };
            break;
        case 'setViewType':
            state = { ...state, viewType: action.data };
            break;
        case 'setTransforms':
            state = { ...state, transforms: action.data };
            break;
        case 'setMonitoringTransform':
            state = { ...state, transforms: { ...state.transforms, monitoring: action.data } };
            break;
        case 'setPACSTransform':
            state = { ...state, transforms: { ...state.transforms, pacs: action.data } };
            break;
        case 'setLabTransform':
            state = { ...state, transforms: { ...state.transforms, lab: action.data } };
            break;
        case 'setEMRTransform':
            state = { ...state, transforms: { ...state.transforms, emr: action.data } };
            break;
        case 'setOCSTransform':
            state = { ...state, transforms: { ...state.transforms, ocs: action.data } };
            break;
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
        case 'setSocketHeaders':
            state = { ...state, headers: { ...state.headers, socket: action.data } };
            break;
        case 'setChatHeaders':
            state = { ...state, headers: { ...state.headers, chat: action.data } };
            break;
        default:
            break;
    }

    localStorage.setItem('state', JSON.stringify(state));

    return state;
};
