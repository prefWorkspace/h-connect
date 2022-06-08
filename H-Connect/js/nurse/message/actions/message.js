'use strict';
const { commonRequest, request_Date_Data } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
    );

const { serverController, ip, sockeIp } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
    );

const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
    );

const { sessionController } = await import(
    importVersion('/H-Connect/js/utils/controller/sessionController.js')
    );

const { MessageDelegate } = await import(
    importVersion('/H-Connect/js/message/messageDelegate.js')
    );

const { CustomSocket } = await import(
    importVersion('/H-Connect/js/lib/socket/custom/customSocket.js')
    );

const userData = JSON.parse(localStorageController.getLocalS('userData'));
const { userCode: requester, organization: organizationCode } = userData;
const LOGIN_TOKEN = sessionController.getSession('accesToken');
const USER_CODE = localStorageController.getLocalS('userCode');

//모든 측정 데이터 리스트 select API
export async function selectMeasurementInfoList(
    wardCode = null,
    sickRoomCode = null,
    sickBedCode = null,
    search
) {
    const req = JSON.stringify({
        ...commonRequest(),
        wardCode,
        sickRoomCode,
        sickBedCode,
        includeDeviceStatus: true,
        measurementType: 'BM',
        measurementStatusList: [2],
        search
    });

    return serverController.ajaxAwaitController(
        'API/Measurement/SelectMeasurementInfoList',
        'POST',
        req,
        (res) => {
            if (res.result) {
            }
        },
        (err) => {
            console.log(err);
        }
    );
}

const { measurementInfoSimpleList } = await selectMeasurementInfoList();
const message = new MessageDelegate();

$(async function() {

    let chatLoginResult = null;
    try {
        chatLoginResult = await message.login('prefinc_chat1', 1234);
    } catch (e) {

    }

    // console.log(userData);
    console.log(chatLoginResult);
    // message.findUser('prefinc_chat2');
    // message.updateUser('test111');
    // console.log(message.getRoomList());
    // message.createRoom('채팅방', 'test chat room', ['prefinc_chat1']);
    // message.updateRoom('5ed4bb94-678e-4e80-9c46-53e0fe0f2281', '업데이트 채팅방', 'update test chat room');
    // message.getRoomUserList('5ed4bb94-678e-4e80-9c46-53e0fe0f2281');
    // message.inviteUserToRoom('5ed4bb94-678e-4e80-9c46-53e0fe0f2281', 'prefinc_chat2');
    // message.leaveUserFromRoom('5ed4bb94-678e-4e80-9c46-53e0fe0f2281');
    // console.log(message.getMessageListFromRoom('5ed4bb94-678e-4e80-9c46-53e0fe0f2281'));
    // message.reissue();
    // message.logout();

    $('.message .no_message .chat_container>div').show();

    let roomList = null;
    try {
        roomList = await message.getRoomList();
    } catch (e) {

    }

    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${message.grantType} ${message.accessToken}`
    };
    // 소켓 통신
    window.chatClient = new CustomSocket('https://chat-api.seers-visual-system.link/seers');
    window.chatClient.connect(headers, async function() {
        const $target = $('.message.talk_list');
        const $noTalk = $('.no_talk');
        let html = '';

        $('.message .no_message .talk_list').show();
        $noTalk.remove();

        if (roomList?.roomList.length) {
            let roomHtml = await Promise.all(roomList?.roomList.map(async room => await getRoomHtml(room)));
            html = roomHtml.join('');
        } else {
            html = '<div class="no_talk">메세지 함이 비어있습니다.</div>';
        }

        $target.empty().append(html);

    }, function(error) {
        console.log('error');
        console.log(error);
    }, function(close) {
        console.log('close');
        console.log(close);
    });

    $('.message.talk_list').on('click', '.list.off', async function() {
        const id = $(this).data('id');
        const $target = $('.chat_inner');
        const messageListFromRoom = await message.getMessageListFromRoom(id);
        const messages = messageListFromRoom.messageList;
        let html = '';

        console.log(id);

        $(this).parent().find('.list').removeClass('on').addClass('off');
        $(this).removeClass('off').addClass('on');

        $target.data('id', id);
        messages.map(chat => html += getMessageHtml(chat));
        await removeSubscribeAllChatRoom();
        subscribeChatRoom(id);
        $target.parent().next().find('textarea').prop('disabled', false).val('');

        $target.empty().append(html).scrollTop(function() {
            return this.scrollHeight;
        });
    });

    $('.chat_window .btn_send').click(function() {
        const id = $('.message.talk_list').find('.list.on').data('id');
        const { Authorization } = headers;
        chatClient.send(`/put/chat/message`, { Authorization }, {
            type: 'MSG_TALK',
            room_id: id,
            message: $(this).prev().val()
        });
        $(this).prev().val('').keyup();
        $('.chat_window textarea').focus();
    });

    $('.chat_window textarea').keyup(function() {
        const value = $(this).val().trim();

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
    });

    // 채팅방 생성
    $('.send_message .btn_send').click(async function() {
        const $target = $('.message .talk_list');
        const text = $(this).parent().parent().find('textarea').val();
        if (text) {
            if (!message.userId) {
                const req = JSON.stringify({
                    ...commonRequest(),
                    userId: userData.id,
                    roomName: `${userData.name}의 채팅방`,
                    description: `${userData.name}의 채팅방 설명`,
                    participantsInfoList: [
                        // { userId: 'userId', userName: 'userName' }
                    ],
                    grantType: 'Bearer',
                    accessKey: LOGIN_TOKEN
                });
                await serverController.ajaxAwaitController(
                    'API/Message/StaffCreateRoom',
                    'POST',
                    req,
                    (res) => {
                        if (res.result) {
                        }
                    },
                    (err) => {
                        console.log(err);
                    }
                );
                message.login(userData.id, 1234);
            }
            // 여기에서 초대 사용자 추가
            const room = await message.createRoom('채팅방', '채팅방 설명', []);
            chatClient.send(`/put/chat/message`, headers, {
                type: 'MSG_TALK',
                room_id: room?.room_id,
                message: text
            });
            $target.prepend(await getRoomHtml(room));
            $target.find('.list').eq(0).click();
        }
    });
});

const subscribeChatRoom = (room_id) => {
    window.chatClient.addSubscribe(room_id, `/sub/chat/room/${room_id}`, (res) => {
        const data = JSON.parse(res.body);
        const html = getMessageHtml({ ...data, user_id: message.userId, created_time: new Date() });
        const $target = $('.chat_inner');
        $target.append(html).scrollTop(function() {
            return this.scrollHeight;
        });
    });
};

const removeSubscribeAllChatRoom = async () => {
    const rooms = await message.getRoomList();
    rooms?.roomList.map(room => window.chatClient.removeSubscribe(room.room_id));
};

const getRoomHtml = async (room) => {
    const messageListFromRoom = await message.getMessageListFromRoom(room.room_id);
    const messages = messageListFromRoom.messageList;
    let read = false, date = '', time = '', text = '', name = '';

    if (messages.length) {
        const lastMessage = messages[messages.length - 1];
        const createdAt = MessageDelegate.getDateFromTimestamp(String(lastMessage.created_time).substring(0, 10));

        read = messages.unread_user_id_list?.includes(message.userId) ? 1 : 0;
        date = `${createdAt.shortYear}.${createdAt.month}.${createdAt.days}`;
        time = `${createdAt.hours}:${createdAt.minutes}:${createdAt.seconds}`;
        text = lastMessage.message ?? '';
        name = lastMessage?.user_info?.user_nickname ?? '';

    } else {
        text = '메시지가 없습니다.';
    }

    return `
        <div class='list off' data-id='${room.room_id}'>
            <div class='message_info'>
                <!-- 메세지가 오면 보이게 해주세요 -->
                <div class='message_bell'>
                    <img src='/H-Connect/img/emergency/message/circle.svg' alt='동그라미 아이콘' style='opacity: ${read}'>
                </div>

                <div class='message talk_time'>
                    <p>
                        <span>${date}</span>
                    </p>
                    &nbsp;
                    <p>
                        <span>${time}</span>
                    </p>
                </div>

                <div class='message talk_name'>
                    <p>${name}</p>
                </div>
            </div>

            <div class='preview'>
                <p>${text}</p>
            </div>
        </div>
    `;
};

const getMessageHtml = (chat) => {
    let html = '';
    const date = MessageDelegate.getDateFromTimestamp(chat.created_time);

    switch (chat.type) {
        case 'MSG_ENTER':
            html = `<div style='text-align: center; color: gray; font-size: 12px;'>${chat.user_info.user_nickname}님이 입장하셨습니다.</div>`;
            break;
        case 'MSG_QUIT':
            html = `<div>${chat.user_info.user_nickname}님이 퇴장하셨습니다.</div>`;
            break;
        case 'MSG_TALK':
            if (message.userId === chat.user_id) {
                html = `<div class='chat_me' id='fifth_taget'>
                            <div>
                                <div class='bubble'>
                                    <p>${chat.message}</p>
                                </div>

                                <small>
                                    <span>${date.shortYear}.${date.month}.${date.days}</span>

                                    <span>${date.hours}:${date.minutes}:${date.seconds}</span>
                                </small>
                            </div>
                        </div>`;
            } else {
                html = `<div class='chat_you' id='fifth_taget'>
                            <div>
                                <div class='bubble'>
                                    <p>${chat.message}</p>
                                </div>

                                <small>
                                    <span>${date.shortYear}.${date.month}.${date.days}</span>

                                    <span>${date.hours}:${date.minutes}:${date.seconds}</span>
                                </small>
                            </div>
                        </div>`;
            }
            break;
        case 'MSG_NOTI':
            switch (chat.ntype) {
                case 'NOTI_START_SECTION':
                    html = `<div class='start_clinic' id='fourth_taget'>
                                <p>${chat.user_info.user_nickname}님. 진료가 시작되었습니다.</p>
                                <p>
                                    <span>${date.shortYear}.${date.month}.${date.days}</span>

                                    <span>${date.hours}:${date.minutes}:${date.seconds}</span>
                                </p>
                            </div>`;
                    break;
                case 'NOTI_END_SECTION':
                    html = `<div class='end_clinic' id='third_taget'>
                                <p>${chat.user_info.user_nickname}님. 진료가 종료되었습니다.</p>
                                <p>
                                    <span>${date.shortYear}.${date.month}.${date.days}</span>

                                    <span>${date.hours}:${date.minutes}:${date.seconds}</span>
                                </p>
                            </div>`;
                    break;
                case 'NOTI_PLAIN_MESSAGE':
                    break;
            }
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
};

let passingParameter = {
    'SX-Auth-Token': LOGIN_TOKEN,
    deviceKind: 3,
    apiRoute: 'GWS-1',
    requester,
    requestDateTime: request_Date_Data()
};
// `${ip}ws?SX-API-Route=${'GWS-1'}&clientKeyName=${'bioSignalData'}&connType=${1}`

let streamming = new SockJS(`${ip}ws`);
let stompClient = Stomp.over(streamming);

function callBack(frame) {
    const data = frame.headers;
    for (let i = 0; i < measurementInfoSimpleList.length; i++) {
        stompClient.subscribe(
            // `/topic/public/bioSignalData/SEERS_2204061650_ZF04`,
            `/topic/public/bioSignalData/${measurementInfoSimpleList[i].measurementCode}`,
            function(data) {
                const { body } = data;
                const aaa = JSON.parse(body);
                console.log('aaa===');
                console.log(aaa);
            },
            (err) => {
                console.log(err);
            }
        );
    }
}

function connectonError(err) {
    console.log(err);
}

// stompClient.connect(passingParameter, callBack, connectonError);
