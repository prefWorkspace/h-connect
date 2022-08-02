const reducer = (state, action) => {
    if (state === undefined) return {
        complete: false,
        activeMenu: '/'
    };

    switch (action.type) {
        case 'setActiveMenu':
            state = { ...state, activeMenu: action.data };
            break;
        case 'setComplete':
            state = { ...state, complete: action.data };
            break;
        default:
            break;
    }

    localStorage.setItem('state', JSON.stringify(state));

    return state;
};
