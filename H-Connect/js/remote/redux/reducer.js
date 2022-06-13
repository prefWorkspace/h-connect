const reducer = (state, action) => {
    if (state === undefined) return {
        consultId: '',
        user: {},
        patient: {},
        caseList: [],
        attendee: []
    };

    switch (action.type) {
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
        case 'TEST':
            break;
    }

    return state;
};

function getQueryStringValue(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}