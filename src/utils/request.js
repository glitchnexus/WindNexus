const https = require('https');
const { WindNexusError } = require('../errors');

async function makeRequest(client, method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: new URL(client.baseURL).hostname,
            path,
            method,
            headers: {
                'Authorization': `Bearer ${client.apiKey}`,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(responseData);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(parsedData);
                    } else {
                        reject(new WindNexusError(parsedData.error?.message || 'Request failed'));
                    }
                } catch (error) {
                    reject(new WindNexusError('Failed to parse response'));
                }
            });
        });

        req.on('error', (error) => {
            reject(new WindNexusError(error.message));
        });

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

module.exports = { makeRequest };