const { makeRequest } = require('../utils');

class Images {
    constructor(client) {
        this.client = client;
    }

    async create(options = {}) {
        if (!options.model) {
            throw new Error('Model is required');
        }
        if (!options.prompt) {
            throw new Error('Prompt is required');
        }

        return makeRequest(this.client, 'POST', '/v1/images/generations', options);
    }
}

module.exports = Images;