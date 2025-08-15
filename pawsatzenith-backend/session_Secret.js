const crypto = require('crypto');

// Generate a random 64-byte (512-bit) secure key in hexadecimal format
const secureKey = crypto.randomBytes(64).toString('hex');

console.log('Generated Secure Key:', secureKey);
