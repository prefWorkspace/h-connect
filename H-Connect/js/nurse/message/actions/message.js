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

$(function() {

    /*
    Janus.init({
        debug: 'all',
        callback: function() {
            // Done!
            // Create session
            let janus = new Janus(
                {
                    server: 'https://webrtc.activeobject.io',
                    // iceServers: iceServers,
                    // Should the Janus API require authentication, you can specify either the API secret or user token here too
                    //		token: "mytoken",
                    //	or
                    //		apisecret: "serversecret",
                    success: function() {
                        // Attach to VideoRoom plugin
                        janus.attach(
                            {
                                plugin: 'janus.plugin.videoroom',
                                // opaqueId: opaqueId,
                                success: function(pluginHandle) {
                                    console.log('Success');
                                },
                                error: function(error) {
                                    Janus.error('  -- Error attaching plugin...', error);
                                },
                                consentDialog: function(on) {
                                    Janus.debug('Consent dialog should be ' + (on ? 'on' : 'off') + ' now');
                                },
                                iceState: function(state) {
                                    Janus.log('ICE state changed to ' + state);
                                },
                                mediaState: function(medium, on, mid) {
                                    Janus.log('Janus ' + (on ? 'started' : 'stopped') + ' receiving our ' + medium + ' (mid=' + mid + ')');
                                },
                                webrtcState: function(on) {
                                    Janus.log('Janus says our WebRTC PeerConnection is ' + (on ? 'up' : 'down') + ' now');
                                },
                                slowLink: function(uplink, lost, mid) {
                                    Janus.warn('Janus reports problems ' + (uplink ? 'sending' : 'receiving') + ' packets on mid ' + mid + ' (' + lost + ' lost packets)');
                                },
                                onmessage: function(msg, jsep) {
                                    Janus.debug(' ::: Got a message (publisher) :::', msg);
                                    const event = msg['videoroom'];
                                    Janus.debug('Event: ' + event);
                                    if (event) {
                                        if (event === 'joined') {
                                            Janus.log('Successfully joined room ' + msg['room'] + ' with ID ' + myid);
                                        } else if (event === 'destroyed') {
                                            Janus.warn('The room has been destroyed!');
                                        } else if (event === 'event') {
                                            if (msg['streams']) {
                                                let streams = msg['streams'];
                                            } else if (msg['publishers']) {
                                                const list = msg['publishers'];
                                                Janus.debug('Got a list of available publishers/feeds:', list);
                                                for (let f in list) {
                                                    if (list[f]['dummy'])
                                                        continue;
                                                    let id = list[f]['id'];
                                                    let display = list[f]['display'];
                                                    let streams = list[f]['streams'];
                                                    for (let i in streams) {
                                                        let stream = streams[i];
                                                        stream['id'] = id;
                                                        stream['display'] = display;
                                                    }
                                                    Janus.debug('  >> [' + id + '] ' + display + ':', streams);
                                                }
                                            } else if (msg['leaving']) {
                                                let leaving = msg['leaving'];
                                                Janus.log('Publisher left: ' + leaving);
                                                let remoteFeed = null;
                                                for (let i = 1; i < 6; i++) {
                                                }
                                            } else if (msg['unpublished']) {
                                                let unpublished = msg['unpublished'];
                                                Janus.log('Publisher left: ' + unpublished);
                                                if (unpublished === 'ok') {
                                                    return;
                                                }
                                            } else if (msg['error']) {
                                                if (msg['error_code'] === 426) {
                                                    alert(
                                                        '<p>Apparently room <code>' + myroom + '</code> (the one this demo uses as a test room) ' +
                                                        'does not exist...</p><p>Do you have an updated <code>janus.plugin.videoroom.jcfg</code> ' +
                                                        'configuration file? If not, make sure you copy the details of room <code>' + myroom + '</code> ' +
                                                        'from that sample in your current configuration file, then restart Janus and try again.'
                                                    );
                                                } else {
                                                    alert(msg['error']);
                                                }
                                            }
                                        }
                                    }
                                    if (jsep) {
                                        Janus.debug('Handling SDP as well...', jsep);
                                    }
                                },
                                onlocaltrack: function(track, on) {
                                    Janus.debug('Local track ' + (on ? 'added' : 'removed') + ':', track);
                                    let trackId = track.id.replace(/[{}]/g, '');
                                    if (!on) {
                                        return;
                                    }
                                },
                                onremotetrack: function(track, mid, on) {
                                    // The publisher stream is sendonly, we don't expect anything here
                                },
                                oncleanup: function() {
                                    Janus.log(' ::: Got a cleanup notification: we are unpublished now :::');
                                }
                            });
                    },
                    error: function(error) {
                        Janus.error(error);
                        alert(error);
                    },
                    destroyed: function() {
                        window.location.reload();
                    }
                });
        }
    });
     */


    message.login('prefinc_chat1', 1234);
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

    const roomList = message.getRoomList();
    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${message.grantType} ${message.accessToken}`
    };
    // 소켓 통신
    window.chatClient = new CustomSocket('https://chat-api.seers-visual-system.link/seers');
    window.chatClient.connect(headers, function() {
        const $target = $('.message.talk_list');
        const $noTalk = $('.no_talk');
        let html = '';

        $('.message .no_message .talk_list').show();
        $noTalk.remove();

        if (roomList?.roomList.length) {
            roomList?.roomList.map(room => html += getRoomHtml(room));
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

    $('.message.talk_list').on('click', '.list.off', function() {
        const id = $(this).data('id');
        const $target = $('.chat_inner');
        const messageListFromRoom = message.getMessageListFromRoom(id);
        const messages = messageListFromRoom.messageList;
        let html = '';

        $(this).parent().find('.list').removeClass('on').addClass('off');
        $(this).removeClass('off').addClass('on');

        $target.data('id', id);
        messages.map(chat => html += getMessageHtml(chat));
        removeSubscribeAllChatRoom();
        subscribeChatRoom(id);
        $target.parent().next().find('textarea').prop('disabled', false).val('');

        $target.empty().append(html);
    });

    $('.chat_window .btn_send').click(function() {
        const id = $('.message.talk_list').find('.list.on').data('id');
        chatClient.send(`/sub/chat/room/${id}`, headers, {
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

    $('#file').change(function() {
        message.uploadFileToRoom('5ed4bb94-678e-4e80-9c46-53e0fe0f2281', 'prefinc_chat1', 'file');
    });
});

const subscribeChatRoom = (room_id) => {
    window.chatClient.addSubscribe(room_id, `/sub/chat/room/${room_id}`, (res) => {
        console.log(res);
    });
};

const removeSubscribeAllChatRoom = () => {
    const rooms = message.getRoomList();
    rooms?.roomList.map(room => window.chatClient.removeSubscribe(room.room_id));
};

const getRoomHtml = (room) => {
    const messageListFromRoom = message.getMessageListFromRoom(room.room_id);
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
    const date = MessageDelegate.getDateFromTimestamp(String(chat.created_time).substring(0, 10));

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
