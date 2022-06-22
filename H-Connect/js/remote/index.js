const store = Redux.createStore(reducer);
const Provider = ReactRedux.Provider;
const HashRouter = ReactRouterDOM.HashRouter;
const Routes = ReactRouterDOM.Routes;
const Route = ReactRouterDOM.Route;

const App = () => {
    const loginToken = sessionStorage.getItem('accesToken');
    const user = JSON.parse(localStorage.getItem('userData'));
    const consultId = String(location.search).replace('?consultId=', '');
    const api = new ApiDelegate();

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

    store.dispatch({ type: 'setConsultId', data: consultId });
    store.dispatch({ type: 'setUser', data: JSON.parse(localStorage.getItem('userData')) });
    store.dispatch({ type: 'setChat', data: chat });
    store.dispatch({ type: 'setMessage', data: message });
    store.dispatch({ type: 'setSocket', data: socket });

    React.useEffect(async () => {
        // const consult = await api.post('/API/Doctor/SelectRealTimeAndOpinionAndEmergencyConsultView', {
        //     ...commonRequest(),
        //     organizationCode: user.organizationCode,
        //     requester: user.userCode,
        //     userId: user.id,
        //     consultId: consultId
        // });
        const consult = await api.post('/API/Doctor/SelectConsultView', {
            // ...commonRequest(),
            organizationCode: user.organizationCode,
            requester: user.userCode,
            userId: user.id,
            consultId: consultId
        });

        store.dispatch({ type: 'setCaseList', data: consult?.list[0].caseInfoList });
        store.dispatch({ type: 'setAttendee', data: consult?.list[0].memberInfoList });
        store.dispatch({
            type: 'setPatient', data: {
                id: consult?.list[0].caseInfoList[0]?.patientId,
                name: consult?.list[0].caseInfoList[0]?.patientName,
                age: consult?.list[0].caseInfoList[0]?.patientAge,
                condition: consult?.list[0].caseInfoList[0]?.patientCondition,
                gender: consult?.list[0].caseInfoList[0]?.patientGender,
                ward: consult?.list[0].caseInfoList[0]?.patientWard,
                wardRoom: consult?.list[0].caseInfoList[0]?.patientWardRoom
            }
        });

        store.dispatch({ type: 'setCurrentCase', data: consult?.list[0].caseInfoList[0] });
    }, []);

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
