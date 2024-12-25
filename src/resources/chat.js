const { makeRequest } = require('../utils');

class Chat {
    constructor(client) {
        this.client = client;
        this.completions = this;
    }

    async create(options = {}) {
        if (!options.model) {
            throw new Error('Model is required');
        }
        if (!options.messages || !Array.isArray(options.messages)) {
            throw new Error('Messages array is required');
        }

        return makeRequest(this.client, 'POST', '/v1/chat/completions', options);
    }
}

module.exports = Chat;