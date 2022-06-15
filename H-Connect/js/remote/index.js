const store = Redux.createStore(reducer);
const Provider = ReactRedux.Provider;
const HashRouter = ReactRouterDOM.HashRouter;
const Routes = ReactRouterDOM.Routes;
const Route = ReactRouterDOM.Route;

const App = () => {
    const loginToken = sessionStorage.getItem('accesToken');
    const user = JSON.parse(localStorage.getItem('userData'));

    // 소켓
    const headers = {
        'SX-Auth-Token': loginToken,
        deviceKind: 3,
        apiRoute: 'GWS-1',
        requester: user.userCode
    };
    const socket = new CustomSocket();
    socket.connect(headers);

    // 채팅
    const message = new MessageDelegate();
    const chatHeaders = {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${message.grantType} ${message.accessToken}`
    };
    const chat = new CustomSocket('https://chat-api.seers-visual-system.link/seers');
    chat.connect(chatHeaders);

    store.dispatch({ type: 'setUser', data: JSON.parse(localStorage.getItem('userData')) });
    store.dispatch({ type: 'setChat', data: chat });
    store.dispatch({ type: 'setSocket', data: socket });

    return (
        <Routes>
            <Route path='/'>
                <Route index element={<CasePage />} />
                <Route path='connect' element={<ConnectPage />} />
            </Route>
        </Routes>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('wrap')
);
