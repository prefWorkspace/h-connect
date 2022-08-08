const PACSPage = () => {
    const dispatch = ReactRedux.useDispatch();

    React.useEffect(() => {
        dispatch({ type: 'setActiveMenu', data: 'pacs' });
    }, []);

    return (
        <Layout>
            <PACS />
        </Layout>
    );
};
