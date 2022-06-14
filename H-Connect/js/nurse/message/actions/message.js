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
        chatLoginResult = await message.login(userData.id, 1234);
    } catch (e) {

    }

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

            roomList?.roomList.map(room => subscribeChatRoom(room.room_id));
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
        const unreadMessages = messages.filter(message => message.unread_user_id_list?.includes(userData.id));
        let html = '';

        await message.multipleMarkAsRead(id, unreadMessages.map(message => message.message_id));
        $(this).find('.message_bell > img').css({ opacity: 0 });

        $(this).parent().find('.list').removeClass('on').addClass('off');
        $(this).removeClass('off').addClass('on');

        $target.data('id', id);
        messages.map(chat => html += getMessageHtml(chat));
        $target.parent().next().find('textarea').prop('disabled', false).val('');

        $target.empty().append(html).scrollTop(function() {
            return this.scrollHeight;
        });
    });

    $('.chat_window .btn_send').click(function() {
        const id = $('.message.talk_list').find('.list.on').data('id');
        chatClient.send(`/pub/chat/message`, headers, {
            type: 'MSG_TALK',
            room_id: id,
            message: $(this).prev().val(),
            parent_message_id: ''
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
        const participantsInfoList = [];
        let createdRoom = null;
        $('.doctor_list [name="doctor"]:checkbox:checked').each(function() {
            const $doctor = $(this).parent().parent();
            participantsInfoList.push({ userId: $doctor.data('userId'), userName: $doctor.data('userName') });
        });

        if (!text) {
            alert('메시지를 입력하세요.');
            return false;
        }

        if (!message.userId) {
            const req = JSON.stringify({
                ...commonRequest(),
                userId: userData.id,
                roomName: `${userData.name}의 채팅방`,
                description: `${userData.name}의 채팅방 설명`,
                participantsInfoList,
                grantType: 'Bearer',
                accessKey: LOGIN_TOKEN
            });
            createdRoom = await serverController.ajaxAwaitController(
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
        } else {
            // 여기에서 초대 사용자 추가
            createdRoom = await message.createRoom('채팅방', '채팅방 설명', participantsInfoList.map(user => user.userId));
            subscribeChatRoom(createdRoom.room_id);
            chatClient.send(`/pub/chat/message`, headers, {
                type: 'MSG_TALK',
                room_id: createdRoom.room_id,
                message: text,
                parent_message_id: ''
            });
        }

        const roomList = await message.getRoomList();
        const room = roomList?.roomList.find(item => item.room_id === createdRoom.room_id);

        $target.append(await getRoomHtml(room));
        $target.scrollTop(function() {
            return this.scrollHeight;
        });
        $target.find('.list:last-child').eq(0).click();
    });
});

const subscribeChatRoom = (roomId) => {
    window.chatClient.addSubscribe(roomId, `/sub/chat/room/${roomId}`, (res) => {
        const data = JSON.parse(res.body);
        const $target = $('.chat_inner');
        const $room = $(`.list[data-id="${roomId}"]`);
        const messageDate = MessageDelegate.getDateFromTimestamp(String(data.created_time).substring(0, 10)) ?? '';
        const name = data.user_info?.user_nickname ?? '';
        const date = `${messageDate.shortYear}.${messageDate.month}.${messageDate.days}`;
        const time = `${messageDate.hours}:${messageDate.minutes}:${messageDate.seconds}`;
        const text = data.message ?? data.file_original_name;

        $room.find('.talk_time > p:first-child').text(date);
        $room.find('.talk_time > p:last-child').text(time);
        $room.find('.talk_name > p').text(name);
        $room.find('.preview > p').text(text);

        console.log(data, userData.id, data.user_id, $room.hasClass('off'));
        if (userData.id !== data.user_info?.user_id && $room.hasClass('off')) {
            $room.find('.message_bell > img').css({ opacity: 1 });
        }

        if ($target.data('id') === roomId) {
            const html = getMessageHtml(data);
            $target.append(html).scrollTop(function() {
                return this.scrollHeight;
            });
        }
    });
};

const removeSubscribeAllChatRoom = async () => {
    const rooms = await message.getRoomList();
    rooms?.roomList.map(room => window.chatClient.removeSubscribe(room.room_id));
};

const getRoomHtml = async (room) => {
    let date = '', time = '', text = '', name = '';
    const lastMessage = room.room_last_message;
    const createdAt = lastMessage ? MessageDelegate.getDateFromTimestamp(String(lastMessage.created_time).substring(0, 10)) : '';
    const read = room.room_unread_count > 0 ? 1 : 0;

    if (lastMessage) {
        date = `${createdAt.shortYear}.${createdAt.month}.${createdAt.days}`;
        time = `${createdAt.hours}:${createdAt.minutes}:${createdAt.seconds}`;
        text = lastMessage.message ?? lastMessage.file_original_name;
        name = lastMessage?.user_info?.user_nickname ?? '';

        if (!text) {
            switch (lastMessage.type) {
                case 'MSG_ENTER':
                    text = `${name}님이 입장하셨습니다.`;
                    break;
                case 'MSG_QUIT':
                    text = `${name}님이 퇴장하셨습니다.`;
                    break;
            }
        }
    } else {
        text = '';
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
            html = `<div style='text-align: center; color: gray; font-size: 12px;'>${chat.user_info.user_nickname}님이 퇴장하셨습니다.</div>`;
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
