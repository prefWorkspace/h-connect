const HeaderLeft = () => {
    const data = ReactRedux.useSelector(state => state);

    return (
        <div className='header_left'>
            <h4>실시간 원격 협진.</h4>
            <h4>{data.patient.name}(<span>{data.patient.age}</span>.<span>{data.patient.gender === 'M' ? '남' : '여'}</span>)
            </h4>
            <h4>{data.patient.id}.</h4>
            <h4>심장병동. 1308호실. 3병상</h4>
        </div>
    );
};

const HeaderRight = () => {
    return (
        <div className='header_right'>
            <h5>
                연결시작시간 :
                <span>21.09.15</span>
                &nbsp;
                <span>10:18:50</span>
            </h5>

            <h5><span>00:03:05</span> 경과</h5>

            <div className='btn_list'>
                <button type='button' className='btn_attendee'>
                    참석자 명단
                </button>

                <button type='button' className='btn_end'>
                    <div>
                        <img
                            src='/H-Connect/img/doctor/h.svg'
                            alt='로고'
                        />
                    </div>
                    연결종료
                </button>
            </div>
        </div>
    );
};

const NoAttendee = () => {
    return (
        <div className='no_atten'>
            <p>응급협진에 참여중인 의료진이 없습니다.</p>
        </div>
    );
};

const Attendee = () => {
    const data = ReactRedux.useSelector(state => state);

    return (
        <div className='atten' style={{ display: 'block' }}>
            <div className='count'>
                <div>
                    {/* 참석하는 경우 attend를 넣어주세요 */}
                    <p className='attend'>참석 : {data.attendee.filter(item => item.remoteState === 'Y').length}명</p>

                    {/* 미참석하는 경우 no_attend를 넣어주세요 */}
                    <p className='no_attend'>미참석 : {data.attendee.filter(item => item.remoteState === 'N').length}명</p>

                    {/* 대응불가인 경우 unrespon를 넣어주세요 */}
                    <p className='unrespon'>대응불가 : {data.attendee.filter(item => item.replyState === 'N').length}명</p>
                </div>

                <p><span>{data.attendee.filter(item => item.remoteState === 'Y').length}명</span> 참여중</p>
            </div>

            <div className='name'>
                {data.attendee.map(item => <p>{item.doctorName} {item.doctorLevelName}</p>)}
                {/*<p>김응급 교수님</p>*/}
                {/*<p>김한림 교수님</p>*/}
                {/*<p>최협진 교수님</p>*/}
                {/*<p>이연차 전공의</p>*/}
                {/*<p>박협진 교수님</p>*/}

                {/* 불참하는 인원에는 addClass on을 해주세요 */}
                {/*<p className='on'>박불참 교수님</p>*/}
                {/*<p className='on'>권바쁨 교수님(대응불가)</p>*/}
            </div>
        </div>
    );
};

const AttendeePopup = () => {
    const data = ReactRedux.useSelector(state => state);

    return (
        <div className='pop attendee remote_attend'>
            <div className='wrap_inner'>
                {data.attendee.length === 0 ? <NoAttendee /> : <Attendee />}
            </div>
        </div>
    );
};

const Header = () => {
    return (
        <header
            id='header'
            className='pc_header doc_header doc_connect con_header re_header'
        >
            <div className='header_inner'>
                <HeaderLeft />
                <HeaderRight />
            </div>

            {/* 참석자 명단 팝업 */}
            <AttendeePopup />
        </header>
    );
};