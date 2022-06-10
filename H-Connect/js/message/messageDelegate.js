export class MessageDelegate {
    /**
     * API 서버 주소.
     * @type {string}
     */
    endpoint = 'https://chat-api.seers-visual-system.link';

    /**
     * 디버그
     * @type {boolean}
     */
    debug = true;

    /**
     * access_token과 연계하여, Authorization Header를 만들때 사용
     * @type {string}
     */
    grantType = '';
    /**
     * grant_type과 연계하여, Authorization Header를 만들때 사용
     * @type {string}
     */
    accessToken = '';
    /**
     * access_token이 만료되었을 때, access_token을 재발급 받기 위해 사용
     * @type {string}
     */
    refreshToken = '';
    /**
     * refresh_token의 유효기간을 의미 현재 설정은 10일
     * @type {string}
     */
    refreshTokenExpirationTime = '';
    /**
     * 사용자 아이디
     * @type {string}
     */
    userId = '';
    /**
     * 사용자 닉네임
     * @type {string}
     */
    userNickname = '';
    /**
     * 사용자 권한
     * @type {string}
     */
    userRole = '';

    /**
     * 생성자
     * @param {string} endpoint API 주소
     */
    constructor(endpoint = '') {
        if (endpoint) this.endpoint = endpoint;
    }

    /**
     * 사용자 로그인
     * @param {string} username
     * @param {string} password
     */
    async login(username, password) {
        return await this._post('/user/login', { user_id: username, user_password: password }, (res) => {
            this.grantType = res.grant_type;
            this.accessToken = res.access_token;
            this.refreshToken = res.refresh_token;
            this.refreshTokenExpirationTime = res.refresh_token_expiration_time;
            this.userId = res.user_id;
            this.userNickname = res.user_nickname;
            this.userRole = res.user_role;
        });
    }

    /**
     * 사용자 로그아웃
     */
    async logout() {
        return await this._post('/user/logout', {
            access_token: this.accessToken,
            refresh_token: this.refreshToken
        }, (res) => {
            this.log(res);
        });
    }

    /**
     * 토큰 리프레쉬
     */
    async reissue() {
        return await this._post('/user/reissue', {
            access_token: this.accessToken,
            refresh_token: this.refreshToken
        }, (res) => {
            this.accessToken = res.access_token;
            this.refreshToken = res.refresh_token;
        });
    }

    /**
     * 사용자 정보 얻기
     * @param {string} username
     */
    async findUser(username) {
        return await this._get(`/user/${username}`, (res) => {
            this.log(res);
        });
    }

    /**
     * 닉네임 변경
     * @param {string} nickname
     */
    async updateUser(nickname) {
        return await this._post('/user/update', { user_nickname: nickname }, (res) => {
            this.log(res);
        });
    }

    /**
     * 채팅방 리스트
     * @param {number} page 현재페이지
     * @param {number} pageSize 한페이지 사이즈
     * @returns {null}
     */
    async getRoomList(page = 1, pageSize = 100) {
        let rooms = null;
        const result = await this._post('/chat/rooms', { page, page_size: pageSize });

        rooms = {
            currentPage: result.current_page,
            totalCount: result.total_count,
            totalPage: result.total_page,
            roomList: result.room_list
        };

        return rooms;
    }

    /**
     * 채팅방 생성
     * @param {string} name
     * @param {string} description
     * @param {array} users
     */
    async createRoom(name, description, users = []) {
        return await this._post('/chat/room/create', {
            room_name: name,
            room_description: description,
            room_users: users
        });

    }

    /**
     * 채팅방들 삭제
     * @param {string[]} rooms
     */
    async deleteRooms(rooms) {
        return await this._post('/chat/room/delete', {
            room_id: rooms
        }, (res) => {
            this.log(res);
        });
    }

    /**
     * 채팅방 수정
     * @param {string} roomId
     * @param {string} name
     * @param {string} description
     */
    async updateRoom(roomId, name, description) {
        return await this._post('/chat/room/update', {
            room_id: roomId,
            room_name: name,
            room_description: description
        }, (res) => {
            this.log(res);
        });
    }

    /**
     * 채팅방의 사용자들
     * @param {string} roomId
     * @returns {null}
     */
    async getRoomUserList(roomId) {
        return await this._post('/chat/room/users', { room_id: roomId });
    }

    /**
     * 채팅방에 사용자 초대하기
     * @param {string} roomId
     * @param {string} userId
     */
    async inviteUserToRoom(roomId, userId) {
        return await this._post('/chat/room/invite', { room_id: roomId, user_id: userId }, (res) => {
            this.log(res);
        });
    }

    /**
     * 채팅방 나가기
     * @param {string} roomId
     */
    async leaveUserFromRoom(roomId) {
        return await this._post('/chat/room/leave', { room_id: roomId }, (res) => {
            this.log(res);
        });
    }

    /**
     * 채팅방의 메시지 리스트
     * @param {string} roomId
     * @param {number} page
     * @param {number} pageSize
     * @returns {null}
     */
    async getMessageListFromRoom(roomId, page = 1, pageSize = 100) {
        let messages = null;
        const result = await this._post('/chat/messages', { room_id: roomId, page, page_size: pageSize });

        messages = {
            currentPage: result.current_page,
            totalCount: result.total_count,
            totalPage: result.total_page,
            messageList: result.message_list
        };

        return messages;
    }

    /**
     * 채팅방에 파일 업로드
     * @param {string} roomId
     * @param {string} userId
     * @param {string} fileId 파일 오브젝트 아이디
     */
    async uploadFileToRoom(roomId, userId, fileId) {
        const formData = this._getFile(fileId);

        formData.append('room_id', roomId);
        formData.append('user_id', userId);

        return await this._postFile('/chat/upload', formData, (res) => {
            this.log(res);
        });
    }

    /**
     * 메시지의 코멘트로 채팅방에 파일 업로드
     * @param {string} roomId
     * @param {string} userId
     * @param {string} parentMessageId 메시지 아이디
     * @param {string} fileId 파일 오브젝트 아이디
     */
    async uploadFileAsCommentRoom(roomId, userId, parentMessageId, fileId) {
        const formData = this._getFile(fileId);

        formData.append('room_id', roomId);
        formData.append('user_id', userId);
        formData.append('parent_message_id', parentMessageId);

        return await this._postFile('/chat/upload/comment', formData, (res) => {
            this.log(res);
        });
    }

    /**
     * 메시지 읽음 처리
     * @param {string} roomId
     * @param {string} messageId
     */
    async markAsRead(roomId, messageId) {
        return await this._post('/chat/message/read', { room_id: roomId, message_id: messageId }, (res) => {
            this.log(res);
        });
    }

    /**
     * 다중 메시지 읽음 처리
     * @param {string} roomId
     * @param {string[]} messageIds
     * @returns {Promise<*>}
     */
    async multipleMarkAsRead(roomId, messageIds) {
        return await this._post('/chat/message/mread', { room_id: roomId, message_ids: messageIds }, (res) => {
            this.log(res);
        });
    }

    /**
     * 메시지 삭제
     * @param {string} messageId
     */
    async deleteMessage(messageId) {
        return await this._post('/chat/message/delete', { message_id: messageId }, (res) => {
            this.log(res);
        });
    }

    /**
     * 관리자 - 사용자 추가
     * @param {string} username
     * @param {string} password
     * @param {string} nickname
     * @param {string} role user|admin
     * @returns {boolean}
     */
    async userSignup(username, password, nickname, role = 'user') {
        if (this.userRole !== 'admin') return false;

        return await this._post('/user/signup', {
            user_id: username,
            user_password: password,
            user_nickname: nickname,
            user_role: role
        }, (res) => {
            this.log(res);
        });
    }

    /**
     * 채팅방들에 공지메시지 보내기
     * @param {array} roomIds
     * @param {string} type NOTI_START_SECTION : 진료 시작 NOTI_END_SECTION : 진료 종료 NOTI_PLAIN_MESSAGE : 진료 삭제
     * @param {string} notification room_notification: 알림메시지입니다. “notification_type” 이 “NOTI_PLAIN_MESSAGE” 형태 일때만 값이 있습니다.
     * @returns {boolean}
     */
    async notifyToMultiRooms(roomIds = [], type = 'NOTI_PLAIN_MESSAGE', notification) {
        if (this.userRole !== 'admin') return false;

        return await this._post('/chat/room/notify', {
            room_ids: roomIds,
            notification_type: type,
            room_notification: notification
        }, (res) => {
            this.log(res);
        });
    }

    /**
     * 특정 방에 전달한 알림메시지 조회
     * @param roomId
     * @returns {boolean}
     */
    async getNotificationListFromRoom(roomId) {
        if (this.userRole !== 'admin') return false;

        return await this._post('/chat/room/notifies', { room_id: roomId }, (res) => {
            this.log(res);
        });
    }

    /**
     * 진료시작 및 종료사이의 모든 메시지를 삭제
     * @param roomId
     * @param messageId
     * @returns {boolean}
     */
    async deleteAllMessageBetweenStartAndEndOfSection(roomId, messageId) {
        if (this.userRole !== 'admin') return false;

        return await this._post('/chat/room/notifies', { room_id: roomId, message_id: messageId }, (res) => {
            this.log(res);
        });
    }

    /**
     * GET API
     * @param {string} target
     * @param {Object} data
     * @param {function} callback
     */
    _get(target, data, callback = null) {
        return this._ajax('GET', target, data, callback);
    }

    /**
     * POST API
     * @param {string} target
     * @param {Object} data
     * @param {function} callback
     */
    _post(target, data, callback = null) {
        return this._ajax('POST', target, data, callback);
    }

    /**
     * Ajax
     * @param {string} method GET|POST
     * @param {string} target
     * @param {Object} data
     * @param {function} callback
     */
    _ajax(method, target, data, callback = null) {
        callback = typeof data === 'function' ? data : callback;

        let headers = {};

        if (this.accessToken) headers.Authorization = `${this.grantType} ${this.accessToken}`;

        let options = {
            method,
            headers,
            contentType: 'application/json;charset=UTF-8',
            success: (res) => {
                if (res.code === 'CODE_SUCCESS') {
                    if (typeof callback === 'function') callback(res);
                } else {
                    this.log(res.message);
                }

                return res;
            },
            error: (error) => {
                this.log(error);
                return error;
            }
        };

        if (typeof data !== 'function') options.data = JSON.stringify(data);

        return $.ajax(`${this.endpoint}${target}`, options);
    }

    /**
     * 파일 업로드
     * @param {string} target
     * @param {Object} data
     * @param {function} callback
     */
    _postFile(target, data, callback) {
        let headers = {};

        if (this.accessToken) headers.Authorization = `${this.grantType} ${this.accessToken}`;

        return $.ajax(`${this.endpoint}${target}`, {
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            headers,
            method: 'POST',
            success: function(res) {
                if (typeof callback === 'function') callback(res);
                return res;
            },
            error: (error) => {
                this.log(error);
                return error;
            }
        });
    }

    /**
     * 파일 오브젝트
     * @param {string} fileId
     * @returns {FormData}
     */
    _getFile(fileId) {
        const data = new FormData();
        data.append('file', $(`#${fileId}`)[0].files[0]);

        return data;
    }

    /**
     * 로그
     * @param {string} messages
     */
    log(messages) {
        if (this.debug) console.log('Debug', messages);
    }

    /**
     * 날짜 포멧 변경
     * @param timestamp
     * @returns {{hours: string, seconds: string, month: string, year: number, minutes: string, timeString: string, shortYear: string, days: string, dateString: string}}
     */
    static getDateFromTimestamp(timestamp) {
        const date = ['string', 'number'].includes(typeof timestamp) ? new Date(String(timestamp).substring(0, 10) * 1000) : timestamp;
        const year = date.getFullYear(),
            month = String(date.getMonth() + 1).padStart(2, '0'),
            days = String(date.getDate()).padStart(2, '0'),
            hours = String(date.getHours()).padStart(2, '0'),
            minutes = String(date.getMinutes()).padStart(2, '0'),
            seconds = String(date.getSeconds()).padStart(2, '0');

        return {
            year,
            shortYear: String(year).substring(2, 4),
            month,
            days,
            hours,
            minutes,
            seconds,
            dateString: `${year}-${month}-${days}`,
            timeString: `${hours}-${minutes}-${seconds}`
        };
    }
}
