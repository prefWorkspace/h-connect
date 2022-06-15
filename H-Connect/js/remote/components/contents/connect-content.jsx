const ConnectContent = () => {

    const [video, setVideo] = React.useState(null);
    const [layerCSS, setLayerCSS] = React.useState('default');

    React.useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setVideo(new CustomJanus(1234, userData.name, {
            join: () => {
                $('.cam_inner').empty().append(`<div id='local-video'><p class='name'>${userData.name}</p></div>`);
                $('#local-video').empty().append('<video class="rounded centered" id="local-stream" width="100%" height="100%" autoplay playsinline muted="muted"/>');

                return 'local-stream';
            },
            noWebcam: () => {
                $('#local-video').empty().append(`No webcam<p class='name'>${userData.name}</p>`);
            },
            cleanUp: () => {

            },
            events: {
                unpublished: () => {
                    $(`#remote-video-${index}`).empty().append(`Unpublished<p class='name'>${name}</p>`);
                },
                leaving: (index) => {
                    $(`#remote-video-${index}`).remove();
                }
            }
        }, {
            join: (index, name) => {
                if ($(`.cam_inner > #remote-video-${index}`).length === 0) {
                    $('.cam_inner').append(`<div id='remote-video-${index}'><p class='name'>${name}</p></div>`);
                    $(`#remote-video-${index}`).append(`<video class='rounded centered' id='remote-stream-${index}' width='100%' height='100%' autoplay playsinline muted='muted'/>`);
                }

                return `remote-stream-${index}`;
            },
            noWebcam: (index, name) => {
                $(`#remote-video-${index}`).empty().append(`No webcam<p class='name'>${name}</p>`);
            },
            cleanUp: (index) => {
                // $(`#remote-video-${index}`).remove();
            }
        }));
    }, []);

    React.useEffect(() => {
        if (video) video.init();
    }, [video]);

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

    function windowLayer(event) {
        event.preventDefault();
        setLayerCSS('default');
        viewTab(event.target);
    }

    function tabLayer(event) {
        event.preventDefault();
        setLayerCSS('tab');
        viewTab(event.target);
    }

    function scrollLayer(event) {
        event.preventDefault();
        setLayerCSS('scroll');
        viewTab(event.target);
    }

    const viewTab = (target) => {
        const $target = $(target).parent();
        $target.siblings().removeClass('active');
        $target.addClass('active');
    };


    return (
        <div id='wrap_content' className={`remote remote_connect ${layerCSS}`}>
            <div className='wrap_inner'>
                {/* 메세지 */}
                <section className='section left emer_message message'>
                    {/* 공지 */}
                    <div className='notice'>
                        <div className='notice_wrap'>
                            <div className='top case'>
                                <h3>Case 1.</h3>

                                <h3>
                                    김입원 환자의 대장암 수술 이후 예후에
                                    관한 논의를 위해 제목을 길게 작성할
                                    경우를 표현하기 위해 작성한 케이스 명칭
                                </h3>
                            </div>

                            <div className='info'>
                                <h3>환자정보</h3>

                                <h3>
                                    김환자 (63. 남) Patient ID. 심장병동.
                                    1308호실. 3병상
                                </h3>
                            </div>

                            <div className='content'>
                                <h3>내용</h3>

                                <div>
                                    <h3>
                                        ① 보건복지부장관은 전자의무기록이
                                        효율적이고 통일적으로 관리ㆍ활용될
                                        수 있도록 기록의 작성, 관리 및
                                        보존에 필요한
                                        전산정보처리시스템(이하 이 조에서
                                        “전자의무기록시스템”이라 한다),
                                        시설, 장비 및 기록 서식 등에 관한
                                        표준을 정하여 고시하고
                                        전자의무기록시스템을 제조ㆍ공급하는
                                        자, 의료인 또는 의료기관 개설자에 그
                                        준수를 권고할 수 있다.<br /><br />
                                        ② 보건복지부장관은
                                        전자의무기록시스템이 제1항에 따른
                                        표준, 전자의무기록시스템 간 호환성,
                                        정보 보안 등 대통령령으로 정하는
                                        인증 기준에 적합한 경우에는 인증을
                                        할 수 있다.
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

                {/* 화상 화면 */}
                <section className='section left cam'>
                    <div className='cam_inner'>
                        <div id='local-video' className='my_cam'>
                            {/* 캠 켰을때 */}
                            <div className='cam_parti'>
                                <img
                                    src='/H-Connect/img/emergency/mycam.jpg'
                                    alt='참여자 사진'
                                />
                            </div>

                            {/* 캠 껐을때 */}
                            <div className='nocam_parti'>
                                <div>
                                    <img
                                        src='/H-Connect/img/emergency/profile.svg'
                                        alt='프로필 아이콘'
                                    />
                                </div>
                            </div>

                            <div className='name my'>
                                <p>내 화면</p>
                            </div>
                        </div>

                        <div className='participant'>
                            {/* 캠 켰을때 */}
                            <div className='cam_parti'>
                                <img
                                    src='/H-Connect/img/emergency/mycam.jpg'
                                    alt='참여자 사진'
                                />
                            </div>

                            {/* 캠 껐을때 */}
                            <div className='nocam_parti'>
                                <div>
                                    <img
                                        src='/H-Connect/img/emergency/profile.svg'
                                        alt='프로필 아이콘'
                                    />
                                </div>
                            </div>

                            <p className='name'>김한림 교수</p>
                        </div>

                        <div className='participant'>
                            {/* 캠 켰을때 */}
                            <div className='cam_parti'>
                                <img
                                    src='/H-Connect/img/emergency/mycam.jpg'
                                    alt='참여자 사진'
                                />
                            </div>

                            {/* 캠 껐을때 */}
                            <div className='nocam_parti'>
                                <div>
                                    <img
                                        src='/H-Connect/img/emergency/profile.svg'
                                        alt='프로필 아이콘'
                                    />
                                </div>
                            </div>

                            <p className='name'>김한림 교수</p>
                        </div>

                        <div className='participant'>
                            {/* 캠 켰을때 */}
                            <div className='cam_parti' style={{ display: 'none' }}>
                                <img
                                    src='/H-Connect/img/emergency/mycam.jpg'
                                    alt='참여자 사진'
                                />
                            </div>

                            {/* 캠 껐을때 */}
                            <div className='nocam_parti' style={{ display: 'block' }}>
                                <div>
                                    <img
                                        src='/H-Connect/img/emergency/profile.svg'
                                        alt='프로필 아이콘'
                                    />
                                </div>
                            </div>

                            <p className='name'>김한림 교수</p>
                        </div>

                        <div className='participant'>
                            {/* 캠 켰을때 */}
                            <div className='cam_parti'>
                                <img
                                    src='/H-Connect/img/emergency/mycam.jpg'
                                    alt='참여자 사진'
                                />
                            </div>

                            {/* 캠 껐을때 */}
                            <div className='nocam_parti'>
                                <div>
                                    <img
                                        src='/H-Connect/img/emergency/profile.svg'
                                        alt='프로필 아이콘'
                                    />
                                </div>
                            </div>

                            <p className='name'>김한림 교수</p>
                        </div>
                    </div>
                </section>

                {/* 오른쪽 화면 */}
                <section className='section right patient_view'>
                    <div className='title' style={{ padding: '8px 16px' }}>
                        <div className='btn_list'>
                            <button type='button' className='btn_vital on'>
                                모니터링
                            </button>
                            <button type='button' className='btn_pacs'>
                                PACS
                            </button>
                            <button type='button' className='btn_lab'>
                                LAB 조회
                            </button>
                            <button type='button' className='btn_emr'>
                                EMR 조회
                            </button>
                            <button type='button' className='btn_ocs' disabled>
                                OCS 조회
                            </button>
                        </div>

                        <div className='view_list'>
                            <p>View</p>

                            <div>
                                {/* 탭메뉴 */}
                                <ul className='tabs'>
                                    <li
                                        className='link active'
                                    >
                                        <img
                                            src='/H-Connect/img/emergency/several.svg'
                                            alt='여러개 탭의 아이콘'
                                            onClick={windowLayer}
                                        />
                                    </li>

                                    <li
                                        className='link'
                                    >
                                        <img
                                            src='/H-Connect/img/emergency/tab.svg'
                                            alt='탭 아이콘'
                                            onClick={tabLayer}
                                        />
                                    </li>

                                    <li
                                        className='link'
                                    >
                                        <img
                                            src='/H-Connect/img/emergency/scroll.svg'
                                            alt='스크롤되는 탭 아이콘'
                                            onClick={scrollLayer}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* several */}
                    <div className={`several ${layerCSS === 'tab' && 'section'}`}>
                        {/* vital */}
                        <div className='vital'>
                            {/* 타이틀 */}
                            <div className='title'>
                                <p>
                                    환자 모니터링. 김환자 (63. 남). Patient
                                    ID - Patient type
                                </p>

                                <div className='btn_list'>
                                    <button type='button' className='btn_fold'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/fold.svg'
                                                alt='접는 아이콘'
                                            />
                                        </div>
                                    </button>

                                    <button type='button' className='btn_full'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/full.svg'
                                                alt='네모 아이콘'
                                            />
                                        </div>
                                    </button>

                                    <button type='button' className='btn_close'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/close.svg'
                                                alt='엑스 아이콘'
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* 내용 */}
                            <div className='cont'>
                                <div className='container'>
                                    {/* 탭메뉴 */}
                                    <ul className='tabs'>
                                        <li
                                            className='tab-link current'
                                            data-tab='tab-1'
                                        >
                                            Current Vital
                                        </li>
                                        <li
                                            className='tab-link'
                                            data-tab='tab-2'
                                        >
                                            Tabular Trend
                                        </li>
                                        <li
                                            className='tab-link'
                                            data-tab='tab-3'
                                        >
                                            Graphical Trend
                                        </li>
                                        <li
                                            className='tab-link'
                                            data-tab='tab-4'
                                        >
                                            Event
                                        </li>
                                    </ul>

                                    {/* current vital */}
                                    <div
                                        id='tab-1'
                                        className='tab-content current'
                                    >
                                        <div className='graph'>
                                            <div className='ecg'>
                                                <div className='ecg_graph'>
                                                    <p>ECG</p>

                                                    <div>
                                                        <img
                                                            src='/H-Connect/img/graph/ECG.png'
                                                            alt='ecg그래프'
                                                        />
                                                    </div>
                                                </div>

                                                <div className='bell'>
                                                    <div className='bell_name'>
                                                        <p>HR. bpm</p>

                                                        <input
                                                            type='checkbox'
                                                            id='ecg_mute'
                                                        />
                                                        <label
                                                            htmlFor='ecg_mute'
                                                        >
                                                            <span></span>
                                                        </label>
                                                    </div>

                                                    <div className='bell_num'>
                                                        <div>
                                                            <p>120</p>
                                                            <p>50</p>
                                                        </div>

                                                        <p>108</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='sp'>
                                                <div className='sp_graph'>
                                                    <p>SpO2</p>

                                                    <div>
                                                        <img
                                                            src='/H-Connect/img/graph/SpO2.png'
                                                            alt='ecg그래프'
                                                        />
                                                    </div>
                                                </div>

                                                <div className='bell'>
                                                    <div className='bell_name'>
                                                        <p>SpO2. %</p>

                                                        <input
                                                            type='checkbox'
                                                            id='sp_mute'
                                                        />
                                                        <label
                                                            htmlFor='sp_mute'
                                                        >
                                                            <span></span>
                                                        </label>
                                                    </div>

                                                    <div className='bell_num'>
                                                        <div>
                                                            <p>100</p>
                                                            <p>90</p>
                                                        </div>

                                                        <p>98</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='resp'>
                                                <div className='resp_graph'>
                                                    <p>RESP</p>

                                                    <div>
                                                        <img
                                                            src='/H-Connect/img/graph/RESP.png'
                                                            alt='ecg그래프'
                                                        />
                                                    </div>
                                                </div>

                                                <div className='bell'>
                                                    <div className='bell_name'>
                                                        <p>RESP</p>

                                                        <input
                                                            type='checkbox'
                                                            id='resp_mute'
                                                        />
                                                        <label
                                                            htmlFor='resp_mute'
                                                        >
                                                            <span></span>
                                                        </label>
                                                    </div>

                                                    <div className='bell_num'>
                                                        <div>
                                                            <p>30</p>
                                                            <p>8</p>
                                                        </div>

                                                        <p>15</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='control'>
                                            <div className='ews'>
                                                <div className='bell_name'>
                                                    <p>EWS</p>

                                                    <input
                                                        type='checkbox'
                                                        id='ews_mute'
                                                    />
                                                    <label htmlFor='ews_mute'>
                                                        <span></span>
                                                    </label>
                                                </div>

                                                <div className='bell_num'>
                                                    <p>3</p>

                                                    <div>
                                                        <button
                                                            type='button'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/icon/up_white.svg'
                                                                alt='위를 향하는 화살표'
                                                            />
                                                        </button>

                                                        <button
                                                            type='button'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/icon/down_white.svg'
                                                                alt='아래를 향하는 화살표'
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='mmhg'>
                                                <div className='bell_name'>
                                                    <p>NBP.mmHg</p>
                                                </div>

                                                <div className='bell_num'>
                                                    <div>
                                                        <p>160</p>
                                                        <p>90</p>
                                                    </div>

                                                    <p>128/77 (94)</p>
                                                </div>

                                                <div className='time'>
                                                    <div>
                                                        <img
                                                            src='/H-Connect/img/icon/clock.svg'
                                                            alt='시계 아이콘'
                                                        />
                                                    </div>

                                                    <p>
                                                        <span>21</span>.
                                                        <span>09</span>.
                                                        <span>15</span>
                                                    </p>
                                                    &nbsp;

                                                    <p>
                                                        <span>21</span>:
                                                        <span>10</span>:
                                                        <span>25</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='pulse'>
                                                <div className='bell_name'>
                                                    <p>Pulse.bpm</p>
                                                </div>

                                                <div className='bell_num'>
                                                    <div>
                                                        <p>120</p>
                                                        <p>50</p>
                                                    </div>

                                                    <p>184</p>
                                                </div>

                                                <div className='time'>
                                                    <div>
                                                        <img
                                                            src='/H-Connect/img/icon/clock.svg'
                                                            alt='시계 아이콘'
                                                        />
                                                    </div>

                                                    <p>
                                                        <span>21</span>.
                                                        <span>09</span>.
                                                        <span>15</span>
                                                    </p>
                                                    &nbsp;

                                                    <p>
                                                        <span>21</span>:
                                                        <span>10</span>:
                                                        <span>25</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='temp'>
                                                <div className='bell_name'>
                                                    <p>Temp.°C</p>

                                                    <input
                                                        type='checkbox'
                                                        id='temp_mute'
                                                    />
                                                    <label htmlFor='temp_mute'>
                                                        <span></span>
                                                    </label>
                                                </div>

                                                <div className='bell_num'>
                                                    <div>
                                                        <p>39.0</p>
                                                        <p>36.0</p>
                                                    </div>

                                                    <p>36.5</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tabular Trend */}
                                    <div id='tab-2' className='tab-content'>
                                        <div className='ecg'>
                                            <div className='ecg_graph'>
                                                <p>ECG</p>

                                                <div>
                                                    <img
                                                        src='/H-Connect/img/graph/ECG.png'
                                                        alt='ecg그래프'
                                                    />
                                                </div>
                                            </div>

                                            <div className='bell'>
                                                <div className='bell_name'>
                                                    <p>HR. bpm</p>
                                                </div>

                                                <div className='bell_num'>
                                                    <div>
                                                        <p>120</p>
                                                        <p>50</p>
                                                    </div>

                                                    <p>108</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='tabular_table'>
                                            <div className='table_title'>
                                                <p className='date_time'>
                                                    date/time
                                                </p>
                                                <p className='hr'>HR (bpm)</p>
                                                <p className='temp'>
                                                    Temp (°C)
                                                </p>
                                                <p className='ews'>EWS</p>
                                                <p className='spo'>SpO2 (%)</p>
                                                <p className='error'>Error</p>
                                            </div>

                                            <div className='table_body'>
                                                <div className='table_content'>
                                                    <div className='date_time'>
                                                        <p>
                                                            <span>21</span>.
                                                            <span>09</span>.
                                                            <span>15</span>
                                                        </p>
                                                        &nbsp;

                                                        <p>
                                                            <span>01</span>:
                                                            <span>44</span>:
                                                            <span>37</span>
                                                        </p>
                                                    </div>

                                                    <div className='hr'>
                                                        <p>108</p>
                                                    </div>

                                                    <div className='temp'>
                                                        <p>
                                                            <span>36</span>.
                                                            <span>5</span>
                                                        </p>
                                                    </div>

                                                    <div className='ews'>
                                                        <p>4</p>
                                                    </div>
                                                    <div className='spo'>
                                                        <p>98</p>
                                                    </div>
                                                    <div className='error'>
                                                        <p>-</p>
                                                    </div>
                                                </div>

                                                <div className='table_content'>
                                                    <div className='date_time'>
                                                        <p>
                                                            <span>21</span>.
                                                            <span>09</span>.
                                                            <span>15</span>
                                                        </p>
                                                        &nbsp;

                                                        <p>
                                                            <span>01</span>:
                                                            <span>44</span>:
                                                            <span>37</span>
                                                        </p>
                                                    </div>

                                                    <div className='hr'>
                                                        <p>108</p>
                                                    </div>

                                                    <div className='temp'>
                                                        <p>
                                                            <span>36</span>.
                                                            <span>5</span>
                                                        </p>
                                                    </div>

                                                    <div className='ews'>
                                                        <p>4</p>
                                                    </div>
                                                    <div className='spo'>
                                                        <p>98</p>
                                                    </div>
                                                    <div className='error'>
                                                        <p>-</p>
                                                    </div>
                                                </div>

                                                <div className='table_content'>
                                                    <div className='date_time'>
                                                        <p>
                                                            <span>21</span>.
                                                            <span>09</span>.
                                                            <span>15</span>
                                                        </p>
                                                        &nbsp;

                                                        <p>
                                                            <span>01</span>:
                                                            <span>44</span>:
                                                            <span>37</span>
                                                        </p>
                                                    </div>

                                                    <div className='hr'>
                                                        <p>108</p>
                                                    </div>

                                                    <div className='temp'>
                                                        <p>
                                                            <span>36</span>.
                                                            <span>5</span>
                                                        </p>
                                                    </div>

                                                    <div className='ews'>
                                                        <p>4</p>
                                                    </div>
                                                    <div className='spo'>
                                                        <p>98</p>
                                                    </div>
                                                    <div className='error'>
                                                        <p>-</p>
                                                    </div>
                                                </div>

                                                <div className='table_content'>
                                                    <div className='date_time'>
                                                        <p>
                                                            <span>21</span>.
                                                            <span>09</span>.
                                                            <span>15</span>
                                                        </p>
                                                        &nbsp;

                                                        <p>
                                                            <span>01</span>:
                                                            <span>44</span>:
                                                            <span>37</span>
                                                        </p>
                                                    </div>

                                                    <div className='hr'>
                                                        <p>108</p>
                                                    </div>

                                                    <div className='temp'>
                                                        <p>
                                                            <span>36</span>.
                                                            <span>5</span>
                                                        </p>
                                                    </div>

                                                    <div className='ews'>
                                                        <p>4</p>
                                                    </div>
                                                    <div className='spo'>
                                                        <p>98</p>
                                                    </div>
                                                    <div className='error'>
                                                        <p>-</p>
                                                    </div>
                                                </div>

                                                <div className='table_content'>
                                                    <div className='date_time'>
                                                        <p>
                                                            <span>21</span>.
                                                            <span>09</span>.
                                                            <span>15</span>
                                                        </p>
                                                        &nbsp;

                                                        <p>
                                                            <span>01</span>:
                                                            <span>44</span>:
                                                            <span>37</span>
                                                        </p>
                                                    </div>

                                                    <div className='hr'>
                                                        <p>108</p>
                                                    </div>

                                                    <div className='temp'>
                                                        <p>
                                                            <span>36</span>.
                                                            <span>5</span>
                                                        </p>
                                                    </div>

                                                    <div className='ews'>
                                                        <p>4</p>
                                                    </div>
                                                    <div className='spo'>
                                                        <p>98</p>
                                                    </div>
                                                    <div className='error'>
                                                        <p>-</p>
                                                    </div>
                                                </div>

                                                <div className='table_content'>
                                                    <div className='date_time'>
                                                        <p>
                                                            <span>21</span>.
                                                            <span>09</span>.
                                                            <span>15</span>
                                                        </p>
                                                        &nbsp;

                                                        <p>
                                                            <span>01</span>:
                                                            <span>44</span>:
                                                            <span>37</span>
                                                        </p>
                                                    </div>

                                                    <div className='hr'>
                                                        <p>108</p>
                                                    </div>

                                                    <div className='temp'>
                                                        <p>
                                                            <span>36</span>.
                                                            <span>5</span>
                                                        </p>
                                                    </div>

                                                    <div className='ews'>
                                                        <p>4</p>
                                                    </div>
                                                    <div className='spo'>
                                                        <p>98</p>
                                                    </div>
                                                    <div className='error'>
                                                        <p>-</p>
                                                    </div>
                                                </div>

                                                <div className='table_content'>
                                                    <div className='date_time'>
                                                        <p>
                                                            <span>21</span>.
                                                            <span>09</span>.
                                                            <span>15</span>
                                                        </p>
                                                        &nbsp;

                                                        <p>
                                                            <span>01</span>:
                                                            <span>44</span>:
                                                            <span>37</span>
                                                        </p>
                                                    </div>

                                                    <div className='hr'>
                                                        <p>108</p>
                                                    </div>

                                                    <div className='temp'>
                                                        <p>
                                                            <span>36</span>.
                                                            <span>5</span>
                                                        </p>
                                                    </div>

                                                    <div className='ews'>
                                                        <p>4</p>
                                                    </div>
                                                    <div className='spo'>
                                                        <p>98</p>
                                                    </div>
                                                    <div className='error'>
                                                        <p>-</p>
                                                    </div>
                                                </div>

                                                <div className='table_content'>
                                                    <div className='date_time'>
                                                        <p>
                                                            <span>21</span>.
                                                            <span>09</span>.
                                                            <span>15</span>
                                                        </p>
                                                        &nbsp;

                                                        <p>
                                                            <span>01</span>:
                                                            <span>44</span>:
                                                            <span>37</span>
                                                        </p>
                                                    </div>

                                                    <div className='hr'>
                                                        <p>108</p>
                                                    </div>

                                                    <div className='temp'>
                                                        <p>
                                                            <span>36</span>.
                                                            <span>5</span>
                                                        </p>
                                                    </div>

                                                    <div className='ews'>
                                                        <p>4</p>
                                                    </div>
                                                    <div className='spo'>
                                                        <p>98</p>
                                                    </div>
                                                    <div className='error'>
                                                        <p>-</p>
                                                    </div>
                                                </div>

                                                <div className='table_content'>
                                                    <div className='date_time'>
                                                        <p>
                                                            <span>21</span>.
                                                            <span>09</span>.
                                                            <span>15</span>
                                                        </p>
                                                        &nbsp;

                                                        <p>
                                                            <span>01</span>:
                                                            <span>44</span>:
                                                            <span>37</span>
                                                        </p>
                                                    </div>

                                                    <div className='hr'>
                                                        <p>108</p>
                                                    </div>

                                                    <div className='temp'>
                                                        <p>
                                                            <span>36</span>.
                                                            <span>5</span>
                                                        </p>
                                                    </div>

                                                    <div className='ews'>
                                                        <p>4</p>
                                                    </div>
                                                    <div className='spo'>
                                                        <p>98</p>
                                                    </div>
                                                    <div className='error'>
                                                        <p>-</p>
                                                    </div>
                                                </div>

                                                <div className='table_content'>
                                                    <div className='date_time'>
                                                        <p>
                                                            <span>21</span>.
                                                            <span>09</span>.
                                                            <span>15</span>
                                                        </p>
                                                        &nbsp;

                                                        <p>
                                                            <span>01</span>:
                                                            <span>44</span>:
                                                            <span>37</span>
                                                        </p>
                                                    </div>

                                                    <div className='hr'>
                                                        <p>108</p>
                                                    </div>

                                                    <div className='temp'>
                                                        <p>
                                                            <span>36</span>.
                                                            <span>5</span>
                                                        </p>
                                                    </div>

                                                    <div className='ews'>
                                                        <p>4</p>
                                                    </div>
                                                    <div className='spo'>
                                                        <p>98</p>
                                                    </div>
                                                    <div className='error'>
                                                        <p>-</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* pagenation */}
                                            <div className='table_page'>
                                                <ul>
                                                    <li>
                                                        <a href=''>&lt;&lt;</a>
                                                    </li>
                                                    <li>
                                                        <a href=''>&lt;</a>
                                                    </li>
                                                    <li className='active'>
                                                        <a href=''>1</a>
                                                    </li>
                                                    <li>
                                                        <a href=''>2</a>
                                                    </li>
                                                    <li>
                                                        <a href=''>3</a>
                                                    </li>
                                                    <li>
                                                        <a href=''>4</a>
                                                    </li>
                                                    <li>
                                                        <a href=''>5</a>
                                                    </li>
                                                    <li>
                                                        <a href=''>6</a>
                                                    </li>
                                                    <li>
                                                        <a href=''>7</a>
                                                    </li>
                                                    <li>
                                                        <a href=''>8</a>
                                                    </li>
                                                    <li>
                                                        <a href=''>9</a>
                                                    </li>
                                                    <li>
                                                        <a href=''>10</a>
                                                    </li>
                                                    <li>
                                                        <a href=''>...</a>
                                                    </li>
                                                    <li>
                                                        <a href=''>52</a>
                                                    </li>

                                                    <li>
                                                        <a href=''>&gt;</a>
                                                    </li>
                                                    <li>
                                                        <a href=''>&gt;&gt;</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Graphical Trend */}
                                    <div id='tab-3' className='tab-content'>
                                        <div className='ecg'>
                                            <div className='ecg_graph'>
                                                <p>ECG</p>

                                                <div>
                                                    <img
                                                        src='/H-Connect/img/graph/ECG.png'
                                                        alt='ecg그래프'
                                                    />
                                                </div>
                                            </div>

                                            <div className='bell'>
                                                <div className='bell_name'>
                                                    <p>HR. bpm</p>
                                                </div>

                                                <div className='bell_num'>
                                                    <div>
                                                        <p>120</p>
                                                        <p>50</p>
                                                    </div>

                                                    <p>108</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className='tabular_table graphical'
                                        >
                                            <div className='table_title'>
                                                <p className='date_time'>
                                                    date/time
                                                </p>
                                                <p className='hr'>HR (bpm)</p>
                                                <p className='temp'>
                                                    Temp (°C)
                                                </p>
                                                <p className='ews'>EWS</p>
                                                <p className='spo'>SpO2 (%)</p>
                                                <p className='error'>Error</p>
                                            </div>

                                            <div className='table_body'>
                                                <div className='table_content'>
                                                    <div className='date_time'>
                                                        <p>
                                                            <span>21</span>.
                                                            <span>09</span>.
                                                            <span>15</span>
                                                        </p>
                                                        &nbsp;

                                                        <p>
                                                            <span>01</span>:
                                                            <span>44</span>:
                                                            <span>37</span>
                                                        </p>
                                                    </div>

                                                    <div className='hr'>
                                                        <p>108</p>
                                                    </div>

                                                    <div className='temp'>
                                                        <p>
                                                            <span>36</span>.
                                                            <span>5</span>
                                                        </p>
                                                    </div>

                                                    <div className='ews'>
                                                        <p>4</p>
                                                    </div>
                                                    <div className='spo'>
                                                        <p>98</p>
                                                    </div>
                                                    <div className='error'>
                                                        <p>-</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* graph_wrap */}
                                            <div className='graph_wrap'>
                                                {/* hr_chart */}
                                                <div className='chart hr_chart'>
                                                    {/* left */}
                                                    <div className='left'>
                                                        <div className='index'>
                                                            <p>
                                                                HR<br />(bpm)
                                                            </p>
                                                        </div>

                                                        <p className='bpm'>
                                                            240<br />
                                                            200<br />
                                                            160<br />
                                                            120<br />
                                                            80<br />
                                                            40<br />
                                                            0
                                                        </p>
                                                    </div>

                                                    <div className='right'>
                                                        <div
                                                            className='bg_graph'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/graph/background.png'
                                                                alt='그래프 백그라운드 이미지'
                                                            />
                                                        </div>

                                                        <div
                                                            className='row_time'
                                                        >
                                                            <p>00:00:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:02:00</p>
                                                            <p>00:00:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:02:00</p>
                                                        </div>

                                                        <div className='time_line'><p className='time'><span>00</span>:
                                                            <span>02</span>: <span>00</span></p></div>
                                                    </div>
                                                </div>

                                                {/* sp_chart */}
                                                <div className='chart sp_chart'>
                                                    {/* left */}
                                                    <div className='left'>
                                                        <div className='index'>
                                                            <p>
                                                                SPO2<br />(%)
                                                            </p>
                                                        </div>

                                                        <p className='bpm'>
                                                            240<br />
                                                            200<br />
                                                            160<br />
                                                            120<br />
                                                            80<br />
                                                            40<br />
                                                            0
                                                        </p>
                                                    </div>

                                                    <div className='right'>
                                                        <div
                                                            className='bg_graph'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/graph/background.png'
                                                                alt='그래프 백그라운드 이미지'
                                                            />
                                                        </div>

                                                        <div
                                                            className='row_time'
                                                        >
                                                            <p>00:00:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:02:00</p>
                                                            <p>00:00:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:02:00</p>
                                                        </div>

                                                        <div
                                                            className='time_line'
                                                        ><p className='time'>
                                                            <span>00</span>: <span>02</span>: <span>00</span>
                                                        </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* resp_chart */}
                                                <div
                                                    className='chart resp_chart'
                                                >
                                                    {/* left */}
                                                    <div className='left'>
                                                        <div className='index'>
                                                            <p>RESP</p>
                                                        </div>

                                                        <p className='bpm'>
                                                            240<br />
                                                            200<br />
                                                            160<br />
                                                            120<br />
                                                            80<br />
                                                            40<br />
                                                            0
                                                        </p>
                                                    </div>

                                                    <div className='right'>
                                                        <div
                                                            className='bg_graph'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/graph/background.png'
                                                                alt='그래프 백그라운드 이미지'
                                                            />
                                                        </div>

                                                        <div
                                                            className='row_time'
                                                        >
                                                            <p>00:00:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:02:00</p>
                                                            <p>00:00:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:02:00</p>
                                                        </div>

                                                        <div
                                                            className='time_line'
                                                        >
                                                            <p className='time'><span>00</span>: <span>02</span>:
                                                                <span>00</span></p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* temp_chart */}
                                                <div
                                                    className='chart temp_chart'
                                                >
                                                    {/* left */}
                                                    <div className='left'>
                                                        <div className='index'>
                                                            <p>
                                                                TEMP<br />(°C)
                                                            </p>
                                                        </div>

                                                        <p className='bpm'>
                                                            240<br />
                                                            200<br />
                                                            160<br />
                                                            120<br />
                                                            80<br />
                                                            40<br />
                                                            0
                                                        </p>
                                                    </div>

                                                    <div className='right'>
                                                        <div
                                                            className='bg_graph'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/graph/background.png'
                                                                alt='그래프 백그라운드 이미지'
                                                            />
                                                        </div>

                                                        <div
                                                            className='row_time'
                                                        >
                                                            <p>00:00:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:02:00</p>
                                                            <p>00:00:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:01:00</p>
                                                            <p>00:02:00</p>
                                                        </div>

                                                        <div
                                                            className='time_line'
                                                        >
                                                            <p className='time'><span>00</span>: <span>02</span>:
                                                                <span>00</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Event */}
                                    <div id='tab-4' className='tab-content'>
                                        <div className='ecg'>
                                            <div className='ecg_graph'>
                                                <p>ECG</p>

                                                <div>
                                                    <img
                                                        src='/H-Connect/img/graph/ECG.png'
                                                        alt='ecg그래프'
                                                    />
                                                </div>
                                            </div>

                                            <div className='bell'>
                                                <div className='bell_name'>
                                                    <p>HR. bpm</p>
                                                </div>

                                                <div className='bell_num'>
                                                    <div>
                                                        <p>120</p>
                                                        <p>50</p>
                                                    </div>

                                                    <p>216</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className='tabular_table graphical event'
                                        >
                                            <div className='table_title'>
                                                <div className='left'>
                                                    <p className='date_time'>
                                                        date/time
                                                    </p>
                                                    <p className='alarm_des'>
                                                        Alarm Description
                                                    </p>
                                                </div>

                                                <p className='prior'>
                                                    Priority
                                                </p>
                                            </div>

                                            <div className='table_body'> {/* 1 */}
                                                <div className='table_wrap'>
                                                    <div>
                                                        <div className='date_time'><p><span>21</span>. <span>09</span>.
                                                            <span>15</span></p> &nbsp; <p>
                                                            <span>01</span>: <span>44</span>:
                                                            <span>37</span></p></div>
                                                        <div className='alarm_des'><p> Manual Event </p></div>
                                                    </div>
                                                    <div><p className='more'> 자세히 </p>
                                                        <p className='close'> 닫기 </p> <span></span></div>
                                                </div>
                                                <div className='table_content'>
                                                    <div className='cont_inner'>
                                                        <div className='ecg'>
                                                            <div className='ecg_graph'><p>ECG</p>
                                                                <div>
                                                                    <div className='img_container'><img
                                                                        src='/H-Connect/img/graph/ECG.png'
                                                                        alt='ecg그래프' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='bell'>
                                                                <div className='bell_name'><p> HR. bpm </p></div>
                                                                <div className='bell_num'>
                                                                    <div><p> 120 </p>
                                                                        <p> 50 </p></div>
                                                                    <p> 216 </p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* 2 */}
                                                <div className='table_wrap'>
                                                    <div>
                                                        <div className='date_time'><p><span>21</span>. <span>09</span>.
                                                            <span>15</span></p> &nbsp; <p>
                                                            <span>01</span>: <span>44</span>:
                                                            <span>37</span></p></div>
                                                        <div className='alarm_des'><p> Manual Event </p></div>
                                                    </div>
                                                    <div><p className='more'> 자세히 </p>
                                                        <p className='close'> 닫기 </p> <span></span></div>
                                                </div>
                                                <div className='table_content'>
                                                    <div className='cont_inner'>
                                                        <div className='ecg'>
                                                            <div className='ecg_graph'><p>ECG</p>
                                                                <div>
                                                                    <div className='img_container'><img
                                                                        src='/H-Connect/img/graph/ECG.png'
                                                                        alt='ecg그래프' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='bell'>
                                                                <div className='bell_name'><p> HR. bpm </p></div>
                                                                <div className='bell_num'>
                                                                    <div><p> 120 </p>
                                                                        <p> 50 </p></div>
                                                                    <p> 216 </p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* 3 */}
                                                <div className='table_wrap'>
                                                    <div>
                                                        <div className='date_time'><p><span>21</span>. <span>09</span>.
                                                            <span>15</span></p> &nbsp; <p>
                                                            <span>01</span>: <span>44</span>:
                                                            <span>37</span></p></div>
                                                        <div className='alarm_des'><p> Manual Event </p></div>
                                                    </div>
                                                    <div><p className='more'> 자세히 </p>
                                                        <p className='close'> 닫기 </p> <span></span></div>
                                                </div>
                                                <div className='table_content'>
                                                    <div className='cont_inner'>
                                                        <div className='ecg'>
                                                            <div className='ecg_graph'><p>ECG</p>
                                                                <div>
                                                                    <div className='img_container'><img
                                                                        src='/H-Connect/img/graph/ECG.png'
                                                                        alt='ecg그래프' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='bell'>
                                                                <div className='bell_name'><p> HR. bpm </p></div>
                                                                <div className='bell_num'>
                                                                    <div><p> 120 </p>
                                                                        <p> 50 </p></div>
                                                                    <p> 216 </p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* 4 */}
                                                <div className='table_wrap'>
                                                    <div>
                                                        <div className='date_time'><p><span>21</span>. <span>09</span>.
                                                            <span>15</span></p> &nbsp; <p>
                                                            <span>01</span>: <span>44</span>:
                                                            <span>37</span></p></div>
                                                        <div className='alarm_des'><p> Manual Event </p></div>
                                                    </div>
                                                    <div><p className='more'> 자세히 </p>
                                                        <p className='close'> 닫기 </p> <span></span></div>
                                                </div>
                                                <div className='table_content'>
                                                    <div className='cont_inner'>
                                                        <div className='ecg'>
                                                            <div className='ecg_graph'><p>ECG</p>
                                                                <div>
                                                                    <div className='img_container'><img
                                                                        src='/H-Connect/img/graph/ECG.png'
                                                                        alt='ecg그래프' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='bell'>
                                                                <div className='bell_name'><p> HR. bpm </p></div>
                                                                <div className='bell_num'>
                                                                    <div><p> 120 </p>
                                                                        <p> 50 </p></div>
                                                                    <p> 216 </p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* 5 */}
                                                <div className='table_wrap'>
                                                    <div>
                                                        <div className='date_time'><p><span>21</span>. <span>09</span>.
                                                            <span>15</span></p> &nbsp; <p>
                                                            <span>01</span>: <span>44</span>:
                                                            <span>37</span></p></div>
                                                        <div className='alarm_des'><p> Manual Event </p></div>
                                                    </div>
                                                    <div><p className='more'> 자세히 </p>
                                                        <p className='close'> 닫기 </p> <span></span></div>
                                                </div>
                                                <div className='table_content'>
                                                    <div className='cont_inner'>
                                                        <div className='ecg'>
                                                            <div className='ecg_graph'><p>ECG</p>
                                                                <div>
                                                                    <div className='img_container'><img
                                                                        src='/H-Connect/img/graph/ECG.png'
                                                                        alt='ecg그래프' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='bell'>
                                                                <div className='bell_name'><p> HR. bpm </p></div>
                                                                <div className='bell_num'>
                                                                    <div><p> 120 </p>
                                                                        <p> 50 </p></div>
                                                                    <p> 216 </p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* 6 */}
                                                <div className='table_wrap'>
                                                    <div>
                                                        <div className='date_time'><p><span>21</span>. <span>09</span>.
                                                            <span>15</span></p> &nbsp; <p>
                                                            <span>01</span>: <span>44</span>:
                                                            <span>37</span></p></div>
                                                        <div className='alarm_des'><p> Manual Event </p></div>
                                                    </div>
                                                    <div><p className='more'> 자세히 </p>
                                                        <p className='close'> 닫기 </p> <span></span></div>
                                                </div>
                                                <div className='table_content'>
                                                    <div className='cont_inner'>
                                                        <div className='ecg'>
                                                            <div className='ecg_graph'><p>ECG</p>
                                                                <div>
                                                                    <div className='img_container'><img
                                                                        src='/H-Connect/img/graph/ECG.png'
                                                                        alt='ecg그래프' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='bell'>
                                                                <div className='bell_name'><p> HR. bpm </p></div>
                                                                <div className='bell_num'>
                                                                    <div><p> 120 </p>
                                                                        <p> 50 </p></div>
                                                                    <p> 216 </p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* 7 */}
                                                <div className='table_wrap'>
                                                    <div>
                                                        <div className='date_time'><p><span>21</span>. <span>09</span>.
                                                            <span>15</span></p> &nbsp; <p>
                                                            <span>01</span>: <span>44</span>:
                                                            <span>37</span></p></div>
                                                        <div className='alarm_des'><p> Manual Event </p></div>
                                                    </div>
                                                    <div><p className='more'> 자세히 </p>
                                                        <p className='close'> 닫기 </p> <span></span></div>
                                                </div>
                                                <div className='table_content'>
                                                    <div className='cont_inner'>
                                                        <div className='ecg'>
                                                            <div className='ecg_graph'><p>ECG</p>
                                                                <div>
                                                                    <div className='img_container'><img
                                                                        src='/H-Connect/img/graph/ECG.png'
                                                                        alt='ecg그래프' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='bell'>
                                                                <div className='bell_name'><p> HR. bpm </p></div>
                                                                <div className='bell_num'>
                                                                    <div><p> 120 </p>
                                                                        <p> 50 </p></div>
                                                                    <p> 216 </p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* 8 */}
                                                <div className='table_wrap'>
                                                    <div>
                                                        <div className='date_time'><p><span>21</span>. <span>09</span>.
                                                            <span>15</span></p> &nbsp; <p>
                                                            <span>01</span>: <span>44</span>:
                                                            <span>37</span></p></div>
                                                        <div className='alarm_des'><p> Manual Event </p></div>
                                                    </div>
                                                    <div><p className='more'> 자세히 </p>
                                                        <p className='close'> 닫기 </p> <span></span></div>
                                                </div>
                                                <div className='table_content'>
                                                    <div className='cont_inner'>
                                                        <div className='ecg'>
                                                            <div className='ecg_graph'><p>ECG</p>
                                                                <div>
                                                                    <div className='img_container'><img
                                                                        src='/H-Connect/img/graph/ECG.png'
                                                                        alt='ecg그래프' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='bell'>
                                                                <div className='bell_name'><p> HR. bpm </p></div>
                                                                <div className='bell_num'>
                                                                    <div><p> 120 </p>
                                                                        <p> 50 </p></div>
                                                                    <p> 216 </p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* 9 */}
                                                <div className='table_wrap'>
                                                    <div>
                                                        <div className='date_time'><p><span>21</span>. <span>09</span>.
                                                            <span>15</span></p> &nbsp; <p>
                                                            <span>01</span>: <span>44</span>:
                                                            <span>37</span></p></div>
                                                        <div className='alarm_des'><p> Manual Event </p></div>
                                                    </div>
                                                    <div><p className='more'> 자세히 </p>
                                                        <p className='close'> 닫기 </p> <span></span></div>
                                                </div>
                                                <div className='table_content'>
                                                    <div className='cont_inner'>
                                                        <div className='ecg'>
                                                            <div className='ecg_graph'><p>ECG</p>
                                                                <div>
                                                                    <div className='img_container'><img
                                                                        src='/H-Connect/img/graph/ECG.png'
                                                                        alt='ecg그래프' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='bell'>
                                                                <div className='bell_name'><p> HR. bpm </p></div>
                                                                <div className='bell_num'>
                                                                    <div><p> 120 </p>
                                                                        <p> 50 </p></div>
                                                                    <p> 216 </p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* 10 */}
                                                <div className='table_wrap'>
                                                    <div>
                                                        <div className='date_time'><p><span>21</span>. <span>09</span>.
                                                            <span>15</span></p> &nbsp; <p>
                                                            <span>01</span>: <span>44</span>:
                                                            <span>37</span></p></div>
                                                        <div className='alarm_des'><p> Manual Event </p></div>
                                                    </div>
                                                    <div><p className='more'> 자세히 </p>
                                                        <p className='close'> 닫기 </p> <span></span></div>
                                                </div>
                                                <div className='table_content'>
                                                    <div className='cont_inner'>
                                                        <div className='ecg'>
                                                            <div className='ecg_graph'><p>ECG</p>
                                                                <div>
                                                                    <div className='img_container'><img
                                                                        src='/H-Connect/img/graph/ECG.png'
                                                                        alt='ecg그래프' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='bell'>
                                                                <div className='bell_name'><p> HR. bpm </p></div>
                                                                <div className='bell_num'>
                                                                    <div><p> 120 </p>
                                                                        <p> 50 </p></div>
                                                                    <p> 216 </p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* pagenation */}
                                                <div className='table_page'>
                                                    <ul>
                                                        <li><a href=''> &lt;&lt;</a></li>
                                                        <li><a href=''> &lt;</a></li>
                                                        <li className='active'><a href=''>1.</a></li>
                                                        <li><a href=''>2.</a></li>
                                                        <li><a href=''>3.</a></li>
                                                        <li><a href=''>4.</a></li>
                                                        <li><a href=''>5.</a></li>
                                                        <li><a href=''>6.</a></li>
                                                        <li><a href=''>7.</a></li>
                                                        <li><a href=''>8.</a></li>
                                                        <li><a href=''>9.</a></li>
                                                        <li><a href=''>10.</a></li>
                                                        <li><a href=''>...</a></li>
                                                        <li><a href=''>52.</a></li>
                                                        <li><a href=''>&gt;</a></li>
                                                        <li><a href=''>&gt;&gt;</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* pacs */}
                        <div className='pacs'>
                            <div className='title'>
                                <p>
                                    PACS. 김환자 (63. 남). Patient ID -
                                    Patient type
                                </p>

                                <div className='btn_list'>
                                    <button type='button' className='btn_fold'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/fold.svg'
                                                alt='접는 아이콘'
                                            />
                                        </div>
                                    </button>

                                    <button type='button' className='btn_full'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/full.svg'
                                                alt='네모 아이콘'
                                            />
                                        </div>
                                    </button>

                                    <button type='button' className='btn_close'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/close.svg'
                                                alt='엑스 아이콘'
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className='pacs_inner'>
                                {/* pacs list */}
                                <div className='study_list'>
                                    <div className='title'>
                                        <h2>
                                            김환자 (63.남). Patient ID -
                                            Patient type
                                        </h2>
                                        <p>study list</p>
                                    </div>

                                    <div className='list'>
                                        <div className='row'>
                                            <p className='time'>
                                                21.08.15 10:35:25
                                            </p>
                                            <p>Wait</p>
                                            <p>CR CHEST</p>
                                            <p>CHEST</p>
                                            <p>CR</p>

                                            <div className='images'>
                                                <p>185 images</p>
                                                <div>
                                                    <img
                                                        src='/H-Connect/img/right_arrow.svg'
                                                        alt='오른쪽 화살표'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <p className='time'>
                                                21.07.26 14:24:48
                                            </p>
                                            <p>Preliminary</p>
                                            <p>CT Abdomen + Pelvis</p>
                                            <p>Abdomen + Pelvis</p>
                                            <p>CT / PR</p>

                                            <div className='images'>
                                                <p>74 images</p>
                                                <div>
                                                    <img
                                                        src='/H-Connect/img/right_arrow.svg'
                                                        alt='오른쪽 화살표'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <p className='time'>
                                                21.06.07 16:31:17
                                            </p>
                                            <p>Confirmed</p>
                                            <p>US KIDNEY BOTH</p>
                                            <p>OTHERS</p>
                                            <p>US</p>

                                            <div className='images'>
                                                <p>50 images</p>
                                                <div>
                                                    <img
                                                        src='/H-Connect/img/right_arrow.svg'
                                                        alt='오른쪽 화살표'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <p className='time'>
                                                21.05.11 09:30:45
                                            </p>
                                            <p>Confirmed</p>
                                            <p>CT CHEST</p>
                                            <p>CHEST</p>
                                            <p>CT / SC</p>

                                            <div className='images'>
                                                <p>25 images</p>
                                                <div>
                                                    <img
                                                        src='/H-Connect/img/right_arrow.svg'
                                                        alt='오른쪽 화살표'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* pacs view */}
                                <div className='pacs_view'>
                                    <div className='list'>
                                        <div>
                                            <button
                                                type='button'
                                                className='back'
                                            >
                                                <div>
                                                    <img
                                                        src='/H-Connect/img/right_arrow.svg'
                                                        alt='오른쪽 화살표'
                                                    />
                                                </div>
                                                List
                                            </button>

                                            <h3>
                                                <span>21.08.15</span>
                                                <span>10:35:25.</span>
                                                <span
                                                >CR
                                                        CHEST.CHEST.CR.</span
                                                >
                                                <span>185 imgages</span>
                                            </h3>
                                        </div>

                                        <div className='view_inner'>
                                            <div className='select_send'>
                                                <div className='select_inner'>
                                                    <div>
                                                        <div className='img_container'><img
                                                            src='/H-Connect/img/doctor/pacs.jpg'
                                                            alt='사진' /></div>
                                                        <button type='button' className='delete'> X</button>
                                                    </div>
                                                    <div>
                                                        <div className='img_container'><img
                                                            src='/H-Connect/img/doctor/pacs.jpg'
                                                            alt='사진' /></div>
                                                        <button type='button' className='delete'> X</button>
                                                    </div>
                                                    <div>
                                                        <div className='img_container'><img
                                                            src='/H-Connect/img/doctor/pacs.jpg'
                                                            alt='사진' /></div>
                                                        <button type='button' className='delete'> X</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='btn_list'>
                                                <button type='button' className='send'> 대화창에 전송</button>
                                                <button type='button' className='full'>
                                                    <div><img src='/H-Connect/img/icon/full.svg' alt='네모 아이콘' /></div>
                                                    full screen
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 슬라이드 */}
                                    <div className='slide'>
                                        {/* 큰 사진 */}
                                        <div className='swiper pacs_big'>
                                            <div className='swiper-wrapper'>
                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* 작은 사진 */}
                                        <div className='swiper pacs_small'>
                                            <div className='swiper-wrapper'>
                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>

                                                <div className='swiper-slide'>
                                                    <img
                                                        src='/H-Connect/img/doctor/pacs.jpg'
                                                        alt='이미지'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* navi */}
                                        <div className='control'>
                                            <div
                                                className='swiper-button-next next'
                                            ></div>
                                            <div
                                                className='swiper-button-prev prev'
                                            ></div>

                                            <div className='swiper-scrollbar'>
                                                <div
                                                    className='swiper-scrollbar-drag'
                                                >
                                                    <div
                                                        className='swiper-pagination'
                                                    ></div>
                                                </div>
                                            </div>

                                            <button
                                                type='button'
                                                className='last'
                                                onClick='test()'
                                            ></button>
                                            {/* <div class="last" onclick="test()"></div> */}
                                            <div className='first'></div>
                                            {/*
                                                <div class="swiper-button-next last"></div>
                                                <div class="swiper-button-prev first"></div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* lab */}
                        <div className='lab inner'>
                            <div className='title'>
                                <p>
                                    LAB 조회. 김환자 (63. 남). Patient ID -
                                    Patient type
                                </p>

                                <div className='btn_list'>
                                    <button type='button' className='btn_fold'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/fold.svg'
                                                alt='접는 아이콘'
                                            />
                                        </div>
                                    </button>

                                    <button type='button' className='btn_full'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/full.svg'
                                                alt='네모 아이콘'
                                            />
                                        </div>
                                    </button>

                                    <button type='button' className='btn_close'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/close.svg'
                                                alt='엑스 아이콘'
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className='cont'>
                                <div className='title'>
                                    <h2>
                                        김환자 (63. 남). Patient ID -
                                        Patient type
                                    </h2>

                                    <p>study list</p>
                                </div>

                                <div className='cont_wrap lab_wrap'>
                                    <div className='list_wrap'>
                                        <div className='list on'>
                                            <p>21.08.15</p>
                                            <p>10:35:25</p>
                                        </div>

                                        <div className='list'>
                                            <p>21.08.15</p>
                                            <p>10:35:25</p>
                                        </div>

                                        <div className='list'>
                                            <p>21.08.15</p>
                                            <p>10:35:25</p>
                                        </div>

                                        <div className='list'>
                                            <p>21.08.15</p>
                                            <p>10:35:25</p>
                                        </div>
                                    </div>

                                    <div className='list_view'>
                                        <div className='title'>
                                            <h3>
                                                김환자<span>(63 남)</span>
                                            </h3>
                                            <h3>
                                                21.06.30<span>18:20</span>
                                            </h3>
                                            <h3>Laboratory Tests Result</h3>
                                        </div>

                                        {/* chemi */}
                                        <div className='chemi'><p>Chemistry</p>
                                            <ul>
                                                <li>
                                                    <div><p>PH</p> <span>7.35 ~ 7.45</span></div>
                                                    <p>7.35</p></li>
                                                <li>
                                                    <div><p>PaCO2 (mmhg)</p> <span>38.00 ~ 42.00</span></div>
                                                    <p>38</p></li>
                                                <li>
                                                    <div><p>PaO2 (mmhg)</p> <span>60.00 ~ 100.00</span></div>
                                                    <p>90</p></li>
                                                <li>
                                                    <div><p>PCO2 (mmhg)</p> <span>41.00 ~ 51.00</span></div>
                                                    {/* 이 수치가 div안에 span 보다 낮을 경우 addClass active */} <p
                                                    className='active'>
                                                    39</p></li>
                                            </ul>
                                        </div>

                                        {/* hema */}
                                        <div className='hema'><p>Hematology</p>
                                            <ul>
                                                <li>
                                                    <div><p> WBC (x10^9 cell/L) </p> <span>4.00 ~ 12.0</span></div>
                                                    <p>6</p></li>
                                                <li>
                                                    <div><p>Hct (%)</p> <span>40.00 ~ 48.00</span></div>
                                                    <p className='active'>33</p></li>
                                                <li>
                                                    <div><p>Hb (g/dL)</p> <span>13.00 ~ 17.00</span></div>
                                                    <p className='active'>11</p></li>
                                                <li>
                                                    <div><p>Lymph (%)</p> <span>20.00 ~ 40.00</span></div>
                                                    <p className='active'>12</p></li>
                                            </ul>
                                        </div>

                                        {/* infec */}
                                        <div className='infec'><p>Infectious diseases</p>
                                            <ul>
                                                <li>
                                                    <div><p> Procal (ng/ml) </p> <span>0.1 ~ 0.5</span></div>
                                                    <p className='pding'> Pending </p></li>
                                            </ul>
                                        </div>

                                        {/* urine */}
                                        <div className='urine'><p>Urine studies</p>
                                            <ul>
                                                <li>
                                                    <div><p>Spec. grav</p> <span>1.003 ~ 1.030</span></div>
                                                    <p className='active'>1</p></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* emr */}
                        <div className='emr inner'>
                            <div className='title'>
                                <p>
                                    emr 조회. 김환자 (63. 남). Patient ID -
                                    Patient type
                                </p>

                                <div className='btn_list'>
                                    <button type='button' className='btn_fold'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/fold.svg'
                                                alt='접는 아이콘'
                                            />
                                        </div>
                                    </button>

                                    <button type='button' className='btn_full'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/full.svg'
                                                alt='네모 아이콘'
                                            />
                                        </div>
                                    </button>

                                    <button type='button' className='btn_close'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/close.svg'
                                                alt='엑스 아이콘'
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className='cont'>
                                <div className='title'>
                                    <h2>
                                        김환자 (63. 남). Patient ID -
                                        Patient type
                                    </h2>

                                    <p>EMR list</p>
                                </div>

                                <div className='cont_wrap emr_wrap'>
                                    <div className='list_wrap'>
                                        <div className='list on'>
                                            <p>21.08.15</p>
                                            <p>10:35:25</p>
                                        </div>

                                        <div className='list'>
                                            <p>21.08.15</p>
                                            <p>10:35:25</p>
                                        </div>

                                        <div className='list'>
                                            <p>21.08.15</p>
                                            <p>10:35:25</p>
                                        </div>

                                        <div className='list'>
                                            <p>21.08.15</p>
                                            <p>10:35:25</p>
                                        </div>
                                    </div>

                                    <div className='list_view'>
                                        <div className='title'>
                                            <h3>
                                                김환자<span>(63 남)</span>
                                            </h3>
                                            <h3>
                                                21.06.30<span>18:20</span>
                                            </h3>
                                        </div>

                                        <div className='emr'>
                                            <p>EMR</p>

                                            <div className='emr_content'>
                                                불어 주는 옷을 이것이다.
                                                실현에 품었기 끝까지 실로
                                                위하여서. 구하기 만천하의
                                                이는 그러므로 그들은 같이,
                                                쓸쓸한 것이다. 뭇 속에서
                                                그들의 가지에 약동하다.
                                                없으면 인생을 곳이 없는
                                                오아이스도 발휘하기 있으랴?
                                                봄바람을 뜨거운지라, 고동을
                                                설산에서 그들의 있는 청춘을
                                                곧 부패뿐이다. 청춘은 만물은
                                                하였으며, 갑 목숨을 열락의
                                                약동하다. 끝에 위하여 구하지
                                                위하여, 얼마나 하는 우리의
                                                현저하게 공자는 황금시대다.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ocs */}
                        <div className='ocs inner'>
                            <div className='title'>
                                <p>
                                    ocs 조회. 김환자 (63. 남). Patient ID -
                                    Patient type
                                </p>

                                <div className='btn_list'>
                                    <button type='button' className='btn_fold'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/fold.svg'
                                                alt='접는 아이콘'
                                            />
                                        </div>
                                    </button>

                                    <button type='button' className='btn_full'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/full.svg'
                                                alt='네모 아이콘'
                                            />
                                        </div>
                                    </button>

                                    <button type='button' className='btn_close'>
                                        <div>
                                            <img
                                                src='/H-Connect/img/icon/nurse/close.svg'
                                                alt='엑스 아이콘'
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className='cont'>
                                <div className='title'>
                                    <h2>
                                        김환자 (63. 남). Patient ID -
                                        Patient type
                                    </h2>

                                    <p>OCS list</p>
                                </div>

                                <div className='cont_wrap ocs_wrap'>
                                    <div className='list_wrap'>
                                        <div className='list on'>
                                            <p>21.08.15</p>
                                            <p>10:35:25</p>
                                        </div>

                                        <div className='list'>
                                            <p>21.08.15</p>
                                            <p>10:35:25</p>
                                        </div>

                                        <div className='list'>
                                            <p>21.08.15</p>
                                            <p>10:35:25</p>
                                        </div>

                                        <div className='list'>
                                            <p>21.08.15</p>
                                            <p>10:35:25</p>
                                        </div>
                                    </div>

                                    <div className='list_view'>
                                        <div className='title'>
                                            <h3>
                                                김환자<span>(63 남)</span>
                                            </h3>
                                            <h3>
                                                21.06.30<span>18:20</span>
                                            </h3>
                                        </div>

                                        <div className='emr'>
                                            <p>OCS</p>

                                            <div className='emr_content'>
                                                불어 주는 옷을 이것이다.
                                                실현에 품었기 끝까지 실로
                                                위하여서. 구하기 만천하의
                                                이는 그러므로 그들은 같이,
                                                쓸쓸한 것이다. 뭇 속에서
                                                그들의 가지에 약동하다.
                                                없으면 인생을 곳이 없는
                                                오아이스도 발휘하기 있으랴?
                                                봄바람을 뜨거운지라, 고동을
                                                설산에서 그들의 있는 청춘을
                                                곧 부패뿐이다. 청춘은 만물은
                                                하였으며, 갑 목숨을 열락의
                                                약동하다. 끝에 위하여 구하지
                                                위하여, 얼마나 하는 우리의
                                                현저하게 공자는 황금시대다.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};