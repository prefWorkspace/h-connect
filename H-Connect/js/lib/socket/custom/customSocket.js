/**
 * HConnect Socket API를 위한 커스텀 클래스
 * class: CustomSocket
 * author: Felix D.H Kang
 * dependency:
 *  - SockJS v1.5.0
 *  - Stomp v1.7.1
 */
export class CustomSocket {

    /**
     * API 서버 주소.
     * @type {string}
     */
    endpoint = 'https://www.hconnect-test-api.mobicareconsole.com/mobiCAREConsole/ws';
    /**
     * SockJS 오브젝트.
     * @type {SockJS}
     */
    ws = null;
    /**
     * Stomp 오브젝트.
     * @type {Stomp}
     */
    client = null;
    /**
     * Stomp 구독 오브젝트 리스트.
     * @type {{Stomp.Client.prototype.subscribe}}
     */
    subscribes = {};

    /**
     * 종단 주소 설정 및 Stomp 클라이언트 설정.
     * @param {string} endpoint
     */
    constructor(endpoint = '', isHttp = true) {
        if (endpoint) this.endpoint = endpoint;
        if (isHttp) {
            this.ws = SockJS(this.endpoint);
            this.client = Stomp.over(this.ws);
        } else {
            this.client = Stomp.client(endpoint);
        }
        this.client.debug = null;
    }

    /**
     * 소켓 서버 연결.
     * @param {object} headers
     * @param {function} success
     * @param {function} error
     * @returns null
     */
    connect(headers, success = () => {
    }, error = () => {
    }) {
        this.client.connect(headers, success, error);
    }

    /**
     * 구독 추가.
     * @param {string} name
     * @param {string} url
     * @param {function} callback
     * @param {object} headers
     */
    addSubscribe(name, url, callback = () => {
    }, headers = {}) {
        if (this.client) {
            this.subscribes[name] = this.client.subscribe(url, callback, { ...headers, id: name });
        }
    }

    /**
     * 구독 취소
     * @param {string} name
     */
    removeSubscribe(name) {
        if (name in this.subscribes) this.subscribes[name].unsubscribe();
    }

    /**
     * 데이터 전송
     * @param {string} url
     * @param {object} headers
     * @param {object} data
     */
    send(url, headers, data) {
        this.client.send(url, headers, JSON.stringify(data));
    }

    getConnected() {
        return this.client.connected;
    }

    getReadyState() {
        return this.client.ws.readyState;
    }
}
