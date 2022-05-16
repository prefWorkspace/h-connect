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
    constructor(endpoint = '') {
        if (endpoint) this.endpoint = endpoint;
        this.ws = SockJS(this.endpoint);
        this.client = Stomp.over(this.ws);
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
            this.subscribes[name] = this.client.subscribe(url, callback, headers);
        }
    }

    /**
     * 구독 취소
     * @param {string} name
     */
    removeSubscribe(name) {
        this.subscribes[name].unsubscribe();
    }
}