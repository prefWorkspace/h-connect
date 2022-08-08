const store = Redux.createStore(reducer);
const Provider = ReactRedux.Provider;
const HashRouter = ReactRouterDOM.HashRouter;
const Routes = ReactRouterDOM.Routes;
const Route = ReactRouterDOM.Route;

if (!window?.getQueryValue) {
    window.getQueryValue = (name) => {
        let vars = [], hash;
        let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (let i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars[name];
    };
}

const App = () => {
    const data = ReactRedux.useSelector(state => state);
    const loginToken = sessionStorage.getItem('accesToken');
    const user = JSON.parse(localStorage.getItem('userData'));
    const measurementCode = getQueryValue('measurementCode');
    const patientCode = getQueryValue('patientCode');
    const bioSignalEventId = getQueryValue('bioSignalEventId');
    const api = new ApiDelegate();

    React.useEffect(() => {
        (async () => {
            const detail = await api.post('/API/Measurement/SelectMeasurementInfoDetail', {
                ...commonRequest(),
                measurementCode
            });

            store.dispatch({
                type: 'setPatient', data: {
                    id: detail.measurementInfo.patientCode,
                    name: detail.measurementInfo.name,
                    age: detail.measurementInfo.age,
                    condition: detail.measurementInfo.patientStatus,
                    gender: detail.measurementInfo.gender,
                    ward: detail.measurementInfo.ward,
                    wardRoom: detail.measurementInfo.wardCode,
                    measurementCode: detail.measurementInfo.measurementCode
                }
            });

            // 소켓
            const headers = {
                'SX-Auth-Token': loginToken,
                deviceKind: 3,
                apiRoute: 'GWS-1',
                requester: user.userCode
            };
            const socket = new CustomSocket();
            await socket.connect(headers);

            store.dispatch({ type: 'setAccessKey', data: loginToken });
            store.dispatch({ type: 'setUser', data: JSON.parse(localStorage.getItem('userData')) });
            store.dispatch({ type: 'setSocket', data: socket });

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
            await chat.connect(chatHeaders);

            const chatRoom = await message.createRoom('채팅방', '채팅방 설명', []);

            const chatId = chatRoom?.messageStruct?.roomId ?? chatRoom.room_id;

            store.dispatch({ type: 'setChatId', data: chatId });
            store.dispatch({ type: 'setChatHeaders', data: chatHeaders });
            store.dispatch({ type: 'setMessage', data: message });
            store.dispatch({ type: 'setChat', data: chat });

        })();


        $(function() {

        });
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

