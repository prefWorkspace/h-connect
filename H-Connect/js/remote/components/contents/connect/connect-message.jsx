/* 메세지 */
const ConnectMessage = ({ video }) => {

    const data = ReactRedux.useSelector(state => state);

    function toggleAudioMute(event) {
        if (video.toggleAudioMute()) {
            $(this).children().first().hide();
            $(this).children().last().show();
        } else {
            $(this).children().first().show();
            $(this).children().last().hide();
        }
    }

    const toggleVideoMute = () => {
        if (video.toggleVideoMute()) {
            $(this).children().first().hide();
            $(this).children().last().show();
        } else {
            $(this).children().first().show();
            $(this).children().last().hide();
        }
    };

    const volumeControl = () => {

    };

    const toggleShowVideo = (display) => {
        if (display) {
            $('.cam').show();
            // $('.data').show();
            // $('.no_data').hide();
            $('.emer_message .btn_video').hide();
            $('.emer_message .btn_novideo').show();
        } else {
            $('.cam').hide();
            // $('.data').hide();
            // $('.no_data').show();
            $('.emer_message .btn_novideo').hide();
            $('.emer_message .btn_video').show();
        }
    };

    React.useEffect(() => {
        $(function() {
            // 채팅창 상단 메시지/회의록 클릭 이벤트
            $('.menu').click(function() {
                $(this).parent().find('.menu').removeClass('on');
                $(this).addClass('on');

                if ($(this).hasClass('chat_menu')) {
                    $('.message .notice').show();
                    $('.message .chat').show();
                    $('.message .meet').hide();
                } else {
                    $('.message .notice').hide();
                    $('.message .chat').hide();
                    $('.message .meet').show();
                }
            });

            // 공지 스르륵
            $('.slide_notice').on('click', function() {
                $('.remote .notice').addClass('active');
                $('.remote .slide_notice').hide();
                $('.remote .slide_up').show();
            });
            $('.slide_up').on('click', function() {
                $('.remote .notice').removeClass('active');
                $('.remote .slide_up').hide();
                $('.remote .slide_notice').show();
            });
        });
    }, []);

    return (
        <section className='section left emer_message message'>
            {/* 공지 */}
            <div className='notice'>
                <div className='notice_wrap'>
                    <div className='top case'>
                        <h3>Case {data.currentCase?.orderNo}.</h3>

                        <h3>{data.currentCase?.caseTitle}</h3>
                    </div>

                    <div className='info'>
                        <h3>환자정보</h3>

                        <h3>
                            {data.patient.name} ({data.patient.age}. {data.patient.gender === 'M' ? '남' : '여'})
                            {data.patient.id}. {data.patient.ward}. {data.patient.wardRoom}
                        </h3>
                    </div>

                    <div className='content'>
                        <h3>내용</h3>

                        <div>
                            <h3>
                                <pre>{data.currentCase?.caseContents}</pre>
                            </h3>
                        </div>
                    </div>
                </div>

                <button type='button' className='slide_notice'>
                    <p className='more'>자세히</p>
                </button>

                <button type='button' className='slide_up'>
                    <p className='hide'>숨기기</p>
                </button>
            </div>

            {/* 상단 버튼 */}
            <div className='title'>
                <div className='left'>
                    <div className='menu chat_menu on'>
                        <div>
                            <img
                                src='/H-Connect/img/header/message.svg'
                                alt='메세지 아이콘'
                            />
                        </div>
                        <p>메세지</p>
                    </div>

                    <div className='menu meet_menu'>
                        <div>
                            <img
                                src='/H-Connect/img/icon/document.svg'
                                alt='문서 아이콘'
                            />
                        </div>

                        <p>회의록</p>
                    </div>
                </div>

                <div className='right' onClick={toggleVideoMute}>
                    <div className='cam_control'>
                        <div>
                            <button type='button' className='btn_cam'>
                                <div>
                                    <img
                                        src='/H-Connect/img/emergency/cam.svg'
                                        alt='카메라 아이콘'
                                    />
                                </div>
                            </button>

                            <div className='dim dim_cam'>
                                <div>
                                    <img
                                        src='/H-Connect/img/icon/cam_off.svg'
                                        alt='카메라 아이콘'
                                    />
                                </div>
                            </div>
                        </div>

                        <div onClick={toggleAudioMute}>
                            <button type='button' className='btn_mic'>
                                <div>
                                    <img
                                        src='/H-Connect/img/emergency/mic.svg'
                                        alt='마이크 아이콘'
                                    />
                                </div>
                            </button>

                            <div className='dim dim_mic'>
                                <div>
                                    <img
                                        src='/H-Connect/img/icon/mic_off.svg'
                                        alt='마이크 아이콘'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='volume'>
                            <button
                                type='button'
                                className='btn_speaker'
                            >
                                <div>
                                    <img
                                        src='/H-Connect/img/emergency/volume.svg'
                                        alt='스피커 아이콘'
                                    />
                                </div>

                                <div className='modul'>
                                    <progress
                                        value='48'
                                        max='100'
                                    ></progress>
                                    <p>48</p>
                                </div>
                            </button>

                            <div className='dim dim_speaker'>
                                <div>
                                    <img
                                        src='/H-Connect/img/icon/volume_off.svg'
                                        alt='스피커 아이콘'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='btn_list'>
                        <button type='button' className='btn_video' onClick={() => toggleShowVideo(true)}>
                            참석자 화상화면
                            <div>
                                <img
                                    src='/H-Connect/img/icon/btn_arrow.svg'
                                    alt='오른쪽 화살표 아이콘'
                                />
                            </div>
                        </button>

                        <button type='button' className='btn_novideo' onClick={() => toggleShowVideo(false)}>
                            <div className='btn_inner'>
                                <div>
                                    <img
                                        src='/H-Connect/img/icon/btn_arrow.svg'
                                        alt='오른쪽 화살표 아이콘'
                                    />
                                </div>

                                화상화면 숨기기
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* 메세지 */}
            <div className='chat'>
                {/* 메세지창 */}
                <div className='view'>
                    <div className='data'>
                        <div className='data_inner'>
                            <div className='mark start'>
                                <p>
                                    원격 협진이 시작되었습니다. case
                                    1.
                                </p>
                            </div>

                            <div className='chatting'>
                                <div className='top'>
                                    <p>21.09.15</p>
                                    &nbsp;
                                    <p>10:36:47</p>
                                    <p className='name'>
                                        최협진 교수님
                                    </p>
                                </div>

                                <div className='bottom'>
                                    <p>
                                        보건복지부장관은
                                        전자의무기록이 효율적이고
                                        통일적으로 관리 활용 될 수
                                        있도록 기록의 작성
                                    </p>
                                </div>
                            </div>

                            <div className='chatting'>
                                <div className='top'>
                                    <p>21.09.15</p>
                                    &nbsp;
                                    <p>10:36:47</p>
                                    <p className='name'>
                                        최협진 교수님
                                    </p>
                                </div>

                                <div className='bottom'>
                                    <div className='file'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/remote/thumbs1.jpg'
                                                alt='사진1'
                                            />
                                        </div>

                                        <div>
                                            <img
                                                src='/H-Connect/img/remote/thumbs2.jpg'
                                                alt='사진1'
                                            />
                                        </div>
                                    </div>

                                    <p>
                                        관리 및 보존에 필요한
                                        전산정보처리시스템(이하 이
                                        조에서
                                        "전자의미기록시스템"이라
                                        한다), 시설, 장비 및 기록
                                        서식 등에 관한 표준을 정하여
                                        고시
                                    </p>
                                </div>
                            </div>

                            {/* 내가 친 채팅 */}
                            <div className='my_chat'>
                                <div className='top'>
                                    <div className='left'>
                                        <p>21.09.15</p>
                                        <p>10:36:47</p>
                                        <p className='name'>내가작성</p>
                                    </div>

                                    <div className='right'>
                                        <button type='button'>
                                            <img
                                                src='/H-Connect/img/icon/pen.svg'
                                                alt='수정버튼 아이콘'
                                            />
                                        </button>

                                        <button type='button'>
                                            <img
                                                src='/H-Connect/img/icon/trash.svg'
                                                alt='삭제버튼 아이콘'
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className='bottom'>
                                    <p>
                                        효율적이고 통일적으로
                                        관리ㆍ활용될 수 있도록
                                        기록의 작성, 관리 및 보존에
                                        필요한
                                        전산정보처리시스템(이하 이
                                        조에서
                                        “전자의무기록시스템”이라
                                        한다), 시설, 장비 및 기록
                                        서식 등에 관한 표준을 정하여
                                        고시하고
                                        전자의무기록시스템을 제조
                                    </p>
                                </div>
                            </div>

                            <div className='mark no_read'>
                                <p>여기까지 읽으셨습니다.</p>
                            </div>

                            <div className='chatting no_check'>
                                <div className='top'>
                                    <p>21.09.15</p>
                                    &nbsp;
                                    <p>10:36:47</p>
                                    <p className='name'>
                                        최협진 교수님
                                    </p>
                                </div>

                                <div className='bottom'>
                                    <p>□□□ 증상확인 요망.</p>
                                </div>
                            </div>

                            <div className='chatting no_check'>
                                <div className='top'>
                                    <p>21.09.15</p>
                                    &nbsp;
                                    <p>10:36:47</p>
                                    <p className='name'>
                                        최협진 교수님
                                    </p>
                                </div>

                                <div className='bottom'>
                                    <p>□□□ 증상확인 요망.</p>
                                </div>
                            </div>

                            <div className='chatting no_check'>
                                <div className='top'>
                                    <p>21.09.15</p>
                                    &nbsp;
                                    <p>10:36:47</p>
                                    <p className='name'>
                                        최협진 교수님
                                    </p>
                                </div>

                                <div className='bottom'>
                                    <p>□□□ 증상확인 요망.</p>
                                </div>
                            </div>

                            <div className='chatting no_check'>
                                <div className='top'>
                                    <p>21.09.15</p>
                                    &nbsp;
                                    <p>10:36:47</p>
                                    <p className='name'>
                                        최협진 교수님
                                    </p>
                                </div>

                                <div className='bottom'>
                                    <p>□□□ 증상확인 요망.</p>
                                </div>
                            </div>

                            <div className='chatting no_check'>
                                <div className='top'>
                                    <p>21.09.15</p>
                                    &nbsp;
                                    <p>10:36:47</p>
                                    <p className='name'>
                                        최협진 교수님
                                    </p>
                                </div>

                                <div className='bottom'>
                                    <p>□□□ 증상확인 요망.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='input_message'>
                                <textarea
                                    placeholder='소견 및 메세지 작성'
                                ></textarea>
                    <button type='button' className='btn_send'>
                        전송
                    </button>
                </div>
            </div>

            {/* 회의록 */}
            <div className='meet' style={{ display: 'none' }}>
                에디터 영역
            </div>

            <div className='save'>
                <button type='button' className='btn_emr'>
                    EMR 에 저장
                </button>
                <button type='button' className='btn_pdf'>
                    PDF 로 저장
                </button>
            </div>
        </section>
    );
};