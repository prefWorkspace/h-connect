const MonitoringPage = () => {
    const data = ReactRedux.useSelector(state => state);
    const dispatch = ReactRedux.useDispatch();

    React.useEffect(() => {
        dispatch({ type: 'setActiveMenu', data: '' });
    }, []);

    return (
        <Layout>
            <Monitoring />
        </Layout>
    );
};
