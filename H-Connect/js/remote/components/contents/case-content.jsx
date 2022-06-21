const CaseContent = () => {
    const dispatch = ReactRedux.useDispatch();
    const data = ReactRedux.useSelector(state => state);
    const user = data.user;
    const api = new ApiDelegate();
    const [opinion, setOpinion] = React.useState();

    React.useEffect(async () => {
        setOpinion(await api.post('/API/Doctor/SelectOpinionConsultList', {
            organizationCode: user.organizationCode,
            requester: user.userCode,
            userId: user.id
        }));
    }, []);

    React.useEffect(() => {
        if (opinion?.opinionConsultList?.length) dispatch({ type: 'setCaseList', data: opinion?.opinionConsultList });
    }, [opinion]);

    return (
        <div id='wrap_content' className='remote main'>
            <div className='wrap_inner'>
                <section className='section select_case'>
                    <div className='title'>
                        <p>
                            협진시간 : <span>12.09.15</span>
                            <span>10:00</span> ~ <span>12.09.15</span>
                            <span>12:00</span>
                        </p>

                        <p><span>00:03:05</span> 경과</p>
                    </div>

                    {opinion && opinion?.opinionConsultList &&
                        <CaseList caseList={data.caseList ?? []} />}
                </section>
            </div>
        </div>
    );
};

const CaseItem = ({ number, data }) => {
    const dispatch = ReactRedux.useDispatch();
    const navigate = ReactRouterDOM.useNavigate();

    const connect = () => {
        dispatch({ type: 'setCaseId', data: data?.id });
        navigate('/connect');
    };

    return (
        <div className='row' onClick={connect}>
            <div className='left'>
                <div className='img_container'>
                    <img src='/H-Connect/img/icon/document.svg' alt='문서 아이콘' />
                </div>

                <h3 className='count'>Case {number}.</h3>
                <h3>{data.caseTitle}</h3>
            </div>

            <div className='right'>
                <h3>협진시작</h3>

                <div className='img_container'>
                    <img
                        src='/H-Connect/img/right_arrow.svg'
                        alt='오른쪽 화살표'
                    />
                </div>
            </div>
        </div>
    );
};

const CaseList = ({ caseList }) => {
    return (
        <div className='case_list'>
            {caseList?.map((item, index) => <CaseItem key={index} number={++index} data={item} />)}
        </div>
    );
};