const LeftMenu = () => {
    const data = ReactRedux.useSelector(state => state);
    const navigate = ReactRouterDOM.useNavigate();

    React.useEffect(() => {
        $(function() {
            $('.popup_message').click(function() {
                $('.nurse_view').show();
            });
        });
    }, []);

    const goLink = (path) => {
        navigate(`/${path}`);
    };

    const goRemote = (event) => {
        event.preventDefault();

        window.open(`/remote/index.html#/connect?measurementCode=${data.patient.measurementCode}&chatId=${data.chatId}`);
    };

    return (
        <React.Fragment>
            {/* 환자 정보 */}
            <section className='section management patient'>
                <div className='title'>
                    <div>
                        <h2>
                            <span>{data.patient.name}</span>
                            (<span>{data.patient.age}</span>.
                            <span>{data.patient.gender === 1 ? '남' : '여'}</span>)
                        </h2>

                        <p>
                            <span>Patient ID</span> -
                            <span>Patient type</span>
                        </p>
                    </div>

                    <button type='button' onClick={goRemote}>
                        <div className='img_container'>
                            <img
                                src='/H-Connect/img/H-Connect logo.png'
                                alt='로고'
                            />
                        </div>
                        병상연결
                    </button>
                </div>

                <div className='management_list'>
                    <div
                        className={'list ' + (data.activeMenu === '' ? 'on' : '')}
                        onClick={() => goLink('')}
                    >
                        <p>환자 모니터링</p>

                        <div>
                            <img
                                src='/H-Connect/img/right_arrow.svg'
                                alt='오른쪽 화살표'
                            />
                        </div>
                    </div>

                    <div
                        className={'list ' + (data.activeMenu === 'pacs' ? 'on' : '')}
                        onClick={() => goLink('pacs')}
                    >
                        <p>PACS 보기</p>

                        <div>
                            <img
                                src='/H-Connect/img/right_arrow.svg'
                                alt='오른쪽 화살표'
                            />
                        </div>
                    </div>

                    <div
                        className={'list ' + (data.activeMenu === 'lab' ? 'on' : '')}
                        onClick={() => goLink('lab')}
                    >
                        {/* <p>LAB 조회</p> */}
                        <p>진단검사정보</p>

                        <div>
                            <img
                                src='/H-Connect/img/right_arrow.svg'
                                alt='오른쪽 화살표'
                            />
                        </div>
                    </div>

                    <div className='list doctor_send nurse_send popup_message'>
                        <p>담당의에게 메세지 보내기</p>

                        <div>
                            <img
                                src='/H-Connect/img/icon/share.png'
                                alt='공유 아이콘'
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 환자 정보 w1280 */}
            <section className='section management patient_small'>
                <div className='title'>
                    <div>
                        <h2>
                            <span>김환자</span>
                            (<span>63</span>.
                            <span>남</span>)
                        </h2>

                        <p>
                            <span>Patient ID</span> -
                            <span>Patient type</span>
                        </p>
                    </div>

                    <button type='button'>
                        <div className='img_container'>
                            <img
                                src='/H-Connect/img/logo_h_rainbow.svg'
                                alt='로고'
                            />
                        </div>
                        병상연결
                    </button>
                </div>

                <div className='management_list'>
                    <div
                        className='list on'
                        onClick='location.href=patient.html'
                    >
                        <p>모니터링</p>
                    </div>

                    <div
                        className='list'
                        onClick='location.href=pacs.html'
                    >
                        <p>PACS 보기</p>
                    </div>

                    <div
                        className='list'
                        onClick='location.href=lab.html'
                    >
                        <p>LAB 조회</p>
                    </div>

                    <div
                        className='list'
                        onClick='location.href=emr.html'
                    >
                        <p>EMR</p>
                    </div>

                    <div
                        className='list'
                        onClick='location.href=ocs.html'
                    >
                        <p>OCS</p>
                    </div>

                    <div className='list doctor_send nurse_send'>
                        <p>병동 간호사실</p>
                    </div>
                </div>
            </section>

        </React.Fragment>
    );
};
