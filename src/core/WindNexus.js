const { Chat, Images } = require('../resources');
const { WindNexusError } = require('../errors');

class WindNexus {
    constructor(options = {}) {
        if (!options.apiKey) {
            throw new WindNexusError('API key is required');
        }

        this.key = options.key;
        this.region = options.region || 'us';
        this.baseURL = options.baseURL || this._getRegionURL();

        this.chat = new Chat(this);
        this.images = new Images(this);
    }

    _getRegionURL() {
        const regions = {
            us: 'https://us.glitchnexus.pro'
        };

        if (!regions[this.region]) {
            throw new WindNexusError(`Invalid region: ${this.region}`);
        }

        return regions[this.region];
    }
}

module.exports = WindNexus;