const store = Redux.createStore(reducer);
const Provider = ReactRedux.Provider;
const HashRouter = ReactRouterDOM.HashRouter;
const Routes = ReactRouterDOM.Routes;
const Route = ReactRouterDOM.Route;

const App = () => {
    store.dispatch({ type: 'setUser', data: JSON.parse(localStorage.getItem('userData')) });
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