const Header = () => {
    return (
        <header id='header' className='pc_header doc_header'>
            <div className='header_inner'>
                <div>
                    <h1 className='logo'>
                        <a className='link' href='index.html'>
                            <img
                                className='img'
                                src='/H-Connect/img/header/logo.png'
                                alt='로고'
                            />
                        </a>
                    </h1>

                    <div className='header_title'>
                        <h1>입원환자 모니터링</h1>
                        <h3>
                            환자를 모니터링 하고, 발생한 알람을 확인합니다.
                        </h3>
                    </div>
                </div>

                <div>
                    <div className='search_container'>
                        <input
                            type='text'
                            placeholder='환자명 혹은 환자번호를 입력해주세요.'
                        />

                        <button type='button' className='btn_search'>
                            <img
                                src='/H-Connect/img/header/search.svg'
                                alt='검색표시'
                            />
                        </button>
                    </div>

                    <div className='btn_list'>
                        <button type='button' className='btn_red'>
                            <div>
                                <img
                                    src='/H-Connect/img/header/call_color.png'
                                    alt='전화기 아이콘'
                                />
                            </div>
                            응급호출
                        </button>

                        <button type='button' className='btn_logout'>-</button>

                        <div className='red_alarm'></div>
                    </div>
                </div>
            </div>

            <div className='pop logout'>
                <div className='wrap_inner'>
                    <div>
                        <p>심장병동</p>
                        <h3>김한림 교수님</h3>
                    </div>

                    <button type='button' className='btn_bye'>로그아웃</button>
                </div>
            </div>

            <div className='pop search_patient doc_search'>
                <div className='wrap_inner'>
                    <p>
                        <span>김환자</span>
                        (<span>63</span>.<span>남</span>).
                        <span>patient ID</span>. <span>심장병동</span>.
                        <span>1308</span>호실. <span>3</span>병상
                    </p>

                    <p>
                        <span>김환장</span>
                        (<span>74</span>.<span>여</span>).
                        <span>patient ID</span>. <span>심장병동</span>.
                        <span>1302</span>호실. <span>1</span>병상
                    </p>

                    <p>
                        <span>김환정</span>
                        (<span>68</span>.<span>남</span>).
                        <span>patient ID</span>. <span>심장병동</span>.
                        <span>1306</span>호실. <span>6</span>병상
                    </p>

                    <p>
                        <span>김환재</span>
                        (<span>59</span>.<span>남</span>).
                        <span>patient ID</span>. <span>심장병동</span>.
                        <span>1304</span>호실. <span>2</span>병상
                    </p>
                </div>
            </div>
        </header>
    );
};
