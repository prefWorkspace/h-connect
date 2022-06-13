class ApiDelegate {

    debug = true;
    endpoint = 'https://www.hconnect-test-api.mobicareconsole.com/mobiCAREConsole';
    token = sessionStorage.getItem('accesToken');

    /**
     * GET API
     * @param {string} target
     * @param {Object} data
     * @param {function} callback
     */
    get(target, data, callback = null) {
        return this._ajax('GET', target, data, callback);
    }

    /**
     * POST API
     * @param {string} target
     * @param {Object} data
     * @param {function} callback
     */
    post(target, data, callback = null) {
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

        const headers = { 'SX-Auth-Token': this.token };
        let options = {
            method,
            headers,
            contentType: 'application/json;charset=UTF-8',
            success: (res) => {
                if (res.result) {
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
     * 로그
     * @param {string} messages
     */
    log(messages) {
        if (this.debug) console.log('Debug', messages);
    }
}