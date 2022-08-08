const LabPage = () => {
    const dispatch = ReactRedux.useDispatch();

    React.useEffect(() => {
        dispatch({ type: 'setActiveMenu', data: 'lab' });
    }, []);

    return (
        <Layout>
            <Lab />
        </Layout>
    );
};
