const crypto = require('crypto')

const cryptoHash = (...parameters)=>{
const hash = crypto.createHash("sha256");
hash.update(parameters.sort().join(' '));
return hash.digest("hex");
}

module.exports = cryptoHash;