const ConnectContent = () => {

    const api = new ApiDelegate();
    const dispatch = ReactRedux.useDispatch();
    const data = ReactRedux.useSelector(state => state);
    const [video, setVideo] = React.useState(null);
    const [messages, setMessages] = React.useState([]);
    const [layerCSS, setLayerCSS] = React.useState('default');


    React.useEffect(async () => {

        if (data.complete) {

            let roomId = data.roomId;
            let chatId = data.chatId;

            // 화상방 생성
            if (data.currentCase && !roomId) {
                const room = await api.post('/API/Room/CreateRoom', {
                    requester: data.user.userCode, creatorId: data.user.id
                });
                roomId = room.roomId;

                await api.post('/API/Doctor/UpdateVroomId', {
                    requester: data.user.userCode,
                    userId: data.user.id,
                    organizationCode: data.user.organizationCode,
                    consultId: data.consultId,
                    caseOrderNo: data.currentCase.orderNo,
                    roomId: roomId,
                    password: ''
                });
            }
            dispatch({ type: 'setRoomId', data: roomId });

            // 채팅방 생성
            if (data.currentCase && !chatId) {
                const chat = await api.post('/API/Message/ConsultCreateRoom', {
                    requester: data.user.userCode,
                    userId: data.user.id,
                    organizationCode: data.user.organizationCode,
                    roomName: `${data.currentCase.caseTitle} 채팅방`,
                    description: `${data.currentCase.caseTitle} 채팅방`,
                    participantsInfoList: data.attendee.map(item => ({
                        userId: item.doctorId, userName: item.doctorName
                    })),
                    consultId: data.consultId,
                    orderNo: data.currentCase.orderNo,
                    grantType: data.message.grantType,
                    accessKey: data.message.accessToken
                });
                chatId = chat?.messageStruct?.roomId;
            }
            dispatch({ type: 'setChatId', data: chatId });

            // 화상 연결 및 화면 연동
            setVideo(new CustomJanus(roomId, data.user.name, {
                join: () => {
                    $('.cam_inner').empty().append(`<div id='local-video'><p class='name'>${data.user.name}</p></div>`);
                    $('#local-video').empty().append('<video class="rounded centered" id="local-stream" width="100%" height="100%" autoplay playsinline muted="muted" />');

                    return 'local-stream';
                }, noWebcam: () => {
                    $('#local-video').empty().append(`<div style='background: black; display: flex; justify-content: center; align-items: center;'><img src='/H-Connect/img/emergency/profile.svg' alt='프로필 아이콘' style='width:100px; height:100px;'></div><p class='name'>${data.user.name}</p><video class='rounded centered' id='local-stream' width='100%' height='100%' autoplay playsinline muted='muted' style='display: none'/>`);
                }, cleanUp: () => {

                }, events: {
                    unpublished: (index) => {
                        // $(`#remote-video-${index}`).empty().append(`Unpublished<p class='name'>${name}</p>`);
                        $(`#remote-video-${index}`).remove();
                    }, leaving: (index) => {
                        $(`#remote-video-${index}`).remove();
                    }
                }
            }, {
                join: (index, name) => {
                    if ($(`.cam_inner > #remote-video-${index}`).length === 0) {
                        $('.cam_inner').append(`<div id='remote-video-${index}'><p class='name'>${name ?? ''}</p></div>`);
                        $(`#remote-video-${index}`).append(`<video class='rounded centered' id='remote-stream-${index}' width='100%' height='100%' autoplay playsinline />`);
                    }

                    return `remote-stream-${index}`;
                }, noWebcam: (index, name) => {
                    $(`#remote-video-${index}`).empty().append(`<div style='background: black; display: flex; justify-content: center; align-items: center;'><img src='/H-Connect/img/emergency/profile.svg' alt='프로필 아이콘' style='width:100px; height:100px;'></div><p class='name'>${name ?? ''}</p><video class='rounded centered' id='remote-stream-${index}' width='100%' height='100%' autoplay playsinline style='display: none'/>`);
                }, cleanUp: (index) => {
                    $(`#remote-video-${index}`).remove();
                }
            }));

            // 채팅 메시지
            setMessages((await data.message?.getMessageListFromRoom(roomId))?.messageList);

            // 채팅 구독
            data.chat?.addSubscribe('chat', `/sub/chat/room/${roomId}`, async (res) => {
                setMessages((await data.message?.getMessageListFromRoom(roomId))?.messageList);
            });

            // 환자 정보 세팅
            if (data.currentCase) {
                dispatch({
                    type: 'setPatient', data: {
                        id: data.currentCase.patientId,
                        name: data.currentCase.patientName,
                        age: data.currentCase.patientAge,
                        condition: data.currentCase.patientCondition,
                        gender: data.currentCase.patientGender,
                        ward: data.currentCase.patientWard,
                        wardRoom: data.currentCase.patientWardRoom,
                        measurementCode: data.currentCase.measurementCode
                    }
                });
            }

            $(function() {
                $('.tabs > .link').click(function() {
                    const layer = $(this).data('layer');
                    viewTab(this, layer);
                });

                // 접기 버튼 토글
                $('.several > div > .title > .btn_list > .btn_fold').click(function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    const $target = $(this).parent().parent().parent();
                    $target.toggleClass('fold');
                    $target.find('.cont').toggle();
                });

                // 창 사이즈 버튼 토글
                $('.several > div > .title > .btn_list > .btn_full').click(function(event) {
                    event.preventDefault();
                    const $layer = $(this).parent().parent().parent();
                    $layer.css({
                        height: '100%', width: '100%', left: 0, top: 0
                    });
                });

                // 창 닫기버튼
                $('.several > div > .title > .btn_list > .btn_close').click(function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    const $layer = $(this).parent().parent().parent();
                    const target = getTargetFromClass($layer.attr('class'));
                    $layer.hide();
                    $(`.section > .title > .btn_list > button.btn_${target}`).addClass('layer-close');
                });

                // 상단 섹션 버튼
                $('.section > .title > .btn_list > button').click(function(event) {
                    event.preventDefault();
                    const menu = getTargetFromClass($(this).attr('class'));
                    menuFocus(menu);
                });

                // 클릭시 창 앞으로
                $('.several > div').click(function(event) {
                    const menu = getTargetFromClass($(this).attr('class'));
                    menuFocus(menu);
                }).each(function(index) {
                    const count = $('.several > div').length + 10;
                    $(this).css({ zIndex: count - (index + 1) });
                });

                // 메뉴 연동
                const menuFocus = (target) => {
                    const $layers = $('.several > div');
                    const count = $layers.length + 10;
                    const $target = $(`.several > div.${target}`);
                    $layers.each(function() {
                        const $self = $(this);
                        const index = $self.css('z-index') * 1;
                        if (index > $target.css('z-index') * 1) {
                            $self.css({ zIndex: index - 1 });
                        }
                    });
                    $target.show().css({ zIndex: count - 1 }).find('.cont').show();
                    $(`.section > .title > .btn_list > button`).parent().find('button').removeClass('on');
                    $(`.section > .title > .btn_list > button.btn_${target}`).removeClass('layer-close').addClass('on');
                };

                // 참석자 팝업
                $('.btn_attendee').click(function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $('.pop.attendee').fadeIn();
                });
                $('body').click(function() {
                    $('.pop.attendee').fadeOut();
                });

                // 채팅 메시지 보내기
                const chatHeaders = {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `${data.message?.grantType} ${data.message?.accessToken}`
                };
                $('.input_message > .btn_send').click(function(event) {
                    event.preventDefault();
                    data.chat?.send(`/pub/chat/message`, chatHeaders, {
                        type: 'MSG_TALK', room_id: roomId, message: $(this).prev().val(), parent_message_id: ''
                    });
                    $(this).prev().val('').focus();
                });
                $('.input_message > textarea').keydown(function(event) {
                    if (event.ctrlKey && event.keyCode === 13) {
                        $(this).val($(this).val() + '\n');
                    } else if (!event.ctrlKey && event.keyCode === 13) {
                        $(this).next().click();
                        event.preventDefault();
                        return false;
                    }
                });

                // 메시지 삭제
                $('.chat').on('click', '.message-delete', async function(event) {
                    event.preventDefault();
                    const id = $(this).data('id');
                    await data.message.deleteMessage(id);
                });
            });


        }
    }, [data.complete]);

    React.useEffect(() => {
        $('.chat .data_inner').scrollTop(function() {
            return this.scrollHeight;
        });
    });

    React.useEffect(() => {
        if (video) video.init();
    }, [video]);

    const viewTab = (target, layer) => {
        const $target = $(target);
        const $layers = $('.several > div');
        const $buttons = $('.several > div > .title > .btn_list');

        $target.siblings().removeClass('active');
        $target.addClass('active');
        $('.remote_connect').removeClass(['default', 'tab', 'scroll']).addClass(layer);

        switch (layer) {
            case 'default':
                $layers.removeClass('section');
                $buttons.show();
                $buttons.find('button').show();
                break;
            case 'tab':
                $layers.addClass('section');
                $buttons.hide();
                $buttons.find('button').show();
                break;
            case 'scroll':
                $layers.removeClass('section');
                $buttons.show();
                $buttons.find('button').hide();
                $buttons.find('button:last-child').show();
                break;
        }
        dispatch({ type: 'setViewType', data: layer });
    };

    const getTargetFromClass = (classes) => {
        return String(classes)
            .replace('react-draggable', '')
            .replace('react-draggable-dragged', '')
            .replace('layer-close', '')
            .replace('section', '')
            .replace('inner', '')
            .replace('btn_', '')
            .replace(' on', '')
            .trim();
    };

    return (
        <div id='wrap_content' className={`remote remote_connect default`}>
            <div className='wrap_inner'>

                <ConnectMessage video={video} messages={messages} />
                <ConnectVideoScreen />

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
                            <button type='button' className='btn_ocs'>
                                OCS 조회
                            </button>
                        </div>

                        <div className='view_list'>
                            <p>View</p>

                            <div>
                                {/* 탭메뉴 */}
                                <ul className='tabs'>
                                    <li className='link active' data-layer='default'>
                                        <img src='/H-Connect/img/emergency/several.svg' alt='여러개 탭의 아이콘' />
                                    </li>
                                    <li className='link' data-layer='tab'>
                                        <img src='/H-Connect/img/emergency/tab.svg' alt='탭 아이콘' />
                                    </li>
                                    <li className='link' data-layer='scroll'>
                                        <img src='/H-Connect/img/emergency/scroll.svg' alt='스크롤되는 탭 아이콘' />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* several */}
                    <div className={`several ${layerCSS === 'tab' && 'section'}`}>
                        {/* vital */}
                        <MonitoringLayer socket={data.socket} />

                        {/* pacs */}
                        <PACSLayer />

                        {/* lab */}
                        <LabLayer />

                        {/* emr */}
                        <EMRLayer />

                        {/* ocs */}
                        <OCSLayer />

                    </div>
                </section>
            </div>
        </div>
    );
};
