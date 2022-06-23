const CaseContent = () => {
    const data = ReactRedux.useSelector(state => state);

    return (
        <div id='wrap_content' className='remote main'>
            <div className='wrap_inner'>
                <section className='section select_case'>
                    <div className='title'>
                        <p>
                            협진시간 :
                            <span>12.09.15</span>
                            <span>10:00</span> ~
                            <span>12.09.15</span>
                            <span>12:00</span>
                        </p>

                        <p><span>00:03:05</span> 경과</p>
                    </div>

                    <CaseList caseList={data.caseList} />}
                </section>
            </div>
        </div>
    );
};

const CaseItem = ({ number, data }) => {
    const dispatch = ReactRedux.useDispatch();
    const navigate = ReactRouterDOM.useNavigate();

    const connect = () => {
        dispatch({ type: 'setRoomId', data: data?.vRoomId });
        dispatch({ type: 'setChatId', data: data?.messageRoomId });
        dispatch({ type: 'setCurrentCase', data: data });
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