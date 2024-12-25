class WindNexusError extends Error {
    constructor(message) {
        super(message);
        this.name = 'WindNexusError';
    }
}

module.exports = { WindNexusError };