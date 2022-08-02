const store = Redux.createStore(reducer);
const Provider = ReactRedux.Provider;
const HashRouter = ReactRouterDOM.HashRouter;
const Routes = ReactRouterDOM.Routes;
const Route = ReactRouterDOM.Route;

const App = () => {
    const data = ReactRedux.useSelector(state => state);
    const loginToken = sessionStorage.getItem('accesToken');
    const user = JSON.parse(localStorage.getItem('userData'));
    const consultId = String(location.search).replace('?consultId=', '');
    const api = new ApiDelegate();

    React.useEffect(async () => {

        // 소켓
        const headers = {
            'SX-Auth-Token': loginToken,
            deviceKind: 3,
            apiRoute: 'GWS-1',
            requester: user.userCode
        };
        const socket = new CustomSocket();
        socket.connect(headers);

        store.dispatch({ type: 'setAccessKey', data: loginToken });
        store.dispatch({ type: 'setConsultId', data: consultId });
        store.dispatch({ type: 'setUser', data: JSON.parse(localStorage.getItem('userData')) });
        store.dispatch({ type: 'setSocket', data: socket });

        const consult = await api.post('/API/Doctor/SelectRealTimeAndOpinionAndEmergencyConsultView', {
            ...commonRequest(),
            organizationCode: user.organizationCode,
            requester: user.userCode,
            userId: user.id,
            consultId: consultId
        });
        // const consult = await api.post('/API/Doctor/SelectConsultView', {
        //     // ...commonRequest(),
        //     organizationCode: user.organizationCode,
        //     requester: user.userCode,
        //     userId: user.id,
        //     consultId: consultId
        // });

        // 채팅
        const message = new MessageDelegate();
        const token = await api.post('/API/Message/CreateToken', {
            requester: user.userCode,
            userId: user.id,
            userName: user.name,
            organizationCode: user.organizationCode
        });
        message.login(token.messageStruct);
        const chatHeaders = {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `${message.grantType} ${message.accessToken}`
        };
        const chat = new CustomSocket('https://chat-api.seers-visual-system.link/seers');
        chat.connect(chatHeaders);

        // store.dispatch({ type: 'setMessage', data: message });
        // store.dispatch({ type: 'setChat', data: chat });
        // store.dispatch({ type: 'setCurrentCase', data: consult?.list[0].caseInfoList[0] });
        // store.dispatch({ type: 'setComplete', data: true });
    }, []);

    return (
        <Routes>
            <Route path='/'>
                <Route index element={<MonitoringPage />} />
                <Route path='pacs' element={<PACSPage />} />
                <Route path='lab' element={<LabPage />} />
            </Route>
        </Routes>
    );
};

<ConnectRequest />;
<ECGSetting />;
<EWSSetting />;
<IntervalSetting />;
<RESPSetting />;
<SPO2Setting />;
<TempSetting />;
<VitalSave />;

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
