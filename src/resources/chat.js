const { makeRequest } = require('../utils');

class Chat {
    constructor(client) {
        this.client = client;
        this.completions = this;
    }

    async create(options = {}) {
        // Validasyonlar
        if (!options.model) {
            throw new Error('Model is required');
        }
        if (!options.messages || !Array.isArray(options.messages)) {
            throw new Error('Messages array is required');
        }

        // İsteği at ve response'u al
        const response = await makeRequest(this.client, 'POST', '/v1/chat/completions', options);
        
        // Response'dan mesajı çıkar
        if (response.choices && response.choices.length > 0 && response.choices[0].message) {
            return response.choices[0].message.content;
        }
        
        throw new Error('Invalid response format');
    }
}

module.exports = Chat;