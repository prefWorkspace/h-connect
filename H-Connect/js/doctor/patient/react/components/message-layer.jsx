const MessageLayer = () => {
    const data = ReactRedux.useSelector(state => state);
    const dispatch = ReactRedux.useDispatch();
    const nodeRef = React.useRef(null);
    const [draggable, setDraggable] = React.useState(true);
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        if (data.chat && data.roomId && !data.chat.subscribes[data.roomId]) {
            data.chat.addSubscribe(data.roomId, `/sub/chat/room/${data.roomId}`, (res) => {
                const chatMessage = JSON.parse(res.body);
                setMessages(prev => [...prev, chatMessage]);
                $('.chat_inner').scrollTop(function() {
                    return this.scrollHeight;
                });
            });
        }
    }, [data.chat, data.roomId]);

    React.useEffect(() => {
        (async () => {
            if (data.message) {
                const messageListFromRoom = await data.message.getMessageListFromRoom(data.roomId);
                const messageList = messageListFromRoom.messageList;
                if (messageList) {
                    setMessages(messageList);
                }
            }
        })();
    }, []);

    const resize = (event) => {
        event.preventDefault();

        const $layer = $('.nurse_view');

        if ($layer.hasClass('active')) {
            setDraggable(true);
            $layer.css({ transform: data.messagePosition });
        } else {
            setDraggable(false);
            dispatch({ type: 'setMessagePosition', data: $layer.css('transform') });
            $layer.css({ transform: 'translate(0px, 0px)' });
            $layer.find('.chat_container').show();
            $layer.find('.chat_window').show();
        }

        $layer.toggleClass('active');
    };

    const foldLayer = (event) => {
        event.preventDefault();
        $('.nurse_view .chat_container').toggle();
        $('.nurse_view .chat_window').toggle();
    };

    const closeLayer = (event) => {
        event.preventDefault();
        $('.nurse_view').hide();
    };

    const messageSend = (event) => {
        event.preventDefault();

        data.chat.send(`/pub/chat/message`, data.headers.chat, {
            type: 'MSG_TALK',
            room_id: data.roomId,
            message: $(event.target).prev().val(),
            parent_message_id: ''
        });

        $(event.target).prev().val('');
    };

    function textKeyUp(event) {
        const value = String($(this).val()).trim();

        if (value) {
            $(this).next().css({
                color: '#fff',
                backgroundColor: '#007A94'
            });
        } else {
            $(this).next().css({
                color: '#888',
                backgroundColor: '#ccc'
            });
        }
    }

    function textKeyDown(event) {
        if (event.ctrlKey && event.keyCode === 13) {
            $(this).val($(this).val() + '\n');
        }
        if (!event.ctrlKey && event.keyCode === 13) {
            $('.chat_window .btn_send').click();
            event.preventDefault();
            return false;
        }
    }

    return (
        <ReactDraggable nodeRef={nodeRef} handle='.title' disabled={!draggable} defaultPosition={{ x: 1050, y: 150 }}>
            <div ref={nodeRef} className='pop nurse_view'>
                <div className='wrap_inner'>
                    <div className='title'>
                        <div>
                            <p>강심장 교수님</p>

                            <div className='btn_list'>
                                <div className='btn_fold' onClick={foldLayer}>
                                    <img
                                        src='/H-Connect/img/icon/nurse/fold.svg'
                                        alt='접는 아이콘'
                                    />
                                </div>

                                <div className='btn_full' onClick={resize}>
                                    <img
                                        src='/H-Connect/img/icon/nurse/full.svg'
                                        alt='풀화면 아이콘'
                                    />
                                </div>

                                <div className='btn_close' onClick={closeLayer}>
                                    <img
                                        src='/H-Connect/img/icon/nurse/close.svg'
                                        alt='닫는 아이콘'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='search_container'>
                        <div>
                            <input
                                type='text'
                                placeholder='메세지 내용을 입력해주세요'
                            />

                            <button type='button' className='btn_search'>
                                <div>
                                    <img
                                        src='/H-Connect/img/header/search.svg'
                                        alt='검색표시'
                                    />
                                </div>
                            </button>
                        </div>

                        <div className='sort'>
                            <img
                                src='/H-Connect/img/icon/nurse/sorting.svg'
                                alt='정렬아이콘'
                            />
                        </div>

                        {/* 메세지 정렬 팝업 */}
                        <div className='pop chat_sort'>
                            <div className='wrap_inner'>
                                <p>전체 메세지 보기</p>
                                <p>진료 중 메세지 보기</p>
                                <p>진료 제외 메세지 보기</p>
                            </div>
                        </div>
                    </div>

                    <div className='chat_container'>
                        <div className='chat_inner'>
                            {messages.map(item => {
                                let html = null;

                                switch (item.type) {
                                    case 'MSG_ENTER':
                                        html = <Enter chat={item} />;
                                        break;
                                    case 'MSG_QUIT':
                                        html = <Quit chat={item} />;
                                        break;
                                    case 'MSG_TALK':
                                        html = <Talk chat={item} />;
                                        break;
                                    case 'MSG_NOTI':
                                        html = <Notification chat={item} />;
                                        break;
                                    case 'MSG_FILE':
                                        break;
                                    case 'MSG_READ':
                                        break;
                                    case 'MSG_DELETE':
                                        break;
                                    case 'MSG_PARENT_DELETE':
                                        break;
                                    case 'MSG_ROOM_DELETE':
                                        break;
                                }

                                return html;
                            })}
                        </div>
                    </div>

                    <div className='chat_window'>
                        <textarea placeholder='메세지 입력' onKeyUp={textKeyUp} onKeyDown={textKeyDown}></textarea>
                        <button type='button' className='btn_send' onClick={messageSend}>전송</button>
                    </div>
                </div>
            </div>
        </ReactDraggable>
    );
};
